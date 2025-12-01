import React from 'react';
import Card from './UI/Card';

const MSSystem = () => {
  const metrics = {
    count: 14,
    make: 3,
    buy: 11,
    topParts: ["Wiring Harness", "Driver Protection", "Engine Firewall Right"]
  };

  const buyPercent = Math.round((metrics.buy / metrics.count) * 100);

  return (
    <Card title="Miscellaneous" systemCode="MS" details={metrics.topParts}>
      <div className="flex justify-between items-center">
        <span className="text-gray-500 text-sm">Total Parts</span>
        <span className="text-2xl font-bold text-gray-900">{metrics.count}</span>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Outsourced ({buyPercent}%)</span>
          <span>In-House</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
          <div className="bg-purple-500 h-full rounded-full" style={{ width: `${buyPercent}%` }}></div>
        </div>
      </div>
    </Card>
  );
};

export default MSSystem;