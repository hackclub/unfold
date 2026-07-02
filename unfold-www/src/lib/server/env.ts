// env helper for sveltekit + @sveltejs/adapter-cloudflare.
//
// in sveltekit, cloudflare bindings are exposed on the per-request
// `event.platform.env`. this is the typed App.Platform['env'] (see
// src/app.d.ts + wrangler.jsonc) and works in both `vite dev` and
// production workerd.
//
// locally, secrets live in `.dev.vars` (not `.env`). non-secret vars
// can live in `wrangler.jsonc` under "vars".

export interface UnfoldEnv {
	UNFOLD_OIDC_CLIENT_ID: string;
	UNFOLD_OIDC_CLIENT_SECRET: string;
	UNFOLD_OIDC_REDIRECT_URI: string;
	RESEND_API_KEY: string;
	RESEND_SEGMENT_ID: string;
	SLACK_BOT_TOKEN: string;
	UNFOLD_SLACK_CHANNEL_IDS: string; // comma-separated
}

export function getEnv(platformEnv: unknown): UnfoldEnv {
	const e = platformEnv as Record<string, string | undefined>;

	const get = (k: keyof UnfoldEnv): string => {
		const v = e[k];
		if (!v) throw new Error(`missing required env var: ${k}`);
		return v;
	};

	return {
		UNFOLD_OIDC_CLIENT_ID: get('UNFOLD_OIDC_CLIENT_ID'),
		UNFOLD_OIDC_CLIENT_SECRET: get('UNFOLD_OIDC_CLIENT_SECRET'),
		UNFOLD_OIDC_REDIRECT_URI: get('UNFOLD_OIDC_REDIRECT_URI'),
		RESEND_API_KEY: get('RESEND_API_KEY'),
		RESEND_SEGMENT_ID: get('RESEND_SEGMENT_ID'),
		SLACK_BOT_TOKEN: get('SLACK_BOT_TOKEN'),
		UNFOLD_SLACK_CHANNEL_IDS: get('UNFOLD_SLACK_CHANNEL_IDS')
	};
}
