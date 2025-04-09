'use client';
import React from 'react';

export function Text({children,...props}){
    return(
        <p className="text-center mb-6"{...props}>
            {children}
        </p>
    )
}
export default Text