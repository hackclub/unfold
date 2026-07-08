// one-shot email blast to all Airtable participants at Stage='Signup',
// using the Resend template `unfold-starting-blast`.
//
// SAFETY: dry-run is the default. it lists recipients and sends nothing.
// pass --send to actually deliver. pass --limit N to cap the count (useful
// for a partial test). pass --only addr@example.com to send to one person.
//
// run:  bun run scripts/blast.ts            # dry run, list only
//       bun run scripts/blast.ts --send     # actually send
//       bun run scripts/blast.ts --send --limit 2
//
// reads secrets from .dev.vars (AIRTABLE_TOKEN, AIRTABLE_BASE_ID, RESEND_API_KEY).

import { Resend } from 'resend';

// --- arg parsing ---
const argv = process.argv.slice(2);
const SEND = argv.includes('--send');
const LIMIT_IDX = argv.indexOf('--limit');
const LIMIT = LIMIT_IDX !== -1 ? Number(argv[LIMIT_IDX + 1]) : undefined;
const ONLY_IDX = argv.indexOf('--only');
const ONLY = ONLY_IDX !== -1 ? argv[ONLY_IDX + 1] : undefined;

if (!SEND) {
	console.log('=== DRY RUN (no emails will be sent) ===\n');
} else {
	console.log('=== LIVE SEND ===\n');
}

// --- load .dev.vars ---
const envText = await Bun.file('.dev.vars').text();
const env: Record<string, string> = {};
for (const line of envText.split('\n')) {
	const trimmed = line.trim();
	if (!trimmed || trimmed.startsWith('#')) continue;
	const eq = trimmed.indexOf('=');
	if (eq === -1) continue;
	env[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim();
}

const AIRTABLE_TOKEN = env.AIRTABLE_TOKEN;
const AIRTABLE_BASE_ID = env.AIRTABLE_BASE_ID;
const RESEND_API_KEY = env.RESEND_API_KEY;

if (!AIRTABLE_TOKEN || !AIRTABLE_BASE_ID || !RESEND_API_KEY) {
	console.error('missing required env vars in .dev.vars (AIRTABLE_TOKEN, AIRTABLE_BASE_ID, RESEND_API_KEY)');
	process.exit(1);
}

// --- fetch all Signup participants from Airtable (paginated) ---
interface AirtableRecord {
	id: string;
	fields: Record<string, unknown>;
}
interface AirtableListResponse {
	records: AirtableRecord[];
	offset?: string;
}

function fieldString(r: AirtableRecord, name: string): string {
	const v = r.fields[name];
	if (typeof v === 'string') return v;
	if (Array.isArray(v) && typeof v[0] === 'string') return v[0];
	return '';
}

const recipients: { email: string; name: string }[] = [];
let offset: string | undefined;
do {
	const params = new URLSearchParams({
		filterByFormula: "{Stage}='Signup'",
		pageSize: '100'
	});
	if (offset) params.set('offset', offset);
	const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Participants?${params}`;
	const r = await fetch(url, {
		headers: { authorization: `Bearer ${AIRTABLE_TOKEN}` }
	});
	if (!r.ok) {
		const body = await r.text();
		throw new Error(`airtable list: ${r.status} ${body}`);
	}
	const data = (await r.json()) as AirtableListResponse;
	for (const rec of data.records) {
		const email = fieldString(rec, 'Email');
		const name = fieldString(rec, 'Full name');
		if (email) recipients.push({ email, name });
	}
	offset = data.offset;
} while (offset);

console.log(`Found ${recipients.length} participant(s) at Stage='Signup'.`);

// apply --only and --limit filters
let targets = recipients;
if (ONLY) {
	targets = recipients.filter((r) => r.email.toLowerCase() === ONLY.toLowerCase());
	if (targets.length === 0) {
		console.error(`--only ${ONLY}: no matching participant found.`);
		process.exit(1);
	}
}
if (LIMIT !== undefined) {
	targets = targets.slice(0, LIMIT);
}

console.log(`Will ${SEND ? 'send to' : 'list'} ${targets.length} recipient(s):\n`);
for (const t of targets) {
	console.log(`  ${t.email}${t.name ? `  (${t.name})` : ''}`);
}
console.log();

if (!SEND) {
	console.log('Dry run complete. Re-run with --send to deliver for real.');
	process.exit(0);
}

// --- actually send via Resend, one at a time ---
const resend = new Resend(RESEND_API_KEY);
const FROM = 'hex4 <unfold@serial.quest>';
const TEMPLATE_ID = 'unfold-starting-blast';

let ok = 0;
let failed: { email: string; error: string }[] = [];

for (let i = 0; i < targets.length; i++) {
	const t = targets[i];
	const { error } = await resend.emails.send({
		from: FROM,
		to: t.email,
		template: { id: TEMPLATE_ID }
	});
	if (error) {
		failed.push({ email: t.email, error: `${error.name}: ${error.message}` });
		console.log(`  [${i + 1}/${targets.length}] FAIL ${t.email} — ${error.name}: ${error.message}`);
	} else {
		ok++;
		console.log(`  [${i + 1}/${targets.length}] ok   ${t.email}`);
	}
}

console.log(`\nDone. Sent: ${ok}, Failed: ${failed.length}.`);
if (failed.length) {
	console.log('\nFailures:');
	for (const f of failed) console.log(`  ${f.email} — ${f.error}`);
	process.exit(1);
}
