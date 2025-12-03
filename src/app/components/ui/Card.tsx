"use client";

type CardProps = {
  title: string;
  value: string | number;
  unit?: string;
  subtitle?: string;
};

export default function Card({ title, value, unit, subtitle }: CardProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-50 shadow-md shadow-slate-950/30 flex flex-col gap-1">
      <div className="text-xs font-medium text-slate-400 uppercase tracking-wide">
        {title}
      </div>
      <div className="text-2xl font-semibold">
        {value} {unit}
      </div>
      {subtitle && (
        <div className="text-[11px] text-slate-500">
          {subtitle}
        </div>
      )}
    </div>
  );
}