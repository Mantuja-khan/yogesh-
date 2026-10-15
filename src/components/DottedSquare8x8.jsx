import React from "react";

/**
 * 8x8 Dotted Square Component
 * Renders an exact 8x8 grid of dots (64 circular dots).
 * Clean, scalable SVG for architectural and high-end studio aesthetic.
 */
export function DottedSquare8x8({
  size = 72,
  className = "",
  style = {},
  dotColor = "currentColor",
  dotRadius = 1.6,
}) {
  const dots = [];
  const spacing = 9.5;
  const offset = 4;

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      dots.push(
        <circle
          key={`${row}-${col}`}
          cx={offset + col * spacing}
          cy={offset + row * spacing}
          r={dotRadius}
          fill={dotColor}
        />,
      );
    }
  }

  // Total size: (7 * 9.5) + (2 * 4) = 66.5 + 8 = 74.5
  return (
    <svg
      viewBox="0 0 75 75"
      width={size}
      height={size}
      className={`dotted-square-8x8 ${className}`}
      style={style}
      aria-hidden="true"
    >
      {dots}
    </svg>
  );
}
