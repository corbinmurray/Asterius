import Maze from "@/components/Maze";

export default function Home() {
	return (
		<>
			<section>
				<div className="w-full h-screen flex justify-center items-center">
					<Maze columns={5} rows={5} cellSize={75} />
				</div>
			</section>
		</>
	);
}
