"use client";
import * as d3 from "d3";
import { useEffect, useRef } from "react";

/**
 * Component for generating a maze, displaying the maze, and displaying the A* algorithm in real-time
 *
 * @component
 * @example
 * return (
 * 	<Maze columns={10} rows ={10} cellSizeInPx={50} />
 * )
 */
const Maze = ({ columns, rows, cellSizeInPx }: { columns: number; rows: number; cellSizeInPx: number }) => {
	const svgRef = useRef<SVGSVGElement | null>(null);

	useEffect(() => {
		const height = rows * cellSizeInPx;
		const width = rows * cellSizeInPx;

		const svg = d3.select(svgRef.current).attr("width", width).attr("height", height);

		// Generate grid data
		const gridData = [];
		for (let row = 0; row < rows; row++) {
			for (let col = 0; col < columns; col++) {
				gridData.push({ x: col * cellSizeInPx, y: row * cellSizeInPx });
			}
		}

		// Bind data and draw grid cells
		svg
			.selectAll("rect")
			.data(gridData)
			.join("rect")
			.attr("x", (d) => d.x)
			.attr("y", (d) => d.y)
			.attr("width", cellSizeInPx)
			.attr("height", cellSizeInPx)
			.attr(
				"class",
				"fill-primary stroke-primary-content cursor-pointer hover:fill-secondary hover:stroke-secondary-content transition-[fill] duration-100 ease-in-out"
			);
	}, [columns, rows, cellSizeInPx]);

	return <svg ref={svgRef}></svg>;
};

export default Maze;
