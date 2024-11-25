import Navbar from "@/components/Navbar";
import { THEMES } from "@/lib/constants";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "Asterius - A* Algorithm Visualizer",
	description: "An A* algorithm visualizer created by Corbin Murray",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" data-theme={THEMES.DARK} className="scroll-smooth">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<Navbar className="px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 py-2" />
				<main>
					<section className="container mx-auto p-3">{children}</section>
				</main>
			</body>
		</html>
	);
}
