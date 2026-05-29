import { clsx } from 'clsx';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { type Hospital } from '../data/hospitals';

interface MedicalGasProps {
  hospital: Hospital;
}

const kpis = [
  { label: 'Tangki O₂ Sentral', value: '68', unit: '%', delta: 'Sisa ~3.4 ton', deltaOk: true, color: '#991B1B' },
  { label: 'Tekanan O₂ ICU', value: '4.1', unit: 'bar', delta: 'Normal 3.5–5 bar', deltaOk: true, color: '#1E40AF' },
  { label: 'Tekanan Vakum', value: '-0.62', unit: 'bar', delta: 'OK -0.5 to -0.8', deltaOk: true, color: '#065F46' },
  { label: 'Udara Medis', value: '4.4', unit: 'bar', delta: 'Normal 4–5 bar', deltaOk: true, color: '#4338CA' },
  { label: 'N₂O Anestesi', value: '3.8', unit: 'bar', delta: 'Normal 3.5–4.5', deltaOk: true, color: '#B45309' },
  { label: 'O₂ Enrichment OK', value: '21.2', unit: '%', delta: 'Normal <23.5%', deltaOk: true, color: '#991B1B' },
];

const zones = [
  { zone: 'ICU L7', value: 4.1, max: 5, color: '#059669', status: 'ok' },
  { zone: 'PICU L7', value: 4.0, max: 5, color: '#059669', status: 'ok' },
  { zone: 'NICU L7', value: 4.1, max: 5, color: '#059669', status: 'ok' },
  { zone: 'OK L5', value: 3.9, max: 5, color: '#2563EB', status: 'ok' },
  { zone: 'HCU L6', value: 3.8, max: 5, color: '#2563EB', status: 'ok' },
  { zone: 'Zona A L7', value: 4.0, max: 5, color: '#059669', status: 'ok' },
  { zone: 'Zona B L7', value: 3.8, max: 5, color: '#2563EB', status: 'ok' },
  { zone: 'Zona C L7 ⚠', value: 2.8, max: 5, color: '#B91C1C', status: 'crit' },
  { zone: 'PONEK L6', value: 3.9, max: 5, color: '#2563EB', status: 'ok' },
  { zone: 'VIP L8-9', value: 3.7, max: 5, color: '#4338CA', status: 'ok' },
];

export function MedicalGas({ hospital }: MedicalGasProps) {
  return (
    <div className="p-6 flex flex-col gap-6 max-w-[1600px] mx-auto pb-24">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-1">Medical Gas & Oxygen Supply — {hospital.name}</h2>
          <p className="text-sm text-slate-500 font-medium">95 Monitored Points — O₂ Sentral, N₂O, Vacuum, Medical Air — Modbus TCP</p>
        </div>
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
          Real-time Sync
        </div>
      </div>

      {/* Critical Alert */}
      {/* <div className="flex items-center gap-4 bg-rose-50 border border-rose-100 rounded-xl p-5 text-sm shadow-sm">
        <div className="p-2 bg-rose-100 rounded-lg text-rose-600">
          <AlertTriangle className="w-5 h-5 shrink-0" />
        </div>
        <div>
          <div className="text-rose-900 font-black uppercase tracking-widest text-[10px] mb-0.5">Critical System Warning</div>
          <p className="text-rose-700 font-medium">Zona C Lantai 7 tekanan O₂ di bawah threshold (2.8 bar). Segera cek regulator zona.</p>
        </div>
      </div> */}

      {/* KPIs */}
      <div className="grid grid-cols-6 gap-4">
        {kpis.map((k) => (
          <div key={k.label} className="bg-white border border-slate-200/60 rounded-xl p-5 relative overflow-hidden shadow-sm group transition-all">
            <div className="absolute top-0 left-0 right-0 h-[4px]" style={{ background: k.color }} />
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-3">{k.label}</div>
            <div className="text-2xl font-black text-slate-900 tracking-tight mb-2">
              {k.value} <span className="text-xs text-slate-400 font-bold uppercase ml-0.5">{k.unit}</span>
            </div>
            <div className={clsx('text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5', k.deltaOk ? 'text-emerald-600' : 'text-rose-600')}>
              {k.deltaOk ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
              {k.delta}
            </div>
          </div>
        ))}
      </div>

      {/* Zone Pressures */}
      <div className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <h3 className="font-black text-slate-800 text-xs uppercase tracking-[0.2em]">Oxygen Pressure By Zone</h3>
          <span className="text-[10px] bg-white border border-slate-200 text-slate-500 px-2 py-0.5 rounded font-black uppercase tracking-widest shadow-sm">25 Sensors Active</span>
        </div>
        <div className="p-8 grid grid-cols-2 gap-x-12 gap-y-5">
          {zones.map((z) => (
            <div key={z.zone} className="flex items-center gap-5">
              <span className="w-32 text-[11px] font-bold text-slate-500 uppercase tracking-wider shrink-0">{z.zone}</span>
              <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${(z.value / z.max) * 100}%`, background: z.color }}
                />
              </div>
              <div className="flex items-center gap-2 w-20 justify-end">
                <span className={clsx('text-xs font-black tracking-tight', z.status === 'crit' ? 'text-rose-600' : 'text-slate-800')}>
                  {z.value} bar
                </span>
                {z.status === 'crit' && <AlertTriangle className="w-4 h-4 text-rose-500 animate-pulse shrink-0" />}
              </div>
            </div>
          ))}
        </div>
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex gap-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
          <div className="flex items-center gap-2"><div className="w-3 h-1.5 rounded bg-emerald-500" /> Normal</div>
          <div className="flex items-center gap-2"><div className="w-3 h-1.5 rounded bg-blue-500" /> Warning</div>
          <div className="flex items-center gap-2"><div className="w-3 h-1.5 rounded bg-rose-500" /> Critical</div>
        </div>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-3 gap-6">
        {[
          { title: 'Kompresor Gas Medis', status: 'Running', detail: 'Unit A: ON · Unit B: Standby', statusOk: true },
          { title: 'Regulator Sentral O₂', status: 'Normal', detail: 'Outlet: 4.0 bar · Inlet: 155 bar', statusOk: true },
          { title: 'Alarm Panel Gas Medis', status: 'ACTIVE ALARM', detail: 'Zona C L7 — segera tindak!', statusOk: false },
        ].map((s) => (
          <div key={s.title} className={clsx('rounded-2xl border p-6 shadow-sm transition-all', s.statusOk ? 'bg-white border-slate-200' : 'bg-rose-50 border-rose-100')}>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.15em] mb-3">{s.title}</div>
            <div className={clsx('text-xl font-black tracking-tight mb-2', s.statusOk ? 'text-slate-800' : 'text-rose-600')}>{s.status}</div>
            <div className={clsx('text-[11px] font-medium', s.statusOk ? 'text-slate-500' : 'text-rose-500/80')}>{s.detail}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
