import { Cell, cellToKey, Direction, Maze } from "@/lib/shared";

/**
 * Generates a Maze using Wilson's loop-erased random walk (LERW) algorithm.
 * @param rows  Number of rows
 * @param cols Number of columns
 * @returns an unbiased, random, and complete Maze
 */
export const generateMaze = (rows: number, cols: number): Maze => {
	const maze: Maze = new Map();
	const visited: Set<string> = new Set();

	// Start with one cell in the maze
	const startCell: Cell = {
		x: Math.floor(Math.random() * rows),
		y: Math.floor(Math.random() * cols),
	};

	visited.add(cellToKey(startCell));
	maze.set(cellToKey(startCell), new Set());

	// Loop until all cells are visited
	while (visited.size < rows * cols) {
		let currentCell: Cell = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) };

		if (visited.has(cellToKey(currentCell))) continue;

		const path: Cell[] = [currentCell];

		// Loop-erased random walk
		while (!visited.has(cellToKey(currentCell))) {
			const randomDirection = getRandomDirection();
			const nextCell: Cell = {
				x: currentCell.x + DIRECTIONS[randomDirection].dx,
				y: currentCell.y + DIRECTIONS[randomDirection].dy,
			};

			if (isValidCell(nextCell, rows, cols)) {
				currentCell = nextCell;
				const loopIndex = path.findIndex((cell) => cellToKey(cell) === cellToKey(currentCell));

				if (loopIndex !== -1) {
					path.splice(loopIndex + 1);
				} else {
					path.push(currentCell);
				}
			}
		}

		// Add the path to the maze
		for (let i = 0; i < path.length - 1; i++) {
			const current = path[i];
			const next = path[i + 1];
			const direction = Object.keys(DIRECTIONS).find(
				(d) => current.x + DIRECTIONS[d as Direction].dx === next.x && current.y + DIRECTIONS[d as Direction].dy === next.y
			) as Direction;

			const currentKey = cellToKey(current);
			const nextKey = cellToKey(next);

			if (!maze.has(currentKey)) maze.set(currentKey, new Set());
			if (!maze.has(nextKey)) maze.set(nextKey, new Set());

			maze.get(currentKey)?.add(direction);
			maze.get(nextKey)?.add(OPPOSITE_DIRECTIONS[direction]);
			visited.add(cellToKey(current));
		}

		visited.add(cellToKey(currentCell));
	}

	return maze;
};

/**
 * Gets a random Direction from all possible Direction options.
 * @returns A randomly selected Direction
 */
const getRandomDirection = (): Direction => ["North", "South", "East", "West"][Math.floor(Math.random() * 4)] as Direction;

/**
 *
 * @param cell The cell to determine validity
 * @param width The maze's width (number of columns)
 * @param height The maze's height (number of rows)
 * @returns true if the cell is valid, else false
 */
const isValidCell = (cell: Cell, width: number, height: number): boolean => cell.x >= 0 && cell.x < width && cell.y >= 0 && cell.y < height;

const DIRECTIONS: Record<Direction, { dx: number; dy: number }> = {
	North: { dx: 0, dy: -1 },
	South: { dx: 0, dy: 1 },
	East: { dx: 1, dy: 0 },
	West: { dx: -1, dy: 0 },
};

const OPPOSITE_DIRECTIONS: Record<Direction, Direction> = {
	North: "South",
	South: "North",
	East: "West",
	West: "East",
};
