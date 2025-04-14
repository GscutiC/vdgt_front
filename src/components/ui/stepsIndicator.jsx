'use client';
import React from 'react';

export function StepsIndicator({ currentStep, steps = 3, className, ...props }) {
  return (
    <div className={`flex justify-between mb-6 mt-4 ${className || ''}`} {...props}>
      {Array.from({ length: steps }).map((_, index) => {
        const stepNumber = index + 1;
        const isActive = currentStep >= stepNumber;
        const isLastStep = stepNumber === steps;
        
        return (
          <div
            key={stepNumber}
            className={`flex-1 text-center relative ${isActive ? 'text-blue-500' : 'text-gray-400'}`}
          >
            <div
              className={`w-6 h-6 mx-auto mb-2 rounded-full flex items-center justify-center relative z-10 ${
                isActive ? 'bg-blue-500' : 'bg-gray-700'
              }`}
            >
              <span className="text-xs text-white">{stepNumber}</span>
            </div>
            <div className={`text-xs ${isActive ? 'font-medium' : ''}`}>
              {stepNumber === 1 && 'Datos'}
              {stepNumber === 2 && 'Rostro'}
              {stepNumber === 3 && 'Verificar'}
            </div>
            {!isLastStep && (
              <div 
                className={`absolute top-3 left-1/2 w-full h-0.5 ${
                  isActive && currentStep > stepNumber ? 'bg-blue-500' : 'bg-gray-700'
                } -z-0`}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default StepsIndicator;