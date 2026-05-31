// invites a user to a list of channels via slack web api.
// requires a bot token (xoxb-) with `channels:manage` (public) and/or
// `groups:write` (private) scopes. the bot must already be a member of
// each target channel.

interface InviteArgs {
	botToken: string;
	userId: string;
	channelIds: string[];
}

interface SlackResponse {
	ok: boolean;
	error?: string;
}

export async function inviteUserToChannels(args: InviteArgs): Promise<void> {
	const { botToken, userId, channelIds } = args;
	if (!userId || channelIds.length === 0) return;

	for (const channelId of channelIds) {
		try {
			const r = await fetch("https://slack.com/api/conversations.invite", {
				method: "POST",
				headers: {
					authorization: `Bearer ${botToken}`,
					"content-type": "application/json; charset=utf-8",
				},
				body: JSON.stringify({ channel: channelId, users: userId }),
			});
			const data = (await r.json()) as SlackResponse;
			if (!data.ok) {
				// "already_in_channel" is fine — they're already there
				if (data.error === "already_in_channel") continue;
				console.error(
					`slack invite to ${channelId} failed: ${data.error ?? "unknown"}`,
				);
			}
		} catch (err) {
			console.error(`slack invite to ${channelId} threw`, err);
		}
	}
}
