// sends the unfold welcome email via resend.
// contact/segment storage has moved to airtable (see $lib/server/airtable).

import { Resend } from 'resend';

interface SendWelcomeEmailArgs {
	apiKey: string;
	email: string;
}

export async function sendWelcomeEmail(args: SendWelcomeEmailArgs): Promise<void> {
	const { apiKey, email } = args;
	const resend = new Resend(apiKey);

	const { error: sendErr } = await resend.emails.send({
		from: 'hex4 <unfold@serial.quest>',
		to: email,
		template: {
			id: 'unfold-welcome'
		}
	});
	if (sendErr) {
		throw new Error(`resend send: ${sendErr.name} - ${sendErr.message}`);
	}
}
