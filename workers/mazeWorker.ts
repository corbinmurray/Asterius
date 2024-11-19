import { Cell, cellToKey, Direction, DIRECTIONS, Maze, OPPOSITE_DIRECTIONS } from "@/lib/mazeUtils";

self.onmessage = (event) => {
	const { rows, columns } = event.data;

	// Generate maze using Wilson's algorithm
	const generateMaze = (rows: number, columns: number) => {
		const maze: Maze = new Map();
		const visited: Set<string> = new Set();
		const width = rows;
		const height = columns;

		// Start with one cell in the maze
		const startCell: Cell = {
			x: Math.floor(Math.random() * width),
			y: Math.floor(Math.random() * height),
		};

		visited.add(cellToKey(startCell));
		maze.set(cellToKey(startCell), new Set());

		// Loop until all cells are visited
		while (visited.size < width * height) {
			let currentCell: Cell = { x: Math.floor(Math.random() * width), y: Math.floor(Math.random() * height) };

			if (visited.has(cellToKey(currentCell))) continue;

			const path: Cell[] = [currentCell];

			// Loop-erased random walk
			while (!visited.has(cellToKey(currentCell))) {
				const randomDirection = getRandomDirection();
				const nextCell: Cell = {
					x: currentCell.x + DIRECTIONS[randomDirection].dx,
					y: currentCell.y + DIRECTIONS[randomDirection].dy,
				};

				if (isValidCell(nextCell, width, height)) {
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

				// self.postMessage({ cell: currentCell, direction, done: false });
			}

			visited.add(cellToKey(currentCell));
		}

		return maze;
	};

	const maze = generateMaze(rows, columns);

	self.postMessage({ maze, done: true });
};

const getRandomDirection = (): Direction => ["North", "South", "East", "West"][Math.floor(Math.random() * 4)] as Direction;

const isValidCell = (cell: Cell, width: number, height: number): boolean => cell.x >= 0 && cell.x < width && cell.y >= 0 && cell.y < height;
