'use client';
import React from 'react';

export function FormGroup({ children, className, spacing = "medium", ...props }) {
  const spacingClasses = {
    small: "mb-2",
    medium: "mb-4",
    large: "mb-6"
  };
  
  const spacingClass = spacingClasses[spacing] || spacingClasses.medium;
  
  return (
    <div 
      className={`${spacingClass} ${className || ''}`} 
      {...props}
    >
      {children}
    </div>
  );
}

export default FormGroup;