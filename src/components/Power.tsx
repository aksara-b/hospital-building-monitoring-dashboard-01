import { Card } from './Card';
import { KPICard } from './KPICard';
import { powerIncomers, gensetData, powerByFloor } from '../data/mockData';
import { clsx } from 'clsx';
import { Zap, Battery, AlertCircle } from 'lucide-react';
import { type Hospital } from '../data/hospitals';

interface PowerProps {
  hospital: Hospital;
}

export function Power({ hospital }: PowerProps) {
  const totalLoad = powerIncomers.reduce((sum, inc) => sum + inc.load, 0);
  const totalGensetFuel = gensetData.reduce((sum, gs) => sum + gs.fuel, 0) / gensetData.length;

  return (
    <div className="p-6 flex flex-col gap-6 max-w-[1600px] mx-auto pb-24">
      <div className="grid grid-cols-4 gap-4">
        <KPICard 
          title="Total Power Demand" 
          value={(hospital.id === 'bekasi' ? totalLoad * 1.3 : totalLoad).toLocaleString()} 
          unit="kW" 
          trend={1.2}
          subtitle={`Peak: ${hospital.id === 'bekasi' ? '2,450' : '1,850'} kW`}
        />
        <KPICard 
          title="Average Power Factor" 
          value={hospital.id === 'bekasi' ? "0.91" : "0.93"} 
          trend={0.01}
          subtitle="Target > 0.90"
        />
        <KPICard 
          title="Genset Avg Fuel Level" 
          value={totalGensetFuel.toFixed(1)} 
          unit="%" 
          trend={-5.5}
          trendLabel="vs yesterday"
          subtitle="Refill needed < 30%"
        />
        <div className="bg-white border border-slate-200/60 rounded-xl p-5 flex flex-col justify-center shadow-sm">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Grid Status</h3>
          <span className="text-4xl font-bold text-emerald-600 tracking-tight">PLN Active</span>
          <span className="text-[10px] text-slate-500 font-bold mt-2 uppercase tracking-widest">All incomers normal</span>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 h-[600px]">
        {/* Main Incomers & Gensets */}
        <div className="col-span-8 flex flex-col gap-6">
          <Card title={`Main Power Distribution — ${hospital.name}`} className="flex-1 flex flex-col min-h-0" noPadding>
             <div className="flex-1 overflow-y-auto custom-scrollbar p-6 bg-slate-50/30">
               <div className="grid grid-cols-2 gap-6 mb-8">
                 {powerIncomers.map(inc => (
                    <div key={inc.id} className="bg-white border border-slate-200/60 rounded-2xl p-5 flex flex-col gap-5 shadow-sm">
                      <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                         <div className="flex items-center gap-3">
                           <Zap className={clsx("w-5 h-5", inc.status === 'ACTIVE' ? "text-emerald-500" : "text-slate-300")} />
                           <span className="font-black text-slate-800 text-lg tracking-tight">{inc.id}</span>
                         </div>
                         <span className={clsx("px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest", inc.status === 'ACTIVE' ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500")}>
                           {inc.status}
                         </span>
                       </div>
                       <div className="grid grid-cols-2 gap-y-5 gap-x-4">
                         <div>
                           <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Voltage</div>
                           <div className="text-xl font-black text-slate-900 tracking-tight">{inc.voltage} <span className="text-xs font-bold text-slate-400 uppercase">V</span></div>
                         </div>
                         <div>
                           <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Current</div>
                           <div className="text-xl font-black text-slate-900 tracking-tight">{inc.current} <span className="text-xs font-bold text-slate-400 uppercase">A</span></div>
                         </div>
                         <div>
                           <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Power Factor</div>
                           <div className="text-xl font-black text-slate-900 tracking-tight">{inc.pf}</div>
                         </div>
                         <div>
                           <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Active Load</div>
                           <div className="text-xl font-black text-blue-600 tracking-tight">{hospital.id === 'bekasi' ? Math.round(inc.load * 1.3) : inc.load} <span className="text-xs font-bold text-slate-400 uppercase">kW</span></div>
                         </div>
                       </div>
                    </div>
                  ))}
               </div>

               <h3 className="text-xs font-bold text-slate-400 mb-5 uppercase tracking-widest">Backup Generators</h3>
               <div className="grid grid-cols-3 gap-4">
                 {gensetData.map(gs => (
                   <div key={gs.id} className="bg-white border border-slate-200/60 rounded-xl p-4 flex flex-col gap-4 shadow-sm">
                     <div className="flex justify-between items-center">
                       <span className="font-black text-slate-800 text-sm tracking-tight">{gs.id}</span>
                       <span className={clsx("text-[10px] font-black uppercase tracking-widest", gs.status === 'STANDBY' ? "text-emerald-600" : "text-amber-600")}>{gs.status}</span>
                     </div>
                     <div>
                       <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                         <span>Fuel Level</span>
                         <span className={clsx(gs.fuel > 30 ? "text-slate-600" : "text-rose-600")}>{gs.fuel}%</span>
                       </div>
                       <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                         <div className={clsx("h-full", gs.fuel > 30 ? "bg-blue-600" : "bg-rose-500")} style={{ width: `${gs.fuel}%` }} />
                       </div>
                     </div>
                     <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                       <Battery className="w-4 h-4 text-slate-300" /> Battery: <span className="text-slate-800">{gs.battery > 0 ? `${gs.battery}V` : 'Disconnected'}</span>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
          </Card>
        </div>

        {/* Floor by Floor Breakdown */}
        <Card title="Floor Power Consumption" className="col-span-4 flex flex-col min-h-0" noPadding>
          <div className="flex-1 overflow-y-auto custom-scrollbar p-3 bg-slate-50/30">
            <div className="flex flex-col gap-2">
              {powerByFloor.slice(0, hospital.id === 'bekasi' ? 12 : 9).map(floor => (
                <div key={floor.floor} className="flex items-center justify-between p-4 rounded-xl bg-white border border-slate-200/60 hover:border-blue-200 transition-all group cursor-pointer shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-black text-slate-700 text-sm group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                      {floor.floor}
                    </div>
                    {floor.status === 'High' && (
                      <div className="bg-amber-50 text-amber-600 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> High
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className={clsx("text-lg font-black tracking-tight", floor.status === 'High' ? "text-amber-600" : "text-slate-900")}>
                      {floor.load} <span className="text-xs font-bold text-slate-400 uppercase ml-1">kW</span>
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
