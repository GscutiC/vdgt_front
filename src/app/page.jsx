import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="text-4xl font-bold mb-8">Aqui estara la pagina inicial</div>
      <Link 
        href="/auth/sign-in" 
        className="px-6 py-3 text-white rounded-md hover:bg-white-700 transition-colors"
      >
        Iniciar Sesión
      </Link>
    </div>
  );
}
