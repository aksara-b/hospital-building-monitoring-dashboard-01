import { useMemo } from 'react';
import { KPICard } from './KPICard';
import { Card } from './Card';
import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip, BarChart, Bar } from 'recharts';
import { getHvacAssets, getCriticalZones, hvacPowerTrend, getDashboardKPIs } from '../data/mockData';
import { clsx } from 'clsx';
import { Power, AlertTriangle, CheckCircle2, Activity } from 'lucide-react';
import { type Hospital } from '../data/hospitals';

interface DashboardProps {
  role: string;
  hospital: Hospital;
}

export function Dashboard({ role, hospital }: DashboardProps) {
  const kpis = useMemo(() => getDashboardKPIs(hospital.id), [hospital.id]);
  const hvacAssets = useMemo(() => getHvacAssets(hospital.id), [hospital.id]);
  const criticalZones = useMemo(() => getCriticalZones(hospital.id), [hospital.id]);

  // --- DIRECTOR VIEW ---
  if (role === 'direktur') {
    return (
      <div className="p-6 flex flex-col gap-6 max-w-[1600px] mx-auto pb-12">
        <div className="flex justify-between items-end">
          {/* <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Executive Overview — {hospital.name}</h2>

          </div> */}
          <div className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5" /> All Business Systems Nominal
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <KPICard title="Bed Occupancy (BOR)" value={kpis.bor.toString()} unit="%" trend={4.2} subtitle={`${Math.round(kpis.bor * 1.4)} of ${Math.round(141 * (hospital.id === 'bekasi' ? 1.5 : 1))} Beds Occupied`} />
          <KPICard title="Energy Cost (Est.)" value={kpis.energyCost} unit="" trend={-1.8} subtitle={`Efficiency Savings: ${kpis.savings}`} />
          <KPICard title="Sustainability Score" value={kpis.esgScore} unit="" trend={2.1} subtitle="Top 5% of Regional Hospitals" />
          <KPICard title="Critical Alerts" value={kpis.alerts.toString()} unit="" trend={0} subtitle={kpis.alerts > 0 ? `${kpis.alerts} active issues` : "No active Life Safety issues"} />
        </div>

        <div className="grid grid-cols-12 gap-6">
          <Card title="Revenue vs Operational Cost Correlation" className="col-span-8">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={hvacPowerTrend}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0F172A" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#0F172A" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" hide />
                  <Tooltip />
                  <Area type="monotone" dataKey="actual" stroke="#0F172A" strokeWidth={3} fill="url(#colorRev)" />
                  <Area type="monotone" dataKey="yesterday" stroke="#94A3B8" strokeWidth={2} strokeDasharray="5 5" fill="transparent" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card title="Strategic ESG Breakdown" className="col-span-4">
            <div className="space-y-6 py-4">
              {[
                { label: 'Carbon Footprint', value: '74%', color: 'bg-emerald-500' },
                { label: 'Energy Efficiency', value: '88%', color: 'bg-sky-500' },
                { label: 'Water Management', value: '62%', color: 'bg-blue-600' },
                { label: 'Waste Proper', value: '95%', color: 'bg-indigo-600' },
              ].map(item => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-slate-500 font-bold uppercase tracking-wider">{item.label}</span>
                    <span className="text-slate-900 font-bold">{item.value}</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className={clsx("h-full rounded-full", item.color)} style={{ width: item.value }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // --- MANAGER VIEW ---
  if (role === 'manajer') {
    return (
      <div className="p-6 flex flex-col gap-6 max-w-[1600px] mx-auto pb-12">
        {/* <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Operational Performance — {hospital.name}</h2>
            <p className="text-sm text-slate-500 font-medium">Departmental efficiency, maintenance KPIs, and resource utilization.</p>
          </div>
          <div className="flex gap-2">
            <div className="text-xs font-bold text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200">Week 18, 2026</div>
          </div>
        </div> */}

        <div className="grid grid-cols-4 gap-4">
          <KPICard title="EUI Intensity" value={hospital.id === 'bekasi' ? "158" : "142"} unit="kWh/m²" trend={-0.4} subtitle="Target: 135 kWh/m²" />
          <KPICard title="PM Completion" value="92.1" unit="%" trend={8.2} subtitle="11 pending work orders" />
          <KPICard title="Avg Patient Satisfaction" value="4.6" unit="/5" trend={1.2} subtitle="Facility quality score" />
          <KPICard title="Staff Allocation" value="94" unit="%" trend={-2.1} subtitle="Critical zones fully staffed" />
        </div>

        <div className="grid grid-cols-3 gap-6">
          <Card title="Departmental Energy Breakdown" className="col-span-2">
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { name: 'Radiology', value: 450 },
                  { name: 'ICU/NICU', value: 820 },
                  { name: 'Surgery', value: 940 },
                  { name: 'OPD', value: 310 },
                  { name: 'Laboratory', value: 560 },
                ]}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748B' }} />
                  <Tooltip cursor={{ fill: '#F1F5F9' }} />
                  <Bar dataKey="value" fill="#334155" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card title="Asset Reliability Index">
            <div className="space-y-4">
              {[
                { name: 'HVAC Chillers', reliability: 98.4, status: 'Optimal' },
                { name: 'Backup Genset', reliability: 100, status: 'Perfect' },
                { name: 'Medical Gas', reliability: 94.2, status: 'Warning' },
                { name: 'Water Systems', reliability: 97.8, status: 'Optimal' },
              ].map(asset => (
                <div key={asset.name} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-slate-700">{asset.name}</span>
                    <span className={clsx("text-[10px] font-bold px-2 py-0.5 rounded-full", asset.reliability > 95 ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700")}>
                      {asset.reliability}%
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">{asset.status}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // --- TECHNICIAN VIEW (Default) ---
  return (
    <div className="p-6 flex flex-col gap-6 max-w-[1600px] mx-auto pb-6">
      <div className="flex justify-between items-end">
        {/* <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-1">Technical Monitoring — {hospital.name}</h2>
          <p className="text-sm text-slate-500 font-medium">Real-time equipment status, sensor health, and active faults.</p>
        </div> */}
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200 flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-sky-500" /> All Controllers Online
        </div>
      </div>

      {/* Top Row KPIs */}
      <div className="grid grid-cols-6 gap-4">
        <KPICard title="Chiller Load" value={hospital.id === 'bekasi' ? "76" : "68"} unit="%" subtitle="1,245 of 1,840 TR" />
        <KPICard title="HVAC Power" value={hospital.id === 'bekasi' ? "1,240" : "1,072"} unit="kW" trend={-2.4} />
        <KPICard title="Avg COP" value="5.21" trend={8.4} />
        <KPICard title="Avg Temp" value="23.4" unit="°C" trend={-0.6} />
        <KPICard title="Total Airflow" value="124k" unit="CMH" />
        <div className="bg-white border border-slate-200/60 rounded-xl p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Active Faults</h3>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-slate-900 tracking-tight">{hospital.id === 'bekasi' ? "12" : "8"}</span>
            <div className="ml-auto flex items-center gap-1 text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full uppercase">
              <AlertTriangle className="w-3 h-3" /> {hospital.id === 'bekasi' ? "5" : "3"} CRITICAL
            </div>
          </div>
          <div className="flex items-end gap-1.5 h-8 mt-4">
            {[1, 2, 4, 2, 6, 3, 8, 4, 2, 1].map((val, i) => (
              <div key={i} className="flex-1 bg-rose-500/20 rounded-t-sm" style={{ height: `${val * 10}%` }} />
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Chiller Plant */}
        <Card title="Chiller Plant Detail" className="col-span-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              {[
                { label: 'CHW Supply / Return', value: hospital.id === 'bekasi' ? '6.5°C / 11.8°C' : '6.8°C / 12.1°C' },
                { label: 'CW Supply / Return', value: '30.2°C / 35.4°C' },
                { label: 'Plant Efficiency', value: '0.62 kW/TR' },
              ].map(item => (
                <div key={item.label} className="flex justify-between text-sm p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-500 font-bold text-[11px] uppercase tracking-wider">{item.label}</span>
                  <span className="text-slate-900 font-bold">{item.value}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {hvacAssets.map(asset => (
                <div key={asset.id} className="flex flex-col items-center justify-center p-2 rounded-xl border border-slate-100 bg-white shadow-sm">
                  <Power className={clsx("w-4 h-4 mb-1", asset.status === 'ON' ? "text-emerald-500" : "text-slate-200")} />
                  <span className="text-[10px] font-bold text-slate-700">{asset.id}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Critical Zones */}
        <Card title="Critical Zone Compliance" className="col-span-6" noPadding>
          <table className="w-full text-[11px] text-left">
            <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 uppercase tracking-widest font-bold">
              <tr>
                <th className="px-5 py-4">Zone</th>
                <th className="px-5 py-4 text-center">Temp</th>
                <th className="px-5 py-4 text-center">RH%</th>
                <th className="px-5 py-4 text-center">Pa</th>
                <th className="px-5 py-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {criticalZones.slice(0, 5).map((zone) => (
                <tr key={zone.zone} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-3 font-bold text-slate-800">{zone.zone}</td>
                  <td className="px-5 py-3 text-center font-bold text-slate-600 tracking-tight">{zone.temp.toFixed(1)}°C</td>
                  <td className="px-5 py-3 text-center font-bold text-slate-600 tracking-tight">{zone.rh}%</td>
                  <td className="px-5 py-3 text-center font-bold text-slate-600 tracking-tight">+{zone.pressure.toFixed(1)}</td>
                  <td className="px-5 py-3 text-center">
                    <span className={clsx("px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest", zone.status === 'OK' ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700")}>
                      {zone.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}
