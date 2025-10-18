import { Outlet } from "react-router";
import Header from "./components/ui/Header";

function App() {
	return (
		<div className="bg-slate-100 sm:mx-auto sm:max-w-[100rem] min-h-screen p-2 relative z-1">
			<Header />

			<div className="mt-4">
				<Outlet />
			</div>
		</div>
	);
}

export default App;
