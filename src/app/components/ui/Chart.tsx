"use client";

type ChartPoint = {
  label: string;
  value: number;
};

type ChartProps = {
  title: string;
  points: ChartPoint[];
};

export default function Chart({ title, points }: ChartProps) {
  const max = Math.max(...points.map((p) => p.value), 1);

  return (
    <div className="mt-4">
      <h3 className="mb-2 text-sm font-semibold text-slate-200">{title}</h3>
      <div className="space-y-2">
        {points.map((p) => (
          <div key={p.label} className="flex items-center gap-2">
            <div className="w-40 truncate text-xs text-slate-400">
              {p.label}
            </div>
            <div className="flex-1 h-3 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-sky-500"
                style={{ width: `${(p.value / max) * 100}%` }}
              />
            </div>
            <div className="w-12 text-right text-xs text-slate-300">
              {p.value.toFixed(1)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}