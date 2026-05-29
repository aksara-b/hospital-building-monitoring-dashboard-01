import { useState, useMemo, useEffect } from 'react';
import { Card } from './Card';
import { getFloorData, getRoomsForFloor } from '../data/mockData';
import { clsx } from 'clsx';
import { Bell, Thermometer, User, CheckCircle2, Wrench, Clock, Trash2, CalendarHeart } from 'lucide-react';
import { type Hospital } from '../data/hospitals';

const statusConfig: Record<string, { color: string, bg: string, icon: any }> = {
  Occupied: { color: 'text-blue-600', bg: 'bg-blue-50 border-blue-100', icon: User },
  Available: { color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-100', icon: CheckCircle2 },
  Maintenance: { color: 'text-amber-600', bg: 'bg-amber-50 border-amber-100', icon: Wrench },
  Prepare: { color: 'text-purple-600', bg: 'bg-purple-50 border-purple-100', icon: Clock },
  Cleaning: { color: 'text-cyan-600', bg: 'bg-cyan-50 border-cyan-100', icon: Trash2 },
  Reserved: { color: 'text-pink-600', bg: 'bg-pink-50 border-pink-100', icon: CalendarHeart },
};

interface OccupancyProps {
  hospital: Hospital;
}

export function Occupancy({ hospital }: OccupancyProps) {
  const floorData = useMemo(() => getFloorData(hospital.id), [hospital.id]);
  const [selectedFloor, setSelectedFloor] = useState(floorData[1]?.floor || 'L1');

  useEffect(() => {
    // Reset selected floor when hospital changes if the current floor doesn't exist in the new hospital
    if (!floorData.some(f => f.floor === selectedFloor)) {
      setSelectedFloor(floorData[1]?.floor || 'L1');
    }
  }, [hospital.id, floorData]);

  // Calculate totals
  const { totalBeds, totalOccupied } = useMemo(() => {
    return floorData.reduce((acc, floor) => {
      acc.totalBeds += floor.beds || 0;
      acc.totalOccupied += floor.occupied || 0;
      return acc;
    }, { totalBeds: 0, totalOccupied: 0 });
  }, [floorData]);

  const rooms = useMemo(() => getRoomsForFloor(selectedFloor, hospital.id), [selectedFloor, hospital.id]);
  
  // Count statuses for current floor
  const statusCounts = useMemo(() => {
    return rooms.reduce((acc: any, room) => {
      acc[room.status] = (acc[room.status] || 0) + 1;
      return acc;
    }, {});
  }, [rooms]);

  return (
    <div className="p-6 flex flex-col gap-6 max-w-[1600px] mx-auto pb-24">
      {/* Top KPI Row */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/60 rounded-xl p-5 flex flex-col justify-between shadow-sm">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Total Occupancy</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-slate-900 tracking-tight">{totalOccupied}</span>
            <span className="text-lg text-slate-400 font-medium">/ {totalBeds} Beds</span>
          </div>
          <div className="mt-4 h-2 w-full bg-slate-100 rounded-full overflow-hidden flex">
             <div className="bg-blue-600 h-full" style={{ width: `${(totalOccupied / totalBeds) * 100}%` }} />
          </div>
          <div className="mt-2 text-xs text-blue-600 font-bold uppercase tracking-wider">{Math.round((totalOccupied / totalBeds) * 100)}% Occupied</div>
        </div>

        <div className="bg-white border border-slate-200/60 rounded-xl p-5 flex flex-col justify-center shadow-sm">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Available Beds</h3>
          <span className="text-4xl font-bold text-emerald-600 tracking-tight">{totalBeds - totalOccupied}</span>
          <span className="text-[10px] text-slate-500 font-bold mt-2 uppercase tracking-widest">Ready for admission</span>
        </div>

        <div className="bg-white border border-slate-200/60 rounded-xl p-5 flex flex-col justify-center shadow-sm">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Maintenance / Cleaning</h3>
          <span className="text-4xl font-bold text-amber-600 tracking-tight">8</span>
          <span className="text-[10px] text-slate-500 font-bold mt-2 uppercase tracking-widest">Temporarily unavailable</span>
        </div>

        <div className="bg-white border border-rose-100 rounded-xl p-5 flex flex-col justify-center relative overflow-hidden group shadow-sm">
          <div className="absolute inset-0 bg-rose-500/5 animate-pulse" />
          <h3 className="text-xs font-bold text-rose-500 mb-2 relative z-10 flex items-center gap-2 uppercase tracking-widest">
            <Bell className="w-4 h-4" /> Active Nurse Calls
          </h3>
          <span className="text-4xl font-bold text-rose-600 tracking-tight relative z-10">3</span>
          <span className="text-[10px] text-rose-400 font-bold mt-2 relative z-10 uppercase tracking-widest">Immediate attention</span>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 h-[650px]">
        {/* Left Sidebar: Floor List */}
        <Card title="Floor Overview" className="col-span-3 flex flex-col overflow-hidden" noPadding>
          <div className="overflow-y-auto flex-1 p-2 flex flex-col gap-1 custom-scrollbar bg-slate-50/30">
            {floorData.filter(f => f.beds > 0).map(floor => (
              <button
                key={floor.floor}
                onClick={() => setSelectedFloor(floor.floor)}
                className={clsx(
                  "flex items-center justify-between p-4 rounded-xl border transition-all text-left",
                  selectedFloor === floor.floor 
                    ? "bg-white border-blue-500 shadow-lg shadow-blue-100" 
                    : "bg-transparent border-transparent text-slate-600 hover:bg-white hover:border-slate-200"
                )}
              >
                <div>
                  <div className={clsx("font-bold text-sm", selectedFloor === floor.floor ? "text-blue-700" : "text-slate-700")}>
                    {floor.name}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5 font-bold uppercase tracking-wider">
                    {floor.occupied} / {floor.beds} Beds
                  </div>
                </div>
                <div className="text-right">
                  <div className={clsx("text-xs font-black", selectedFloor === floor.floor ? "text-blue-600" : "text-slate-400")}>
                    {Math.round((floor.occupied / floor.beds) * 100)}%
                  </div>
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Main Area: Room Mockup Layout */}
        <Card 
          title={
            <div className="flex items-center gap-3">
              <span className="font-bold text-slate-800 tracking-tight">{floorData.find(f => f.floor === selectedFloor)?.name} - Room Layout</span>
              <div className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600 border border-slate-200 font-bold uppercase tracking-widest">
                {rooms.length} Beds
              </div>
            </div>
          } 
          className="col-span-9 flex flex-col min-h-0"
          noPadding
        >
          <div className="flex flex-col h-full p-6 min-h-0 overflow-hidden">
            {/* Status Legend */}
            <div className="flex flex-wrap gap-4 mb-6 p-4 bg-slate-50 border border-slate-100 rounded-xl shrink-0">
            {Object.entries(statusConfig).map(([status, config]) => (
              <div key={status} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                <div className={clsx("w-3 h-3 rounded-full border", config.bg)} />
                <span className="text-slate-500">{status} ({statusCounts[status] || 0})</span>
              </div>
            ))}
          </div>

            {/* Room Grid */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-1">
              <div className="grid grid-cols-3 gap-4 pb-4">
              {rooms.map(room => {
                const config = statusConfig[room.status];
                const Icon = config.icon;
                
                return (
                  <div 
                    key={room.id} 
                    className={clsx(
                      "rounded-2xl border p-5 transition-all hover:scale-[1.02] cursor-pointer relative overflow-hidden shadow-sm",
                      config.bg,
                      room.nurseCall && "ring-2 ring-rose-500 shadow-lg shadow-rose-100"
                    )}
                  >
                    {/* Nurse call pulse background */}
                    {room.nurseCall && <div className="absolute inset-0 bg-rose-500/5 animate-pulse pointer-events-none" />}
                    
                    <div className="flex justify-between items-start mb-4 relative z-10">
                      <div>
                        <h4 className={clsx("text-xl font-black tracking-tight mb-1", room.status === 'Available' ? 'text-slate-800' : 'text-slate-900')}>{room.id}</h4>
                        <span className={clsx("text-[9px] font-black px-2 py-0.5 rounded-full border uppercase tracking-[0.15em]", config.bg, config.color)}>
                          {room.status}
                        </span>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {room.nurseCall && (
                          <div className="bg-rose-600 text-white p-1.5 rounded-full animate-bounce shadow-lg shadow-rose-200">
                            <Bell className="w-4 h-4" />
                          </div>
                        )}
                        <Icon className={clsx("w-6 h-6 opacity-40", config.color)} />
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-slate-900/5 flex justify-between items-center relative z-10">
                      <div className="flex items-center gap-1.5 text-slate-600 text-xs font-bold tabular-nums">
                        <Thermometer className="w-4 h-4 text-slate-400" />
                        <span>{room.temp.toFixed(1)}°C</span>
                      </div>
                      {room.patientName && (
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest truncate max-w-[120px]">
                          {room.patientName}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Card>
      </div>
    </div>
  );
}
