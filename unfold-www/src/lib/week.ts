// week math for unfold os. single source of truth for "what week is it
// and when's the next sunday" — shared by the diamond bar, the countdown,
// and anything else that cares about the program clock.
//
// the whole program runs in the user's local timezone. week 1 starts on
// the user's local monday, july 13 2026. each week ends on the user's
// local sunday at 23:59:59.

const PROGRAM_START = new Date(2026, 6, 13); // jul 13 2026, local
const PROGRAM_START_MS = PROGRAM_START.getTime();
const DAY_MS = 86_400_000;
const WEEK_MS = 7 * DAY_MS;

export interface ProgramClock {
	week: 1 | 2 | 3 | 4 | 5 | 6;
	// ms until the current week's ship deadline (sunday 23:59:59 local)
	msToDeadline: number;
	// same thing, as fractional days for the count-up display
	daysToDeadline: number;
	// ms until the program starts (jul 13 2026 local). only meaningful
	// in the prelaunch state; 0 once we're live.
	msToStart: number;
	daysToStart: number;
	// null before the program starts; "prelaunch" or "ended" otherwise
	state: 'prelaunch' | 'live' | 'ended';
}

export function programClock(now: Date = new Date()): ProgramClock {
	const nowMs = now.getTime();

	if (nowMs < PROGRAM_START_MS) {
		return {
			week: 1,
			msToDeadline: PROGRAM_START_MS + WEEK_MS - nowMs,
			daysToDeadline: (PROGRAM_START_MS + WEEK_MS - nowMs) / DAY_MS,
			msToStart: PROGRAM_START_MS - nowMs,
			daysToStart: (PROGRAM_START_MS - nowMs) / DAY_MS,
			state: 'prelaunch',
		};
	}

	const elapsed = nowMs - PROGRAM_START_MS;
	const rawWeek = Math.floor(elapsed / WEEK_MS) + 1;
	const week = Math.min(6, rawWeek) as 1 | 2 | 3 | 4 | 5 | 6;
	const ended = rawWeek > 6;

	// end of current week = start of week n + 1 week, or end of program
	// if we're past week 6. we want msToDeadline even after the program
	// ends (it'll go negative) so the UI can show "ended" cleanly.
	const weekStart = PROGRAM_START_MS + (week - 1) * WEEK_MS;
	const msToDeadline = weekStart + WEEK_MS - nowMs;

	return {
		week,
		msToDeadline,
		daysToDeadline: msToDeadline / DAY_MS,
		msToStart: 0,
		daysToStart: 0,
		state: ended ? 'ended' : 'live',
	};
}

// the six weeks — the diamond bar, the theme colors, and the page copy
// all read off this. keeping the album arc here so it's a single edit.
export interface WeekMeta {
	n: 1 | 2 | 3 | 4 | 5 | 6;
	ordinal: 'one' | 'two' | 'three' | 'four' | 'five' | 'six';
	title: string;
	accent: string; // CSS var from app.css
}

export const WEEKS: readonly WeekMeta[] = [
	{ n: 1, ordinal: 'one', title: 'first light', accent: 'var(--color-dawn)' },
	{ n: 2, ordinal: 'two', title: 'the prototype', accent: 'var(--color-leaf)' },
	{ n: 3, ordinal: 'three', title: 'show n tell', accent: 'var(--color-sea)' },
	{ n: 4, ordinal: 'four', title: 'midnight', accent: 'var(--color-dusk)' },
	{ n: 5, ordinal: 'five', title: 'find your ppl', accent: 'var(--color-bloom)' },
	{ n: 6, ordinal: 'six', title: 'unfold', accent: 'var(--color-ember)' },
] as const;
