import { ChartBarDefault } from "./components/ui/shadcn-io/bar-chart-02";
import DialogReceipt from "./components/receipts/DialogReceiptContainer";
import DataTableBackup from "./components/tables/DataTableBackup";
import { useEffect } from "react";
import { useAuth } from "./contexts/AuthContext";
import { useNavigate } from "react-router";
import { StatCard } from "./components/StatCard";
import { ArrowUpCircle, ArrowDownCircle, Wallet } from "lucide-react";

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
						<StatCard 
							title="Total Income"
							value={5240}
							change={{ value: "12%", isPositive: true }}
							bgColor="bg-primary"
							icon={<ArrowUpCircle size={20} />}
						/>
						<StatCard 
							title="Total Expenses"
							value={3890}
							change={{ value: "5%", isPositive: false }}
							bgColor="bg-secondary"
							icon={<ArrowDownCircle size={20} />}
						/>
						<StatCard 
							title="Balance"
							value={1350}
							change={{ value: "23%", isPositive: true }}
							bgColor="bg-slate-600"
							icon={<Wallet size={20} />}
						/>
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
