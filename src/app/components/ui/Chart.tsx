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
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="space-y-1">
        {points.map((p) => (
          <div key={p.label} className="flex items-center gap-2">
            <div className="w-40 text-xs text-gray-500 truncate">{p.label}</div>
            <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500"
                style={{ width: `${(p.value / max) * 100}%` }}
              />
            </div>
            <div className="w-12 text-xs text-right">
              {p.value.toFixed(1)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

