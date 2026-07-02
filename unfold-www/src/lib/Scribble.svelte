<script lang="ts">
	import { onMount } from 'svelte';

	let canvas = $state<HTMLCanvasElement | null>(null);

	interface Point {
		x: number;
		y: number;
	}

	interface Segment {
		from: Point;
		to: Point;
	}

	const segments: Segment[] = [];
	let anchor: Point | null = null;
	let cursor: Point | null = null;
	let targetDist = 0;
	let maxSegments = 0;
	let lastAddedAt = 0;
	let lastDecayAt = 0;

	const IDLE_THRESHOLD = 800;
	const DECAY_INTERVAL = 150;

	function rollDistance(): number {
		return Math.random() * 150;
	}

	function rollMax(): number {
		return 24 + Math.floor(Math.random() * 16); // 24–39 segments
	}

	function dist(a: Point, b: Point): number {
		return Math.hypot(b.x - a.x, b.y - a.y);
	}

	function resize(ctx: CanvasRenderingContext2D) {
		const dpr = window.devicePixelRatio || 1;
		canvas!.width = window.innerWidth * dpr;
		canvas!.height = window.innerHeight * dpr;
		ctx.scale(dpr, dpr);
	}

	onMount(() => {
		if (!canvas) return;
		const ctx = canvas.getContext('2d')!;

		targetDist = rollDistance();
		maxSegments = rollMax();

		resize(ctx);
		const onResize = () => resize(ctx);
		window.addEventListener('resize', onResize);

		const onMove = (e: MouseEvent) => {
			cursor = { x: e.clientX, y: e.clientY };

			if (!anchor) {
				anchor = { ...cursor };
				return;
			}

			if (dist(anchor, cursor) >= targetDist) {
				segments.push({
					from: { ...anchor },
					to: { ...cursor }
				});
				lastAddedAt = performance.now();

				while (segments.length > maxSegments) {
					segments.shift();
				}
				if (Math.random() < 0.3) maxSegments = rollMax();

				anchor = { ...cursor };
				targetDist = rollDistance();
			}
		};
		document.addEventListener('mousemove', onMove);

		let raf = 0;
		const draw = () => {
			const now = performance.now();
			const idle = now - lastAddedAt;

			if (
				segments.length > 0 &&
				idle > IDLE_THRESHOLD &&
				now - lastDecayAt > DECAY_INTERVAL
			) {
				segments.shift();
				lastDecayAt = now;
			}

			ctx.clearRect(0, 0, canvas!.width, canvas!.height);

			const len = segments.length;
			for (let i = 0; i < len; i++) {
				const seg = segments[i];
				const t = len === 1 ? 1 : i / (len - 1);
				const opacity = t * t;

				ctx.beginPath();
				ctx.moveTo(seg.from.x, seg.from.y);
				ctx.lineTo(seg.to.x, seg.to.y);
				ctx.strokeStyle = `rgba(220, 220, 215, ${opacity * 0.5})`;
				ctx.lineWidth = 1.5;
				ctx.lineCap = 'round';
				ctx.stroke();
			}

			if (anchor && cursor) {
				ctx.beginPath();
				ctx.moveTo(anchor.x, anchor.y);
				ctx.lineTo(cursor.x, cursor.y);
				ctx.strokeStyle = 'rgba(200, 200, 195, 0.3)';
				ctx.lineWidth = 1.5;
				ctx.lineCap = 'round';
				ctx.stroke();
			}

			raf = requestAnimationFrame(draw);
		};
		raf = requestAnimationFrame(draw);

		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener('resize', onResize);
			document.removeEventListener('mousemove', onMove);
		};
	});
</script>

<canvas
	bind:this={canvas}
	id="scribble-canvas"
	class="fixed inset-0 w-full h-full pointer-events-none z-50"
></canvas>
