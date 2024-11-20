import MazeSvg from "@/components/MazeSvg";
import { generateMaze } from "@/lib/generateMaze";
import { getRandomStartAndGoal, parseMazeToGraph } from "@/lib/mazeUtils";
import { Cell, Maze } from "@/lib/shared";
import { solveMaze } from "@/lib/solveMaze";

export default function Home() {
	const rows = 10;
	const cols = 10;

	const maze: Maze = generateMaze(rows, cols);
	const graph: Record<string, Cell[]> = parseMazeToGraph(maze);
	const { start, goal } = getRandomStartAndGoal(maze, rows, cols);
	const { solutionPath, visitedNodes } = solveMaze(graph, start, goal);

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
				<MazeSvg
					className="w-full h-full shadow shadow-primary-content"
					maze={maze}
					start={start}
					goal={goal}
					cellSize={50}
					visitedNodes={visitedNodes}
					solutionPath={solutionPath}
				/>
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
