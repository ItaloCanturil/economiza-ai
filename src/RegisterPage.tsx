// src/pages/Auth/RegisterPage.tsx

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "./schemas/authSchemas";
import type { RegisterFormData } from "./schemas/authSchemas";
import { useAuth } from "./contexts/AuthContext";
import { useNavigate } from "react-router";

export default function RegisterPage() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
			terms: false,
		},
	});
	const { register: registerUser } = useAuth();
	const navigate = useNavigate();

	const onSubmit = async (data: RegisterFormData) => {
		try {
			await registerUser({
				name: data.name,
				email: data.email,
				password: data.password,
			});
			navigate("/dashboard");
		} catch (err) {
			const message = err instanceof Error ? err.message : "Falha ao registrar";
			alert(message);
			console.error(err);
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
			<div className="max-w-md w-full mx-auto">
				<div className="flex justify-center items-center mb-6">
					<h2 className="ml-3 text-3xl font-extrabold text-gray-900">
						Criar conta
					</h2>
				</div>
				<div className="bg-white p-8 border border-gray-200 rounded-xl shadow-sm">
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
						<div>
							<label
								htmlFor="name"
								className="text-sm font-medium text-gray-700 block mb-2"
							>
								Nome completo
							</label>
							<input
								type="text"
								id="name"
								{...register("name")}
								className={`w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 ${
									errors.name ? "border-red-500" : "border-gray-300"
								}`}
								placeholder="Seu nome completo"
							/>
							{errors.name && (
								<p className="mt-1 text-sm text-red-600">
									{errors.name.message}
								</p>
							)}
						</div>

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
								className={`w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 ${
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
								className={`w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 ${
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

						<div>
							<label
								htmlFor="confirmPassword"
								className="text-sm font-medium text-gray-700 block mb-2"
							>
								Confirmar senha
							</label>
							<input
								type="password"
								id="confirmPassword"
								{...register("confirmPassword")}
								className={`w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 ${
									errors.confirmPassword ? "border-red-500" : "border-gray-300"
								}`}
								placeholder="••••••••"
							/>
							{errors.confirmPassword && (
								<p className="mt-1 text-sm text-red-600">
									{errors.confirmPassword.message}
								</p>
							)}
						</div>

						<div className="flex items-center">
							<input
								id="terms"
								type="checkbox"
								{...register("terms")}
								className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
							/>
							<label
								htmlFor="terms"
								className="ml-2 block text-sm text-gray-900"
							>
								Eu aceito os{" "}
								<a href="#" className="text-indigo-600 hover:text-indigo-500">
									termos de uso
								</a>{" "}
								e{" "}
								<a href="#" className="text-indigo-600 hover:text-indigo-500">
									política de privacidade
								</a>
							</label>
						</div>
						{errors.terms && (
							<p className="text-sm text-red-600">{errors.terms.message}</p>
						)}

						<div>
							<button
								type="submit"
								disabled={isSubmitting}
								className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{isSubmitting ? "Criando conta..." : "Criar conta"}
							</button>
						</div>
					</form>
					<p className="mt-6 text-center text-sm text-gray-600">
						Já tem uma conta?{" "}
						<button
							onClick={() => navigate("/login")}
							className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
						>
							Faça login
						</button>
					</p>
				</div>
			</div>
		</div>
	);
}
