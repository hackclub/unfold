<script lang="ts">
import { toPng } from "html-to-image";

const backgrounds = [
	"1.png",
	"2.png",
	"3.png",
	"4.png",
	"5.png",
	"6.png",
	"7.png",
	"8.png",
	"9.png",
];

let projectName = $state("project name");
let title = $state("put your one liner here");
let subtitle = $state("and elaborate a bit down here");
let bgIndex = $state(0);
let slideRef = $state<HTMLDivElement | null>(null);
let downloading = $state(false);

function next() {
	bgIndex = (bgIndex + 1) % backgrounds.length;
}

function prev() {
	bgIndex = (bgIndex - 1 + backgrounds.length) % backgrounds.length;
}

async function download() {
	if (!slideRef) return;
	downloading = true;
	try {
		await document.fonts.ready;
		const grainEl = slideRef.querySelector(
			"[data-grain]",
		) as HTMLElement | null;
		const oldSize = grainEl?.style?.backgroundSize;
		if (grainEl) grainEl.style.backgroundSize = "512px 512px";
		grainEl?.getBoundingClientRect();
		await new Promise((r) => requestAnimationFrame(r));
		const dataUrl = await toPng(slideRef, {
			cacheBust: true,
			pixelRatio: 2,
		});
		if (grainEl) grainEl.style.backgroundSize = oldSize ?? "";
		const link = document.createElement("a");
		const safeName = projectName.replace(/\s+/g, "-").toLowerCase() || "slide";
		link.download = `unfold-${safeName}.png`;
		link.href = dataUrl;
		link.click();
	} catch (err) {
		console.error("failed to generate image:", err);
	} finally {
		downloading = false;
	}
}
</script>

<svelte:head>
	<title>unfold ꕥ generate</title>
</svelte:head>

<!-- grain. same as every other page so it feels like one place. -->
<div
	class="fixed inset-0 z-[60] pointer-events-none mix-blend-soft-light opacity-30 bg-repeat animate-[film-grain_0.8s_linear_infinite]"
	style="background-image: url('/grain.png'); background-size: 256px 256px; image-rendering: pixelated;"
></div>

<main class="relative min-h-screen flex flex-col items-center px-6 py-12 font-serif text-white bg-black">
	<!-- back link -->
	<nav class="w-full max-w-4xl flex items-center justify-between py-6 text-xs tracking-[0.25em] text-white/70">
		<a href="/" class="hover:text-white/100 transition-colors">← back to home</a>
		<a href="/os" class="hover:text-white/100 transition-colors">back to os →</a>
	</nav>

	<!-- slide preview -->
	<div class="w-full max-w-4xl">
		<div class="flex items-center gap-2 md:gap-4">
			<button
				type="button"
				on:click={prev}
				aria-label="previous background"
				class="text-white/50 hover:text-white/90 transition-colors text-lg md:text-2xl select-none"
			>
				←
			</button>

			<div
				bind:this={slideRef}
				class="relative overflow-hidden bg-black flex-1"
			>
				<!-- background image -->
				{#key bgIndex}
					<img
						src={`/slide-bgs/${backgrounds[bgIndex]}`}
						alt=""
						class="absolute inset-0 w-full h-full object-cover blur-[2px]"
						draggable="false"
					/>
				{/key}

				<!-- dim overlay so text reads cleanly -->
				<div class="absolute inset-0 bg-black/50" aria-hidden="true"></div>

				<!-- text stack -->
				<div class="relative flex flex-col justify-between p-6 md:p-10 lg:p-12">
					<!-- top row -->
					<div class="flex justify-between items-center">
						<span class="text-white/90 text-base md:text-lg lg:text-xl tracking-[0.1em]">
							i'm building...
						</span>
						<div class="bg-white px-3 py-1 md:px-4 md:py-2 lg:px-5 lg:py-2">
							<span class="text-black font-serif text-base md:text-lg lg:text-xl tracking-[0.05em]">
								{projectName}
							</span>
						</div>
					</div>

					<!-- center text -->
					<div class="text-center flex-1 flex flex-col justify-center my-4 md:my-6 lg:my-8">
						<h1
							class="text-white text-3xl md:text-5xl lg:text-6xl font-serif leading-[1.1] tracking-[0.05em]"
							style="text-wrap: balance;"
						>
							{title}
						</h1>
						<p
							class="text-white/80 text-lg md:text-xl lg:text-2xl font-serif mt-2 md:mt-3 tracking-[0.02em]"
							style="text-wrap: balance;"
						>
							{subtitle}
						</p>
					</div>

					<!-- bottom row -->
					<div class="flex justify-between items-end">
						<img src="/logo.svg" alt="unfold" class="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" draggable="false" />
						<span class="text-white/90 text-base md:text-lg lg:text-xl tracking-[0.1em]">
							unfold.garden
						</span>
					</div>
				</div>

				<!-- grain baked into the slide so it downloads with the texture -->
				<div
					data-grain
					class="absolute inset-0 pointer-events-none mix-blend-soft-light opacity-30 bg-repeat"
					style="background-image: url('/grain.png'); background-size: 256px 256px; image-rendering: pixelated;"
				></div>
			</div>

			<button
				type="button"
				on:click={next}
				aria-label="next background"
				class="text-white/50 hover:text-white/90 transition-colors text-lg md:text-2xl select-none"
			>
				→
			</button>
		</div>

		<!-- dot indicator -->
		<div class="flex justify-center gap-2 mt-3">
			{#each backgrounds as _, i}
				<button
					type="button"
					on:click={() => (bgIndex = i)}
					aria-label={`background ${i + 1}`}
					class="w-1.5 h-1.5 rounded-full transition-colors {i === bgIndex ? 'bg-white' : 'bg-white/30'}"
				/>
			{/each}
		</div>
	</div>

	<!-- controls -->
	<div class="w-full max-w-4xl mt-8 md:mt-12 flex flex-col items-center gap-6">
		<div class="flex flex-col gap-4 w-full max-w-lg">
			<input
				type="text"
				bind:value={projectName}
				placeholder="project name"
				class="bg-transparent border-b border-white/20 px-2 py-2 text-white font-serif text-base tracking-wide placeholder-white/30 focus:outline-none focus:border-white/60 transition-colors"
			/>
			<input
				type="text"
				bind:value={title}
				placeholder="put your one liner here"
				class="bg-transparent border-b border-white/20 px-2 py-2 text-white font-serif text-base tracking-wide placeholder-white/30 focus:outline-none focus:border-white/60 transition-colors"
			/>
			<input
				type="text"
				bind:value={subtitle}
				placeholder="and elaborate a bit down here"
				class="bg-transparent border-b border-white/20 px-2 py-2 text-white font-serif text-base tracking-wide placeholder-white/30 focus:outline-none focus:border-white/60 transition-colors"
			/>
		</div>

		<button
			type="button"
			on:click={download}
			disabled={downloading}
			class="mt-2 px-8 py-3 bg-white text-black font-serif text-base tracking-wider hover:bg-white/90 transition-colors disabled:opacity-50"
		>
			{downloading ? 'generating...' : 'download'}
		</button>
	</div>
</main>
