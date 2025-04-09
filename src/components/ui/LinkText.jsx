'use client';
import React from 'react';
import Link from 'next/link';

export function LinkText({href,children,...props}){
    return(
        <Link href={href} className="text-cyan-400 text-sm hover:underline" {...props}>
              {children}
        </Link>
    )
}
export default LinkText