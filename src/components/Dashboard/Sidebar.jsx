"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FiBriefcase, FiUsers, FiCpu, FiFileText, 
  FiSettings, FiLogOut, FiBarChart2
} from 'react-icons/fi';

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { 
      name: 'Dashboard', 
      icon: <FiBarChart2 className="w-5 h-5" />, 
      href: '/auth/dashboard',
      active: pathname === '/auth/dashboard'
    },
    { 
      name: 'Proyectos', 
      icon: <FiBriefcase className="w-5 h-5" />, 
      href: '/auth/proyectos',
      active: pathname === '/auth/proyectos'
    },
    { 
      name: 'Trabajadores', 
      icon: <FiUsers className="w-5 h-5" />, 
      href: '/auth/trabajadores',
      active: pathname === '/auth/trabajadores'
    },
    { 
      name: 'Cotización AI', 
      icon: <FiCpu className="w-5 h-5" />, 
      href: '/auth/cotizacion',
      active: pathname === '/auth/cotizacion'
    },
    { 
      name: 'Reportes', 
      icon: <FiFileText className="w-5 h-5" />, 
      href: '/auth/reportes',
      active: pathname === '/auth/reportes'
    },
    { 
      name: 'Configuración', 
      icon: <FiSettings className="w-5 h-5" />, 
      href: '/auth/configuracion',
      active: pathname === '/auth/configuracion'
    },
  ];

  return (
    <aside className="w-64 flex-shrink-0 bg-gray-800 flex flex-col shadow-lg z-10">
      <div className="px-6 py-6 flex items-center border-b border-gray-700">
        <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-xl font-bold">
          V
        </div>
        <span className="ml-3 text-xl font-bold">VidrioTech</span>
      </div>
      <nav className="flex-1 px-4 py-4">
        <ul className="space-y-1">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link href={item.href}>
                <div className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                  item.active 
                  ? 'bg-cyan-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}>
                  <span className="mr-3">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700">
        <Link href="/logout">
          <div className="flex items-center px-4 py-3 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700 transition-colors">
            <FiLogOut className="w-5 h-5 mr-3" />
            <span>Cerrar Sesión</span>
          </div>
        </Link>
      </div>
    </aside>
  );
}