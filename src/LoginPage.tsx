// src/pages/Auth/LoginPage.tsx

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "./schemas/authSchemas";
import type { LoginFormData } from "./schemas/authSchemas";
import { useAuth } from "./contexts/AuthContext";
import { useNavigate } from "react-router";

export default function LoginPage() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
			rememberMe: false,
		},
	});
	const { login } = useAuth();
	const navigate = useNavigate();

	const onSubmit = async (data: LoginFormData) => {
		console.log("🚀 ~ onSubmit ~ data:", data);
		try {
			await login(data);
			navigate("/dashboard");
		} catch (err) {
			const message = err instanceof Error ? err.message : "Falha ao entrar";
			alert(message);
			console.error(err);
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
			<div className="max-w-md w-full mx-auto">
				<div className="flex justify-center items-center mb-6">
					<h2 className="ml-3 text-3xl font-extrabold text-gray-900">
						Acesse sua conta
					</h2>
				</div>
				<div className="bg-white p-8 border border-gray-200 rounded-xl shadow-sm">
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
						<div>
							<label
								htmlFor="email"
								className="text-sm font-medium text-gray-700 block mb-2"
							>
								Endereço de e-mail
							</label>
							<input
								type="email"
								id="email"
								{...register("email")}
								className={`w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:ring-sky-500 focus:border-sky-500 ${
									errors.email ? "border-red-500" : "border-gray-300"
								}`}
								placeholder="seu.email@exemplo.com"
							/>
							{errors.email && (
								<p className="mt-1 text-sm text-red-600">
									{errors.email.message}
								</p>
							)}
						</div>
						<div>
							<label
								htmlFor="password"
								className="text-sm font-medium text-gray-700 block mb-2"
							>
								Senha
							</label>
							<input
								type="password"
								id="password"
								{...register("password")}
								className={`w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:ring-sky-500 focus:border-sky-500 ${
									errors.password ? "border-red-500" : "border-gray-300"
								}`}
								placeholder="••••••••"
							/>
							{errors.password && (
								<p className="mt-1 text-sm text-red-600">
									{errors.password.message}
								</p>
							)}
						</div>

						<div className="flex items-center justify-between">
							<div className="flex items-center">
								<input
									id="remember-me"
									type="checkbox"
									{...register("rememberMe")}
									className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
								/>
								<label
									htmlFor="remember-me"
									className="ml-2 block text-sm text-gray-900"
								>
									Lembrar-me
								</label>
							</div>
							<div className="text-sm">
								<a
									href="#"
									className="font-medium text-sky-600 hover:text-sky-500"
								>
									Esqueceu sua senha?
								</a>
							</div>
						</div>

						<div>
							<button
								type="submit"
								disabled={isSubmitting}
								className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{isSubmitting ? "Entrando..." : "Entrar"}
							</button>
						</div>
					</form>
					<p className="mt-6 text-center text-sm text-gray-600">
						Não tem uma conta?{" "}
						<button
							onClick={() => navigate("/register")}
							className="font-medium text-sky-600 hover:text-sky-500 cursor-pointer"
						>
							Cadastre-se
						</button>
					</p>
				</div>
			</div>
		</div>
	);
}
