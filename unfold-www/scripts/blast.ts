// one-shot reschedule email blast to Airtable participants, using Resend templates.
//
// Two blasts:
//   signup  → Stage='Signup'             → unfold-reschedule-blast-not-shipped
//   shipped → Stage='shipped week 1'     → unfold-reschedule-blast-shipped
//
// SAFETY: dry-run is the default. it lists recipients and sends nothing.
//   bun run scripts/blast.ts                          # dry run, list all
//   bun run scripts/blast.ts --blast signup           # dry run, list signup only
//   bun run scripts/blast.ts --send                   # LIVE send, both blasts
//   bun run scripts/blast.ts --send --blast shipped   # LIVE send, shipped only
//   bun run scripts/blast.ts --send --only you@x.com  # LIVE send to one person
//   bun run scripts/blast.ts --send --limit 2         # LIVE send, 2 per blast
//
// --only auto-detects the recipient's Stage and picks the matching template.
// --limit caps the count PER BLAST (so --blast both --limit 2 = 4 total max).
//
// reads secrets from .dev.vars (AIRTABLE_TOKEN, AIRTABLE_BASE_ID, RESEND_API_KEY).

import { Resend } from 'resend';

// --- blast definitions ---
interface Blast {
	id: 'signup' | 'shipped';
	stage: string;
	template: string;
	label: string;
}

const BLASTS: Blast[] = [
	{ id: 'signup', stage: 'Signup', template: 'unfold-reschedule-blast-not-shipped', label: 'not-shipped (Signup)' },
	{ id: 'shipped', stage: 'shipped week 1', template: 'unfold-reschedule-blast-shipped', label: 'shipped (shipped week 1)' }
];

// --- arg parsing ---
const argv = process.argv.slice(2);
const SEND = argv.includes('--send');

const BLAST_IDX = argv.indexOf('--blast');
const BLAST_ARG = BLAST_IDX !== -1 ? argv[BLAST_IDX + 1] : undefined;

const LIMIT_IDX = argv.indexOf('--limit');
const LIMIT = LIMIT_IDX !== -1 ? Number(argv[LIMIT_IDX + 1]) : undefined;

const ONLY_IDX = argv.indexOf('--only');
const ONLY = ONLY_IDX !== -1 ? argv[ONLY_IDX + 1] : undefined;

// validate --blast
let selectedBlasts: Blast[];
if (BLAST_ARG === undefined || BLAST_ARG === 'both') {
	selectedBlasts = BLASTS;
} else if (BLAST_ARG === 'signup' || BLAST_ARG === 'shipped') {
	selectedBlasts = BLASTS.filter((b) => b.id === BLAST_ARG);
} else {
	console.error(`--blast: expected 'signup', 'shipped', or 'both', got '${BLAST_ARG}'`);
	process.exit(1);
}

if (ONLY && BLAST_ARG !== undefined && BLAST_ARG !== 'both') {
	console.error('--only cannot be combined with --blast (the recipient\'s stage determines the blast)');
	process.exit(1);
}

if (!SEND) {
	console.log('=== DRY RUN (no emails will be sent) ===\n');
} else {
	console.log('=== LIVE SEND ===\n');
}

if (ONLY) console.log(`Mode: single recipient (${ONLY})\n`);
else console.log(`Blast(s): ${selectedBlasts.map((b) => b.id).join(', ')}\n`);

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

// --- airtable helpers ---
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

async function fetchByStage(stage: string): Promise<{ email: string; name: string; id: string }[]> {
	const recipients: { email: string; name: string; id: string }[] = [];
	let offset: string | undefined;
	do {
		const params = new URLSearchParams({
			filterByFormula: `{Stage}='${stage}'`,
			pageSize: '100'
		});
		if (offset) params.set('offset', offset);
		const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Participants?${params}`;
		const r = await fetch(url, { headers: { authorization: `Bearer ${AIRTABLE_TOKEN}` } });
		if (!r.ok) {
			const body = await r.text();
			throw new Error(`airtable list (${stage}): ${r.status} ${body}`);
		}
		const data = (await r.json()) as AirtableListResponse;
		for (const rec of data.records) {
			const email = fieldString(rec, 'Email');
			const name = fieldString(rec, 'Full name');
			if (email) recipients.push({ email, name, id: rec.id });
		}
		offset = data.offset;
	} while (offset);
	return recipients;
}

// --- gather recipients ---
interface Target {
	email: string;
	name: string;
	blast: Blast;
}

let targets: Target[] = [];

if (ONLY) {
	// fetch from ALL stages, find the one matching person
	const all: { email: string; name: string; blast: Blast }[] = [];
	for (const blast of BLASTS) {
		const peeps = await fetchByStage(blast.stage);
		for (const p of peeps) all.push({ email: p.email, name: p.name, blast });
	}
	const matches = all.filter((r) => r.email.toLowerCase() === ONLY.toLowerCase());
	if (matches.length === 0) {
		console.error(`--only ${ONLY}: no matching participant found in any stage.`);
		console.error(`  Stages checked: ${BLASTS.map((b) => `'${b.stage}'`).join(', ')}`);
		process.exit(1);
	}
	if (matches.length > 1) {
		console.error(`--only ${ONLY}: ${matches.length} participants matched (duplicate emails across stages).`);
		matches.forEach((m) => console.error(`  ${m.email} in stage '${m.blast.stage}'`));
		process.exit(1);
	}
	targets = matches;
	console.log(`Found ${ONLY} in stage '${targets[0].blast.stage}' → template '${targets[0].blast.template}'\n`);
} else {
	for (const blast of selectedBlasts) {
		const peeps = await fetchByStage(blast.stage);
		console.log(`Found ${peeps.length} participant(s) at Stage='${blast.stage}'.`);
		for (const p of peeps) targets.push({ email: p.email, name: p.name, blast });
	}
}

// apply --limit per blast
if (LIMIT !== undefined) {
	const capped: Target[] = [];
	for (const blast of (ONLY ? [targets[0].blast] : selectedBlasts)) {
		const subset = targets.filter((t) => t.blast.id === blast.id).slice(0, LIMIT);
		capped.push(...subset);
	}
	targets = capped;
}

// --- print the plan ---
const byBlast: Record<string, Target[]> = {};
for (const t of targets) {
	(byBlast[t.blast.id] ??= []).push(t);
}

console.log(`\nWill ${SEND ? 'send to' : 'list'} ${targets.length} recipient(s):\n`);
for (const blast of BLASTS) {
	const arr = byBlast[blast.id];
	if (!arr || arr.length === 0) continue;
	console.log(`  [${blast.id}] ${blast.label} → template '${blast.template}' (${arr.length})`);
	for (const t of arr) {
		console.log(`    ${t.email}${t.name ? `  (${t.name})` : ''}`);
	}
}
console.log();

if (!SEND) {
	console.log('Dry run complete. Re-run with --send to deliver for real.');
	process.exit(0);
}

// --- confirm before live send ---
console.log('Press Ctrl+C within 5 seconds to abort...\n');
await Bun.sleep(5000);

// --- actually send via Resend, one at a time ---
const resend = new Resend(RESEND_API_KEY);
const FROM = 'hex4 <unfold@serial.quest>';

let ok = 0;
let failed: { email: string; blast: string; error: string }[] = [];

for (let i = 0; i < targets.length; i++) {
	const t = targets[i];
	const { error } = await resend.emails.send({
		from: FROM,
		to: t.email,
		template: { id: t.blast.template }
	});
	if (error) {
		failed.push({ email: t.email, blast: t.blast.id, error: `${error.name}: ${error.message}` });
		console.log(`  [${i + 1}/${targets.length}] FAIL [${t.blast.id}] ${t.email} — ${error.name}: ${error.message}`);
	} else {
		ok++;
		console.log(`  [${i + 1}/${targets.length}] ok   [${t.blast.id}] ${t.email}`);
	}
}

console.log(`\nDone. Sent: ${ok}, Failed: ${failed.length}.`);
if (failed.length) {
	console.log('\nFailures:');
	for (const f of failed) console.log(`  [${f.blast}] ${f.email} — ${f.error}`);
	process.exit(1);
}
