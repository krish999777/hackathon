// src/StatsBar.js

import React from 'react';
// Make sure you have react-icons installed: npm install react-icons
import { FaUtensils, FaHandsHelping, FaUsers, FaHandshake, FaGlobeAmericas } from 'react-icons/fa';

// 1. Data for the stats bar
const statsData = [
  {
    icon: <FaUtensils />,
    value: '10,250',
    label: 'Meals Saved',
    color: 'text-orange-500',
  },
  {
    icon: <FaHandsHelping />,
    value: '1,320',
    label: 'Donations Made',
    color: 'text-green-500',
  },
  {
    icon: <FaUsers />,
    value: '8,900',
    label: 'Beneficiaries Served',
    color: 'text-blue-500',
  },
  {
    icon: <FaHandshake />,
    value: '210',
    label: 'NGOs/Volunteers',
    color: 'text-red-500',
  },
  {
    icon: <FaGlobeAmericas />,
    value: '45',
    label: 'Communities Reached',
    color: 'text-purple-500',
  },
];

function StatsBar() {
  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700">
      {/* This is the container for the horizontal stats.
        - `grid`: Enables CSS Grid layout.
        - `grid-cols-2 md:grid-cols-3 lg:grid-cols-5`: Defines the number of columns for different screen sizes.
          - 2 columns on small screens.
          - 3 columns on medium screens.
          - 5 columns (a single horizontal line) on large screens.
        - `gap-4`: Adds space between the items.
      */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="flex items-center p-4 space-x-4"
            // This adds a divider line between items on larger screens
            // It applies a right border to every child except the last one.
          >
            <div className={`text-3xl ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                {stat.value}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StatsBar;