"use client";

import { createTheme, MantineThemeOverride } from "@mantine/core";

const corporateTheme: MantineThemeOverride = {
	white: "#ffffff",
	black: "#181a2a",
	colors: {
		primary: ["#e7eeff", "#ced8ff", "#9aaeff", "#6381ff", "#365bff", "#1843ff", "#0236ff", "#0029e5", "#0024ce", "#001eb5"],
		secondary: ["#ebf5ff", "#dee7f3", "#becbdd", "#9caec7", "#8096b5", "#6d87aa", "#637fa6", "#516d92", "#466184", "#375377"],
		accent: ["#e5fdf3", "#d6f4e8", "#b2e6d0", "#8ad8b7", "#69cca1", "#53c493", "#45c18c", "#34aa78", "#28976a", "#128359"],
		neutral: ["#f2f3f8", "#e2e3e8", "#c1c3d3", "#9fa2be", "#8286ac", "#6f74a2", "#656b9e", "#555a8a", "#4b507c", "#3f446e"],
		info: ["#dffbff", "#caf2ff", "#99e2ff", "#64d2ff", "#3cc4fe", "#23bcfe", "#09b8ff", "#00a1e4", "#008fcd", "#007cb6"],
		success: ["#ebfff8", "#d6fdef", "#a7fdde", "#76fdcc", "#55fdbc", "#45fdb2", "#3cfdad", "#31e297", "#23c985", "#00ad71"],
		warning: ["#fffae1", "#fff3cb", "#ffe69a", "#ffd864", "#ffcc38", "#ffc41c", "#ffc009", "#e3a900", "#ca9600", "#af8100"],
		error: ["#ffe7e9", "#ffced1", "#ff9ba1", "#ff646d", "#fe3741", "#fe1b25", "#ff0916", "#e4000b", "#cb0007", "#b20003"],
	},
	primaryColor: "primary", // Maps Mantine's primary color to DaisyUI's primary
	fontFamily: "Inter, sans-serif", // Default font used by DaisyUI
	headings: { fontFamily: "Inter, sans-serif" },
};

export const theme = createTheme(corporateTheme);
