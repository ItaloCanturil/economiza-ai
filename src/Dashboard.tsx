import { ChartBarDefault } from "./components/ui/shadcn-io/bar-chart-02";
import DialogReceipt from "./components/receipts/DialogReceiptContainer";
import DataTableBackup from "./components/tables/DataTableBackup";
import { useEffect } from "react";
import { useAuth } from "./contexts/AuthContext";
import { useNavigate } from "react-router";
import { StatCard } from "./components/StatCard";
import { ArrowUpCircle, ArrowDownCircle, Wallet } from "lucide-react";
import { useDashboard } from "./contexts/dashboard-context";
import DialogRecipeContainer from "./components/recipe/DialogRecipeContainer";

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
	const { totals, tableRows } = useDashboard();

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
					<div className="flex gap-2 items-center">
						<DialogRecipeContainer />
						<DialogReceipt />
					</div>
				</div>
			</section>
			<section className="mt-4 grid grid-cols-1 gap-4 rounded-2xl sm:grid-cols-2">
				<DataTableBackup data={tableRows} />
				<div className="bg-white p-2 px-4 rounded-2xl shadow-md">
					<div className="mt-6 flex flex-wrap justify-center gap-2 sm:gap-4">
						<StatCard
							title="Total Receitas"
							value={totals.totalIncome}
							change={{ value: "12%", isPositive: true }}
							bgColor="bg-primary"
							icon={<ArrowUpCircle size={20} />}
						/>
						<StatCard
							title="Total Gasto"
							value={totals.totalExpense}
							change={{ value: "5%", isPositive: false }}
							bgColor="bg-secondary"
							icon={<ArrowDownCircle size={20} />}
						/>
						<StatCard
							title="Saldo"
							value={totals.balance}
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
