import { Outlet } from "react-router";
import Header from "./components/ui/Header";

function App() {
	return (
		<div className="bg-gradient-to-t to-slate-50 from-sky-300 sm:mx-auto sm:max-w-[100rem] min-h-screen p-2 relative z-1">
			<Header />

			<div className="mt-4">
				<Outlet />
			</div>
		</div>
	);
}

export default App;
