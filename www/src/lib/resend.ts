// thin wrapper around the resend sdk for adding contacts to a segment.
// the sdk handles all the fetch + error plumbing for us.

import { Resend } from "resend";

interface AddContactArgs {
	apiKey: string;
	segmentId: string;
	email: string;
	firstName?: string;
	lastName?: string;
	properties?: Record<string, string>;
}

// per-isolate cache so we only create each property definition once
const ensuredKeys = new Set<string>();

async function ensureProperty(resend: Resend, key: string): Promise<void> {
	if (ensuredKeys.has(key)) return;

	const { error } = await resend.contactProperties.create({
		key,
		type: "string",
		fallbackValue: "",
	});

	// success OR "already exists" = good
	if (!error || error.name === "validation_error") {
		ensuredKeys.add(key);
		return;
	}

	console.error(`resend ensure-property ${key}:`, error);
}

export async function addContactToSegment(args: AddContactArgs): Promise<void> {
	const { apiKey, segmentId, email, firstName, lastName, properties } = args;
	const resend = new Resend(apiKey);

	// 0. ensure all custom property keys exist on the account
	if (properties && Object.keys(properties).length > 0) {
		await Promise.all(
			Object.keys(properties).map((k) => ensureProperty(resend, k)),
		);
	}

	// 1. create contact + add to segment in one call
	const { error } = await resend.contacts.create({
		email,
		firstName,
		lastName,
		unsubscribed: false,
		segments: [{ id: segmentId }],
		...(properties && Object.keys(properties).length > 0
			? { properties }
			: {}),
	});

	if (!error) return;

	// if the contact already exists, fall back to adding by email +
	// patching properties separately
	const alreadyExists = error.name === "validation_error" &&
		typeof error.message === "string" &&
		error.message.toLowerCase().includes("already exists");

	if (!alreadyExists) {
		throw new Error(`resend create: ${error.name} - ${error.message}`);
	}

	// 2. add existing contact to segment by email
	const { error: addErr } = await resend.contacts.segments.add({
		email,
		segmentId,
	});
	if (addErr) {
		// "already in segment" type errors are fine
		console.error("resend add-to-segment:", addErr);
	}

	// 3. update properties on existing contact
	if (
		(properties && Object.keys(properties).length > 0) ||
		firstName ||
		lastName
	) {
		const { error: patchErr } = await resend.contacts.update({
			email,
			firstName,
			lastName,
			...(properties && Object.keys(properties).length > 0
				? { properties }
				: {}),
		});
		if (patchErr) {
			console.error("resend patch:", patchErr);
		}
	}
}
