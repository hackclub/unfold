<svelte:head>
	<title>unfold ꕥ week one</title>
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
				src="/os-bg.mp4"
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
					class="italic text-xs md:text-sm tracking-[0.3em] text-(--color-dawn)/85"
				>
					welcome to unfold
				</p>
				<h1
					class="text-4xl md:text-6xl lg:text-7xl tracking-[0.15em] leading-[1.05]"
				>
					first light
				</h1>
				<p
					class="italic text-xs md:text-sm tracking-[0.3em] text-white/65"
				>
					week one
				</p>
			</div>
		</div>
	</div>

	<!-- byline -->
	<div
		class="w-full md:w-1/2 max-w-4xl mt-4 flex justify-between text-sm tracking-[0.2em] text-white/70"
	>
		<span>by <a href="https://hackclub.enterprise.slack.com/team/U071JHBEJ7R" class="underline decoration-1 underline-offset-4 hover:text-white hover:tracking-[0.3em] transition-[colors,letter-spacing] duration-500">neven</a></span>
		<span>monday july 6, 2026</span>
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
					src="https://www.youtube.com/embed/TJBh_hj6DzE?controls=0&modestbranding=1&rel=0&iv_load_policy=3"
					title="music"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					allowfullscreen
				></iframe>
			</div>
		</div>

		<h2 class="text-5xl md:text-6xl tracking-[0.2em] text-white mb-8">
			welcome to unfold.
		</h2>

		<p class="mb-6">
			i had to put that in big letters because i am SO FREAKIN EXCITED that you're here!! there is SO much cool stuff that's gonna happen this summer and i cannot wait to show yall what we have been cooking up
		</p>

		<p class="mb-6">
			in the next six weeks, you're gonna build a crazy idea.
		</p>

		<p class="mb-6">
			every week you'll ship some version of it — a one-liner at the start, maybe a product at the end. along the way you'll hang out with a small group of hackers that care about what you're building (a "circle"! more info below), join workshops, AMAs, and show and tells with awesome ppl, and cheer each other on during this adventure.
		</p>

		<p class="mb-10">
			we'll give you something cool at the end of each week. grants, showcase pages, raffles, and a hoodie exclusive to this summer all await...
		</p>

		<p class="text-xl tracking-[0.05em] text-white mb-12">
			that's unfold. lets gooooo---
		</p>

		<p class="mb-6">
			this week, week 1, is about your idea. there isn't any code yet, or bugs, or tech debt, or a hydration error that only appears in production for some stupid freaking reason. just you and a dream.
		</p>

		<p class="mb-4">
			quick tl;dr on what this week looks like:
		</p>

		<ul class="list-disc pl-5 mb-16 text-white/90 marker:text-(--color-dawn)">
			<li>sign up on <a href="https://unfold.garden/apply" class="underline decoration-1 underline-offset-4 hover:text-white hover:tracking-[0.2em] transition-[colors,letter-spacing] duration-500">unfold.garden</a> if you have not done so already!! you need to do this so that we can add you to all the unfold channels + save your email for announcements. please do this!!!</li>
			<li>save <a href="https://unfold.garden/os" class="underline decoration-1 underline-offset-4 hover:text-white hover:tracking-[0.2em] transition-[colors,letter-spacing] duration-500">unfold os</a> as your homepage or new tab page</li>
			<li>decide on what you're going to be building for the next 6 weeks (stuck? read below)</li>
			<li>generate your idea slide <a href="/generate" class="underline decoration-1 underline-offset-4 hover:text-white hover:tracking-[0.2em] transition-[colors,letter-spacing] duration-500">here</a></li>
			<li>create an empty github repo and write a bit about your idea in the readme</li>
			<li>post in <a href="https://hackclub.enterprise.slack.com/archives/C0B0A5X5B27" class="underline decoration-1 underline-offset-4 hover:text-white hover:tracking-[0.2em] transition-[colors,letter-spacing] duration-500">#unfold-ships</a> and hype each other up!!</li>
			<li>wait for us to finish the submission form lol (we will email + ping once its done dw)</li>
		</ul>

		<h3 class="text-3xl md:text-5xl tracking-[0.15em] text-(--color-dawn) mt-16 mb-6 text-pretty">
			how to choose the right idea
		</h3>

		<p class="mb-6">
			that header is a bit of a lie. there is no right idea! the right idea is whatever sounds exciting now. i'm 100% serious.
		</p>

		<p class="mb-6">
			don't worry about how profitable or impressive it is or product market fit or whatever. your idea will change over these 6 weeks, so don't waste time agonizing over whether you're picking the right one. ideas are forged and developed over time, not found fully formed in someone's head magically. whether you're excited about the direction that you're going in is 10x more important than whether it's an actually good idea.
		</p>

		<p class="mb-6">
			a lot of you will fall into one of these 3 categories:
		</p>

		<h4 class="text-xl md:text-2xl tracking-[0.1em] text-white mt-8 mb-4 italic text-pretty">
			i have absolutely no clue what to build
		</h4>

		<p class="mb-4">
			i will now proceed to throw a bunch of questions at you in the hopes of sparking something
		</p>

		<ul class="space-y-2 mb-6 text-white/70">
			<li>what's something that you're good at or enjoy?</li>
			<li>what's something that your friends would like?</li>
			<li>what's something that hack club needs?</li>
			<li>what's something that your neighborhood needs?</li>
			<li>what's a problem that you run into daily that tech could solve?</li>
			<li>what's something that only you could build?</li>
		</ul>

		<p class="mb-6">
			if you're still stuck, resort to the ol' reliable: build your own, better, version of something. quizlet is absolutely horrible these days. so are all those sketchy online conversion websites. maybe you could even build a better version of a hack club website?
		</p>

		<h4 class="text-xl md:text-2xl tracking-[0.1em] text-white mt-8 mb-4 italic text-pretty">
			i have like 5 different ideas and dont know which one to pick
		</h4>

		<p class="mb-6">
			pick the one that you're most excited about, or the one that you feel you could realistically complete in 5 weeks.
		</p>

		<p class="mb-6">
			again, an idea that you're really interested in will get you way further than a "good" idea that bores you.
		</p>

		<h4 class="text-xl md:text-2xl tracking-[0.1em] text-white mt-8 mb-4 italic text-pretty">
			i have an idea already
		</h4>

		<p class="mb-6">
			awesome!! use this week to scope it and practice communicating it. a good one-liner will help with this.
		</p>
		<br>

		<p class="mb-6">
			don't worry about someone else already making your idea! that's a sign you're picking a good one! unless the other person is a CEO with millions at their disposal, you'll be fine.
		</p>

		<p class="mb-16">
			we don't really care too much about what you build for unfold. it could be a game, an app, website, robot, whatever. due to Internal Hack Club Reasons 60% ish of your logged time must be technical (hardware or coding), and you must be able to track time worked via journals, lapse/lookout, or hackatime. other than that, you can bring any crazy, weird, huge, or dumb idea to life during these 6 weeks.
		</p>

		<h3 class="text-3xl md:text-5xl tracking-[0.15em] text-(--color-dawn) mt-16 mb-6 text-pretty">
			the one liner
		</h3>

		<p class="mb-6">
			along with picking an idea this week, you'll also practice communicating it to people and making it clear and legible.
		</p>

		<p class="mb-6">
			your "one-liner" is 1-2 sentences that you can show to anyone — your best friend, your teacher, your parents — for them to instantly understand what you're building. don't load it with buzzwords or make it really generic, and instead focus on what makes your idea unique or the specific problem it solves.
		</p>

		<p class="mb-4">ex:</p>

		<div class="space-y-2 mb-6 text-white/70">
			<p>"a language learning app" is too broad!</p>
			<p>"an ai-powered language learning app with built-in agents" doesn't tell me anything!</p>
			<p>"a language learning app for seniors that want to communicate with their family" is great!</p>
			<p>"a link in bio tool" is too broad!</p>
			<p>"a dynamic link in bio service built with modern tech" also doesn't tell me anything!</p>
			<p>"a FOSS and super customizable link-in-bio tool for small creators" makes me want to use it!</p>
		</div>

		<p class="mb-6">
			you can vibe check your one liner by posting in <a href="https://hackclub.enterprise.slack.com/archives/C0B013JNXPZ" class="underline decoration-1 underline-offset-4 hover:text-white hover:tracking-[0.2em] transition-[colors,letter-spacing] duration-500">#unfold</a>! if someone doesn't understand without you explaining further, it's usually a problem with how you're communicating the idea instead of the idea itself. again, there are no bad ideas :)
		</p>

		<h3 class="text-3xl md:text-5xl tracking-[0.15em] text-(--color-dawn) mt-16 mb-6 text-pretty">
			what to do this week
		</h3>

		<p class="mb-6">
			first, make sure you've signed up with hack club auth <a href="https://unfold.garden/apply" class="underline decoration-1 underline-offset-4 hover:text-white hover:tracking-[0.2em] transition-[colors,letter-spacing] duration-500">here</a>. this is how we'll track who's actually participating, so pls make sure you've done this
		</p>

		<p class="mb-6">
			next, we've made a cozy little page called unfold os. it's intended to be set as your browser's home or new tab page and is an ambient reminder about unfold, and holds links to all the important docs and tools you'll need during the season. find it at <a href="https://unfold.garden/os" class="underline decoration-1 underline-offset-4 hover:text-white hover:tracking-[0.2em] transition-[colors,letter-spacing] duration-500">unfold.garden/os</a>.
		</p>

		<p class="mb-6">
			once you've picked your idea and decided on a one-liner, you can generate a pretty, sharable image for it <a href="/generate" class="underline decoration-1 underline-offset-4 hover:text-white hover:tracking-[0.2em] transition-[colors,letter-spacing] duration-500">here</a>. feel free to post this idea slide on your insta or twitter or retro or whatever new fangled social network yall are using these days. you're doing unfold!! tell the world!!
		</p>

		<p class="mb-6">
			then create a github (or any git forge :3) repo, and write a bit more about your idea in the README! this is where you can brainstorm and flesh out what you want to make a bit more. some good questions to answer: who's it for? how much effort will it take to build this? what do i need to learn to make this happen? you could also attach your idea slide to your README
		</p>

		<p class="mb-6">
			you can now share your first ship with us! post a short message in <a href="https://hackclub.enterprise.slack.com/archives/C0B0A5X5B27" class="underline decoration-1 underline-offset-4 hover:text-white hover:tracking-[0.2em] transition-[colors,letter-spacing] duration-500">#unfold-ships</a> with your git repo linked and idea slide attached
		</p>

		<p class="mb-6">
			a huge part of unfold is the community and the feedback loop you gain from it; and it starts in week 1! i challenge you to give at least 3 people genuine feedback on their ideas in <a href="https://hackclub.enterprise.slack.com/archives/C0B0A5X5B27" class="underline decoration-1 underline-offset-4 hover:text-white hover:tracking-[0.2em] transition-[colors,letter-spacing] duration-500">#unfold-ships</a>. hype each other up and get excited!!
		</p>

		<p class="mb-6">
			and finally, you'll submit a form with a bit more info on what you're making later in the week. we'll use this info to form a circle, a small group of 5-7 hackers working on similar things for the program! you'll be added to your circle's private channel next week. it's a lot easier to show up and keep shipping when there are people around you that care about what you're making, and we hope to make that come built-in with circles :D
		</p>

		<p class="mb-6 italic text-white/50">
		(where's the form? uh it's not done yet LOL. we will add it here & to unfold os, email, and ping yall when it's ready!! promise!)
		</p>

		<p class="mt-16 text-xl tracking-[0.05em] text-white">
			~~~
		</p>

		<p class="mt-8 mb-6">
			that's all i have for you for now! thanks so much for reading to the end & i'm really excited to see what you make. i'll be active in #unfold all week (and for the 5 weeks after :p) to answer questions and give feedback!
		</p>

		<p class="italic text-white/50">
			i can make something good, oh <br> something good
		</p>
	</div>
</main>
