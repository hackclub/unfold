import type { APIRoute } from "astro";
import { getEnv } from "../../../lib/env";

export const prerender = false;

const AUTHORIZE_ENDPOINT = "https://auth.hackclub.com/oauth/authorize";

// generate a random url-safe state token
function randomState(bytes = 32): string {
	const arr = new Uint8Array(bytes);
	crypto.getRandomValues(arr);
	return btoa(String.fromCharCode(...arr))
		.replace(/\+/g, "-")
		.replace(/\//g, "_")
		.replace(/=+$/, "");
}

export const GET: APIRoute = async ({ redirect, cookies }) => {
	const env = getEnv();

	const state = randomState();

	// stash state in a short-lived, httpOnly cookie so we can verify on callback
	cookies.set("hc_oauth_state", state, {
		httpOnly: true,
		secure: import.meta.env.PROD,
		sameSite: "lax",
		path: "/",
		maxAge: 60 * 10, // 10 min
	});

	const params = new URLSearchParams({
		client_id: env.UNFOLD_OIDC_CLIENT_ID,
		redirect_uri: env.UNFOLD_OIDC_REDIRECT_URI,
		response_type: "code",
		scope: "openid profile email slack_id",
		state,
	});

	return redirect(`${AUTHORIZE_ENDPOINT}?${params.toString()}`, 302);
};
