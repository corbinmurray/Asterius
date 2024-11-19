export function aStar(graph: Record<string, Cell[]>, start: Cell, goal: Cell, onVisit: (cell: Cell) => void, onComplete: (path: Cell[]) => void) {
	const openSet: Set<string> = new Set();
	const cameFrom: Record<string, string | null> = {};
	const gScore: Record<string, number> = {};
	const fScore: Record<string, number> = {};

	gScore[cellToKey(start)] = 0;
	fScore[cellToKey(start)] = heuristic(start, goal);

	openSet.add(cellToKey(start));

	while (openSet.size > 0) {
		// Get the node in openSet with the lowest fScore
		let currentKey = Array.from(openSet).reduce((a, b) => (fScore[a] < fScore[b] ? a : b));
		const [cx, cy] = keyToCoordinates(currentKey);
		const currentCell: Cell = { x: cx, y: cy };

		// Notify visited cell
		onVisit(currentCell);

		// If the goal is reached
		if (currentCell.x === goal.x && currentCell.y === goal.y) {
			// const path = reconstructPath(cameFrom, currentCell);
			// onComplete(path);
			onComplete([]);
			return;
		}

		openSet.delete(currentKey);

		for (const neighbor of graph[currentKey] || []) {
			const neighborKey = cellToKey(neighbor);
			const tentativeGScore = gScore[currentKey] + 1;

			if (tentativeGScore < (gScore[neighborKey] || Infinity)) {
				cameFrom[neighborKey] = currentKey;
				gScore[neighborKey] = tentativeGScore;
				fScore[neighborKey] = gScore[neighborKey] + heuristic(neighbor, goal);

				if (!openSet.has(neighborKey)) {
					openSet.add(neighborKey);
				}
			}
		}

		// No viable path found
		onComplete([]);
	}
}

export const cellToKey = (cell: Cell): string => `${cell.x},${cell.y}`;

export const keyToCoordinates = (key: string): number[] => key.split(",").map(Number);

export const heuristic = (a: Cell, b: Cell) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

export const reconstructPath = (cameFrom: Record<string, string | null>, current: Cell): Cell[] => {
	try {
		const path: Cell[] = [];

		let currentKey: string | null = cellToKey(current);
		while (currentKey) {
			const [x, y] = keyToCoordinates(currentKey);
			path.unshift({ x, y });
			currentKey = cameFrom[currentKey];
		}

		return path;
	} catch (err) {
		console.error(err);
		return [];
	}
};

export type Cell = { x: number; y: number };
export type Direction = "North" | "South" | "East" | "West";
export type Maze = Map<string, Set<Direction>>;

export const DIRECTIONS: Record<Direction, { dx: number; dy: number }> = {
	North: { dx: 0, dy: -1 },
	South: { dx: 0, dy: 1 },
	East: { dx: 1, dy: 0 },
	West: { dx: -1, dy: 0 },
};

export const OPPOSITE_DIRECTIONS: Record<Direction, Direction> = {
	North: "South",
	South: "North",
	East: "West",
	West: "East",
};

export const getRandomStartAndGoal = (maze: Maze | null, width: number, height: number): { start: Cell; goal: Cell } => {
	if (!maze) {
		return {
			start: { x: 0, y: 0 },
			goal: { x: width - 1, y: height - 1 },
		};
	}

	const keys = Array.from(maze.keys());

	if (keys.length < 2) {
		throw new Error("The maze must have at least two cells to select a start and goal");
	}

	let startKey = keys[Math.floor(Math.random() * keys.length)];
	let goalKey = keys[Math.floor(Math.random() * keys.length)];

	while (startKey === goalKey || keyToCoordinates(startKey)[0] === keyToCoordinates(goalKey)[0]) {
		goalKey = keys[Math.floor(Math.random() * keys.length)];
	}

	const [startX, startY] = keyToCoordinates(startKey);
	const [goalX, goalY] = keyToCoordinates(goalKey);

	return {
		start: { x: startX, y: startY },
		goal: { x: goalX, y: goalY },
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
