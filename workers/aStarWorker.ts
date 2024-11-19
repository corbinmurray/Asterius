import { Cell, cellToKey, heuristic, reconstructPath } from "@/lib/mazeUtils";

self.onmessage = (event: MessageEvent) => {
	const { start, goal, graph } = event.data;

	const openSet = new Set([cellToKey(start)]);
	const cameFrom: Record<string, string | null> = {};

	const gScore: Record<string, number> = { [cellToKey(start)]: 0 };
	const fScore: Record<string, number> = { [cellToKey(start)]: heuristic(start, goal) };
	const priorityQueue = [start];
	const visited: Cell[] = [];

	while (priorityQueue.length > 0) {
		priorityQueue.sort((a, b) => fScore[cellToKey(a)] - fScore[cellToKey(b)]);
		const current = priorityQueue.shift()!;
		visited.push(current);

		self.postMessage({
			type: "visited",
			cell: current,
		});

		if (current.x === goal.x && current.y === goal.y) {
			console.log("A* is complete.", current, goal);

			self.postMessage({
				type: "complete",
				cell: current,
				path: reconstructPath(cameFrom, current),
			});

			return;
		}

		openSet.delete(cellToKey(current));

		const neighbors = graph[cellToKey(current)];

		for (const neighbor of neighbors) {
			const neighborKey = cellToKey(neighbor);
			const tentativeGScore = gScore[cellToKey(current)] + 1;

			if (tentativeGScore < (gScore[neighborKey] || Infinity)) {
				cameFrom[neighborKey] = cellToKey(current);
				gScore[neighborKey] = tentativeGScore;
				fScore[neighborKey] = gScore[neighborKey] + heuristic(neighbor, goal);

				if (!openSet.has(neighborKey)) {
					openSet.add(neighborKey);
					priorityQueue.push(neighbor);
				}
			}
		}
	}

	self.postMessage({ type: "error", message: "No path found" }); // No path found
};
