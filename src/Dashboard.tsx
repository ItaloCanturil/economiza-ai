import { ChartBarDefault } from "./components/ui/shadcn-io/bar-chart-02";
import DialogReceipt from "./components/dialog-receipt";

const getGreeting = (): string => {
	const currentHour = new Date().getHours();

	if (currentHour >= 5 && currentHour < 12) {
		return "Good Morning";
	} else if (currentHour >= 12 && currentHour < 18) {
		return "Good Afternoon";
	} else {
		return "Good Evening";
	}
};

const dashboard = () => {
	const greeting = getGreeting();

	return (
		<div className="sm:flex flex-col items-center justify-center">
			<div className="text-lg flex justify-between items-center w-full max-w-[82rem]">
				<h1>{greeting}, User!</h1>
				<DialogReceipt />
			</div>

			<section className="mt-4">
				<ChartBarDefault />
			</section>
		</div>
	);
};

export default dashboard;
