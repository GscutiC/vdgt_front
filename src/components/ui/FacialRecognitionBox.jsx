'use client';
import React from 'react';

export function FacialRecognitionBox({ 
  children,
  statusText,
  showProgressBar = false,
  progressColor = "cyan",
  progressValue = 50,
  borderColor = "cyan-400",
  className,
  ...props 
}) {
  return (
    <div className="my-8 w-full" {...props}>
      <div className={`border-2 border-dashed border-${borderColor} p-4 bg-gray-800 rounded-md`}>
        <div className="grid grid-cols-4 gap-2">
          <div className="col-span-1"></div>
          <div className="col-span-2 flex flex-col items-center justify-center h-52 relative">
            <span className="text-gray-400 text-sm mb-2">64 × 64</span>
            
            <div className="text-center">
              {children}
            </div>
            
            {showProgressBar && (
              <div className="w-full mt-4 relative">
                <div className="bg-gray-600 h-1 w-full rounded-full">
                  <div 
                    className={`bg-${progressColor}-400 h-1 rounded-full`}
                    style={{ width: `${progressValue}%` }}
                  ></div>
                </div>
              </div>
            )}
            
            {statusText && (
              <span className="text-gray-400 text-xs mt-2">{statusText}</span>
            )}
          </div>
          <div className="col-span-1"></div>
        </div>
      </div>
    </div>
  );
}

export default FacialRecognitionBox;