import { useMemo } from 'react';
import { Card } from './Card';
import { KPICard } from './KPICard';
import { getWaterTanks, getWaterPumps } from '../data/mockData';
import { clsx } from 'clsx';
import { Droplets, Waves, Activity } from 'lucide-react';
import { type Hospital } from '../data/hospitals';

interface WaterProps {
  hospital: Hospital;
}

export function Water({ hospital }: WaterProps) {
  const waterTanks = useMemo(() => getWaterTanks(hospital.id), [hospital.id]);
  const waterPumps = useMemo(() => getWaterPumps(hospital.id), [hospital.id]);

  const gwtLevel = waterTanks.filter(t => t.type === 'Ground Tank').reduce((sum, t) => sum + t.level, 0) / 2;
  const roofLevel = waterTanks.filter(t => t.type === 'Roof Tank').reduce((sum, t) => sum + t.level, 0) / 2;
  const activePumps = waterPumps.filter(p => p.status === 'ON').length;

  return (
    <div className="p-6 flex flex-col gap-6 max-w-[1600px] mx-auto pb-24">
      <div className="grid grid-cols-4 gap-4">
        <KPICard 
          title="Avg GWT Level" 
          value={gwtLevel.toFixed(1)} 
          unit="%" 
          trend={-0.5}
          subtitle={`Total Capacity: ${hospital.id === 'bekasi' ? '1,500m³' : '1,000m³'}`}
        />
        <KPICard 
          title="Avg Roof Tank Level" 
          value={roofLevel.toFixed(1)} 
          unit="%" 
          trend={12.4}
          trendLabel="Refilling"
          subtitle={`Total Capacity: ${hospital.id === 'bekasi' ? '160m³' : '100m³'}`}
        />
        <KPICard 
          title="Active Pumps" 
          value={activePumps} 
          trend={0}
          subtitle={`Out of ${waterPumps.length} total pumps`}
        />
        <div className="bg-white border border-slate-200/60 rounded-xl p-5 flex flex-col justify-center shadow-sm">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">City Water Supply</h3>
          <span className="text-4xl font-bold text-emerald-600 tracking-tight">Normal</span>
          <span className="text-[10px] text-slate-500 font-bold mt-2 uppercase tracking-widest">Flow rate: {hospital.id === 'bekasi' ? '18' : '12'} L/s</span>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 h-[650px]">
        <Card title={`Water Distribution System — ${hospital.name}`} className="col-span-8 flex flex-col min-h-0" noPadding>
          <div className="flex-1 overflow-y-auto custom-scrollbar p-8 bg-slate-50/30 flex flex-col items-center justify-between relative">
             {/* Simple schematic layout */}
             
             {/* Roof Tanks */}
             <div className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl p-6 relative z-10 shadow-sm">
               <h3 className="text-xs font-black text-slate-400 mb-5 flex items-center gap-2 uppercase tracking-widest">
                 <Droplets className="w-4 h-4 text-blue-600" /> Roof Tanks
               </h3>
               <div className="grid grid-cols-2 gap-6">
                 {waterTanks.filter(t => t.type === 'Roof Tank').map(tank => (
                   <div key={tank.id} className="flex flex-col gap-2">
                     <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                       <span>{tank.id}</span>
                       <span className={clsx(tank.level < 50 ? "text-amber-600" : "text-emerald-600")}>{tank.level}%</span>
                     </div>
                     <div className="h-24 w-full bg-slate-100 rounded-b-2xl rounded-t-lg border border-slate-200 flex flex-col justify-end overflow-hidden">
                       <div className="w-full bg-blue-600/60 transition-all duration-1000 relative" style={{ height: `${tank.level}%` }}>
                         <div className="absolute top-0 left-0 w-full h-1 bg-white/30"></div>
                       </div>
                     </div>
                   </div>
                 ))}
               </div>
             </div>

             {/* Connecting Pipe & Transfer Pumps */}
             <div className="w-full flex justify-center items-center py-6 relative z-0">
                <div className="absolute h-full w-2 bg-blue-500/10" />
                <div className="bg-white border border-slate-200 p-5 rounded-2xl flex gap-6 relative z-10 shadow-xl">
                  <div className="text-[9px] font-black text-slate-400 absolute -top-2.5 left-1/2 -translate-x-1/2 bg-white border border-slate-200 px-3 py-0.5 rounded-full uppercase tracking-widest">Transfer Pumps</div>
                  {waterPumps.filter(p => p.type === 'Transfer Pump').map(pump => (
                    <div key={pump.id} className="flex flex-col items-center gap-2">
                      <div className={clsx("w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all", pump.status === 'ON' ? "border-emerald-500 bg-emerald-50 text-emerald-600 shadow-lg shadow-emerald-100 animate-pulse" : "border-slate-200 bg-slate-50 text-slate-300")}>
                        <Activity className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{pump.id}</span>
                    </div>
                  ))}
                </div>
             </div>

             {/* Ground Tanks */}
             <div className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl p-6 relative z-10 shadow-sm">
               <h3 className="text-xs font-black text-slate-400 mb-5 flex items-center gap-2 uppercase tracking-widest">
                 <Waves className="w-4 h-4 text-blue-600" /> Ground Water Tanks
               </h3>
               <div className="grid grid-cols-2 gap-6">
                 {waterTanks.filter(t => t.type === 'Ground Tank').map(tank => (
                   <div key={tank.id} className="flex flex-col gap-2">
                     <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                       <span>{tank.id}</span>
                       <span className="text-blue-600">{tank.level}%</span>
                     </div>
                     <div className="h-16 w-full bg-slate-100 rounded-b-2xl rounded-t-lg border border-slate-200 flex flex-col justify-end overflow-hidden">
                       <div className="w-full bg-blue-700/60 transition-all duration-1000 relative" style={{ height: `${tank.level}%` }}>
                         <div className="absolute top-0 left-0 w-full h-1 bg-white/30"></div>
                       </div>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
          </div>
        </Card>

        <Card title="Distribution Pumps" className="col-span-4 flex flex-col min-h-0" noPadding>
          <div className="flex-1 overflow-y-auto custom-scrollbar p-3 bg-slate-50/30">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] p-3 mb-1">Booster Pumps (To Floors)</h3>
            <div className="flex flex-col gap-2">
              {waterPumps.filter(p => p.type === 'Booster Pump').map(pump => (
                <div key={pump.id} className="flex items-center justify-between p-4 rounded-xl bg-white border border-slate-200/60 hover:border-blue-200 transition-all shadow-sm group cursor-pointer">
                  <div>
                    <div className="font-black text-slate-800 tracking-tight">{pump.id}</div>
                    <div className={clsx("text-[10px] font-black uppercase tracking-widest mt-1", pump.status === 'ON' ? "text-emerald-600" : "text-slate-400")}>
                      {pump.status}
                    </div>
                  </div>
                  <div className="text-right flex gap-5">
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Flow</div>
                      <div className="font-black text-slate-900 tracking-tight">{pump.flow} <span className="text-[9px] text-slate-400 font-bold uppercase">L/s</span></div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Pressure</div>
                      <div className="font-black text-slate-900 tracking-tight">{pump.pressure} <span className="text-[9px] text-slate-400 font-bold uppercase">bar</span></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
