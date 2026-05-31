import type { APIRoute } from "astro";
import { getEnv } from "../../../lib/env";
import { addContactToSegment } from "../../../lib/resend";
import { inviteUserToChannels } from "../../../lib/slack";

export const prerender = false;

const TOKEN_ENDPOINT = "https://auth.hackclub.com/oauth/token";
const USERINFO_ENDPOINT = "https://auth.hackclub.com/oauth/userinfo";

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

export const GET: APIRoute = async ({ url, cookies, redirect }) => {
  const env = getEnv();

  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const oauthError = url.searchParams.get("error");
  const cookieState = cookies.get("hc_oauth_state")?.value;

  // always clear the state cookie now — single use
  cookies.delete("hc_oauth_state", { path: "/" });

  if (oauthError) {
    return redirect(`/apply?error=${encodeURIComponent(oauthError)}`, 302);
  }
  if (!code || !state) {
    return redirect("/apply?error=missing_code", 302);
  }
  if (!cookieState || cookieState !== state) {
    return redirect("/apply?error=bad_state", 302);
  }

  // 1. exchange code for tokens
  let token: TokenResponse;
  try {
    const body = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: env.UNFOLD_OIDC_REDIRECT_URI,
      client_id: env.UNFOLD_OIDC_CLIENT_ID,
      client_secret: env.UNFOLD_OIDC_CLIENT_SECRET,
    });
    const r = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        accept: "application/json",
      },
      body,
    });
    if (!r.ok) {
      const text = await r.text();
      console.error("token exchange failed", r.status, text);
      return redirect("/apply?error=token_exchange", 302);
    }
    token = (await r.json()) as TokenResponse;
  } catch (err) {
    console.error("token exchange threw", err);
    return redirect("/apply?error=token_network", 302);
  }

  // 2. fetch userinfo
  let user: UserInfo;
  try {
    const r = await fetch(USERINFO_ENDPOINT, {
      headers: { authorization: `Bearer ${token.access_token}` },
    });
    if (!r.ok) {
      const text = await r.text();
      console.error("userinfo failed", r.status, text);
      return redirect("/apply?error=userinfo", 302);
    }
    user = (await r.json()) as UserInfo;
  } catch (err) {
    console.error("userinfo threw", err);
    return redirect("/apply?error=userinfo_network", 302);
  }

  if (!user.email) {
    return redirect("/apply?error=no_email", 302);
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
        slack_id: user.slack_id ?? "",
        hackclub_sub: user.sub,
      },
    });
  } catch (err) {
    console.error("resend add failed", err);
  }

  // 4. invite to slack channels (best-effort)
  if (user.slack_id) {
    try {
      await inviteUserToChannels({
        botToken: env.SLACK_BOT_TOKEN,
        userId: user.slack_id,
        channelIds: env.UNFOLD_SLACK_CHANNEL_IDS.split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      });
    } catch (err) {
      console.error("slack invite failed", err);
    }
  }

  return redirect("/applied", 302);
};
