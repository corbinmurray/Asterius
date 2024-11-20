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
		<section>
			<div className="container mx-auto p-3">
				<div className="max-w-screen-sm mx-auto">
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

				<div className="mt-12 space-y-6 max-w-prose">
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
				</div>
			</div>
		</section>
	);
}
