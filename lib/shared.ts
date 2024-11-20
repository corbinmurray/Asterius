export type Maze = Map<string, Set<Direction>>;
export type Cell = { x: number; y: number, intensity?: number };
export type Direction = "North" | "South" | "East" | "West";

export const cellToKey = (cell: Cell): string => `${cell.x},${cell.y}`;

export const keyToCell = (key: string): Cell => {
	const coords = key?.split(",")?.map(Number);
	
    return {
		x: coords[0],
		y: coords[1],
	};
};