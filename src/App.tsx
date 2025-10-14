import Header from "./components/ui/Header";
import "./index.css";

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Importe TODAS as suas páginas aqui
import AuthPage from './AuthPage.tsx';
import About from './About.tsx';
import Dashboard from './dashboard.tsx';

// Crie o roteador com TODAS as rotas que seu site terá
const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthPage />, // Rota principal agora mostra o AuthPage (Login/Register)
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

// A função App agora apenas renderiza o provedor de rotas
function App() {
	return (
		<div className="bg-gradient-to-t from-slate-50 to-blue-200 w-screen h-screen p-2">
			<Header />
		</div>
	);
}

export default App;