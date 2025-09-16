
// src/StatsRow.js

import React from 'react';
import { FaUtensils, FaHandsHelping, FaUsers, FaHandshake, FaGlobeAmericas } from 'react-icons/fa';

// Data for the stats
const statsData = [
  { icon: <FaUtensils />, value: '10,250', label: 'Meals Saved', color: 'text-orange-500' },
  { icon: <FaHandsHelping />, value: '1,320', label: 'Donations Made', color: 'text-green-500' },
  { icon: <FaUsers />, value: '8,900', label: 'Beneficiaries Served', color: 'text-blue-500' },
  { icon: <FaHandshake />, value: '210', label: 'NGOs/Volunteers', color: 'text-red-500' },
  { icon: <FaGlobeAmericas />, value: '45', label: 'Communities Reached', color: 'text-purple-500' },
];

function StatsRow() {
  return (
    // Main container with shadow and rounded corners
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700">
      {/* This is the container for the horizontal row.
        - `flex`: Enables Flexbox layout.
        - `flex-col md:flex-row`: On small screens (mobile), it stacks them vertically. On medium screens and up, it becomes a horizontal row.
      */}
      <div className="flex flex-col md:flex-row">
        {statsData.map((stat, index) => (
          <div
            key={index}
            // `flex-1`: This makes each stat block take up an equal amount of space in the row.
            className="flex-1 p-6 flex flex-col items-center text-center"
            // This adds a divider line between items.
            // On mobile (flex-col), it adds a border on the bottom.
            // On desktop (md:flex-row), it adds a border on the right.
            // It applies to every item EXCEPT the last one.
            style={{
                borderBottom: '1px solid #e2e8f0', // Default bottom border
                borderRight: 'none', // No right border by default
            }}
            // Responsive border styles using Tailwind CSS (if you prefer this over inline styles)
            // className="flex-1 p-6 flex flex-col items-center text-center border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-700 last:border-b-0 last:md:border-r-0"
          >
            <div className={`text-3xl mb-2 ${stat.color}`}>
              {stat.icon}
            </div>
            <p className="text-3xl font-extrabold text-slate-800 dark:text-slate-100">
              {stat.value}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// A simpler version of the above component without responsive stacking
// This version will always be horizontal and may require scrolling on very small screens.
export function AlwaysHorizontalStatsRow() {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 overflow-x-auto">
            <div className="flex">
                {statsData.map((stat, index) => (
                    <div
                        key={index}
                        className="flex-1 p-6 flex flex-col items-center text-center min-w-[180px] border-r border-slate-200 dark:border-slate-700 last:border-r-0"
                    >
                        <div className={`text-3xl mb-2 ${stat.color}`}>{stat.icon}</div>
                        <p className="text-3xl font-extrabold text-slate-800 dark:text-slate-100">{stat.value}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{stat.label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}


export default StatsRow;