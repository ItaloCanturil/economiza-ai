import { useNavigate } from "react-router";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { ChevronRight } from "lucide-react";

function Home() {
	const navigate = useNavigate();

	return (
		<div className="min-h-screen flex flex-col mt-20">
			<section className="flex-1 flex flex-col justify-end container mx-auto px-4 pb-24 h-[calc(100vh-73px)]">
				<div className="max-w-2xl mb-24 flex flex-col items-center justify-center mx-auto">
					<h2 className="text-5xl md:text-6xl font-bold leading-tight mb-6 text-center">
						A maneira mais fácil de gerenciar suas despesas.
					</h2>
					<Button
						onClick={() => navigate("/register")}
						className="text-white px-8 py-6 text-lg font-medium flex items-center gap-2 rounded-xl"
					>
						Experimentar
						<ChevronRight className="w-5 h-5" />
					</Button>
				</div>
			</section>

			{/* Email Capture Section */}
			<section className="py-24">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto text-center">
						<h3 className="text-3xl font-bold mb-6">
							Comece a controlar suas finanças hoje
						</h3>
						<p className="text-slate-300 mb-8">
							Junte-se a milhares de pessoas que já estão economizando e
							gerenciando melhor seu dinheiro.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
							<Input
								type="email"
								placeholder="Seu melhor e-mail"
								className="bg-slate-700 border-slate-600 text-white"
							/>
							<Button className="bg-cyan-500 hover:bg-cyan-600 whitespace-nowrap">
								Inscrever-se
							</Button>
						</div>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="border-t border-slate-800 py-8">
				<div className="container mx-auto px-4 text-center text-slate-400 text-sm">
					© 2025 EconomizaAI. Todos os direitos reservados.
				</div>
			</footer>
		</div>
	);
}

export default Home;
