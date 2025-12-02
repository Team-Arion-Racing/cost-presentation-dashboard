"use client";

type CardProps = {
  title: string;
  value: string | number;
  unit?: string;
  subtitle?: string;
};

export default function Card({ title, value, unit, subtitle }: CardProps) {
  return (
    <div className="rounded-xl border p-4 shadow-sm flex flex-col gap-1">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-semibold">
        {value} {unit}
      </div>
      {subtitle && (
        <div className="text-xs text-gray-400">
          {subtitle}
        </div>
      )}
    </div>
  );
}

