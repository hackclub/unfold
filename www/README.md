# unfold www

astro site for unfold (summer 2026), deployed to cloudflare pages.

## dev

```bash
bun install
cp .dev.vars.example .dev.vars
# fill in .dev.vars (see below)
bun run dev
```

> **note:** astro v6 + cloudflare adapter v13 runs `astro dev` in cloudflare's
> `workerd` runtime, not node. that means local secrets go in `.dev.vars` (not
> `.env`), and env vars are accessed via `import { env } from "cloudflare:workers"`.

## the apply flow

`/apply` is intentionally minimal — the entire "application" is a single
"log in with hack club" button. submitting the form actually means:

1. user is redirected through hack club's OIDC at
   [auth.hackclub.com](https://auth.hackclub.com) (scopes:
   `openid profile email slack_id`)
2. on callback, we exchange the code for tokens and fetch userinfo
3. we add the user's email + slack id to a resend segment as a contact (with
   custom properties for `slack_id` and `hackclub_sub`)
4. we invite the user to the configured slack channels via
   `conversations.invite` using a bot token

success → `/applied`. all errors bounce back to `/apply?error=…` so we
can render a soft message.

### required env vars

| var                         | description                                               |
| --------------------------- | --------------------------------------------------------- |
| `UNFOLD_OIDC_CLIENT_ID`     | client id from auth.hackclub.com                          |
| `UNFOLD_OIDC_CLIENT_SECRET` | client secret from auth.hackclub.com                      |
| `UNFOLD_OIDC_REDIRECT_URI`  | full callback url, e.g. `https://unfold.../api/auth/callback` |
| `RESEND_API_KEY`            | resend api key (`re_…`)                                   |
| `RESEND_SEGMENT_ID`         | resend segment uuid                                       |
| `SLACK_BOT_TOKEN`           | bot token (`xoxb-…`); must have `channels:manage` and/or `groups:write` and be a member of every target channel |
| `UNFOLD_SLACK_CHANNEL_IDS`  | comma-separated channel ids (e.g. `C0XXXX,C0YYYY`)         |

### registering the oauth app

ask in `#idv-dev` on hack club slack for help registering a new oauth app
on auth.hackclub.com. you'll need to provide:

- redirect uri(s):
  - `https://your-prod-domain/api/auth/callback`
  - `http://localhost:4321/api/auth/callback` (for local dev)
- scopes: `openid profile email slack_id`

### deploy notes

this app uses `output: "server"` with the `@astrojs/cloudflare` adapter, so
api routes (`src/pages/api/auth/*.ts`) run on cloudflare workers.

deploy via cloudflare workers (note: pages support was removed in v13). set
secrets via:

```bash
npx wrangler secret put UNFOLD_OIDC_CLIENT_SECRET
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put SLACK_BOT_TOKEN
# ...etc for every secret
```

non-secret vars (like `UNFOLD_OIDC_CLIENT_ID`, `UNFOLD_OIDC_REDIRECT_URI`,
`RESEND_SEGMENT_ID`, `UNFOLD_SLACK_CHANNEL_IDS`) can go in `wrangler.jsonc`
under `"vars": { ... }` and are committed to the repo.
