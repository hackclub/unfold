import { redirect } from '@sveltejs/kit';
import { getEnv } from '$lib/server/env';
import { addContactToSegment } from '$lib/server/resend';
import { inviteUserToChannels } from '$lib/server/slack';
import type { RequestHandler } from './$types';

const TOKEN_ENDPOINT = 'https://auth.hackclub.com/oauth/token';
const USERINFO_ENDPOINT = 'https://auth.hackclub.com/oauth/userinfo';

interface TokenResponse {
	access_token: string;
	id_token?: string;
	token_type: string;
	expires_in: number;
	scope?: string;
}

interface UserInfo {
	sub: string;
	email?: string;
	email_verified?: boolean;
	name?: string;
	given_name?: string;
	family_name?: string;
	slack_id?: string;
}

export const GET: RequestHandler = async ({ url, cookies, platform }) => {
	const env = getEnv(platform?.env);

	const code = url.searchParams.get('code');
	const state = url.searchParams.get('state');
	const oauthError = url.searchParams.get('error');
	const cookieState = cookies.get('hc_oauth_state');

	// always clear the state cookie now — single use
	cookies.delete('hc_oauth_state', { path: '/' });

	if (oauthError) {
		redirect(302, `/apply?error=${encodeURIComponent(oauthError)}`);
	}
	if (!code || !state) {
		redirect(302, '/apply?error=missing_code');
	}
	if (!cookieState || cookieState !== state) {
		redirect(302, '/apply?error=bad_state');
	}

	// 1. exchange code for tokens
	let token: TokenResponse;
	try {
		const body = new URLSearchParams({
			grant_type: 'authorization_code',
			code,
			redirect_uri: env.UNFOLD_OIDC_REDIRECT_URI,
			client_id: env.UNFOLD_OIDC_CLIENT_ID,
			client_secret: env.UNFOLD_OIDC_CLIENT_SECRET
		});
		const r = await fetch(TOKEN_ENDPOINT, {
			method: 'POST',
			headers: {
				'content-type': 'application/x-www-form-urlencoded',
				accept: 'application/json'
			},
			body
		});
		if (!r.ok) {
			const text = await r.text();
			console.error('token exchange failed', r.status, text);
			redirect(302, '/apply?error=token_exchange');
		}
		token = (await r.json()) as TokenResponse;
	} catch (err) {
		console.error('token exchange threw', err);
		redirect(302, '/apply?error=token_network');
	}

	// 2. fetch userinfo
	let user: UserInfo;
	try {
		const r = await fetch(USERINFO_ENDPOINT, {
			headers: { authorization: `Bearer ${token.access_token}` }
		});
		if (!r.ok) {
			const text = await r.text();
			console.error('userinfo failed', r.status, text);
			redirect(302, '/apply?error=userinfo');
		}
		user = (await r.json()) as UserInfo;
	} catch (err) {
		console.error('userinfo threw', err);
		redirect(302, '/apply?error=userinfo_network');
	}

	if (!user.email) {
		redirect(302, '/apply?error=no_email');
	}

	// 3. add to resend segment (best-effort: log on failure but still proceed)
	try {
		await addContactToSegment({
			apiKey: env.RESEND_API_KEY,
			segmentId: env.RESEND_SEGMENT_ID,
			email: user.email,
			firstName: user.given_name,
			lastName: user.family_name,
			properties: {
				slack_id: user.slack_id ?? '',
				hackclub_sub: user.sub
			}
		});
	} catch (err) {
		console.error('resend add failed', err);
	}

	// 4. invite to slack channels (best-effort)
	if (user.slack_id) {
		try {
			await inviteUserToChannels({
				botToken: env.SLACK_BOT_TOKEN,
				userId: user.slack_id,
				channelIds: env.UNFOLD_SLACK_CHANNEL_IDS.split(',')
					.map((s) => s.trim())
					.filter(Boolean)
			});
		} catch (err) {
			console.error('slack invite failed', err);
		}
	}

	redirect(302, '/applied');
};
