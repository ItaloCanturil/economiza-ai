import { Outlet } from "react-router";

function DashboardLayout() {
	return (
		<main className="sm:mx-auto sm:max-w-[100rem] min-h-screen p-2">
			<div className="bg-sky-300 rounded-b-xl absolute top-0 left-0 right-0 h-1/2 z-[-1]"></div>
			<section>
				<Outlet />
			</section>
		</main>
	);
}

export default DashboardLayout;
