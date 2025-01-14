import React from "react";

interface WavyLinesProps {
  width?: number;
  height?: number;
  color?: string;
  strokeWidth?: number;
  lineSpacing?: number;
  lineCount?: number;
  isMopileHidden?: boolean
}

const WavyLines: React.FC<WavyLinesProps> = ({
  width = 68,
  height = 58,
  color = "white",
  strokeWidth = 2,
  lineSpacing = 12,
  lineCount = 3,
  isMopileHidden = false
}) => {
  const lines = Array.from({ length: lineCount }, (_, index) => {
    const y = lineSpacing * (index + 1);
    return `M0 ${y} Q${width / 4} ${y - lineSpacing} ${width / 2} ${y} T${width} ${y}`;
  });

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      className={`wavy-lines ${isMopileHidden ? "hidden" : "block"}`}
    >
      {lines.map((d, index) => (
        <path key={index} d={d} />
      ))}
    </svg>
  );
};

export default WavyLines;
