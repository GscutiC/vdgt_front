"use client";

import React, { useState } from 'react';
import { FiBell } from 'react-icons/fi';

export default function Header() {
  const [notificationCount, setNotificationCount] = useState(3);
  
  return (
    <header className="bg-gray-800 shadow-md z-10">
      <div className="flex items-center justify-between h-16 px-6">
        <h1 className="text-2xl font-bold">Dashboard Principal</h1>
        <div className="flex items-center space-x-6">
          <div className="relative">
            <button className="relative p-1 text-gray-400 hover:text-white focus:outline-none">
              <FiBell className="w-6 h-6" />
              {notificationCount > 0 && (
                <span className="absolute top-0 right-0 -mt-1 -mr-1 flex items-center justify-center h-5 w-5 rounded-full bg-red-500 text-xs font-medium text-white">
                  {notificationCount}
                </span>
              )}
            </button>
          </div>
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-medium">
              A
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-gray-400">Administrador</p>
            </div>
          </div>
        </div>
      </div>
      <div className="h-2 bg-gray-800 relative">
        <svg className="absolute bottom-0 w-full h-2" preserveAspectRatio="none" viewBox="0 0 1440 24">
          <path 
            fill="#111827" 
            fillOpacity="1" 
            d="M0,0 C480,40 960,40 1440,0 L1440,24 L0,24 Z"
          ></path>
        </svg>
      </div>
    </header>
  );
}