import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import Layout from "../components/Layout";
import { theme } from "../theme";

export const metadata = {
	title: "Asterius",
	description: "Another algorithm visualizer",
};

export default function RootLayout({ children }: { children: any }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<ColorSchemeScript defaultColorScheme="auto" />
				<link rel="shortcut icon" href="/favicon.svg" />
				<meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no" />
			</head>
			<body>
				<MantineProvider theme={theme} defaultColorScheme="auto">
					<Layout>{children}</Layout>
				</MantineProvider>
			</body>
		</html>
	);
}
