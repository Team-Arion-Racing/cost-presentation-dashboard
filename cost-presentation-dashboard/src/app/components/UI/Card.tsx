'use client';

import React, { useState } from 'react';

interface CardProps {
  title: string;
  systemCode: string;
  children: React.ReactNode;
  details?: string[];
}

const Card = ({ title, systemCode, children, details }: CardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      onClick={() => setIsOpen(!isOpen)}
      className={`
        p-6 border rounded-xl shadow-sm transition-all duration-300 cursor-pointer relative overflow-hidden
        ${isOpen ? 'bg-blue-50 border-blue-400 ring-2 ring-blue-100' : 'bg-white hover:shadow-md border-gray-200'}
      `}
    >
      <div className="flex justify-between items-start mb-4 border-b border-gray-100 pb-3">
        <div>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{systemCode} System</span>
          <h3 className="text-lg font-bold text-gray-800 leading-tight mt-1">
            {title}
          </h3>
        </div>
        <div className={`
          w-8 h-8 rounded-full flex items-center justify-center text-gray-400 bg-gray-50 transition-transform duration-300
          ${isOpen ? 'rotate-180 bg-blue-100 text-blue-600' : ''}
        `}>
          ▼
        </div>
      </div>
      
      <div className="space-y-3">
        {children}
      </div>

      {isOpen && details && (
        <div className="mt-4 pt-4 border-t border-gray-200 animate-in fade-in slide-in-from-top-2">
          <p className="text-xs font-semibold text-gray-500 uppercase mb-2">High Value Components</p>
          <ul className="space-y-1">
            {details.map((item, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Card;