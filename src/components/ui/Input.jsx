'use client';
import React from 'react';

export function Input(props){
    return (
        <input
            className="w-full p-3 bg-white text-slate-800 rounded"
            {...props} 
        />
    );
}
export default Input