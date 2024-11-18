"use client";
import * as d3 from "d3";
import { useEffect, useRef } from "react";

const Maze = ({ columns, rows, cellSize }: { columns: number; rows: number; cellSize: number }) => {
	const svgRef = useRef<SVGSVGElement | null>(null);

	useEffect(() => {
		const height = rows * cellSize;
		const width = rows * cellSize;

		const svg = d3.select(svgRef.current).attr("width", width).attr("height", height).attr("class", "");

		// Generate grid data
		const gridData = [];
		for (let row = 0; row < rows; row++) {
			for (let col = 0; col < columns; col++) {
				gridData.push({ x: col * cellSize, y: row * cellSize });
			}
		}

		// Bind data and draw grid cells
		svg
			.selectAll("rect")
			.data(gridData)
			.join("rect")
			.attr("x", (d) => d.x)
			.attr("y", (d) => d.y)
			.attr("width", cellSize)
			.attr("height", cellSize)
			.attr("class", "fill-primary stroke-primary-content cursor-pointer hover:fill-secondary hover:stroke-secondary-content transition-[fill] duration-100 ease-in-out");

	}, [columns, rows, cellSize]);

	return <svg ref={svgRef}></svg>;
};

export default Maze;
