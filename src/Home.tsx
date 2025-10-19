import { Link } from 'react-router';
import { Button } from './components/ui/button';
import { PiggyBank, LogIn, UserPlus } from 'lucide-react';

function Home() {
  const handleComecarAgora = () => {
    // Navegar para página de registro
    window.location.href = '/register';
  };

  const handleSaibaMais = () => {
    // Scroll para seção sobre ou navegar para página específica
    console.log('Saiba mais clicado');
  };

  return (
    <div className="bg-slate-700 text-white min-h-screen flex flex-col items-center justify-center relative">
      {/* Header */}
      <header className="absolute top-5 left-10 flex items-center gap-2.5">
        <PiggyBank className="w-7 h-7 text-cyan-400" />
        <h1 className="text-xl font-semibold text-white">EconomizaAÍ</h1>
      </header>

      {/* Navigation */}
      <nav className="absolute top-5 right-10 flex gap-4">
        <Link 
          to="/login" 
          className="text-white font-medium hover:text-cyan-400 transition-colors duration-300"
        >
          <LogIn className="w-4 h-4 inline mr-1" />
          Entrar
        </Link>
        <Link to="/register">
          <Button 
            variant="default" 
            size="sm"
            className="bg-cyan-400 text-black hover:bg-cyan-300 px-4 py-2 rounded-full font-semibold"
          >
            <UserPlus className="w-4 h-4 mr-1" />
            Cadastre-se
          </Button>
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="max-w-4xl mt-24 text-center">
        <h2 className="text-5xl font-bold leading-tight mb-5">
          Conquiste Sua Liberdade Financeira
        </h2>
        <p className="text-lg text-slate-300 mb-10">
          Nosso sistema ajuda jovens e profissionais autônomos a controlar suas finanças, 
          alcançar metas e construir um futuro seguro.
        </p>
        <div className="flex justify-center gap-5">
          <Button 
            onClick={handleComecarAgora}
            className="bg-cyan-400 text-black hover:bg-cyan-300 px-8 py-3 rounded-full text-base font-semibold"
          >
            Começar Agora
          </Button>
          <Button 
            variant="secondary"
            onClick={handleSaibaMais}
            className="bg-slate-600 text-white hover:bg-slate-500 px-8 py-3 rounded-full text-base font-semibold"
          >
            Saiba Mais
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="absolute bottom-5 text-slate-400 text-sm">
        © 2025 EconomizaAÍ. Todos os direitos reservados.
      </footer>
    </div>
  );
}

export default Home;