import React from "react";

export function UniversitySeal({ size = 30, className = "" }: { size?: number, className?: string }) {
  const rays = Array.from({ length: 16 }, (_, i) => {
    const angle = (i * 360) / 16;
    return (
      <line
        key={i}
        x1="16"
        y1="16"
        x2="16"
        y2="5"
        stroke="currentColor"
        strokeWidth="1"
        opacity={i % 2 === 0 ? 0.9 : 0.5}
        transform={`rotate(${angle} 16 16)`}
      />
    );
  });
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={`shrink-0 ${className}`}>
      <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="0.75" opacity={0.6} />
      {rays}
      <circle cx="16" cy="16" r="2.5" fill="currentColor" />
    </svg>
  );
}
