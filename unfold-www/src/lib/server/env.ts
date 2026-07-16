// env helper for sveltekit + @sveltejs/adapter-node.
//
// in sveltekit, env vars are accessed via $env/dynamic/private, which reads
// from process.env at runtime. this works in both `vite dev` and production
// (node server in a container).
//
// locally, secrets live in `.env`. in production, inject them as environment
// variables into the container at runtime.

import { env as privEnv } from '$env/dynamic/private';

export interface UnfoldEnv {
	UNFOLD_OIDC_CLIENT_ID: string;
	UNFOLD_OIDC_CLIENT_SECRET: string;
	UNFOLD_OIDC_REDIRECT_URI: string;
	AIRTABLE_TOKEN: string;
	AIRTABLE_BASE_ID: string;
	SLACK_BOT_TOKEN: string;
	UNFOLD_SLACK_CHANNEL_IDS: string; // comma-separated
}

export function getEnv(): UnfoldEnv {
	const get = (k: keyof UnfoldEnv): string => {
		const v = privEnv[k];
		if (!v) throw new Error(`missing required env var: ${k}`);
		return v;
	};

	return {
		UNFOLD_OIDC_CLIENT_ID: get('UNFOLD_OIDC_CLIENT_ID'),
		UNFOLD_OIDC_CLIENT_SECRET: get('UNFOLD_OIDC_CLIENT_SECRET'),
		UNFOLD_OIDC_REDIRECT_URI: get('UNFOLD_OIDC_REDIRECT_URI'),
		AIRTABLE_TOKEN: get('AIRTABLE_TOKEN'),
		AIRTABLE_BASE_ID: get('AIRTABLE_BASE_ID'),
		SLACK_BOT_TOKEN: get('SLACK_BOT_TOKEN'),
		UNFOLD_SLACK_CHANNEL_IDS: get('UNFOLD_SLACK_CHANNEL_IDS')
	};
}
