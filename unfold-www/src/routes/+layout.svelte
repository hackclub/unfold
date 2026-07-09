<script lang="ts">
	import '../app.css';
	import Scribble from '$lib/Scribble.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
	<link rel="icon" href="/favicon.ico" sizes="32x32" />

	<meta
		name="description"
		content="go from one-liner to something real in 6 weeks. a hack club program."
	/>

	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="unfold" />
	<meta property="og:url" content="https://unfold.garden" />
	<meta property="og:title" content="unfold ꕥ" />
	<meta
		property="og:description"
		content="go from one-liner to something real in 6 weeks. a hack club program."
	/>
	<meta property="og:image" content="https://unfold.garden/og.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:type" content="image/png" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="unfold ꕥ" />
	<meta
		name="twitter:description"
		content="go from one-liner to something real in 6 weeks. a hack club program."
	/>
	<meta name="twitter:image" content="https://unfold.garden/og.png" />
</svelte:head>

<Scribble />

{@render children()}
