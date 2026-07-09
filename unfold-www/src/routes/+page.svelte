<script lang="ts">
import { onMount } from "svelte";

let audio: HTMLAudioElement;
let muted = $state(true);

// sign-ups close at the end of sunday jul 12 — midnight local = mon jul 13 00:00
const SIGNUP_DEADLINE_MS = new Date(2026, 6, 13, 0, 0, 0, 0).getTime();
const MS_PER_DAY = 1000 * 60 * 60 * 24;

let daysLeft = $state<string | null>(null);

function tickCountdown() {
	const remaining = SIGNUP_DEADLINE_MS - Date.now();
	daysLeft = remaining <= 0 ? "0.00000" : (remaining / MS_PER_DAY).toFixed(5);
}

// the album arc: gold → green → sea → the dark middle → bloom → sunrise
const weeks = [
	{
		n: "one",
		title: "first light",
		body: "decide what you're gonna build & sketch out your idea",
		accent: "var(--color-dawn)",
	},
	{
		n: "two",
		title: "the prototype",
		body: "build the tiniest possible version, then ship it",
		accent: "var(--color-leaf)",
	},
	{
		n: "three",
		title: "show n tell",
		body: "share your prototype, get thoughts, build on them.",
		accent: "var(--color-sea)",
	},
	{
		n: "four",
		title: "midnight",
		body: "lock in to build the bulk of your project.",
		accent: "var(--color-dusk)",
	},
	{
		n: "five",
		title: "find your ppl",
		body: "find real users, iterate on feedback, and polish your work.",
		accent: "var(--color-bloom)",
	},
	{
		n: "six",
		title: "unfold",
		body: "your final ship. share with the world",
		accent: "var(--color-ember)",
	},
];

onMount(() => {
	tickCountdown();
	const countdownId = setInterval(tickCountdown, 100);

	if (audio) {
		audio.muted = true;
		audio.volume = 0.3;
		audio.play().catch(() => {
			// autoplay blocked (common without a prior user gesture) — silently
			// leave it paused; the mute toggle is the explicit opt-in.
		});
	}

	return () => clearInterval(countdownId);
});

function toggleMute() {
	muted = !muted;
	audio.muted = muted;
}
</script>

<video
	class="fixed inset-0 w-full h-full object-cover object-center -z-30 pointer-events-none blur-[3px]"
	src="/unfold-bg.mp4"
	autoplay
	preload="auto"
	loop
	muted
	playsinline
></video>

<!-- twilight tint: purple-navy up top, mossy green mid, warm ember low -->
<div
	class="fixed inset-0 -z-20 pointer-events-none opacity-80"
	style="background: linear-gradient(
		175deg,
		#0d0a1e 0%,
		#131028 30%,
		#101a17 62%,
		#1c1210 100%
	);"
></div>

<!-- vignette so edges fall away and text stays readable -->
<div
	class="fixed inset-0 -z-20 pointer-events-none"
	style="background: radial-gradient(ellipse 120% 90% at 50% 40%, transparent 40%, rgba(5, 4, 12, 0.55) 100%);"
></div>

<div
	class="fixed inset-0 -z-10 pointer-events-none mix-blend-soft-light opacity-30 bg-repeat animate-[film-grain_0.8s_linear_infinite]"
	style="background-image: url('/grain.png'); background-size: 256px 256px; image-rendering: pixelated;"
></div>

<audio bind:this={audio} src="/Lifelike.mp3" preload="auto" loop></audio>

<button
	onclick={toggleMute}
	class="fixed top-6 right-6 z-50 text-white/40 hover:text-white font-serif text-sm tracking-[0.2em] transition-colors duration-300 cursor-pointer"
>
	{muted ? "unmute audio" : "mute audio"}
</button>

<main
	class="relative text-white font-serif px-6 md:px-16 lg:px-32 max-w-7xl mx-auto"
>
	<section class="min-h-screen flex flex-col justify-center py-24">
		<p
			class="italic mb-5 text-sm md:text-base tracking-[0.35em] text-(--color-dawn)/90"
		>
			ꕥ&ensp;and i watched the water unfold
		</p>
		<h1 class="text-7xl md:text-9xl lg:text-[10rem] tracking-[0.3em]">
			unfold
		</h1>
		<p class="text-2xl md:text-4xl lg:text-5xl mt-5 max-w-4xl leading-snug">
			go from one-liner to something
			<em class="italic">real</em> in 6 weeks.
		</p>
		<p class="text-lg md:text-xl text-white/60 mt-6 max-w-2xl">
			week 1 started july 6. fully online. a <a
				href="https://hackclub.com"
				class="underline decoration-1 underline-offset-4 hover:text-white transition-colors"
				target="_blank"
				rel="noopener noreferrer">hack club</a
			> program.
		</p>
		<div class="mt-14 flex flex-col gap-5">
			<a
				href="/apply"
				class="text-2xl md:text-3xl underline decoration-1 underline-offset-4 hover:tracking-widest transition-[letter-spacing] duration-500 w-fit"
			>
				sign up →
			</a>
			<div class="flex flex-col gap-1.5">
				<span
					class="text-lg md:text-xl text-white/80 w-fit"
				>
					you can still join us and choose your idea by sunday, even though week 1 has already started.
				</span>
				{#if daysLeft !== null}
					<p
						class="text-base md:text-lg text-white/60 tabular-nums"
						aria-live="polite"
					>
						sign-ups close in {daysLeft} days
					</p>
				{/if}
			</div>
		</div>
	</section>

	<section class="py-24 md:py-32">
		<p class="text-lg md:text-xl text-white mb-12 max-w-2xl">
			every week, you'll ship some version of your big idea.
		</p>
		<div
			class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
		>
			{#each weeks as week}
				<article
					class="week-card border bg-black/25 backdrop-blur-sm p-6 md:p-8"
					style="--accent: {week.accent};"
				>
					<p
						class="text-sm tracking-[0.25em] mb-3"
						style="color: color-mix(in srgb, var(--accent) 85%, white);"
					>
						wk <em class="italic">{week.n}</em>
					</p>
					<h3 class="text-xl md:text-2xl mb-2">{week.title}</h3>
					<p class="text-white/80">{week.body}</p>
				</article>
			{/each}
		</div>
	</section>

	<section class="py-24 md:py-32">
		<p class="mb-3 text-sm tracking-[0.35em] text-(--color-bloom)/80">
			you ship, we ship
		</p>
		<h2 class="mb-14 text-3xl md:text-5xl">what we'll give you</h2>

		<div class="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-3">
			<article
				class="week-card border bg-black/25 p-6 backdrop-blur-sm md:p-8"
				style="--accent: var(--color-leaf);"
			>
				<h3 class="mb-4 text-xl md:text-2xl">for your project</h3>
				<ul class="space-y-3 leading-relaxed text-white/75">
					<li>
						<span class="text-(--color-leaf)">wk 2</span> — $10 domain
						credit, so it has a home on the interwebz
					</li>
					<li>
						<span class="text-(--color-leaf)">wk 4</span> — $15 hosting
						&amp; infra credits
					</li>
					<li>
						<span class="text-(--color-leaf)">wk 5+</span> — a discretionary
						grant, for whatever it needs
					</li>
				</ul>
			</article>

			<article
				class="week-card border bg-black/25 p-6 backdrop-blur-sm md:p-8"
				style="--accent: var(--color-ember);"
			>
				<h3 class="mb-4 text-xl md:text-2xl">the box ꕥ</h3>
				<p class="mb-3 text-sm text-white/50">
					finish, and we mail you the completion package:
				</p>
				<ul class="space-y-3 leading-relaxed text-white/75">
					<li>the unfold hoodie, exclusive to this summer</li>
					<li>art print by a teen artist</li>
					<li>other stuff if we have budget lol</li>
					<li>a handwritten note &lt;3</li>
				</ul>
				<p class="mt-4 text-sm text-white/50">
					(we'll also ship you an unfold sticker sheet if you ship a
					prototype in week 2!)
				</p>
			</article>

			<article
				class="week-card border bg-black/25 p-6 backdrop-blur-sm md:p-8"
				style="--accent: var(--color-sea);"
			>
				<h3 class="mb-4 text-xl md:text-2xl">the people</h3>
				<ul class="space-y-3 leading-relaxed text-white/75">
					<li>
						a circle of 8–10 builders who actually know what you're
						making
					</li>
					<li>
						daily ish lock-in huddles — coworking calls, ambient
						music, drop in whenever
					</li>
					<li>
						workshops &amp; AMAs with people who've shipped real
						things
					</li>
					<li>frequent show &amp; tells with your fellow hackers</li>
				</ul>
			</article>
		</div>
	</section>

	<section class="py-24 md:py-32 max-w-3xl">
		<!-- the vibe -->
		<div class="space-y-6 text-lg md:text-xl text-white/80 leading-relaxed">
			<p>
				unfold is for the idea that's been sitting in your notes app.
				the one you keep saying you'll start. over six weeks, alongside
				other hack clubbers, you'll take it from a sentence to something
				people actually use.
			</p>
			<p>
				this is a program for people who want to make something real.
				we'll give you a weekly shipping cadence, a community that
				actually knows what you're building, and grants that go straight
				to your project.
			</p>
			<p>
				we're not here to teach you syntax or impose strict hour reqs.
				we'll give you the structure, the people, and the deadline to
				ship something you care about.
			</p>
			<p>
				you'll make lifelong friends, grow technical and non-technical
				skills, and end with a project you'll be proud of forever. i
				hope to see you in week 1 :)
			</p>
			<p>
				~ hex4, unfold org (<a
					href="https://hackclub.enterprise.slack.com/team/U071JHBEJ7R"
					target="_blank"
					rel="noopener noreferrer"
					class="hover:text-white underline decoration-1 cursor-pointer underline-offset-4 transition-all duration-400"
					>dm on slack!</a
				>)
			</p>
		</div>
	</section>

	<section class="py-24 md:py-32 text-center">
		<p class="text-2xl md:text-4xl mb-10">week 1 has started. you can still join!</p>
		<a
			href="/apply"
			class="inline-block text-2xl md:text-3xl underline decoration-1 underline-offset-4 hover:tracking-widest transition-[letter-spacing] duration-500"
		>
			sign up →
		</a>
	</section>

	<footer class="py-32 md:py-64 text-center text-white/40">
		<p class="text-4xl md:text-6xl mb-8">ꕥ</p>
		<a
			href="https://hackclub.enterprise.slack.com/archives/C0B013JNXPZ"
			class="text-sm tracking-[0.2em] underline decoration-1 underline-offset-4 hover:text-white transition-colors"
		>
			#unfold on hack club slack
		</a>
	</footer>
</main>
