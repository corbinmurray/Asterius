"use client";
import { generateMaze } from "@/lib/generateMaze";
import { Cell, Direction, Maze } from "@/lib/shared";
import * as d3 from "d3";
import { MutableRefObject, useEffect, useRef, useState } from "react";

interface MazeSvgProps {
	maze: Maze;
	start: Cell;
	goal: Cell;
	cellSize: number;
	className: string;
	solutionPath: Cell[];
	visitedNodes: Cell[];
}

/**
 * Component for displaying the maze and displaying the A* algorithm in real-time
 *
 * @component
 * @example
 * return (
 * 	<MazeSvg maze={maze} start={start} goal={goal} cellSize={50} />
 * )
 */
const MazeSvg = ({ maze, start, goal, cellSize, className, solutionPath, visitedNodes }: MazeSvgProps) => {
	const svgRef = useRef<SVGSVGElement | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	// Draw the maze
	useEffect(() => {
		const svg = d3.select(svgRef.current);
		svg.selectAll("*").remove();

		// Draw initial maze
		maze?.forEach((directions, cellKey) => {
			const [x, y] = cellKey.split(",").map(Number);

			drawMazeCell(
				svgRef,
				{ x, y } as Cell,
				cellSize,
				directions,
				{
					currentCellClassName: "stroke-base-content",
					goalCellClassName: "fill-error",
					startCellClassName: "fill-success",
				},
				start,
				goal
			);
		});
	}, [maze, cellSize]);

	/**
	 * Handles showing the solved maze. Starts with showing the algorithm's 'thought process' (steps taken to find the 	solution path), then shows the solution path.
	 */
	const handleSolveMaze = () => {
		setIsLoading(true);
		const svg = d3.select(svgRef.current);
		svg.selectAll(".fill-warning").remove();
		svg.selectAll(".fill-accent").remove();

		// Animate visited nodes
		visitedNodes.forEach((node, index) => {
			const { x, y } = node;

			svg
				.append("circle")
				.attr("cx", x * cellSize + cellSize / 2)
				.attr("cy", y * cellSize + cellSize / 2)
				.attr("r", cellSize / 6)
				.attr("fill", "currentColor")
				.attr("class", "fill-warning shadow-lg")
				.attr("opacity", 0)
				.transition()
				.delay(index * 100) // Delay each node for sequential animation
				.duration(200)
				.attr("opacity", 1);
		});

		// Erase visited nodes and animate solution path after delay
		const totalVisitedTime = visitedNodes.length * 100 + 100;

		setTimeout(() => {
			svg.selectAll(".fill-warning").remove();

			solutionPath.forEach((node, index) => {
				const { x, y } = node;

				svg
					.append("circle")
					.attr("cx", x * cellSize + cellSize / 2)
					.attr("cy", y * cellSize + cellSize / 2)
					.attr("r", cellSize / 6)
					.attr("fill", "currentColor")
					.attr("class", "fill-accent shadow")
					.attr("opacity", 0)
					.transition()
					.delay(index * 100) // Delay each path node for sequential animation
					.duration(150)
					.attr("opacity", 1);
			});

			setIsLoading(false);
		}, totalVisitedTime);
	};

	return (
		<div className="flex flex-col gap-6 w-full h-full">
			{/* Legend */}
			<div className="flex flex-row justify-center items-center gap-4 md:gap-8">
				<div className="flex items-center gap-2">
					<div className="w-4 h-4 rounded-full bg-success" aria-label="Start"></div>
					<span className="text-sm md:text-lg">Start</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="w-4 h-4 rounded-full bg-error" aria-label="Goal"></div>
					<span className="text-sm md:text-lg">Goal</span>
				</div>
			</div>

			<svg ref={svgRef} className={className} viewBox="0 0 500 500" />

			<div className="flex flex-row justify-center gap-12">
				<button className="btn btn-outline btn-secondary md:btn-wide capitalize" disabled={isLoading} onClick={() => (maze = generateMaze(10, 10))}>
					generate new maze
				</button>
				<button className="btn btn-outline btn-primary md:btn-wide capitalize" disabled={isLoading} onClick={handleSolveMaze}>
					solve maze
				</button>
			</div>
		</div>
	);
};

export default MazeSvg;

const drawMazeCell = (
	svgRef: MutableRefObject<SVGSVGElement | null>,
	currentCell: Cell,
	cellSize: number,
	directions: Set<Direction>,
	{ currentCellClassName, startCellClassName, goalCellClassName }: { currentCellClassName: string; startCellClassName: string; goalCellClassName: string },
	startCell: Cell | null = null,
	goalCell: Cell | null = null
): void => {
	if (!svgRef) {
		return;
	}

	const svg = d3.select(svgRef.current);
	const { x, y } = currentCell;

	// start and goal cells
	if (x === startCell?.x && y === startCell?.y) {
		const circleSize = cellSize * 0.6;
		const offset = (cellSize - circleSize) / 2;

		svg
			.append("rect")
			.attr("x", startCell.x * cellSize + offset)
			.attr("y", startCell.y * cellSize + offset)
			.attr("width", circleSize)
			.attr("height", circleSize)
			.attr("rx", circleSize / 2)
			.attr("ry", circleSize / 2)
			.attr("fill", "currentColor")
			.attr("class", startCellClassName);
	}

	if (x === goalCell?.x && y === goalCell?.y) {
		const circleSize = cellSize * 0.6;
		const offset = (cellSize - circleSize) / 2;

		svg
			.append("rect")
			.attr("x", goalCell.x * cellSize + offset)
			.attr("y", goalCell.y * cellSize + offset)
			.attr("width", circleSize)
			.attr("height", circleSize)
			.attr("rx", circleSize / 2)
			.attr("ry", circleSize / 2)
			.attr("fill", "currentColor")
			.attr("class", goalCellClassName);
	}

	if (!directions.has("North")) {
		svg
			.append("line")
			.attr("x1", x * cellSize)
			.attr("y1", y * cellSize)
			.attr("x2", (x + 1) * cellSize)
			.attr("y2", y * cellSize)
			.attr("class", currentCellClassName);
	}

	if (!directions.has("South")) {
		svg
			.append("line")
			.attr("x1", x * cellSize)
			.attr("y1", (y + 1) * cellSize)
			.attr("x2", (x + 1) * cellSize)
			.attr("y2", (y + 1) * cellSize)
			.attr("class", currentCellClassName);
	}

	if (!directions.has("East")) {
		svg
			.append("line")
			.attr("x1", (x + 1) * cellSize)
			.attr("y1", y * cellSize)
			.attr("x2", (x + 1) * cellSize)
			.attr("y2", (y + 1) * cellSize)
			.attr("class", currentCellClassName);
	}

	if (!directions.has("West")) {
		svg
			.append("line")
			.attr("x1", x * cellSize)
			.attr("y1", y * cellSize)
			.attr("x2", x * cellSize)
			.attr("y2", (y + 1) * cellSize)
			.attr("class", currentCellClassName);
	}
};
