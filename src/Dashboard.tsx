import { ChartBarDefault } from "./components/ui/shadcn-io/bar-chart-02";
import DialogReceipt from "./components/receipts/DialogReceiptContainer";
import DataTableContainer from "./components/tables/DataTableContainer";

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
		<div className="sm:flex flex-col items-center justify-center sm:max-w-4xl">
			<section className="flex flex-col gap-4 items-center w-full">
				<div className="text-lg flex justify-between items-center w-full max-w-[82rem]">
					<h1 className="text-white">{greeting}, User!</h1>
					<DialogReceipt />
				</div>

			<div className="bg-slate-200 rounded-2xl p-2 fit-content text-red-600">
				R$-20000
			</div>
			</section>

			<section className="mt-8 flex flex-col md:flex-row gap-4 bg-slate-200 rounded-2xl p-4">
				<DataTableContainer />{" "}
				<ChartBarDefault />
			</section>
		</div>
	);
};

export default dashboard;
