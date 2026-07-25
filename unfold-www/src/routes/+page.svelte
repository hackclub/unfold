<script lang="ts">
import { onMount } from "svelte";

let audio: HTMLAudioElement;
let muted = $state(true);

onMount(() => {
	if (audio) {
		audio.muted = true;
		audio.volume = 0.3;
		audio.play().catch(() => {
			// autoplay blocked — silently leave paused; mute toggle is opt-in
		});
	}
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

<a href="https://hackclub.com/"><img style="position: absolute; top: 20px; left: 0; border: 0; width: 256px; z-index: 999;" src="https://assets.hackclub.com/banners/2026.svg" alt="Hack Club"/></a>

<main
	class="relative text-white font-serif px-6 md:px-16 max-w-[57rem] mx-auto min-h-screen flex flex-col justify-center py-24"
>
	<div class="space-y-7 text-xl md:text-2xl text-white/80 leading-relaxed">
		<p class="text-white/70 text-base md:text-lg tracking-[0.35em] italic">dear internet,</p>

		<p>
			unfold takes teens from one-liner to something <em class="italic text-white">real</em>. we give teens grants, peer groups, and six structured weeks to ship any idea. big, small, crazy, weird.
		</p>

		<p>
			hardware. ai apps. games. dev tools. we can't wait to see what they make :D
		</p>

		<p>
			we're in the middle of our summer 2026 season right now. follow along on
			<a href="https://www.youtube.com/@hackclub_unfold" target="_blank" rel="noopener noreferrer" class="text-(--color-ember) hover:text-white hover:tracking-[0.12em] transition-all duration-500 underline decoration-1 underline-offset-4">youtube</a>
			·
			<a href="https://x.com/hackclub_unfold" target="_blank" rel="noopener noreferrer" class="text-(--color-sea) hover:text-white hover:tracking-[0.12em] transition-all duration-500 underline decoration-1 underline-offset-4">twitter</a>
			·
			<a href="https://bsky.app/profile/unfold.garden" target="_blank" rel="noopener noreferrer" class="text-(--color-dawn) hover:text-white hover:tracking-[0.12em] transition-all duration-500 underline decoration-1 underline-offset-4">bluesky</a>
			·
			<a href="https://www.instagram.com/unfold.hackclub/" target="_blank" rel="noopener noreferrer" class="text-(--color-bloom) hover:text-white hover:tracking-[0.12em] transition-all duration-500 underline decoration-1 underline-offset-4">instagram</a>,
			or hang out with us on
			<a href="https://hackclub.enterprise.slack.com/archives/C0B013JNXPZ" target="_blank" rel="noopener noreferrer" class="text-white/60 hover:text-white hover:tracking-[0.12em] transition-all duration-500 underline decoration-1 underline-offset-4">slack</a>.
		</p>

		<p>
			~ neven (unfold org — <a href="https://hackclub.enterprise.slack.com/team/U071JHBEJ7R" target="_blank" rel="noopener noreferrer" class="text-white/60 hover:text-white hover:tracking-[0.12em] transition-all duration-500 underline decoration-1 underline-offset-4">dm on slack</a>)
		</p>
	</div>

	<div class="mt-16 text-center">
		<a
			href="https://hackclub.com/programs"
			target="_blank"
			rel="noopener noreferrer"
			class="text-base text-white/70 hover:text-white hover:tracking-[0.08em] transition-all duration-500"
		>
			explore more hack club programs →
		</a>
	</div>

	<div class="fixed bottom-8 left-0 right-0 text-center z-50">
		<a
			href="/os"
			class="text-sm text-white/40 hover:text-white/60 hover:tracking-[0.08em] transition-all duration-500 underline decoration-1 underline-offset-4"
		>
			already in? continue to unfold os →
		</a>
	</div>
</main>
