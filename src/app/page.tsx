"use client";

import BRSystem from "./components/br/BRSystem";
import LVSystem from "./components/lv/LVSystem";

export default function Page() {
  return (
    <div className="space-y-10 p-6 bg-slate-950 min-h-screen">
      {/* BR System Section */}
      <BRSystem />

      {/* LV System Section */}
      <LVSystem />
    </div>
  );
}

