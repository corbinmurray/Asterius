import Maze from "@/components/Maze";

export default function Home() {
	return (
		<>
			<section>
				<div className="w-full h-screen flex justify-center items-center">
					<Maze columns={10} rows={10} cellSize={50} />
				</div>
			</section>
		</>
	);
}
