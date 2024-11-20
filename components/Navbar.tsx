"use client";
import ThemeToggle from "@/components/ThemeToggle";
import { useEffect, useState } from "react";

const Navbar = ({ className }: { className?: string | null }) => {
	const [navMenuOpen, setNavMenuOpen] = useState(false);
	const [isMobileNavMenuMounted, setIsMobileNavMenuMounted] = useState(false);
	const [isScrollY, setIsScrollY] = useState(false);

	// Effect to close the menu when the viewport is at least "md"
	useEffect(() => {
		const handleResize = () => {
			// Check if the viewport matches "md:" (min-width: 768px by default)
			if (window.matchMedia("(min-width: 768px)").matches) {
				if (navMenuOpen) {
					setNavMenuOpen(false);
				}
			}
		};

		const handleScrollDown = () => {
			// Check if the user is at the very top
			if (window.scrollY > 0) {
				setIsScrollY(true);
			} else {
				setIsScrollY(false);
			}
		};

		window.addEventListener("resize", handleResize);
		window.addEventListener("scroll", handleScrollDown);

		handleResize();
		handleScrollDown();

		// Cleanup listener on unmount
		return () => {
			window.removeEventListener("resize", handleResize);
			window.removeEventListener("scroll", handleScrollDown);
		};
	}, [navMenuOpen]);

	return (
		<header className="fixed top-0 w-full z-20">
			<nav className={`${className} ${isScrollY ? "shadow-lg" : ""} transition-shadow navbar items-center justify-between w-full bg-base-100 py-5`}>
				<button className="btn btn-square btn-ghost hover:bg-transparent">
					<svg className="h-full w-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
						<polygon points="50,5 93,25 93,75 50,95 7,75 7,25" fill="currentColor" className="text-primary" />
						<text
							className="capitalize font-semibold font-sans text-base-100"
							x="50%"
							y="55%"
							textAnchor="middle"
							fill="currentColor"
							fontSize="40"
							fontFamily="Arial"
							dy=".3em">
							C
						</text>
					</svg>
				</button>

				<button className="btn btn-square btn-ghost md:hidden" onClick={() => setNavMenuOpen(!navMenuOpen)}>
					<svg className="w-full h-full" viewBox="0 -0.5 25 25" xmlns="http://www.w3.org/2000/svg" transform="rotate(0)matrix(-1, 0, 0, 1, 0, 0)">
						<g strokeWidth="0" />
						<g strokeLinecap="round" strokeLinejoin="round" />
						<g>
							<path
								d="M5.5 7.75C5.08579 7.75 4.75 8.08579 4.75 8.5C4.75 8.91421 5.08579 9.25 5.5 9.25V7.75ZM19.5 9.25C19.9142 9.25 20.25 8.91421 20.25 8.5C20.25 8.08579 19.9142 7.75 19.5 7.75V9.25ZM5.5 11.75C5.08579 11.75 4.75 12.0858 4.75 12.5C4.75 12.9142 5.08579 13.25 5.5 13.25V11.75ZM17.5 13.25C17.9142 13.25 18.25 12.9142 18.25 12.5C18.25 12.0858 17.9142 11.75 17.5 11.75V13.25ZM5.5 15.75C5.08579 15.75 4.75 16.0858 4.75 16.5C4.75 16.9142 5.08579 17.25 5.5 17.25V15.75ZM12.5 17.25C12.9142 17.25 13.25 16.9142 13.25 16.5C13.25 16.0858 12.9142 15.75 12.5 15.75V17.25ZM5.5 9.25H19.5V7.75H5.5V9.25ZM5.5 13.25H17.5V11.75H5.5V13.25ZM5.5 17.25H12.5V15.75H5.5V17.25Z"
								fill="currentColor"
							/>
						</g>
					</svg>
				</button>

				<ul className="hidden md:flex gap-x-12 items-center">
					<li className="h-full flex items-center">
						<ThemeToggle />
					</li>
				</ul>

				{/* Backdrop Overlay */}
				{navMenuOpen && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-10 md:hidden" onClick={() => setNavMenuOpen(false)} />}

				{/* Mobile Menu */}
				<div
					className={`fixed top-0 right-0 h-full w-2/3 bg-base-100 shadow-lg z-20 ${
						isMobileNavMenuMounted ? "transition-transform duration-300 ease-in-out" : ""
					} ${navMenuOpen ? "translate-x-0 transition-transform duration-300 ease-in-out" : "translate-x-full"}  md:hidden`}>
					<div className="w-full h-full">
						<div
							className={`${className} text-end w-full`}
							onClick={() => {
								setIsMobileNavMenuMounted(true);
								setNavMenuOpen(!navMenuOpen);
							}}>
							<button className="btn btn-square btn-ghost md:hidden" onClick={() => setNavMenuOpen(!navMenuOpen)}>
								<svg className="h-full w-full" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
									<path
										d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"
										fill="currentColor"
									/>
								</svg>
							</button>
						</div>
						<ul className="flex flex-col items-center justify-start gap-12">
							<li>
								<ThemeToggle />
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
