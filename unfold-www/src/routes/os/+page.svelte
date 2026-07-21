<script lang="ts">
import { onMount } from "svelte";
import { programClock, WEEKS } from "$lib/week";

// DEV ONLY: hardcode "now" to a date mid-program so we can preview the
// page in a live state. REMOVE THIS BEFORE SHIPPING — set DEV_NOW to
// the real wall clock.
const DEV_NOW: Date | null = null;

// recompute the clock on every animation frame so the deadline ticks
// down smoothly without spamming $state. a 60fps clock is fine — it's
// just arithmetic. when DEV_NOW is set, we use it for both `now` and
// the clock computation, so the page shows the fake time consistently.
let clock = $state(programClock(DEV_NOW ?? new Date()));
let now = $state(DEV_NOW ?? new Date());
let raf = 0;

onMount(() => {
	const tick = () => {
		now = DEV_NOW ?? new Date();
		clock = programClock(now);
		raf = requestAnimationFrame(tick);
	};
	raf = requestAnimationFrame(tick);
	return () => cancelAnimationFrame(raf);
});

// hh:mm:ss in the user's local tz. monospace-width digits via the
// tracking-widest font + tabular-nums.
const time = $derived(formatTime(now));
const dayLabel = $derived(formatDay(now));
const dateLabel = $derived(formatDate(now));

function formatTime(d: Date): string {
	const h24 = d.getHours();
	const h12 = h24 === 0 ? 12 : h24 > 12 ? h24 - 12 : h24;
	const m = String(d.getMinutes()).padStart(2, "0");
	const s = String(d.getSeconds()).padStart(2, "0");
	const ap = h24 < 12 ? "am" : "pm";
	return `${h12}:${m}:${s} ${ap}`;
}

function formatDay(d: Date): string {
	return d.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase();
}

function formatDate(d: Date): string {
	return d
		.toLocaleDateString("en-US", { month: "long", day: "numeric" })
		.toLowerCase();
}

// current week's meta for the title block
const current = $derived(WEEKS[clock.week - 1]);

// ended = "shipped ✦". precision adapts to magnitude:
//   < 7 days  -> 2dp  (e.g. "5.70 days")
//   >= 7 days -> 4dp  (the "6.2321 days" energy)
const fmtDays = (days: number) => ({
	value: days.toFixed(6),
	unit: "days",
});

const deadline = $derived.by(() => {
	if (clock.state === "prelaunch") {
		const { value, unit } = fmtDays(clock.daysToStart);
		return { label: "unfold starts in", value, unit };
	}
	if (clock.state === "ended") {
		return { label: "", value: "shipped", unit: "✦" };
	}
	const { value, unit } = fmtDays(clock.daysToDeadline);
	return { label: "due in", value, unit };
});
</script>

<svelte:head>
	<title>unfold ꕥ os</title>
</svelte:head>

<!-- background video. sits behind the gradient and grain so those layers
     tint and texture it. muted + autoplay + playsinline so mobile allows
     it; loop + preload auto so the page doesn't pop a black frame. -->
<video
	class="fixed inset-0 w-full h-full object-cover -z-30 pointer-events-none"
	src="/os-bg-v2.mp4"
	autoplay
	muted
	playsinline
	loop
	preload="auto"
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

<!-- vignette so the edges fall away -->
<div
	class="fixed inset-0 -z-20 pointer-events-none"
	style="background: radial-gradient(ellipse 120% 90% at 50% 40%, transparent 40%, rgba(5, 4, 12, 0.55) 100%);"
></div>

<!-- grain. same as the lander so the two pages feel like one place. -->
<!-- real film grain: 128-source baked 8x to 1024x1024, tiled at 384px
<!-- real film grain: 128-source baked 8x to 1024x1024, tiled at 256px
     so each chunk is 2px on screen. image-rendering: pixelated keeps
     chunks sharp when css scales them. -->
<div
	class="fixed inset-0 -z-10 pointer-events-none mix-blend-soft-light opacity-30 bg-repeat animate-[film-grain_0.8s_linear_infinite]"
	style="background-image: url('/grain.png'); background-size: 256px 256px; image-rendering: pixelated;"
></div>

<!-- top bar: black, opaque, slightly bigger serif text. the wavy bottom
     edge is a css mask with a SINGLE source of the wave — one repeating
     SVG path (a smooth, periodic cubic so tiles butt seamlessly) plus a
     plain solid fill for everything above it. the earlier two-radial-
     gradient trick drew the same edge twice (two soft antialiased edges
     stacked in the wave zone); where their alphas didn't perfectly cancel
     you got a hairline that came and went with width/zoom/DPR. one edge =
     no seam to disagree with. -->
<header
	class="fixed top-0 inset-x-0 z-40 bg-black font-serif text-white/70 text-base tracking-[0.2em] overflow-visible"
	style="
  mask:
    url(&quot;data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2040%2024'%3E%3Cpath%20d='M0%2012%20C6%208%2014%208%2020%2012%20C26%2016%2034%2016%2040%2012%20L40%200%20L0%200%20Z'%20fill='%23000'/%3E%3C/svg%3E&quot;) bottom left/40px 24px repeat-x,
    linear-gradient(#000,#000) top/100% calc(100% - 20px) no-repeat;
	"
>
	<div
		class="flex items-center justify-between px-3 md:px-4 h-13 relative z-20"
	>
		<div class="flex items-baseline gap-4 pb-3 tabular-nums">
			<span class="text-white/90">{time}</span>
			<span class="hidden sm:inline text-white/65">{dayLabel}</span>
			<span class="hidden sm:inline text-white/55 normal-case tracking-[0.12em]"
				>{dateLabel}</span
			>
		</div>

		<!-- three stacked white lines filling the space between the time
	     and the week diamonds, vertically centered. -->
		<div
		class="flex-1 ml-4 mr-5 flex flex-col items-stretch pb-3.5 justify-center gap-1.5 pointer-events-none self-stretch"
		aria-hidden="true"
			>
		<span class="block h-px w-full bg-white/20"></span>
		<span class="block h-px w-full bg-white/20"></span>
		</div>

		<nav class="flex items-center gap-3 pb-[15px]" aria-label="week indicator">
			{#each WEEKS as wk (wk.n)}
				{@const isCurrent = wk.n === clock.week && clock.state === 'live'}
				{@const isPast = clock.state === 'live'
					? wk.n < clock.week
					: clock.state === 'ended'}
				<span
					class="block w-2.5 h-2.5 rotate-45 transition-all duration-700"
					class:filled={isCurrent}
					style="
						{isCurrent
							? `background:${wk.accent}; box-shadow: 0 0 10px color-mix(in srgb, ${wk.accent} 70%, transparent);`
							: isPast
								? `border: 1px solid color-mix(in srgb, ${wk.accent} 35%, transparent);`
								: `border: 1px solid rgba(255,255,255,0.18);`}
					"
					title="week {wk.ordinal} — {wk.title}"
				></span>
			{/each}
		</nav>
	</div>
</header>


<main
	class="relative min-h-screen flex items-center justify-center px-6 font-serif text-white"
>
	<!-- luma calendar link: top-left corner -->
	<div class="absolute top-14 left-4 md:top-16 md:left-6 z-30">
		<a
			href="https://luma.com/unfold-cal"
			target="_blank"
			class="text-xs tracking-[0.25em] text-white/50 hover:text-white/80 underline decoration-1 underline-offset-4 transition-colors"
		>
			luma calendar →
		</a>
	</div>

	<!-- doc link: top-right corner -->
	<div class="absolute top-14 right-4 md:top-16 md:right-6 z-30 flex flex-col gap-6">
		<a
			href="/docs/week-{current.n}"
			aria-label="this week's doc"
			class="transition-all hover:scale-110"
		>
			<img src="/icons/week-2-icon.svg" alt="" class="size-32 mx-auto" />
			<span class="bg-black block text-center">week {current.n} info</span>
		</a>
	</div>

	<div class="text-center max-w-8xl flex flex-col items-center">
		<p
			class="italic text-base md:text-lg tracking-[0.35em] text-(--color-dawn)/85 mb-2"
		>
			<span class="inline-flex items-center gap-[1em]">
				<span class="italic mr-0.5">week {current.ordinal}</span>
				<span class="not-italic text-5xl leading-none self-center">ꕥ</span>
				<span class="italic">{current.title}</span>
			</span>
		</p>

		<h1
			class="text-5xl md:text-7xl lg:text-8xl tracking-[0.15em] leading-[1.05]"
		>
			{clock.state === 'prelaunch'
				? 'one day more'
				: "build your prototype"}
		</h1>

		<div class="mt-6 flex flex-col items-center gap-3 w-144">
			<a
				href="https://forms.hackclub.com/unfold-week-2"
				class="group block max-w-xl text-center text-xl md:text-2xl underline decoration-1 underline-offset-[6px] hover:tracking-widest transition-[letter-spacing] duration-500"
				target="_blank"
			>
				submit for week 2 →
			</a>

			{#if clock.state !== 'ended'}
				<p class="text-white/65 text-md tracking-[0.2em] tabular-nums mt-2">
					{deadline.label}
					<span class="text-white ml-2">{deadline.value}</span>
					<span class="text-white/65 ml-1">{deadline.unit}</span>
				</p>
			{:else}
				<p class="text-white/45 text-sm tracking-[0.3em] mt-2">
					<span class="text-white/80">shipped</span>
					<span class="text-white/35 ml-1">✦</span>
				</p>
			{/if}
		</div>
	</div>


</main>
