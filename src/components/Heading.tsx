import React from "react";

// Reusable heading that mirrors the hero gradient style, but adapts palette
// Provide a section palette to subtly shift the gradient per section

type RGB = [number, number, number];

export interface SectionPalette {
  orange: RGB;
  blue: RGB;
  base: RGB;
}

interface HeadingProps {
  as?: "h1" | "h2" | "h3";
  children: React.ReactNode;
  align?: "center" | "left";
  size?: "xl" | "lg" | "md";
  palette?: SectionPalette; // if provided, compute gradient from orange/blue
  className?: string;
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const to255 = (v: number) => Math.round(clamp01(v) * 255);
const rgb = (c: RGB) => `rgb(${to255(c[0])}, ${to255(c[1])}, ${to255(c[2])})`;

function midColor(a: RGB, b: RGB): RGB {
  return [
    (a[0] + b[0]) / 2,
    (a[1] + b[1]) / 2,
    (a[2] + b[2]) / 2,
  ];
}

const DEFAULT_GRADIENT: [RGB, RGB, RGB] = [
  [0.0, 0.8, 0.8], // aqua
  [0.7, 0.4, 1.0], // purple
  [0.2, 1.0, 0.5], // green
];

const sizeClasses = {
  xl: "text-6xl md:text-8xl",
  lg: "text-4xl md:text-6xl",
  md: "text-3xl md:text-4xl",
};

const Heading: React.FC<HeadingProps> = ({
  as = "h2",
  children,
  align = "center",
  size = "lg",
  palette,
  className = "",
}) => {
  const [c1, c2, c3] = palette
    ? [palette.orange, midColor(palette.orange, palette.blue), palette.blue]
    : DEFAULT_GRADIENT;

  const Tag = as as any;

  const style: React.CSSProperties = {
    backgroundImage: `linear-gradient(90deg, ${rgb(c1)}, ${rgb(c2)}, ${rgb(c3)})`,
  };

  const alignClass = align === "center" ? "text-center" : "text-left";

  return (
    <Tag
      className={`${sizeClasses[size]} font-premium font-bold bg-clip-text text-transparent ${alignClass} ${className}`}
      style={style}
    >
      {children}
    </Tag>
  );
};

export default Heading;
