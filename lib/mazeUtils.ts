import { Cell, keyToCell, Maze } from "@/lib/shared";

export const keyToCoordinates = (key: string): number[] => key?.split(",")?.map(Number);

export const getRandomStartAndGoal = (maze: Maze | null, rows: number, cols: number): { start: Cell; goal: Cell } => {
	if (!maze) {
		return {
			start: { x: 0, y: 0 },
			goal: { x: rows - 1, y: cols - 1 },
		};
	}

	const keys = Array.from(maze.keys());

	if (keys.length < 2) {
		throw new Error("The maze must have at least two cells to select a start and goal");
	}

	let startKey = keys[Math.floor(Math.random() * keys.length)];
	let goalKey = keys[Math.floor(Math.random() * keys.length)];

	while (startKey === goalKey) {
		goalKey = keys[Math.floor(Math.random() * keys.length)];
	}

	return {
		start: keyToCell(startKey),
		goal: keyToCell(goalKey),
	};
};

export const parseMazeToGraph = (maze: Maze | null): Record<string, Cell[]> => {
	const graph: Record<string, Cell[]> = {};

	if (!maze) {
		return graph;
	}

	maze.forEach((directions, cellKey) => {
		const [x, y] = cellKey.split(",").map(Number);
		graph[cellKey] = Array.from(directions).map((direction) => {
			const dx = { North: 0, South: 0, East: 1, West: -1 }[direction];
			const dy = { North: -1, South: 1, East: 0, West: 0 }[direction];

			return { x: x + dx, y: y + dy };
		});
	});

	return graph;
};
