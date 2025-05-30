import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center shadow-md">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-xl font-bold">
          V
        </div>
        <span className="ml-3 text-xl font-bold">VidrioTech</span>
      </div>
      
      <div className="flex space-x-4">
        <Link href="/proyectos" className="px-4 py-2 text-gray-300 hover:text-white transition-colors">
          Proyectos
        </Link>
        <Link href="/materiales" className="px-4 py-2 text-gray-300 hover:text-white transition-colors">
          Materiales
        </Link>
        <Link href="/nuevo-proyecto" className="bg-blue-600 hover:bg-cyan-500 px-4 py-2 rounded-md text-white transition-colors">
          Nuevo Proyecto
        </Link>
      </div>
    </header>
  );
};

export default Header;