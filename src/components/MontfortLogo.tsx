"use client";

interface MontfortLogoMarkProps {
  className?: string;
  fill?: string;
}

export function MontfortLogoMark({
  className = "w-20 h-20",
  fill = "#0f4f78",
}: MontfortLogoMarkProps) {
  // Original Montfort dot-matrix crest geometry
  const rows = [5, 7, 8, 7, 6, 4, 3, 1];
  const gap = 10;
  const dots: { x: number; y: number; r: number }[] = [];

  rows.forEach((count, row) => {
    const startX = 45 - ((count - 1) * gap) / 2;
    for (let i = 0; i < count; i++) {
      dots.push({
        x: startX + i * gap,
        y: 6 + row * gap,
        r: Math.max(1.6, 3.2 - row * 0.2),
      });
    }
  });

  return (
    <svg
      viewBox="0 0 90 90"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Montfort Logo Icon"
    >
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.r} fill={fill} />
      ))}
    </svg>
  );
}

export default MontfortLogoMark;
