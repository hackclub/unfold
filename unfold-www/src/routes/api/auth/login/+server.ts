import { dev } from '$app/environment';
import { redirect } from '@sveltejs/kit';
import { getEnv } from '$lib/server/env';
import type { RequestHandler } from './$types';

const AUTHORIZE_ENDPOINT = 'https://auth.hackclub.com/oauth/authorize';

// generate a random url-safe state token
function randomState(bytes = 32): string {
	const arr = new Uint8Array(bytes);
	crypto.getRandomValues(arr);
	return btoa(String.fromCharCode(...arr))
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
		.replace(/=+$/, '');
}

export const GET: RequestHandler = ({ cookies, platform }) => {
	const env = getEnv(platform?.env);
	const state = randomState();

	// stash state in a short-lived, httpOnly cookie so we can verify on callback
	cookies.set('hc_oauth_state', state, {
		httpOnly: true,
		secure: !dev,
		sameSite: 'lax',
		path: '/',
		maxAge: 60 * 10 // 10 min
	});

	const params = new URLSearchParams({
		client_id: env.UNFOLD_OIDC_CLIENT_ID,
		redirect_uri: env.UNFOLD_OIDC_REDIRECT_URI,
		response_type: 'code',
		scope: 'openid profile email slack_id',
		state
	});

	redirect(302, `${AUTHORIZE_ENDPOINT}?${params.toString()}`);
};
