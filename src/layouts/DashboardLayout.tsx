import { Outlet } from "react-router";

function DashboardLayout() {
	return (
		<main className="sm:mx-auto sm:max-w-[100rem] p-2 relative z-1 pt-4">
			{/* <div className="bg-sky-700 rounded-b-xl absolute top-0 left-0 right-0 h-1/5 z-[-1]"></div> */}
			<section>
				<Outlet />
			</section>
		</main>
	);
}

export default DashboardLayout;
