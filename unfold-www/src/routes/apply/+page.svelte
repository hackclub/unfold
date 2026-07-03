<script lang="ts">
	import { page } from '$app/state';
	const error = $derived(page.url.searchParams.get('error'));
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

<main class="fixed inset-0 flex flex-col items-center justify-center px-8 text-center text-white font-serif">
	<h1 class="text-4xl md:text-6xl tracking-[0.25em] mb-8">sign up</h1>

	<p class="text-lg md:text-2xl text-white/80 max-w-xl mb-12 leading-relaxed">
		log in with your hack club account and we'll add you to the slack channels.
	</p>

	<a
		href="/api/auth/login"
		class="text-2xl md:text-3xl underline decoration-1 underline-offset-8 hover:tracking-widest transition-[letter-spacing] duration-500"
	>
		sign up with hack club →
	</a>

	<a
		href="https://auth.hackclub.com/welcome"
		class="text-white/50 hover:text-white text-sm tracking-[0.2em] mt-8 transition-colors duration-300"
	>
		new to hack club? create an account first →
	</a>

	{#if error}
		<p class="text-red-300/80 text-sm tracking-[0.15em] mt-10">
			something broke ({error}). try again?
		</p>
	{/if}

	<a
		href="/"
		class="text-white/30 hover:text-white/60 text-sm tracking-[0.2em] mt-24 transition-colors duration-300"
	>
		← back home
	</a>
</main>
