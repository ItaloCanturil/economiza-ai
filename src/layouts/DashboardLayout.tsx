import { Outlet } from "react-router";

function DashboardLayout() {
	return (
		<main className="mx-auto max-w-screen-2xl px-4 md:px-6 py-4">
			<div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
				<section>
					<Outlet />
				</section>
			</div>
		</main>
	);
}

export default DashboardLayout;
