import { Outlet } from "react-router";
import Header from "./components/ui/Header";
import "./index.css";

function App() {
	return (
		<div className="bg-gradient-to-t from-slate-50 to-blue-200 sm:mx-auto sm:max-w-[100rem] min-h-screen p-2">
			<Header />

			<div className="mt-4">
				<Outlet />
			</div>
		</div>
	);
}

export default App;
