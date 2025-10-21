import { useEffect, useState, type ReactNode } from "react";
import { motion, useSpring } from "motion/react";

export interface StatCardProps {
	title: string;
	value: number;
	change: {
		value: string;
		isPositive: boolean;
	};
	bgColor: string;
	icon?: ReactNode;
}

export function StatCard({
	title,
	value,
	change,
	bgColor,
	icon,
}: StatCardProps) {
	const [displayNumb, setDisplayNumb] = useState(0);

	const springNumbCounter = useSpring(0, {
		bounce: 0,
		duration: 1000,
	});

	springNumbCounter.on("change", (value) => {
		setDisplayNumb(Math.round(value));
	});

	useEffect(() => {
		springNumbCounter.set(value);
	}, [value, springNumbCounter]);

	const formattedValue = new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL",
	}).format(displayNumb);

	return (
		<div
			className={`${bgColor} text-white p-4 rounded-lg shadow-md min-w-[200px]`}
		>
			<div className="flex justify-between items-start">
				<h3 className="text-xl font-bold mb-2">{title}</h3>
				{icon && <div className="text-white/80">{icon}</div>}
			</div>
			<motion.p
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1 }}
				className="text-3xl font-semibold"
			>
				{formattedValue}
			</motion.p>
			<p
				className={`mt-2 text-sm ${
					change.isPositive ? "text-green-200" : "text-red-200"
				}`}
			>
				{change.isPositive ? "+" : "-"}
				{change.value} from last month
			</p>
		</div>
	);
}
