'use client';
import React from 'react';

export function StepsIndicator({ currentStep, steps = 3, className, ...props }) {
  return (
    <div className={`flex gap-2 mb-0 mt-4 ${className || ''}`} {...props}>
      {Array.from({ length: steps }).map((_, index) => {
        const stepNumber = index + 1;
        const isActive = currentStep >= stepNumber;
        
        return (
          <div
            key={stepNumber}
            className={`h-2 flex-1 rounded-md ${
              isActive ? 'bg-teal-600' : 'bg-gray-200'
            }`}
          />
        );
      })}
    </div>
  );
}

export default StepsIndicator;