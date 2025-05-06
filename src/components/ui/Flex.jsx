'use client';
import React from 'react';

export function Flex({children, className, justify = "between", ...props}){
    return(
        <div 
            className={`flex items-center justify-${justify} mb-0 ${className || ''}`}
            {...props}
        >
            {children}
        </div>
    )
}
export default Flex;