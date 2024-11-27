import { Button } from "@mantine/core";
import classes from "./page.module.css";

export default function HomePage() {
	return (
		<>
			<section className={classes.section}>
				<div>hello</div>
				<Button variant="filled">Hello</Button>
			</section>
		</>
	);
}
