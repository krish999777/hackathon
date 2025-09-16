// src/Dashboard.js

import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaUtensils, FaHandsHelping, FaUsers, FaHandshake, FaGlobeAmericas, FaSun, FaMoon } from 'react-icons/fa';
import StatsBar from './StatsBar';
import StatsRow from './StatsRow';

// --- Custom Hook for Animating Numbers --- //
const useCountUp = (end, duration = 1500) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        let start = 0;
        const totalFrames = Math.round(duration / (1000 / 60));
        let currentFrame = 0;
        const counter = setInterval(() => {
            currentFrame++;
            const progress = (currentFrame / totalFrames) ** 2; // Ease-out
            const currentCount = Math.round(end * progress);
            setCount(currentCount);
            if (currentFrame === totalFrames) {
                clearInterval(counter);
                setCount(end);
            }
        }, 1000 / 60);
        return () => clearInterval(counter);
    }, [end, duration]);
    return count.toLocaleString();
};

// --- Theme Toggle Component --- //
const ThemeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);
    return (
        <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-yellow-300 transition-colors duration-300"
        >
            {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
    );
};

// --- Data (remains the same) --- //
const lineChartData = [ { name: 'Jan', Donations: 20, Beneficiaries: 24 }, { name: 'Feb', Donations: 22, Beneficiaries: 28 }, { name: 'Mar', Donations: 31, Beneficiaries: 35 }, { name: 'Apr', Donations: 28, Beneficiaries: 32 }, { name: 'May', Donations: 34, Beneficiaries: 40 }, { name: 'Jun', Donations: 30, Beneficiaries: 38 }, { name: 'Jul', Donations: 38, Beneficiaries: 45 }, { name: 'Aug', Donations: 42, Beneficiaries: 50 }, { name: 'Sep', Donations: 50, Beneficiaries: 60 },];
const pieChartData = [ { name: 'Meals', value: 40 }, { name: 'Beneficiaries', value: 30 }, { name: 'Communities', value: 30 },];
const PIE_COLORS = ['#38bdf8', '#fb7185', '#a78bfa'];

// --- Reusable Components (with style updates) --- //
const SummaryCard = ({ icon, value, label, color }) => {
    const animatedValue = useCountUp(parseInt(value.replace(/,/g, '')));
    return (
        <div className="p-4 bg-slate-50/50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center space-x-3 transition-colors duration-300">
            <div className={`p-3 rounded-full ${color.bg} ${color.text}`}>
                {icon}
            </div>
            <div>
                <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{animatedValue}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
            </div>
        </div>
    );
};

const CustomTooltip = ({ active, payload, label, unit = '' }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-3 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg text-sm">
                <p className="font-semibold text-slate-700 dark:text-slate-200 mb-1">{label}</p>
                {payload.map((entry, index) => (
                    <p key={`item-${index}`} style={{ color: entry.color }} className="font-medium">
                        {`${entry.name}: ${entry.value}${unit}`}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};


function Impact() {
    const summaryData = [
        { icon: <FaUtensils />, value: '10250', label: 'Meals Saved', color: { text: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-900/50' } },
        { icon: <FaHandsHelping />, value: '1320', label: 'Donations Made', color: { text: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/50' } },
        { icon: <FaUsers />, value: '8900', label: 'Beneficiaries Served', color: { text: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/50' } },
        { icon: <FaHandshake />, value: '210', label: 'NGOs/Volunteers', color: { text: 'text-red-500', bg: 'bg-red-100 dark:bg-red-900/50' } },
        { icon: <FaGlobeAmericas />, value: '45', label: 'Communities Reached', color: { text: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/50' } },
    ];
    
    return (
        
        <div className="bg-slate-100 dark:bg-slate-900 min-h-screen p-4 sm:p-6 font-sans text-slate-800 dark:text-slate-300 transition-colors duration-300">
            <h2 className="text-success text-center mb-3" style={{fontWeight:'600'}}>The Impact We Made 📊</h2>
            <div className="max-w-7xl mx-auto">
                <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-5 rounded-xl shadow-md border border-slate-100 dark:border-slate-700 transition-colors duration-300">
                         
                         <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Tooltip content={<CustomTooltip unit="%" />} />
                                <Pie data={pieChartData} cx="50%" cy="50%" innerRadius={70} outerRadius={100} fill="#8884d8" paddingAngle={3} dataKey="value" labelLine={false}>
                                    {pieChartData.map((entry, index) => <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} className="focus:outline-none" />)}
                                </Pie>
                                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '12px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                
                {/* --- NEW Horizontal Header Block --- */}
                {/* <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg mb-6 transition-colors duration-300">
                    <div className="flex justify-between items-start mb-4">
                        
                        
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {summaryData.map((item, index) => <SummaryCard key={index} {...item} />)}
                    </div>
                </div> */}

                {/* --- Charts Section --- */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    <div className="lg:col-span-3 bg-white dark:bg-slate-800 p-5 rounded-xl shadow-md border border-slate-100 dark:border-slate-700 transition-colors duration-300">
                        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-4">Monthly Progress (in thousands)</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={lineChartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-slate-700" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} className="text-xs" dy={10} />
                                <YAxis axisLine={false} tickLine={false} className="text-xs" tickFormatter={(v) => `${v}k`} />
                                <Tooltip content={<CustomTooltip unit="k" />} />
                                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                                <Line type="monotone" dataKey="Beneficiaries" stroke="#10b981" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                                <Line type="monotone" dataKey="Donations" stroke="#6366f1" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <StatsRow/>

                    
                </div>
            </div>
        </div>
    );
}

export default Impact;