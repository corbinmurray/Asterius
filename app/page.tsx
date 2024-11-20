import MazeSvg from "@/components/MazeSvg";

export default function Home() {
	const rows = 20;
	const cols = 20;
	const cellSize = 25;

	return (
		<div className="grid grid-cols-1 xl:grid-cols-[auto_1fr_auto] xl:gap-6">
			{/* <div className="mt-28 space-y-6 max-w-prose xl:flex xl:flex-col xl:justify-center">
				<p className="mx-auto">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem ex dignissimos possimus eos? Mollitia quia nemo culpa velit labore harum quam
					minima sint facere natus, voluptatem dolore, ullam sit magnam.
				</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem ex dignissimos possimus eos? Mollitia quia nemo culpa velit labore harum quam
					minima sint facere natus, voluptatem dolore, ullam sit magnam.
				</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem ex dignissimos possimus eos? Mollitia quia nemo culpa velit labore harum quam
					minima sint facere natus, voluptatem dolore, ullam sit magnam.
				</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem ex dignissimos possimus eos? Mollitia quia nemo culpa velit labore harum quam
					minima sint facere natus, voluptatem dolore, ullam sit magnam.
				</p>
			</div> */}

			<div className="max-w-screen-sm mx-auto mt-28 xl:col-span-full">
				<MazeSvg className="w-full h-full" rows={rows} cols={cols} cellSize={cellSize} />
			</div>

			{/* <div className="space-y-6 max-w-prose xl:mt-28 xl:flex xl:flex-col xl:justify-center">
				<p className="mx-auto">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem ex dignissimos possimus eos? Mollitia quia nemo culpa velit labore harum quam
					minima sint facere natus, voluptatem dolore, ullam sit magnam.
				</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem ex dignissimos possimus eos? Mollitia quia nemo culpa velit labore harum quam
					minima sint facere natus, voluptatem dolore, ullam sit magnam.
				</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem ex dignissimos possimus eos? Mollitia quia nemo culpa velit labore harum quam
					minima sint facere natus, voluptatem dolore, ullam sit magnam.
				</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem ex dignissimos possimus eos? Mollitia quia nemo culpa velit labore harum quam
					minima sint facere natus, voluptatem dolore, ullam sit magnam.
				</p>
			</div> */}
		</div>
	);
}
