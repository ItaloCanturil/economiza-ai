import { ChartBarDefault } from "./components/ui/shadcn-io/bar-chart-02";
import DialogReceipt from "./components/receipts/DialogReceiptContainer";
import DataTableContainer from "./components/tables/DataTableContainer";
import DataTableBackup from "./components/tables/DataTableBackup";
import { useEffect } from "react";
import { useAuth } from "./contexts/AuthContext";
import { useNavigate } from "react-router";

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

const Dashboard = () => {
	const greeting = getGreeting();
	const { isAuthenticated, isUserLoading, refreshMe, user } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated) {
			refreshMe();
		} else if (!isUserLoading) {
			navigate("/", { replace: true });
		}
	}, [isAuthenticated, isUserLoading, refreshMe, navigate]);

	return (
		<div className="sm:max-w-7xl mx-auto">
			<section className="flex flex-col gap-4 items-center w-full">
				<div className="text-lg flex justify-between items-center w-full max-w-[82rem]">
					<h1>
						{greeting}, {user?.name ?? "User"}!
					</h1>
					<DialogReceipt />
				</div>
			</section>
			<section className="mt-4 grid grid-cols-1 gap-4 rounded-2xl sm:grid-cols-2">
				<DataTableBackup data={[]} />
				<div className="bg-white p-2 px-4 rounded-2xl shadow-md">
					<div className="mt-6 flex flex-wrap justify-center gap-2 sm:gap-4">
						<div className="bg-primary text-white p-4 rounded-lg shadow-md">
							<h3 className="text-xl font-bold mb-2">Total Income</h3>
							<p className="text-3xl font-semibold">$5,240</p>
							<p className="mt-2 text-sm opacity-80">+12% from last month</p>
						</div>
						<div className="bg-secondary text-white p-4 rounded-lg shadow-md">
							<h3 className="text-xl font-bold mb-2">Total Expenses</h3>
							<p className="text-3xl font-semibold">$3,890</p>
							<p className="mt-2 text-sm opacity-80">-5% from last month</p>
						</div>
						<div className="bg-slate-600 text-white p-4 rounded-lg shadow-md">
							<h3 className="text-xl font-bold mb-2">Balance</h3>
							<p className="text-3xl font-semibold">$1,350</p>
							<p className="mt-2 text-sm opacity-80">+23% from last month</p>
						</div>
					</div>
					<div>
						<ChartBarDefault />
					</div>
				</div>
			</section>
		</div>
	);
};

export default Dashboard;
