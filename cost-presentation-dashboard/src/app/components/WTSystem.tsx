import React from 'react';
import Card from './UI/Card';

const WTSystem = () => {
  const metrics = {
    count: 8,
    make: 2,
    buy: 6,
    topParts: ["Front Hubs", "Front Wheel Bearings", "Rear Hubs"]
  };

  return (
    <Card title="Wheels & Tires" systemCode="WT" details={metrics.topParts}>
      <div className="flex justify-between items-center">
        <span className="text-gray-500 text-sm">Total Parts</span>
        <span className="text-2xl font-bold text-gray-900">{metrics.count}</span>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-2">
        <div className="bg-gray-50 p-2 rounded text-center">
          <div className="text-lg font-bold text-gray-800">{metrics.make}</div>
          <div className="text-[10px] uppercase text-gray-400 tracking-wide">Make</div>
        </div>
        <div className="bg-gray-50 p-2 rounded text-center">
          <div className="text-lg font-bold text-gray-800">{metrics.buy}</div>
          <div className="text-[10px] uppercase text-gray-400 tracking-wide">Buy</div>
        </div>
      </div>
    </Card>
  );
};

export default WTSystem;