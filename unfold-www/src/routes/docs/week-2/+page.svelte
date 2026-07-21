<script lang="ts">
	// event times stored in MDT (UTC-6), July 2026
	const partyTime = new Date('2026-07-14T16:00:00-06:00');
	const showTime = new Date('2026-07-17T14:00:00-06:00');

	function fmtEvent(d: Date): string {
		const weekday = d.toLocaleDateString('en-US', { weekday: 'short' }).toLowerCase();
		const time = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase();
		return `${weekday} ${time}`;
	}

	const partyLabel = $derived(fmtEvent(partyTime));
	const showLabel = $derived(fmtEvent(showTime));
</script>

<svelte:head>
	<title>unfold ꕥ week two</title>
</svelte:head>

<!-- grain. same as /os and the lander so all pages feel like one place. -->
<!-- grain. same source as /os and the lander. z-[60] puts it above
     everything including the scribble overlay (which is z-50 in the
     global layout), so the grain is the last thing the eye sees. -->
<div
	class="fixed inset-0 z-[60] pointer-events-none mix-blend-soft-light opacity-30 bg-repeat animate-[film-grain_0.8s_linear_infinite]"
	style="background-image: url('/grain.png'); background-size: 256px 256px; image-rendering: pixelated;"
></div>

<main
	class="relative min-h-screen flex flex-col items-center px-6 font-serif text-white"
>
	<!-- top nav. simple row of back-links so the doc page isn't a dead end. -->
	<nav
		class="w-full md:w-1/2 max-w-4xl flex items-center justify-between py-6 text-xs md:text-sm tracking-[0.25em] text-white/70"
		aria-label="breadcrumbs"
	>
		<a
			href="/"
			class="underline decoration-1 underline-offset-4 hover:text-white hover:tracking-[0.35em] transition-[colors,letter-spacing] duration-500"
		>
			← back to home
		</a>
		<a
			href="/os"
			class="underline decoration-1 underline-offset-4 hover:text-white hover:tracking-[0.35em] transition-[colors,letter-spacing] duration-500"
		>
			back to os →
		</a>
	</nav>

	<!-- card: 50% page width on desktop, narrower on mobile, 16:9 video
	     inside, dimmed, with three layers of text (top / center / bottom) -->
	<div class="w-full md:w-1/2 max-w-4xl mt-6">
		<div class="relative aspect-video overflow-hidden bg-black">
			<video
				class="absolute inset-0 w-full h-full object-cover"
				src="/os-bg-v2.mp4"
				autoplay
				muted
				loop
				playsinline
				preload="auto"
			></video>

			<!-- dim: solid black overlay so the text reads cleanly -->
			<div class="absolute inset-0 bg-black/50" aria-hidden="true"></div>

			<!-- text stack: top subtitle, centered title, bottom subtitle -->
			<div
				class="absolute inset-0 flex flex-col items-center justify-between py-8 md:py-12 px-6 text-center"
			>
				<p
					class="italic text-xs md:text-sm tracking-[0.3em] text-(--color-leaf)/85"
				>
					build your prototype
				</p>
				<h1
					class="text-4xl md:text-6xl lg:text-7xl tracking-[0.15em] leading-[1.05]"
				>
					66 seconds
				</h1>
				<p
					class="italic text-xs md:text-sm tracking-[0.3em] text-white/65"
				>
					week two
				</p>
			</div>
		</div>
	</div>

	<!-- byline -->
	<div
		class="w-full md:w-1/2 max-w-4xl mt-4 flex justify-between text-sm tracking-[0.2em] text-white/70"
	>
		<span>by <a href="https://hackclub.enterprise.slack.com/team/U071JHBEJ7R" class="underline decoration-1 underline-offset-4 hover:text-white hover:tracking-[0.3em] transition-[colors,letter-spacing] duration-500">neven</a></span>
		<span>monday july 20, 2026</span>
	</div>

	<!-- body -->
	<div class="w-full md:w-1/2 max-w-4xl mt-10 pb-32 text-white/80 text-lg leading-relaxed tracking-[0.02em]">
		<!-- music player -->
		<div class="text-sm tracking-[0.2em] text-white/50 mb-16">
			<p>(hi pls play the below music as you read)</p>
			<div class="mt-4 rounded-lg overflow-hidden border border-white/10 w-fit opacity-70 hover:opacity-100 transition-opacity duration-500">
				<iframe
					width="360"
					height="202"
					src="https://www.youtube.com/embed/Rxh5ktHQiok?controls=0&modestbranding=1&rel=0&iv_load_policy=3"
					title="music"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					allowfullscreen
				></iframe>
			</div>
		</div>

		<p class="mb-6">
			welcome to week 2. i'm glad you're here :)
		</p>

		<p class="mb-6">
			in 2014, porter robinson stopped making music.
		</p>

		<p class="mb-6">
			he had just released "worlds", his first album, at 22. it hit #1 on dance/electronic charts, #18 on the billboard 200, critically acclaimed everywhere. news outlets called him a visionary. the album would go on to inspire and launch hundreds of careers in music. everyone was ecstatic for what was next.
		</p>

		<p class="mb-6">
			and the pressure to make something that would survive its shadow was crushing.
		</p>

		<p class="mb-6">
			by 2015, porter had fallen into a creative rut. every day he'd wake up, head to the studio, and leave with nothing to show for it. this struggle went on for years; and it kept getting worse over time. he'd throw hundreds of hours a week into FL Studio but scrap everything he made.
		</p>

		<p class="mb-6">
			then, on a sunny june 14, 2015, he made <a href="https://www.youtube.com/watch?t=63&v=-C-2AqRD8io&feature=youtu.be" class="underline decoration-1 underline-offset-4 hover:text-white hover:tracking-[0.2em] transition-[colors,letter-spacing] duration-500">66 seconds of an instrumental hook</a>. he'd listen to this obsessively over the next years, and it would eventually become a song called something comforting, and an album called nurture.
		</p>

		<p class="mb-6">
			nurture would go on to save lives, spawn a new genre called botanica, and inspire a canadian 13-year-old to make a little summer program for an online community :D
		</p>

		<p class="mb-6">
			it took porter 3 years after that hook to write the first song for nurture. and it took him 5 years to finish something comforting. he didn't pop out a fully-mixed, chart-busting song. he made a minute and six seconds of bleeps and bloops, and that was enough.
		</p>

		<p class="mb-10">
			this week, i want you to make your 66 seconds. not your album. your proof the album will work.
		</p>

		<h2 class="text-3xl md:text-5xl tracking-[0.15em] text-(--color-leaf) mt-16 mb-6 text-pretty">
			tl;dr
		</h2>

		<ul class="list-disc pl-5 mb-16 text-white/90 marker:text-(--color-leaf)">
			<li>a prototype gives you momentum, forces you to ship something instead of spending years perfecting it (cough cough), and gives you something to share.</li>
			<li>make the most stripped-down, functional-ish version of your idea, that you can build in a week. the goal is someone looks at it and can say "oh i can see where this'll go"</li>
			<li>track a minimum of 4 hours this week. use hackatime or lapse! if you can't do either, a high-quality journal will do. you're encouraged to track more hours, though — 4 is just the minimum.</li>
			<li>check our <a href="https://luma.com/unfold-cal" class="underline decoration-1 underline-offset-4 hover:text-white hover:tracking-[0.2em] transition-[colors,letter-spacing] duration-500">luma calendar</a> to rsvp for our first 2 events!</li>
			<li>circles should be live as you read this! you've been added to a private channel with a couple other unfolders that we think you'd vibe with :)</li>
			<li>once you submit the <a href="https://forms.hackclub.com/unfold-week-2" class="underline decoration-1 underline-offset-4 hover:text-white hover:tracking-[0.2em] transition-[colors,letter-spacing] duration-500">week 2 ship form</a> (wip lol) we'll get to work on shipping you your domain grant + stickers !!!</li>
		</ul>

		<h2 class="text-3xl md:text-5xl tracking-[0.15em] text-(--color-leaf) mt-16 mb-6 text-pretty">
			why a prototype
		</h2>

		<p class="mb-6">
			a lot of things never get built since they feel way too big to start. why sink months into something if you have no idea if it'll be any good?
		</p>

		<p class="mb-6">
			a prototype answers that question quickly. you build the smallest possible version, show it to someone, and see what they think. if they like it, you've validated your idea! and if not, you've got a new direction to go in.
		</p>

		<p class="mb-6">
			in a lot of cases, perfectionism is the killer of a project, not a lack of skill. and, working in isolation is never going to get you as far as showing your work to a real person.
		</p>

		<p class="mb-16">
			plus, once you have a prototype, it'll be 10x easier to keep working, since you're not staring down this huge plan that feels impossible :D
		</p>

		<h2 class="text-3xl md:text-5xl tracking-[0.15em] text-(--color-leaf) mt-16 mb-6 text-pretty">
			what a prototype looks like
		</h2>

		<p class="mb-6">
			a prototype is a tiny slice of your idea. it doesn't have to be good, and it by no means has to be polished. strip it down to its core — just enough that someone could look at it and imagine where it's gonna go. scope down, more than you think you need to.
		</p>

		<p class="mb-4">quick examples:</p>

		<ul class="list-disc pl-5 mb-16 text-white/90 marker:text-(--color-leaf)">
			<li>building a social platform: a feed where you can post text. it doesn't even have to save to a backend</li>
			<li>building a mechanics-focused game: the first level. or just the player moving around in empty space. make it feel good!</li>
			<li>building a story-focused game: a draft of the story (you can count writing this if you do it in a code editor!)</li>
			<li>building a hardware thing: the schematic for one bit of your project.</li>
			<li>building an ai thing: hardcode the response for now. fake it!</li>
			<li>building a productivity tool: make the core action work. a todo list? let people check off to-dos!</li>
			<li>building a fun web thing: make the fun part! skip the wrapper around it. just do the part that makes people smile :)</li>
			<li>building dev infra: this one is a little trickier to scope. try making just a CLI or something that works in one case. skip all the abstraction and configuration. one input, one output.</li>
		</ul>

		<p class="mb-6">
			(don't read too far into the categories above :p)
		</p>

		<p class="mb-6">
			please track time working on your prototype with hackatime or lapse! make sure to commit often. you're required to track at least 4 hours this week. yes, i know, go complain in #meta about me being a hypocrite. i'm sowwy :( but i want to give you cool stuff, and cool stuff costs money, and the best way for me to get hack club money is to submit hours :/
		</p>

		<p class="mb-16">
			4 hours is a minimum, and i encourage you to go for more! art and asset hours count, but they can only count for 25% — one quarter — of your total project hours. don't worry about doing the math yourself, track all your art hours and we'll manually deflate for you.
		</p>

		<h2 class="text-3xl md:text-5xl tracking-[0.15em] text-(--color-leaf) mt-16 mb-6 text-pretty">
			circles
		</h2>

		<p class="mb-6">
			these are your people for the next 5 weeks.
		</p>

		<p class="mb-6">
			we've chosen a few unfolders we think you'd vibe with and added you to a private channel with them! this is your circle, and go say hi! tell em your name, where you're from, your favourite color, the coolest thing you've built, whatever. tell them about an unrelated hobby you have!
		</p>

		<p class="mb-6">
			also. if you miss a ship. or go quiet. your circle will notice. just sayin...
		</p>

		<p class="mb-16">
			circles give you 3 things: accountability, belonging, and people that understand what you're building because they're doing something similar. this is such an incredible thing to have while hacking & you'll get what i mean soon enough.
		</p>

		<h2 class="text-3xl md:text-5xl tracking-[0.15em] text-(--color-leaf) mt-16 mb-6 text-pretty">
			events this week
		</h2>

		<h3 class="text-xl md:text-2xl tracking-[0.1em] text-white mt-8 mb-4 italic text-pretty">
			<a href="https://luma.com/qe9nwdhs" class="underline decoration-1 underline-offset-4 hover:text-white hover:tracking-[0.2em] transition-[colors,letter-spacing] duration-500">prototype party</a> — {partyLabel}
		</h3>

		<p class="mb-6">
			lets make our first (or second, or tenth) commit together! hop on a call & let's code together and hack on our prototypes.
		</p>

		<p class="mb-6">
			there will be music, chatting, and fun things to do if you wanna take a break from coding. i'll also be there to answer questions about the program & help you with scoping.
		</p>

		<h3 class="text-xl md:text-2xl tracking-[0.1em] text-white mt-8 mb-4 italic text-pretty">
			<a href="https://luma.com/blrk9fuu" class="underline decoration-1 underline-offset-4 hover:text-white hover:tracking-[0.2em] transition-[colors,letter-spacing] duration-500">prototype show & tell</a> — {showLabel}
		</h3>

		<p class="mb-6">
			demo your prototype in front of your fellow unfolders, live! there may or may not be prizes. <a href="https://hackclub.enterprise.slack.com/team/U071JHBEJ7R" class="underline decoration-1 underline-offset-4 hover:text-white hover:tracking-[0.2em] transition-[colors,letter-spacing] duration-500">DM me</a> if you wanna present!
		</p>

		<p class="mb-16">
			two live events this week!! i hope to see you at one (or both!) of them :)
		</p>

		<h2 class="text-3xl md:text-5xl tracking-[0.15em] text-(--color-leaf) mt-16 mb-6 text-pretty">
			what to ship this week
		</h2>

		<p class="mb-6">
			this week, post in <a href="https://hackclub.enterprise.slack.com/archives/C0B0A5X5B27" class="underline decoration-1 underline-offset-4 hover:text-white hover:tracking-[0.2em] transition-[colors,letter-spacing] duration-500">#unfold-ships</a>:
		</p>

		<ul class="list-disc pl-5 mb-6 text-white/90 marker:text-(--color-leaf)">
			<li>a screenshot or video of what you made</li>
			<li>a link to your prototype (it's gotta be live for software! for hardware a demo video works)</li>
			<li>a few sentences on how it went and what you built!</li>
		</ul>

		<p class="mb-6">
			then, fill out the <a href="https://forms.hackclub.com/unfold-week-2" class="underline decoration-1 underline-offset-4 hover:text-white hover:tracking-[0.2em] transition-[colors,letter-spacing] duration-500">week 2 ship form</a> once it's ready. we'll ping when it is :p
		</p>

		<h2 class="text-3xl md:text-5xl tracking-[0.15em] text-(--color-leaf) mt-16 mb-6 text-pretty">
			what you get
		</h2>

		<p class="mb-6">
			ship this week and we'll get you $10 for a domain. that's enough for most smaller TLDs! go buy your project a home on the internet! if something else would fit you better, like assets or AI credits, <a href="https://hackclub.enterprise.slack.com/team/U071JHBEJ7R" class="underline decoration-1 underline-offset-4 hover:text-white hover:tracking-[0.2em] transition-[colors,letter-spacing] duration-500">DM me</a> and we'll work something out. your custom grant can even be a different value.
		</p>

		<p class="mb-16">
			we'll also ship you an envelope with unfold stickers and maybe some other surprises... keep an eye out for a sneak peek!
		</p>

		<p class="text-xl tracking-[0.05em] text-white mb-12">
			go make your 66 seconds.
		</p>

		<p class="mb-6">
			you got this &lt;3
		</p>

		<p class="mt-16 text-xl tracking-[0.05em] text-white">
			~~~
		</p>

		<p class="mt-8 mb-2 italic">
			there's too much i want to say, so
		</p>
		<p class="mb-2 italic">do re mi fa so la ti do</p>
		<p class="mb-2 italic">all i want is said and done</p>
		<p class="mb-6 italic">do re mi fa so la ti do</p>
	</div>
</main>
