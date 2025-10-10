// vite.config.ts

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc"; // Importe o plugin do React
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
	// Adicione o plugin do React ANTES do plugin do Tailwind
	plugins: [react(), tailwindcss()],
});