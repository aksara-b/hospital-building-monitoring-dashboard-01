import { clsx } from 'clsx';
import { CheckCircle2, ShieldCheck } from 'lucide-react';
import { type Hospital } from '../data/hospitals';

interface FireSystemProps {
  hospital: Hospital;
}

const kpis = [
  { label: 'Status FACP', value: 'NORMAL', unit: '', delta: '10 zona clear', deltaOk: true, color: '#065F46' },
  { label: 'Pompa Jockey', value: 'STANDBY', unit: '', delta: 'Press: 8.2 bar', deltaOk: true, color: '#1E40AF' },
  { label: 'Pompa Utama', value: 'STANDBY', unit: '', delta: 'Diesel ready', deltaOk: true, color: '#0369A1' },
  { label: 'Tandon Hydrant', value: '92', unit: '%', delta: '~55.2 m³', deltaOk: true, color: '#4338CA' },
  { label: 'Smoke Detector', value: '148/148', unit: '', delta: 'Semua aktif', deltaOk: true, color: '#B45309' },
  { label: 'Lift Fire Recall', value: 'INTERLOCK OK', unit: '', delta: '4 lift siap', deltaOk: true, color: '#991B1B' },
];

const fireZones = [
  { floor: 'Lantai 1 — Lobby & ME Room', detectors: 14, lastTest: '2 Apr 2026' },
  { floor: 'Lantai 2 — Admin & Kasir', detectors: 12, lastTest: '2 Apr 2026' },
  { floor: 'Lantai 3 — Poli & IGD', detectors: 16, lastTest: '1 Apr 2026' },
  { floor: 'Lantai 4 — Lab & Farmasi', detectors: 14, lastTest: '1 Apr 2026' },
  { floor: 'Lantai 5 — OK & CSSD', detectors: 18, lastTest: '28 Mar 2026' },
  { floor: 'Lantai 6 — PONEK & HCU', detectors: 16, lastTest: '28 Mar 2026' },
  { floor: 'Lantai 7 — ICU/PICU/NICU', detectors: 18, lastTest: '25 Mar 2026' },
  { floor: 'Lantai 8-9 — Rawat Inap', detectors: 20, lastTest: '20 Mar 2026' },
  { floor: 'Lantai 10 — Direksi & Teknis', detectors: 8, lastTest: '18 Mar 2026' },
];

export function FireSystem({ hospital }: FireSystemProps) {
  return (
    <div className="p-6 flex flex-col gap-6 max-w-[1600px] mx-auto pb-24">
      {/* <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-1">Fire Protection Systems — {hospital.name}</h2>
          <p className="text-sm text-slate-500 font-medium">Integrated FACP Addressable — BACnet/IP. Zone Status, Hydrant Pumps, Evacuation Interlock</p>
        </div>
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
          Life Safety Network
        </div>
      </div> */}

      <div className="flex items-center gap-4 bg-emerald-50 border border-emerald-100 rounded-xl p-5 text-sm shadow-sm">
        <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
          <ShieldCheck className="w-5 h-5 shrink-0" />
        </div>
        <div>
          <div className="text-emerald-900 font-black uppercase tracking-widest text-[10px] mb-0.5">System Integrity Check</div>
          <p className="text-emerald-700 font-medium">Semua zona clear. Tidak ada alarm kebakaran aktif. Sistem dalam kondisi normal.</p>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-4">
        {kpis.map((k) => (
          <div key={k.label} className="bg-white border border-slate-200/60 rounded-xl p-5 relative overflow-hidden shadow-sm group transition-all">
            <div className="absolute top-0 left-0 right-0 h-[4px]" style={{ background: k.color }} />
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-3">{k.label}</div>
            <div className="text-xl font-black text-slate-900 tracking-tight mb-2">
              {k.value}{k.unit && <span className="text-xs text-slate-400 font-bold uppercase ml-1">{k.unit}</span>}
            </div>
            <div className="text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 text-emerald-600">
              <CheckCircle2 className="w-3.5 h-3.5" />{k.delta}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <h3 className="font-black text-slate-800 text-xs uppercase tracking-[0.2em]">Fire Zone Integrity — {hospital.floorCount} Floors</h3>
          <span className="text-[10px] bg-emerald-50 border border-emerald-100 text-emerald-600 px-3 py-1 rounded-full font-black uppercase tracking-widest shadow-sm">All Clear</span>
        </div>
        <table className="w-full text-sm text-left">
          <thead className="text-[10px] text-slate-500 uppercase bg-slate-50 border-b border-slate-100 font-black tracking-widest">
            <tr>
              <th className="px-6 py-4">Zona / Lantai</th>
              <th className="px-6 py-4 text-center">Detector</th>
              <th className="px-6 py-4 text-center">Sprinkler Flow</th>
              <th className="px-6 py-4 text-center">Status FACP</th>
              <th className="px-6 py-4 text-right">Last Test</th>
            </tr>
          </thead>
          <tbody>
            {fireZones.map((z, i) => (
              <tr key={z.floor} className={clsx('border-b border-slate-50 hover:bg-slate-50/50 transition-colors', i % 2 === 0 ? 'bg-slate-50/20' : '')}>
                <td className="px-6 py-3.5 font-bold text-slate-800">{z.floor}</td>
                <td className="px-6 py-3.5 text-center text-slate-600 font-bold">{z.detectors} units</td>
                <td className="px-6 py-3.5 text-center text-slate-600 font-bold">Normal</td>
                <td className="px-6 py-3.5 text-center">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest">
                    <CheckCircle2 className="w-3.5 h-3.5" /> NORMAL
                  </span>
                </td>
                <td className="px-6 py-3.5 text-right text-slate-400 text-xs font-bold font-mono">{z.lastTest}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {[
          { title: 'Jaringan Hydrant', detail: 'Pipa: 4" Sch 40 | Zona: 3 | Outlet: 18 titik', bar: 92, color: '#4338CA' },
          { title: 'Sistem Sprinkler', detail: 'Wet Pipe — 320 head | Zona: 10 | Alarm Valve: Normal', bar: 100, color: '#2563EB' },
          { title: 'APAR', detail: '124 unit | Terisi penuh: 119 unit | Inspeksi: OK', bar: 96, color: '#059669' },
        ].map((item) => (
          <div key={item.title} className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm transition-all">
            <h4 className="text-sm font-black text-slate-800 mb-2 uppercase tracking-tight">{item.title}</h4>
            <p className="text-[11px] text-slate-500 mb-4 font-medium">{item.detail}</p>
            <div className="flex items-center gap-4">
              <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${item.bar}%`, background: item.color }} />
              </div>
              <span className="text-xs font-black text-slate-900 w-10 text-right">{item.bar}%</span>
            </div>
            <div className="text-[10px] text-emerald-600 font-black uppercase tracking-widest mt-4 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Operational Normal
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
