// env helper for astro v6 + cloudflare adapter v13.
//
// in v6 there is no more `Astro.locals.runtime.env` — env vars and secrets
// come from the cloudflare:workers module directly. this works in both
// `astro dev` (since dev now runs in workerd) and in production.
//
// locally, secrets live in `.dev.vars` (not `.env`). non-secret vars can
// live in `wrangler.jsonc` under "vars".

import { env } from "cloudflare:workers";

interface UnfoldEnv {
	UNFOLD_OIDC_CLIENT_ID: string;
	UNFOLD_OIDC_CLIENT_SECRET: string;
	UNFOLD_OIDC_REDIRECT_URI: string;
	RESEND_API_KEY: string;
	RESEND_SEGMENT_ID: string;
	SLACK_BOT_TOKEN: string;
	UNFOLD_SLACK_CHANNEL_IDS: string; // comma-separated
}

export function getEnv(): UnfoldEnv {
	const e = env as unknown as Record<string, string | undefined>;

	const get = (k: keyof UnfoldEnv): string => {
		const v = e[k];
		if (!v) {
			throw new Error(`missing required env var: ${k}`);
		}
		return v;
	};

	return {
		UNFOLD_OIDC_CLIENT_ID: get("UNFOLD_OIDC_CLIENT_ID"),
		UNFOLD_OIDC_CLIENT_SECRET: get("UNFOLD_OIDC_CLIENT_SECRET"),
		UNFOLD_OIDC_REDIRECT_URI: get("UNFOLD_OIDC_REDIRECT_URI"),
		RESEND_API_KEY: get("RESEND_API_KEY"),
		RESEND_SEGMENT_ID: get("RESEND_SEGMENT_ID"),
		SLACK_BOT_TOKEN: get("SLACK_BOT_TOKEN"),
		UNFOLD_SLACK_CHANNEL_IDS: get("UNFOLD_SLACK_CHANNEL_IDS"),
	};
}
