'use client';
import React from 'react';

export function Alert({ children, className = "", variant = "default", ...props }) {
  const getVariantClasses = () => {
    switch (variant) {
      case "success":
        return "bg-green-500/20 border-green-500 text-green-300";
      case "warning":
        return "bg-yellow-500/20 border-yellow-500 text-yellow-300";
      case "error":
        return "bg-red-500/20 border-red-500 text-red-300";
      case "info":
        return "bg-blue-500/20 border-blue-500 text-blue-300";
      default:
        return "bg-slate-500/20 border-slate-500 text-slate-300";
    }
  };

  return (
    <div 
      className={`p-4 border rounded-lg mb-4 ${getVariantClasses()} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function AlertTitle({ children, className = "", ...props }) {
  return (
    <h5 className={`font-medium text-sm mb-1 ${className}`} {...props}>
      {children}
    </h5>
  );
}

export function AlertDescription({ children, className = "", ...props }) {
  return (
    <div className={`text-sm opacity-90 ${className}`} {...props}>
      {children}
    </div>
  );
}

export default Alert;