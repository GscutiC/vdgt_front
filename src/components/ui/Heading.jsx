'use client';
import React from 'react';

export function Heading({children,...props}){
    return(
        <h1 className="text-4xl font-bold mb-6 text-center" {...props}>
            {children}
        </h1>
    )
}
export default Heading