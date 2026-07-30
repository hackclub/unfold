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
	<title>unfold ꕥ week three</title>
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
				src="/os-bg-week3.mp4"
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
					class="italic text-xs md:text-sm tracking-[0.3em] text-(--color-sea)/85"
				>
					iterate on feedback
				</p>
				<h1
					class="text-4xl md:text-6xl lg:text-7xl tracking-[0.15em] leading-[1.05]"
				>
					show & tell
				</h1>
				<p
					class="italic text-xs md:text-sm tracking-[0.3em] text-white/65"
				>
					week three
				</p>
			</div>
		</div>
	</div>

	<!-- byline -->
	<div
		class="w-full md:w-1/2 max-w-4xl mt-4 flex justify-between text-sm tracking-[0.2em] text-white/70"
	>
		<span>by <a href="https://hackclub.enterprise.slack.com/team/U071JHBEJ7R" class="underline decoration-1 underline-offset-4 hover:text-white hover:tracking-[0.3em] transition-[colors,letter-spacing] duration-500">neven</a></span>
		<span>wednesday july 29, 2026</span>
	</div>

	<!-- body -->
	<div class="w-full md:w-1/2 max-w-4xl mt-10 pb-32 text-white/80 text-lg leading-relaxed tracking-[0.02em]">
		<!-- music player -->
		<div class="text-sm tracking-[0.2em] text-white/50 mb-16">
			<p>(heyo! play this track as you read. it's one of my favourites from the album!)</p>
			<div class="mt-4 rounded-lg overflow-hidden border border-white/10 w-fit opacity-70 hover:opacity-100 transition-opacity duration-500">
				<iframe
					width="360"
					height="202"
					src="https://www.youtube.com/embed/-C-2AqRD8io?controls=0&modestbranding=1&rel=0&iv_load_policy=3"
					title="music"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					allowfullscreen
				></iframe>
			</div>
		</div>
		<p class="mb-6">hi.</p>

		<p class="mb-6">you made it.</p>

		<p class="mb-6">before i start: we have about 20 people that shipped in week 2. of the 150 that signed up, of the 50 who had an idea, out of all the ppl that said "yeah i wanna do this".</p>

		<p class="mb-6 italic text-(--color-sea)">you're one of 20 that actually made it happen.</p>

		<p class="mb-6">you should be proud :)</p>

		<p class="mb-6">so. i have another story for you...</p>

		<p class="mb-6">in 2009, stewart butterfield wanted to make a video game.</p>

		<p class="mb-6">it was called "glitch". they spent four years building a beautiful, surreal original MMORPG where you build worlds inside the imaginations of giants. weird, crazy, ambitious, and totally his. raised $15 million in vc funds. grew to a team of 40 employees. people were excited</p>

		<p class="mb-6">until 2012, when they shut down. not enough players, no traction. four years of work, gone.</p>

		<p class="mb-6">the glitch team was mostly remote, so during development they had built an internal tool to help communicate. it worked a lot like the chat rooms inside the very game they were building - players could create "groups" to chat with others, join one of two default groups, or message players one-on-one. nothing much. just an internal thing that helped ease the pain of email a little.</p>

		<p class="mb-6">when the game died, stewart looked around at what was left.</p>

		<p class="mb-6">not much. the code and art wasn't very useful. (it would later be released <a href="https://archive.org/details/glitch-public-domain-game-art" class="underline decoration-1 underline-offset-4 hover:text-white hover:tracking-[0.2em] transition-[colors,letter-spacing] duration-500">into the public domain</a>.) maybe the chat tool would be?</p>

		<p class="mb-6">almost as an afterthought, a random thing because he was bored on a friday night, he shows the tool to some of his founder friends.</p>

		<p class="mb-6">they completely forget about glitch the game, and go crazy on the chat tool.</p>

		<p class="mb-6 italic">he renamed it slack.</p>

		<p class="mb-6">yes. the messaging platform that you probably spend an excessive amount of time on was created because a game dev showed it to some of his friends.</p>

		<h2 class="text-3xl md:text-5xl tracking-[0.15em] text-(--color-sea) mt-16 mb-6 text-pretty">
			ask for feedback
		</h2>

		<p class="mb-6">you have a prototype. it makes complete sense to you. you've probably been staring at it for a while. you understand every button, every link, every trace. but anyone that you're ever going to show this to doesn't.</p>

		<p class="mb-6">that gap - between what you meant and what they see - is the most important thing you'll learn this week. and the only way to learn it... is to ask someone.</p>

		<p class="mb-6">good news: you have people to ask already. and, because they're working on similar things to you, they'll have better insights than someone random.</p>

		<p class="mb-6">so! go ask in your circle's private channel! even if they didn't ship in week 2 - they picked an idea similar to yours, so they'd still have useful thoughts. if no one responds, PING SOMEONE. email someone! call them! visit them at their home address!</p>

		<p class="mb-6">of course, you're not limited to asking your circle. you could ask a friend! a teacher, a parent. anyone who'd get what you're building would be a good fit.</p>

		<p class="mb-6">asking something like "do you like it" isn't useful to you. ask things like "what's confusing" or "what do you expect to happen when you do X". tip: "what do you wish this could do" is a gold mine for finding features to implement.</p>

		<h3 class="text-xl md:text-2xl tracking-[0.1em] text-white mt-8 mb-4 italic text-pretty">
			how to give feedback
		</h3>

		<p class="mb-6">when it's your turn to look at someone else's work, here's what actually helps:</p>

		<ul class="list-disc pl-5 mb-6 text-white/90 marker:text-(--color-sea)">
			<li>point to the specific moment you got lost, not just "i don't get it"</li>
			<li>ask questions more than you make statements. "what does this button do?" is better than "this is unclear"</li>
			<li>don't hold back but don't be a jerk. 1 piece of honest feedback beats 5 pieces of polite feedback</li>
		</ul>

		<h3 class="text-xl md:text-2xl tracking-[0.1em] text-white mt-8 mb-4 italic text-pretty">
			how to use feedback
		</h3>

		<p class="mb-6">a lot of people will try to find some reason that the feedback they get is invalid, then immediately dismiss it. look, i'm guilty of that too. but i don't want you to act on everything you get. i want you to <em>listen</em> to everything you get.</p>

		<p class="mb-6">sit with feedback for a bit before you respond. don't defend yourself, don't explain. just ask, even if the proposed solution is wrong, even if you feel like they don't understand, if there's some nugget of truth in there. there most probably is.</p>

		<p class="mb-6">then fix it. you don't have to fix all of it, or succumb completely to other people's suggestions. but build on top of it. maybe add a new feature someone suggested. tooltips to make things clearer. oftentimes, feedback will inspire completely new ideas :D</p>

		<h2 class="text-3xl md:text-5xl tracking-[0.15em] text-(--color-sea) mt-16 mb-6 text-pretty">
			bonus: going public
		</h2>

		<p class="mb-6">this week, i want to encourage you to share your prototype publicly on the internet. this isn't mandatory yet, but i'd encourage you to do it so that you can get more honest feedback from more people, and to prepare for a launch in week 6. plus, if you send us proof that you posted, we'll enter you into a raffle!</p>

		<p class="mb-6">internet feedback varies wildly. a lot of it is going to be blunt, honest thoughts. they might hurt, but it's good to sit with them anyway and see what you can learn. don't conflate "is this mean" with "is this true". spend more time with feedback from people that have the problem you're solving. spend less time with people who are just impressed. and don't look at people who are trying to make you feel bad!! at all!!!!</p>

		<h2 class="text-3xl md:text-5xl tracking-[0.15em] text-(--color-sea) mt-16 mb-6 text-pretty">
			what to ship this week
		</h2>

		<p class="mb-6">same as last week, you need 4 hours logged this week. please make sure you're committing regularly.</p>

		<p class="mb-6">by sunday, post this in <a href="https://hackclub.enterprise.slack.com/archives/C0B0A5X5B27" class="underline decoration-1 underline-offset-4 hover:text-white hover:tracking-[0.2em] transition-[colors,letter-spacing] duration-500">#unfold-ships</a>:</p>
		<ul class="list-disc pl-5 mb-6 text-white/90 marker:text-(--color-sea)">
			<li>a link to your updated demo</li>
			<li>one piece of feedback you got & how you used it</li>
			<li>anything else that changed this week</li>
			<li>a screenshot or video of your updated project</li>
		</ul>

		<p class="mb-6">and - if you post a link to you sharing your demo ANYWHERE on the internet - hacker news, your insta/twitter/facebook/whatever, reddit, a minecraft server - in <a href="https://hackclub.enterprise.slack.com/archives/C0B013JNXPZ" class="underline decoration-1 underline-offset-4 hover:text-white hover:tracking-[0.2em] transition-[colors,letter-spacing] duration-500">#unfold</a>, we'll enter you into a raffle for prizes! currently, prizes are 1x smolhaj and 1x disposable camera (so you have two chances to win) but i am open to suggestions :p</p>

		<p class="mb-6">finally, fill out the <a href="https://forms.hackclub.com/unfold-week-3" class="underline decoration-1 underline-offset-4 hover:text-white hover:tracking-[0.2em] transition-[colors,letter-spacing] duration-500">week 3 ship form</a> once it's done. sorry that it took so long last week! it'll be much faster to come out this week.</p>

		<p class="mb-6">~~~</p>

		<p class="mb-4 italic text-sea/80">'cause getting made you want more</p>
		<p class="mb-4 italic text-sea/80">and hoping made you hurt more</p>
		<p class="mb-4 italic text-sea/80">someone tell me</p>
		<p class="mb-4 italic text-sea/80">something comforting</p>
	</div>
</main>
