import { THEMES } from "./lib/constants";
import daisyui from "daisyui";
import type { Config } from "tailwindcss";

export default {
	content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
			},
		},
	},
	plugins: [daisyui],
	daisyui: {
		themes: [THEMES.LIGHT, THEMES.DARK],
	},
} satisfies Config;
