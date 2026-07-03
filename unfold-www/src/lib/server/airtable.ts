// upserts a participant record into the airtable "Participants" table.
// merges on "HCA sub" (the hack club idp subject id) so re-runs of the
// signup flow update the existing row instead of creating a duplicate.
//
// "HCA sub" is a singleLineText field, which is eligible for
// performUpsert's fieldsToMergeOn (email-typed fields are NOT, which is
// why we merge on sub instead).

interface CreateOrUpdateParticipantArgs {
	token: string;
	baseId: string;
	fullName: string;
	email: string;
	slackId: string;
	hcaSub: string;
	stage: string;
}

interface AirtableError {
	error?: { type?: string; message?: string };
}

export async function createOrUpdateParticipant(
	args: CreateOrUpdateParticipantArgs
): Promise<void> {
	const { token, baseId, fullName, email, slackId, hcaSub, stage } = args;

	const r = await fetch(`https://api.airtable.com/v0/${baseId}/Participants`, {
		method: 'PATCH',
		headers: {
			authorization: `Bearer ${token}`,
			'content-type': 'application/json'
		},
		body: JSON.stringify({
			performUpsert: { fieldsToMergeOn: ['HCA sub'] },
			records: [
				{
					fields: {
						'Full name': fullName,
						Email: email,
						'Slack ID': slackId,
						'HCA sub': hcaSub,
						Stage: stage
					}
				}
			]
		})
	});

	if (!r.ok) {
		const body = (await r.json().catch(() => ({}))) as AirtableError;
		throw new Error(
			`airtable upsert: ${r.status} ${body.error?.type ?? ''} ${body.error?.message ?? ''}`.trim()
		);
	}
}
