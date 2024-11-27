import clsx from "clsx";
import classes from "./LogoSvg.module.css";

const LogoSvg = ({ height, width }: { height: number; width: number }) => {
	return (
		<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" height={height} width={width}>
			<polygon points="50,5 93,25 93,75 50,95 7,75 7,25" fill="currentColor" className={clsx(classes.polygon)} />
			<text
				className={clsx(classes.text)}
				x="50%"
				y="55%"
				textAnchor="middle"
				fill="currentColor"
				fontSize="40"
				dy=".3em">
				C
			</text>
		</svg>
	);
};

export default LogoSvg;
