import { useMemo } from 'react';
import { Card } from './Card';
import { KPICard } from './KPICard';
import { getHvacAssets, coolingTowers, chwPumps, ahuSummary, hvacPowerTrend } from '../data/mockData';
import { clsx } from 'clsx';
import { Power, Wind, AlertTriangle, Activity, TrendingUp } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip, CartesianGrid } from 'recharts';
import { type Hospital } from '../data/hospitals';

interface HVACProps {
  hospital: Hospital;
}

export function HVAC({ hospital }: HVACProps) {
  const hvacAssets = useMemo(() => getHvacAssets(hospital.id), [hospital.id]);

  const totalCoolingLoad = hvacAssets.reduce((sum, ch) => sum + ch.load * 12, 0); // Mock TR calc
  const totalPower = hvacAssets.reduce((sum, ch) => sum + ch.power, 0) + 
                     coolingTowers.reduce((sum, ct) => sum + ct.power, 0) + 
                     chwPumps.reduce((sum, p) => sum + p.power, 0);

  const cop = totalPower > 0 ? ((totalCoolingLoad * 3.5168525) / totalPower).toFixed(2) : '0.00';

  return (
    <div className="p-6 flex flex-col gap-6 max-w-[1600px] mx-auto pb-24">
      {/* Top KPI Row */}
      <div className="grid grid-cols-4 gap-4">
        <KPICard 
          title="Plant Efficiency (COP)" 
          value={cop} 
          trend={2.4}
          trendLabel="vs Last Week"
          subtitle="Target COP > 5.5"
        />
        <KPICard 
          title="Total Cooling Output" 
          value={Math.round(totalCoolingLoad).toLocaleString()} 
          unit="TR" 
          trend={-1.2}
          subtitle={`Peak today: ${hospital.id === 'bekasi' ? '2,240' : '1,850'} TR`}
        />
        <KPICard 
          title="Total Power Demand" 
          value={Math.round(totalPower).toLocaleString()} 
          unit="kW" 
          trend={-3.5}
          subtitle={`of capacity (${hospital.id === 'bekasi' ? '2,000' : '1,500'} kW)`}
        />
        <div className="bg-white border border-rose-100 rounded-xl p-5 flex flex-col justify-between group overflow-hidden relative shadow-sm">
          <div className="absolute inset-0 bg-rose-500/5 transition-opacity group-hover:bg-rose-500/10" />
          <h3 className="text-[11px] font-bold text-slate-400 mb-3 relative z-10 flex items-center gap-2 uppercase tracking-widest">
            <AlertTriangle className="w-4 h-4 text-rose-500" /> Active Alarms
          </h3>
          <div className="flex items-baseline gap-2 relative z-10">
            <span className="text-4xl font-black text-slate-900 tracking-tight">{hospital.id === 'bekasi' ? '3' : '2'}</span>
          </div>
          <div className="text-[10px] text-rose-600 font-bold relative z-10 mt-3 uppercase tracking-wider">
            {hospital.id === 'bekasi' ? '2 High Priority (CH-2)' : '1 High Priority (AHU-L5-1)'}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 h-[750px]">
        {/* Central Plant Overview */}
        <Card title={
          <div className="flex items-center gap-2 text-slate-800">
            <Activity className="w-5 h-5 text-blue-600" /> Central Plant Status — {hospital.name}
          </div>
        } className="col-span-8 flex flex-col min-h-0" noPadding>
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 bg-slate-50/30">
            <div className="flex flex-col gap-8">
              
              {/* Chillers */}
              <div>
                <h3 className="text-xs font-bold text-slate-400 mb-5 uppercase tracking-widest">Chiller Units</h3>
                <div className="grid grid-cols-2 gap-4">
                  {hvacAssets.map(ch => (
                    <div key={ch.id} className={clsx("rounded-2xl border p-5 flex flex-col gap-4 transition-all shadow-sm", ch.status === 'ON' ? "bg-white border-blue-100" : "bg-slate-50 border-slate-100")}>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <div className={clsx("p-3 rounded-xl", ch.status === 'ON' ? "bg-blue-50 text-blue-600" : "bg-slate-200 text-slate-500")}>
                            <Power className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-black text-slate-800 text-lg tracking-tight">{ch.id}</div>
                            <div className={clsx("text-[10px] font-black uppercase tracking-widest", ch.status === 'ON' ? "text-emerald-600" : "text-slate-400")}>{ch.status}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-black text-slate-900 tracking-tight">{ch.power} <span className="text-xs text-slate-400 font-bold uppercase">kW</span></div>
                          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{ch.load}% Load</div>
                        </div>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className={clsx("h-full transition-all duration-1000", ch.status === 'ON' ? "bg-blue-600" : "bg-transparent")} style={{ width: `${ch.load}%` }} />
                      </div>
                      <div className="flex justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        <span>CHW Temp: {ch.temp.toFixed(1)}°C</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cooling Towers & Pumps */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xs font-bold text-slate-400 mb-5 uppercase tracking-widest">Cooling Towers</h3>
                  <div className="flex flex-col gap-3">
                    {coolingTowers.slice(0, hospital.id === 'bekasi' ? 2 : 4).map(ct => (
                      <div key={ct.id} className="bg-white border border-slate-200/60 rounded-xl p-4 flex justify-between items-center shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className={clsx("w-2 h-2 rounded-full", ct.status === 'ON' ? "bg-emerald-500 animate-pulse" : "bg-slate-300")} />
                          <span className="text-sm font-bold text-slate-800">{ct.id}</span>
                        </div>
                        <div className="flex gap-5 text-[10px] text-slate-400 font-bold text-right uppercase tracking-wider">
                          <div className="w-16">
                            <div className="text-slate-800 font-black">{ct.speed}%</div>
                            <div>Speed</div>
                          </div>
                          <div className="w-16">
                            <div className="text-slate-800 font-black">{ct.supplyTemp}°C</div>
                            <div>Supply</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xs font-bold text-slate-400 mb-5 uppercase tracking-widest">CHW Pumps</h3>
                  <div className="flex flex-col gap-3">
                    {chwPumps.slice(0, hospital.id === 'bekasi' ? 3 : 4).map(pump => (
                      <div key={pump.id} className="bg-white border border-slate-200/60 rounded-xl p-4 flex justify-between items-center shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className={clsx("w-2 h-2 rounded-full", pump.status === 'ON' ? "bg-emerald-500 animate-pulse" : "bg-slate-300")} />
                          <span className="text-sm font-bold text-slate-800">{pump.id}</span>
                        </div>
                        <div className="flex gap-5 text-[10px] text-slate-400 font-bold text-right uppercase tracking-wider">
                          <div className="w-16">
                            <div className="text-slate-800 font-black">{pump.flow} <span className="text-[9px]">L/s</span></div>
                            <div>Flow</div>
                          </div>
                          <div className="w-16">
                            <div className="text-slate-800 font-black">{pump.power} <span className="text-[9px]">kW</span></div>
                            <div>Power</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </Card>

        {/* Right Panel: Distribution & Trends */}
        <div className="col-span-4 flex flex-col gap-6">
          <Card title={
            <div className="flex items-center gap-2 text-slate-800">
              <Wind className="w-5 h-5 text-emerald-600" /> Air Handling Units
            </div>
          } className="flex-1 flex flex-col min-h-0" noPadding>
            <div className="flex flex-col h-full overflow-hidden">
               <div className="flex-1 overflow-y-auto custom-scrollbar">
                 <table className="w-full text-sm text-left">
                    <thead className="text-[10px] text-slate-500 uppercase bg-slate-50 sticky top-0 border-b border-slate-100 z-10 font-black tracking-widest">
                      <tr>
                        <th className="px-5 py-4">Floor</th>
                        <th className="px-5 py-4 text-center">Online</th>
                        <th className="px-5 py-4 text-center">Alerts</th>
                        <th className="px-5 py-4 text-right">Avg Temp</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ahuSummary.slice(0, hospital.id === 'bekasi' ? 12 : 9).map((ahu, i) => (
                        <tr key={ahu.floor} className={clsx("border-b border-slate-50 hover:bg-slate-50/50 transition-colors", i % 2 === 0 ? "bg-slate-50/20" : "")}>
                          <td className="px-5 py-3.5 font-bold text-slate-800">{ahu.floor}</td>
                          <td className="px-5 py-3.5 text-center">
                            <span className={clsx("text-xs font-black", ahu.offline > 0 ? "text-amber-600" : "text-emerald-600")}>
                              {ahu.online}/{ahu.total}
                            </span>
                          </td>
                          <td className="px-5 py-3.5 text-center">
                            {ahu.warning > 0 ? (
                              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-rose-100 text-rose-700 text-[10px] font-black">
                                {ahu.warning}
                              </span>
                            ) : (
                              <span className="text-slate-300">-</span>
                            )}
                          </td>
                          <td className="px-5 py-3.5 text-right font-bold text-slate-600">{ahu.avgTemp.toFixed(1)}°C</td>
                        </tr>
                      ))}
                    </tbody>
                 </table>
               </div>
            </div>
          </Card>

          <Card title={
            <div className="flex items-center gap-2 text-slate-800">
              <TrendingUp className="w-5 h-5 text-indigo-600" /> Power Trend
            </div>
          } className="h-64 flex flex-col min-h-0">
             <div className="flex-1 min-h-0 mt-2">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={hvacPowerTrend} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="powerGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                    <XAxis dataKey="time" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} 
                      itemStyle={{ color: '#0f172a', fontWeight: 'bold' }}
                    />
                    <Area type="monotone" dataKey="actual" name="Demand (kW)" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#powerGrad)" />
                  </AreaChart>
               </ResponsiveContainer>
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
