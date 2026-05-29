import { User, ChevronDown, Building2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { hospitals, type Hospital } from '../data/hospitals';

interface HeaderProps {
  role: string;
  activeHospital: Hospital;
  onHospitalChange: (hospital: Hospital) => void;
}

export function Header({ role, activeHospital, onHospitalChange }: HeaderProps) {
  const [time, setTime] = useState(new Date());
  const [isHospitalMenuOpen, setIsHospitalMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const roles: Record<string, string> = {
    direktur: 'Direktur',
    manajer: 'Manajer',
    teknisi: 'Teknisi',
  };

  return (
    <header className="h-14 border-b border-slate-200 bg-white/90 backdrop-blur-md flex items-center justify-between px-5 sticky top-0 z-40 shrink-0">
      <div className="flex items-center gap-4">
        {/* Hospital Switcher */}
        <div className="relative">
          <button
            onClick={() => setIsHospitalMenuOpen(!isHospitalMenuOpen)}
            className="flex items-center gap-2 group px-2 py-1 rounded-lg hover:bg-slate-50 transition-all"
          >
            <div className="font-mono text-sm text-slate-800 tracking-wide font-extrabold uppercase flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-600" />
              {activeHospital.name}
            </div>
            <ChevronDown className={clsx("w-3 h-3 text-slate-400 transition-transform duration-200", isHospitalMenuOpen && "rotate-180")} />
          </button>

          {isHospitalMenuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsHospitalMenuOpen(false)} />
              <div className="absolute left-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-2xl shadow-slate-200/50 overflow-hidden z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-3 py-2 bg-slate-50 border-b border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Switch Location</span>
                </div>
                <div className="p-1.5">
                  {hospitals.map((h) => (
                    <button
                      key={h.id}
                      onClick={() => {
                        onHospitalChange(h);
                        setIsHospitalMenuOpen(false);
                      }}
                      className={clsx(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs transition-all text-left",
                        activeHospital.id === h.id
                          ? "bg-blue-50 text-blue-700 font-bold"
                          : "text-slate-600 hover:bg-slate-50 font-medium"
                      )}
                    >
                      <div className={clsx("w-1.5 h-1.5 rounded-full", activeHospital.id === h.id ? "bg-blue-500" : "bg-slate-300")} />
                      <div className="flex flex-col">
                        <span>{h.name}</span>
                        <span className="text-[9px] opacity-60">{h.city}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="h-4 w-px bg-slate-200" />
        <span className="text-slate-500 text-[11px] uppercase tracking-wider font-semibold">
          Building Management System
        </span>
      </div>

      <div className="flex items-center gap-3">
        {/* Live pill */}
        <div className="flex items-center gap-1.5 bg-slate-100 border border-slate-200 rounded-full px-3 py-1 text-[10px] font-bold text-slate-600">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          SYSTEM LIVE
        </div>

        <div className="h-4 w-px bg-slate-200 mx-1" />

        <div className="text-[11px] font-bold text-slate-500 bg-slate-50 px-2 py-1 rounded border border-slate-100 tabular-nums">
          {time.toLocaleTimeString('id-ID')} · {time.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
        </div>

        {/* Role Display (Static) */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-100">
          <User className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs font-bold text-slate-600 uppercase tracking-tight">
            {roles[role]}
          </span>
        </div>
      </div>
    </header>
  );
}
