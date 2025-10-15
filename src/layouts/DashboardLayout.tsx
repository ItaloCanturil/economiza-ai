import { Outlet } from "react-router";

function DashboardLayout() {
	return (
		<main className="sm:mx-auto sm:max-w-[100rem] min-h-screen p-2">
			<section>
				<Outlet />
			</section>
		</main>
	);
}

export default DashboardLayout;
