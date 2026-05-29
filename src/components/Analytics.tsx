import { useMemo } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';
import { TrendingUp, Zap, Leaf, AlertCircle, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { clsx } from 'clsx';
import { type Hospital } from '../data/hospitals';

interface AnalyticsProps {
  hospital: Hospital;
}

// Mock Data
const energyData = [
  { month: 'Jan', consumption: 4200, benchmark: 4000 },
  { month: 'Feb', consumption: 3800, benchmark: 4000 },
  { month: 'Mar', consumption: 4500, benchmark: 4000 },
  { month: 'Apr', consumption: 4100, benchmark: 4000 },
  { month: 'May', consumption: 4800, benchmark: 4000 },
  { month: 'Jun', consumption: 5200, benchmark: 4000 },
  { month: 'Jul', consumption: 5100, benchmark: 4000 },
  { month: 'Aug', consumption: 4900, benchmark: 4000 },
  { month: 'Sep', consumption: 4300, benchmark: 4000 },
  { month: 'Oct', consumption: 4100, benchmark: 4000 },
  { month: 'Nov', consumption: 3900, benchmark: 4000 },
  { month: 'Dec', consumption: 4050, benchmark: 4000 },
];

const breakdownData = [
  { name: 'HVAC', value: 45, color: '#1E293B' },
  { name: 'Medical Gas', value: 15, color: '#0369A1' },
  { name: 'Lighting', value: 20, color: '#B45309' },
  { name: 'General Power', value: 20, color: '#065F46' },
];

const predictions = [
  { item: 'AHU-04 (ICU)', risk: 'High', date: 'May 12, 2026', factor: 'Vibration Alert' },
  { item: 'Chiller Pump 2', risk: 'Medium', date: 'Jun 05, 2026', factor: 'Efficiency Drop' },
  { item: 'Oxygen Regulator B', risk: 'Low', date: 'Jul 20, 2026', factor: 'Standard Cycle' },
];

export function Analytics({ hospital }: AnalyticsProps) {
  const euiValue = hospital.id === 'bekasi' ? 158 : 142;
  const euiData = useMemo(() => [
    { name: hospital.name, value: euiValue },
    { name: 'Industry Avg', value: 165 },
    { name: 'Target EUI', value: 130 },
  ], [hospital.name, euiValue]);

  return (
    <div className="p-6 flex flex-col gap-6 max-w-[1600px] mx-auto pb-12">
      {/* Header */}
      <div className="flex justify-between items-end">
        {/* <div>
          <h2 className="text-2xl font-bold text-[#0F172A] mb-1">Advanced Analytics — {hospital.name}</h2>
          <p className="text-sm text-slate-500">Historical performance, efficiency benchmarks, and predictive modeling.</p>
        </div> */}
        <div className="flex gap-2">
          <button className="px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm">Last 12 Months</button>
          <button className="px-3 py-1.5 text-xs font-medium bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition-colors shadow-md flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5" /> Export Report
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Energy', value: hospital.id === 'bekasi' ? '68,240' : '54,230', unit: 'kWh', trend: '+2.4%', up: true, icon: Zap, color: 'text-slate-800' },
          { label: 'Energy Cost', value: hospital.id === 'bekasi' ? '92.5M' : '78.5M', unit: 'IDR', trend: '-1.2%', up: false, icon: TrendingUp, color: 'text-emerald-800' },
          { label: 'Avg EUI', value: euiValue.toString(), unit: 'kWh/m²', trend: 'Optimal', up: false, icon: Leaf, color: 'text-sky-800' },
          { label: 'Peak Load', value: hospital.id === 'bekasi' ? '225' : '185', unit: 'kW', trend: '+15kW', up: true, icon: AlertCircle, color: 'text-amber-800' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className={clsx('p-2 rounded-lg bg-slate-50', kpi.color)}>
                <kpi.icon className="w-5 h-5" />
              </div>
              <div className={clsx('flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded-full', kpi.up ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-700')}>
                {kpi.up ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                {kpi.trend}
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-900 tracking-tight">
              {kpi.value} <span className="text-sm text-slate-400 font-normal">{kpi.unit}</span>
            </div>
            <div className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-semibold">{kpi.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="col-span-2 bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-bold text-slate-800">Energy Consumption Trend</h3>
              <p className="text-xs text-slate-400">Actual consumption vs standard benchmark</p>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={energyData}>
                <defs>
                  <linearGradient id="colorConsumption" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1E293B" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#1E293B" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px' }}
                />
                <Area type="monotone" dataKey="consumption" stroke="#1E293B" strokeWidth={3} fillOpacity={1} fill="url(#colorConsumption)" />
                <Area type="monotone" dataKey="benchmark" stroke="#94A3B8" strokeWidth={2} strokeDasharray="5 5" fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6">Usage Breakdown</h3>
          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={breakdownData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {breakdownData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={breakdownData[index].color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4">
            {breakdownData.map((item) => (
              <div key={item.name} className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                  <span className="text-slate-500">{item.name}</span>
                </div>
                <span className="font-bold text-slate-700">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* EUI Comparison */}
        <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4">EUI Efficiency Benchmark</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={euiData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#475569' }} width={80} />
                <Tooltip cursor={{ fill: '#f8fafc' }} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                  {euiData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#0369A1' : index === 1 ? '#94A3B8' : '#059669'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Predictive Maintenance */}
        <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800">Predictive Maintenance AI</h3>
            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full uppercase tracking-wider">Engine: PSI-AI v2.0</span>
          </div>
          <div className="space-y-4">
            {predictions.map((p) => (
              <div key={p.item} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <div className="flex gap-3 items-center">
                  <div className={clsx(
                    'w-10 h-10 rounded-full flex items-center justify-center text-white',
                    p.risk === 'High' ? 'bg-red-500' : p.risk === 'Medium' ? 'bg-orange-400' : 'bg-emerald-500'
                  )}>
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-800">{p.item}</div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-1">
                      <span className="font-semibold">{p.risk} Risk</span> · Due {p.date}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] font-mono text-slate-400 mb-1">{p.factor}</div>
                  <button className="text-[10px] font-bold text-indigo-600 hover:underline">Schedule Service</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
