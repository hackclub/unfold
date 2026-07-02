<script lang="ts">
	import { onMount } from 'svelte';

	// intro state — true = show "click to begin" overlay
	let started = $state(false);
	// skip-stagger flag — clicking anywhere fast-forwards the fade-in
	let revealed = $state(false);
	// mute toggle
	let muted = $state(false);

	const CONTENT_DELAY = 2000;
	const STAGGER = 700;

	let video: HTMLVideoElement;
	let audio: HTMLAudioElement;
	let mainEl: HTMLElement;
	let muteBtn: HTMLButtonElement;

	// sequence: which child of <main> is currently shown
	let step = $state(-1); // -1 = nothing yet
	let totalSteps = 0;

	// mount: reset scroll, preload video, count main children
	onMount(() => {
		history.scrollRestoration = 'manual';
		window.scrollTo(0, 0);
		video.load();
		totalSteps = mainEl.children.length;
	});

	// stagger scheduler: when started, reveals main children one by one.
	// if `revealed` flips true mid-sequence, snap everything to visible.
	$effect(() => {
		if (!started) return;

		const timeouts: ReturnType<typeof setTimeout>[] = [];
		for (let i = 0; i < totalSteps; i++) {
			const idx = i;
			timeouts.push(
				setTimeout(() => {
					if (revealed) return; // already force-revealed
					step = idx;
				}, CONTENT_DELAY + idx * STAGGER)
			);
		}

		return () => {
			for (const id of timeouts) clearTimeout(id);
		};
	});

	// skip animation: any click past the intro jumps to fully revealed
	function onWindowClick() {
		if (started && !revealed) revealed = true;
	}

	function start() {
		if (started) return;
		started = true;
		// start music softly + kick the video
		audio.volume = 0.3;
		audio.play();
		video.play();
		// register skip-listener next tick so the intro click doesn't double-fire
		setTimeout(() => window.addEventListener('click', onWindowClick), 0);
	}

	function toggleMute() {
		muted = !muted;
		audio.muted = muted;
	}

	// helper: is the i-th child currently visible?
	function isShown(i: number) {
		return revealed || step >= i;
	}
</script>

{#if !started}
	<div
		class="fixed inset-0 z-40 flex items-center justify-center bg-black cursor-pointer select-none transition-opacity duration-700"
		onclick={start}
		onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && start()}
		role="button"
		tabindex="0"
	>
		<span
			class="text-white font-serif text-2xl tracking-[0.3em] transition-all hover:tracking-[0.4em] duration-700"
		>
			click to begin
		</span>
	</div>
{/if}

<video
	bind:this={video}
	class="fixed inset-0 w-full h-full object-cover object-center -z-30 pointer-events-none blur-[3px] transition-opacity duration-[3000ms]"
	class:opacity-0={!started}
	class:opacity-100={started}
	src="/unfold-bg.mp4"
	preload="auto"
	loop
	muted
	playsinline
></video>

<div class="fixed inset-0 -z-20 bg-black/90 pointer-events-none"></div>

<div
	class="fixed inset-0 -z-10 pointer-events-none mix-blend-overlay bg-repeat bg-[length:250px_250px] animate-[grain_0.5s_steps(10)_infinite]"
	style="background-image: url(&quot;data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.45' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E&quot;);"
></div>

<audio bind:this={audio} src="/Lifelike.mp3" preload="auto" loop></audio>

<button
	bind:this={muteBtn}
	onclick={toggleMute}
	class="fixed bottom-6 right-6 z-50 text-white/30 hover:text-white/60 font-serif text-sm tracking-[0.2em] transition-colors duration-300 cursor-pointer"
	class:opacity-0={!started}
	class:pointer-events-none={!started}
>
	{muted ? 'unmute' : 'mute'}
</button>

<main bind:this={mainEl} class="relative px-8 md:px-24 lg:px-40 pt-32 md:pt-40 max-w-300">
	<h1
		class="text-white font-serif text-4xl md:text-6xl lg:text-7xl tracking-[0.25em] mb-7 transition-opacity duration-[1000ms]"
		class:opacity-0={!isShown(0)}
		class:opacity-100={isShown(0)}
	>
		dear hack clubber,
	</h1>
	<p
		class="text-white font-serif text-2xl md:text-3xl mb-5 transition-opacity duration-[1000ms]"
		class:opacity-0={!isShown(1)}
		class:opacity-100={isShown(1)}
	>
		there are two possible summers ahead of you.
	</p>
	<p
		class="text-white font-serif text-2xl md:text-3xl mb-5 transition-opacity duration-[1000ms]"
		class:opacity-0={!isShown(2)}
		class:opacity-100={isShown(2)}
	>
		in one, you do the same thing you did last summer. you make some projects. track a few hours
		on Hackatime. submit to some programs. get, what, more AI credits and $20 in filament? you
		might get a few stars on github. a few upvotes on reddit. ship some projects that you think
		are neat... but then you'll never touch again. i know that's what happens to me.
	</p>
	<p
		class="text-white font-serif text-2xl md:text-3xl mb-5 transition-opacity duration-[1000ms]"
		class:opacity-0={!isShown(3)}
		class:opacity-100={isShown(3)}
	>
		september comes. back to school. i'll be sitting in my room with some new stickers and a
		flipper zero, plus a vague sense that i was kinda busy during the summer but that none of
		it really mattered.
	</p>
	<p
		class="text-white font-serif text-2xl md:text-3xl mb-5 transition-opacity duration-[1000ms]"
		class:opacity-0={!isShown(4)}
		class:opacity-100={isShown(4)}
	>
		in the other version, you build the idea. yes, that one. the one that's been sitting in
		your notes app, your Notion, a folder of markdown files called "app ideas" that you
		haven't touched in months. the one that you're obsessed with, but that you've never quite
		managed to start. you tell yourself that you're not good enough, that it's a waste of time
		to try, that you really should be preparing for APs or something instead.
	</p>
	<p
		class="text-white font-serif text-2xl md:text-3xl mb-5 transition-opacity duration-[1000ms]"
		class:opacity-0={!isShown(5)}
		class:opacity-100={isShown(5)}
	>
		trust me.
	</p>
	<p
		class="text-white font-serif text-2xl md:text-3xl mb-5 transition-opacity duration-[1000ms]"
		class:opacity-0={!isShown(6)}
		class:opacity-100={isShown(6)}
	>
		you can do this.
	</p>
	<p
		class="text-white font-serif text-2xl md:text-3xl mb-5 transition-opacity duration-[1000ms]"
		class:opacity-0={!isShown(7)}
		class:opacity-100={isShown(7)}
	>
		over six weeks, alongside 100+ other hackers, you'll take your idea from a one-liner to a
		shipped project with real users.
	</p>
	<p
		class="text-white font-serif text-2xl md:text-3xl mb-5 transition-opacity duration-[1000ms]"
		class:opacity-0={!isShown(8)}
		class:opacity-100={isShown(8)}
	>
		in week 1, you'll design your idea. write it down, as one or two sentences. share it with
		the world. that's it for now - your first ship is your idea.
	</p>
	<p
		class="text-white font-serif text-2xl md:text-3xl mb-5 transition-opacity duration-[1000ms]"
		class:opacity-0={!isShown(9)}
		class:opacity-100={isShown(9)}
	>
		week 2, you'll build a prototype. a tiny, quick, maybe janky, toy version of your idea,
		something that you can show to someone and get them excited about what you're building.
	</p>
	<p
		class="text-white font-serif text-2xl md:text-3xl mb-5 transition-opacity duration-[1000ms]"
		class:opacity-0={!isShown(10)}
		class:opacity-100={isShown(10)}
	>
		by week 4, you'll be heads down, building and iterating on feedback from your fellow hackers.
	</p>
	<p
		class="text-white font-serif text-2xl md:text-3xl mb-5 transition-opacity duration-[1000ms]"
		class:opacity-0={!isShown(11)}
		class:opacity-100={isShown(11)}
	>
		and by week 6, you'll have a polished, beautiful final product with users behind it, and
		you'll have sent it out into the world, for everyone to see.
	</p>
	<p
		class="text-white font-serif text-2xl md:text-3xl mb-5 transition-opacity duration-[1000ms]"
		class:opacity-0={!isShown(12)}
		class:opacity-100={isShown(12)}
	>
		every week, you'll have workshops and AMAs with founders, artists, and builders who were
		once at the same place you are now - staring at an idea that feels impossible, and
		building it anyway. hang out with other HCers doing the same exhilarating, terrifying
		thing as you, make lifelong friends, and grow as a person and as a hacker.
	</p>
	<p
		class="text-white font-serif text-2xl md:text-3xl mb-5 transition-opacity duration-[1000ms]"
		class:opacity-0={!isShown(13)}
		class:opacity-100={isShown(13)}
	>
		every week, once you ship, we'll give you something that helps you keep hacking. things
		like sticker sheets, domain grants, hosting credits, and discretionary funding that you
		can use for your project however you see fit. plus, if you see your project through to
		the end, we'll send you the completion package! it's a box stuffed with an exclusive
		unfold hoodie, stickers, postcards, and other swag designed by teen artists.
	</p>
	<p
		class="text-white font-serif text-2xl md:text-3xl mb-5 transition-opacity duration-[1000ms]"
		class:opacity-0={!isShown(14)}
		class:opacity-100={isShown(14)}
	>
		this isn't a bootcamp. we're not gonna teach you how to call an API or open FL Studio.
		we're also not gonna strictly track your hours or tell you what to build. instead, we'll
		give you the structure, the community, the resources, and the deadline for you to ship
		something real.
	</p>
	<p
		class="text-white font-serif text-2xl md:text-3xl mb-12 transition-opacity duration-[1000ms]"
		class:opacity-0={!isShown(15)}
		class:opacity-100={isShown(15)}
	>
		both of these summers will end. only one will matter.
	</p>
	<p
		class="text-white font-serif text-2xl md:text-3xl mb-12 transition-opacity duration-[1000ms]"
		class:opacity-0={!isShown(16)}
		class:opacity-100={isShown(16)}
	>
		ꕥ unfold is the program to make your idea real. week 1 starts on july 6th, and week 6
		ends august 23rd. i hope to see you there :)
	</p>
	<a
		class="text-white font-serif text-2xl md:text-3xl underline decoration-1 underline-offset-4 hover:tracking-wider mb-32 block transition-[opacity,letter-spacing] duration-[1000ms]"
		style="transition: opacity 1000ms, letter-spacing 500ms;"
		class:opacity-0={!isShown(17)}
		class:opacity-100={isShown(17)}
		href="/apply"
	>
		RSVP now →
	</a>
	<p
		class="text-gray-400 font-serif text-2xl md:text-3xl my-5 pb-50 transition-opacity duration-[1000ms]"
		class:opacity-0={!isShown(18)}
		class:opacity-100={isShown(18)}
	>
		and, if all this resonates with you, we're looking for team members to help build unfold
		alongside us. artists, hackers, writers, makers, and anyone else that'd like to help out -
		drop a message in <a
			href="https://hackclub.enterprise.slack.com/archives/C0B0L5E3CN8"
			class="underline decoration-1 underline-offset-4 hover:tracking-widest duration-500"
			>#unfold-bts</a
		>. we'd love to see what you're interested in building.
	</p>
</main>
