import { Outlet } from "react-router";

function DashboardLayout() {
	return (
		<main className="bg-gradient-to-t from-slate-50 to-sky-300 sm:mx-auto sm:max-w-[100rem] min-h-screen p-2 relative z-1 pt-4">
			<div className="bg-sky-700 rounded-b-xl absolute top-0 left-0 right-0 h-1/5 z-[-1]"></div>
			<section className="flex justify-center items-center">
				<Outlet />
			</section>
		</main>
	);
}

export default DashboardLayout;
