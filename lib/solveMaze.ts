import { Cell, cellToKey, keyToCell } from "@/lib/shared";

/**
 * Solves the given maze using the A* search algorithm.
 * @param graph The maze as a graph
 * @param start The starting cell
 * @param goal The target/goal cell
 * @returns The nodes visited and the final computed path
 */
export function solveMaze(graph: Record<string, Cell[]>, start: Cell, goal: Cell): { visitedNodes: Cell[]; solutionPath: Cell[] } {
	const openSet: Set<string> = new Set();
	const cameFrom: Record<string, Cell> = {};
	const gScore: Record<string, number> = {};
	const fScore: Record<string, number> = {};
	const visitedNodes: Cell[] = [];

	gScore[cellToKey(start)] = 0;
	fScore[cellToKey(start)] = heuristic(start, goal);

	openSet.add(cellToKey(start));

	while (openSet.size > 0) {
		// Get the node in openSet with the lowest fScore
		let currentKey = Array.from(openSet).reduce((a, b) => (fScore[a] < fScore[b] ? a : b));
		const currentCell = keyToCell(currentKey);

		visitedNodes.push({
            ...currentCell,
            intensity: fScore[currentKey]
        });

		// If the goal is reached
		if (currentCell.x === goal.x && currentCell.y === goal.y) {
			return {
				visitedNodes,
				solutionPath: reconstructPath(cameFrom, currentCell, start),
			};
		}

		openSet.delete(currentKey);

		for (const neighbor of graph[currentKey] || []) {
			const neighborKey = cellToKey(neighbor);
			const tentativeGScore = gScore[currentKey] + 1;

			if (tentativeGScore < (gScore[neighborKey] || Infinity)) {
				cameFrom[neighborKey] = keyToCell(currentKey);
				gScore[neighborKey] = tentativeGScore;
				fScore[neighborKey] = gScore[neighborKey] + heuristic(neighbor, goal);

				if (!openSet.has(neighborKey)) {
					openSet.add(neighborKey);
				}
			}
		}
	}

	// No viable path found
	return {
		visitedNodes: [],
		solutionPath: [],
	};
}

const heuristic = (a: Cell, b: Cell): number => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

const reconstructPath = (cameFrom: Record<string, Cell>, current: Cell, start: Cell): Cell[] => {
	const path: Cell[] = [];

	while (current) {
		path.push(current);
		const parent = cameFrom[cellToKey(current)];

		if (!parent) break;

		current = parent;

		// Stop if we reach the start node
		if (current.x === start.x && current.y === start.y) {
			break;
		}
	}

	// Reverse teh path to get it from start to goal
	return path.reverse();
};
