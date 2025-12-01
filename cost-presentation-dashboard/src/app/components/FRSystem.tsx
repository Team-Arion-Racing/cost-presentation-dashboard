import React from 'react';
import Card from './UI/Card';

const FRSystem = () => {
  const metrics = {
    count: 45,
    make: 40,
    buy: 5,
    topParts: ["Nose Cone Smooth", "Seat Mounts", "Exhaust Support Bracket"]
  };

  const makePercent = Math.round((metrics.make / metrics.count) * 100);

  return (
    <Card title="Frame & Body" systemCode="FR" details={metrics.topParts}>
      <div className="flex justify-between items-center">
        <span className="text-gray-500 text-sm">Total Parts</span>
        <span className="text-2xl font-bold text-gray-900">{metrics.count}</span>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>In-House ({makePercent}%)</span>
          <span>Purchased</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
          <div className="bg-blue-600 h-full rounded-full" style={{ width: `${makePercent}%` }}></div>
        </div>
      </div>
    </Card>
  );
};

export default FRSystem;