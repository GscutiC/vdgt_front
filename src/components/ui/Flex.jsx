'use client';
import React from 'react';

export function Flex({ 
  children, 
  direction = "row", 
  justify = "start", 
  align = "start", 
  gap = "0", 
  className, 
  ...props 
}) {
  const directions = {
    row: "flex-row",
    column: "flex-col",
    rowReverse: "flex-row-reverse",
    columnReverse: "flex-col-reverse"
  };
  
  const justifyOptions = {
    start: "justify-start",
    end: "justify-end",
    center: "justify-center",
    between: "justify-between",
    around: "justify-around",
    evenly: "justify-evenly"
  };
  
  const alignOptions = {
    start: "items-start",
    end: "items-end",
    center: "items-center",
    baseline: "items-baseline",
    stretch: "items-stretch"
  };
  
  const gapOptions = {
    "0": "gap-0",
    "1": "gap-1",
    "2": "gap-2",
    "4": "gap-4",
    "6": "gap-6",
    "8": "gap-8",
    "10": "gap-10",
    "12": "gap-12"
  };
  
  const directionClass = directions[direction] || directions.row;
  const justifyClass = justifyOptions[justify] || justifyOptions.start;
  const alignClass = alignOptions[align] || alignOptions.start;
  const gapClass = gapOptions[gap] || gapOptions["0"];
  
  return (
    <div 
      className={`flex ${directionClass} ${justifyClass} ${alignClass} ${gapClass} ${className || ''}`} 
      {...props}
    >
      {children}
    </div>
  );
}

export default Flex;