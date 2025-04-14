'use client';
import React from 'react';
import Link from 'next/link';

export function LinkText({href,children,...props}){
    return(
        <Link href={href} className="text-slate-300 text-xs hover:text-white transition-colors" {...props}>
              {children}
        </Link>
    )
}
export default LinkText