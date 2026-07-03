<script lang="ts">
	import { onMount } from "svelte";

	let audio: HTMLAudioElement;
	let muted = $state(true);

	onMount(() => {
		if (!audio) return;
		audio.muted = true;
		audio.volume = 0.3;
		audio.play();
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

<div class="fixed inset-0 -z-20 bg-black/90 pointer-events-none"></div>

<div
	class="fixed inset-0 -z-10 pointer-events-none mix-blend-overlay bg-repeat bg-[length:250px_250px] animate-[grain_0.5s_steps(10)_infinite]"
	style="background-image: url(&quot;data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.45' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E&quot;);"
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
		<h1 class="text-7xl md:text-9xl lg:text-[10rem] tracking-[0.3em]">
			unfold
		</h1>
		<p class="text-2xl md:text-4xl lg:text-5xl mt-5 max-w-4xl leading-snug">
			go from one-liner to something real in 6 weeks.
		</p>
		<p class="text-lg md:text-xl text-white/60 mt-6 max-w-2xl">
			week 1 starts july 6. fully online. a <a
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
			<a
				href="https://hackclub.enterprise.slack.com/archives/C0B013JNXPZ"
				class="text-lg md:text-xl text-white/60 underline decoration-1 underline-offset-4 hover:text-white transition-colors w-fit"
			>
				join #unfold on the hack club slack
			</a>
		</div>
	</section>

	<section class="py-24 md:py-32">
		<p class="text-lg md:text-xl text-white mb-12 max-w-2xl">
		every week has a single focus. show up, ship something, and move your idea
		forward.
		</p>
		<div
			class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
		>
			<article class="border border-white/10 p-6 md:p-8">
				<p
					class="text-white/50 text-sm tracking-[0.2em] uppercase mb-3"
				>
					<em class="italic">one</em>
				</p>
				<h3 class="text-xl md:text-2xl mb-2">the spark</h3>
				<p class="text-white/80">
					define your idea, share it, plant the flag.
				</p>
			</article>
			<article class="border border-white/10 p-6 md:p-8">
				<p
					class="text-white/50 text-sm tracking-[0.2em] uppercase mb-3"
				>
					<em class="italic">two</em>
				</p>
				<h3 class="text-xl md:text-2xl mb-2">the rush</h3>
				<p class="text-white/80">
					build the tiny version. ship your prototype.
				</p>
			</article>
			<article class="border border-white/10 p-6 md:p-8">
				<p
					class="text-white/50 text-sm tracking-[0.2em] uppercase mb-3"
				>
					<em class="italic">three</em>
				</p>
				<h3 class="text-xl md:text-2xl mb-2">the feedback loop</h3>
				<p class="text-white/80">
					show people. get real reactions. iterate.
				</p>
			</article>
			<article class="border border-white/10 p-6 md:p-8">
				<p
					class="text-white/50 text-sm tracking-[0.2em] uppercase mb-3"
				>
					<em class="italic">four</em>
				</p>
				<h3 class="text-xl md:text-2xl mb-2">it works</h3>
				<p class="text-white/80">
					lock in. build until the core actually functions.
				</p>
			</article>
			<article class="border border-white/10 p-6 md:p-8">
				<p
					class="text-white/50 text-sm tracking-[0.2em] uppercase mb-3"
				>
					<em class="italic">five</em>
				</p>
				<h3 class="text-xl md:text-2xl mb-2">put yourself out there</h3>
				<p class="text-white/80">
					find real users. share outside hack club.
				</p>
			</article>
			<article class="border border-white/10 p-6 md:p-8">
				<p
					class="text-white/50 text-sm tracking-[0.2em] uppercase mb-3"
				>
					<em class="italic">six</em>
				</p>
				<h3 class="text-xl md:text-2xl mb-2">unfold</h3>
				<p class="text-white/80">
					final ship. polish. launch. tell your story.
				</p>
			</article>
		</div>
	</section>

	<section class="py-24 md:py-32">
		<p class="text-2xl md:text-3xl text-white mb-12 max-w-3xl">
		along the way, we'll support you with:
		</p>
		<div class="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
			<article class="border border-white/10 p-6 md:p-8">
				<h3 class="text-xl md:text-2xl mb-4">for your project</h3>
				<ul class="space-y-2 text-white/80">
					<li>$10 domain credit in week 2</li>
					<li>$15–20 hosting/infra credits in week 4</li>
					<li>discretionary “i need this to ship” grants</li>
					<li>keep-it-alive credits so it doesn't die after</li>
				</ul>
			</article>
			<article class="border border-white/10 p-6 md:p-8">
				<h3 class="text-xl md:text-2xl mb-4">the community</h3>
				<ul class="space-y-2 text-white/80">
					<li>circles of 8–10 builders, assigned after week 1</li>
					<li>weekly lock-in huddles with ambient music</li>
					<li>workshops and AMAs with people who've shipped</li>
					<li>optional friday show & tell</li>
				</ul>
			</article>
			<article class="border border-white/10 p-6 md:p-8">
				<h3 class="text-xl md:text-2xl mb-4">cool merch</h3>
				<ul class="space-y-2 text-white/80">
					<li>
						welcome envelope in week 2 — sticker sheet, postcard,
						bookmark
					</li>
					<li>
						the completer package — exclusive hoodie and postcards
					</li>
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
				other builders, you'll take it from a sentence to something
				people actually use.
			</p>
			<p>
				this is a program for people who want to make something real.
				we'll give you a weekly shipping cadence, a community that
				actually knows what you're building, and grants that go straight
				to your project.
			</p>
			<p>
				we're not here to teach you syntax or track your hours. we'll
				give you the structure, the people, and the deadline to ship
				something you care about.
			</p>
		</div>
	</section>

	<section class="py-24 md:py-32 text-center">
		<p class="text-2xl md:text-4xl mb-10">week 1 starts july 6.</p>
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
