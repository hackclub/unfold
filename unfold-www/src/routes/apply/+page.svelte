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

<main class="fixed inset-0 flex flex-col items-center justify-center px-8 text-center">
	<p class="text-white/60 font-serif italic text-base md:text-lg tracking-[0.3em] mb-4">
		it's a feeling i want you to know
	</p>
	<p
		class="text-white font-serif text-base md:text-3xl tracking-[0.2em] mb-10 w-160 max-w-prose"
	>
		once you rsvp, we'll add you to the slack channels and save your email for when we launch.
	</p>
	<a
		href="/api/auth/login"
		class="text-white font-serif text-2xl md:text-3xl underline decoration-1 underline-offset-8 hover:tracking-widest"
		style="transition: letter-spacing 500ms;"
	>
		log in with hack club ꕥ
	</a>

	{#if error}
		<p class="text-red-300/80 font-serif text-sm tracking-[0.15em] mt-8">
			something broke ({error}). try again?
		</p>
	{/if}
</main>
