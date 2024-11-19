"use client";
import { aStar, Cell, Direction, getRandomStartAndGoal, Maze as MazeType, parseMazeToGraph } from "@/lib/mazeUtils";
import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

/**
 * Component for generating a maze, displaying the maze, and displaying the A* algorithm in real-time
 *
 * @component
 * @example
 * return (
 * 	<Maze columns={10} rows ={10} cellSize={50} />
 * )
 */
const Maze = ({ columns, rows, cellSize }: { columns: number; rows: number; cellSize: number }) => {
	const svgRef = useRef<SVGSVGElement | null>(null);
	const [maze, setMaze] = useState<MazeType | null>(null);
	const [randomStart, setRandomStart] = useState<Cell>({ x: 0, y: 0 });
	const [randomGoal, setRandomGoal] = useState<Cell>({ x: rows - 1, y: columns - 1 });
	const [visitedCells, setVisitedCells] = useState<Cell[]>([]);
	const [solvedPath, setSolvedPath] = useState<Cell[]>([]);

	const solveMaze = () => {
		console.log("Starting A* path finding");

		// Run A* path finding algorithm
		aStar(
			parseMazeToGraph(maze),
			randomStart,
			randomGoal,
			async (visited) => {
				setVisitedCells((prev) => [...prev, visited]);
			},
			(completedPath) => {
				setSolvedPath(completedPath);
			}
		);
	};

	// Generate the maze on component mount
	useEffect(() => {
		const worker = new Worker(new URL("../workers/mazeWorker.ts", import.meta.url));
		const svg = d3.select(svgRef.current);
		svg.selectAll("*").remove();

		worker.postMessage({ rows, columns });

		worker.onmessage = (event) => {
			const { cell, direction, done, maze }: { cell: Cell; direction: Direction; done: boolean; maze: MazeType } = event.data;

			if (done) {
				setMaze(maze);
				const { start, goal } = getRandomStartAndGoal(maze, rows, columns);
				setRandomStart(start);
				setRandomGoal(goal);
				worker.terminate();
				return;
			}

			if (cell && direction) {
				const [x, y] = [cell.x, cell.y];

				const wall = svg.append("line").attr("class", "stroke-primary");

				switch (direction) {
					case "North":
						wall
							.attr("x1", x * cellSize)
							.attr("y1", y * cellSize)
							.attr("x2", (x + 1) * cellSize)
							.attr("y2", y * cellSize);
						break;
					case "South":
						wall
							.attr("x1", x * cellSize)
							.attr("y1", (y + 1) * cellSize)
							.attr("x2", (x + 1) * cellSize)
							.attr("y2", (y + 1) * cellSize);
						break;
					case "East":
						wall
							.attr("x1", (x + 1) * cellSize)
							.attr("y1", y * cellSize)
							.attr("x2", (x + 1) * cellSize)
							.attr("y2", (y + 1) * cellSize);
						break;
					case "West":
						wall
							.attr("x1", x * cellSize)
							.attr("y1", y * cellSize)
							.attr("x2", x * cellSize)
							.attr("y2", (y + 1) * cellSize);
						break;
				}
			}
		};

		return () => {
			worker.terminate();
		};
	}, [rows, columns]);

	// Draw the maze
	useEffect(() => {
		const svg = d3.select(svgRef.current);
		svg.selectAll("*").remove();

		// Draw initial maze
		maze?.forEach((directions, cellKey) => {
			const [x, y] = cellKey.split(",").map(Number);

			// start and goal cells
			if (x === randomStart.x && y === randomStart.y) {
				const circleSize = cellSize * 0.6;
				const offset = (cellSize - circleSize) / 2;

				svg
					.append("rect")
					.attr("x", randomStart.x * cellSize + offset)
					.attr("y", randomStart.y * cellSize + offset)
					.attr("width", circleSize)
					.attr("height", circleSize)
					.attr("rx", circleSize / 2)
					.attr("ry", circleSize / 2)
					.attr("fill", "currentColor")
					.attr("class", "fill-success")
					.attr("data-tip", "This is the start of the maze");
			}

			if (x === randomGoal.x && y === randomGoal.y) {
				const circleSize = cellSize * 0.6;
				const offset = (cellSize - circleSize) / 2;

				svg
					.append("rect")
					.attr("x", randomGoal.x * cellSize + offset)
					.attr("y", randomGoal.y * cellSize + offset)
					.attr("width", circleSize)
					.attr("height", circleSize)
					.attr("rx", circleSize / 2)
					.attr("ry", circleSize / 2)
					.attr("fill", "currentColor")
					.attr("class", "fill-error");
			}

			if (!directions.has("North")) {
				svg
					.append("line")
					.attr("x1", x * cellSize)
					.attr("y1", y * cellSize)
					.attr("x2", (x + 1) * cellSize)
					.attr("y2", y * cellSize)
					.attr("class", "stroke-primary");
			}

			if (!directions.has("South")) {
				svg
					.append("line")
					.attr("x1", x * cellSize)
					.attr("y1", (y + 1) * cellSize)
					.attr("x2", (x + 1) * cellSize)
					.attr("y2", (y + 1) * cellSize)
					.attr("class", "stroke-primary");
			}

			if (!directions.has("East")) {
				svg
					.append("line")
					.attr("x1", (x + 1) * cellSize)
					.attr("y1", y * cellSize)
					.attr("x2", (x + 1) * cellSize)
					.attr("y2", (y + 1) * cellSize)
					.attr("class", "stroke-primary");
			}

			if (!directions.has("West")) {
				svg
					.append("line")
					.attr("x1", x * cellSize)
					.attr("y1", y * cellSize)
					.attr("x2", x * cellSize)
					.attr("y2", (y + 1) * cellSize)
					.attr("class", "stroke-primary");
			}
		});

		// Draw A* updates
		visitedCells.forEach((visited, i) => {
			setTimeout(() => {
				const { x, y } = visited;
				const circleSize = cellSize * 0.3;
				const offset = (cellSize - circleSize) / 2;

				svg
					.append("rect")
					.attr("x", x * cellSize + offset)
					.attr("y", y * cellSize + offset)
					.attr("width", circleSize)
					.attr("height", circleSize)
					.attr("rx", circleSize / 2)
					.attr("ry", circleSize / 2)
					.attr("fill", "currentColor")
					.attr("class", "fill-secondary visited");
			}, i * 100);
		});

		// Draw the final update
		solvedPath.forEach((visited, i) => {
			svg.selectAll(".visited").remove();

			setTimeout(() => {
				const { x, y } = visited;
				const circleSize = cellSize * 0.5;
				const offset = (cellSize - circleSize) / 2;

				svg
					.append("rect")
					.attr("x", x * cellSize + offset)
					.attr("y", y * cellSize + offset)
					.attr("width", circleSize)
					.attr("height", circleSize)
					.attr("rx", circleSize / 2)
					.attr("ry", circleSize / 2)
					.attr("fill", "currentColor")
					.attr("class", "fill-accent");
			}, i * 100);
		});
	}, [maze, visitedCells, cellSize, randomGoal, randomStart]);

	return (
		<div className="flex flex-col items-center gap-12">
			<svg ref={svgRef} width={rows * cellSize} height={columns * cellSize} className="" />
			<button className="btn btn-outline btn-wide btn-primary capitalize" disabled={!maze || maze?.size === 0} onClick={solveMaze}>
				solve maze
			</button>
		</div>
	);
};

export default Maze;
