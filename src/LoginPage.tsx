// src/pages/Auth/LoginPage.tsx

import React, { useState } from 'react';

// Um ícone simples de cadeado como um componente React
const LockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-indigo-500"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 2a4 4 0 00-4 4v2H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-1V6a4 4 0 00-4-4zm2 6V6a2 2 0 10-4 0v2h4z"
      clipRule="evenodd"
    />
  </svg>
);


export default function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Lógica de autenticação aqui
    alert(`Tentando login com: ${email}`);
    console.log({ email, password });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full mx-auto">
        <div className="flex justify-center items-center mb-6">
          <LockIcon />
          <h2 className="ml-3 text-3xl font-extrabold text-gray-900">
            Acesse sua conta
          </h2>
        </div>
        <div className="bg-white p-8 border border-gray-200 rounded-xl shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="seu.email@exemplo.com"
                required
              />
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input 
                  id="remember-me" 
                  name="remember-me" 
                  type="checkbox" 
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" 
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Lembrar-me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Esqueceu sua senha?
                </a>
              </div>
            </div>

            <div>
              <button 
                type="submit" 
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                Entrar
              </button>
            </div>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600">
            Não tem uma conta?{' '}
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
              Cadastre-se
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}