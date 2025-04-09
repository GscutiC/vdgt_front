'use client';
import React from 'react';

export function Text({children,...props}){
    return(
        <p className=" mb-6 text-center"{...props}>
            {children}
        </p>
    )
}
export default Text