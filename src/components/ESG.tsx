import { clsx } from 'clsx';
import { Leaf, Users, Shield } from 'lucide-react';
import { type Hospital } from '../data/hospitals';

interface ESGProps {
  hospital: Hospital;
}

const esgScores = [
  { cat: 'Lingkungan (E)', icon: Leaf, score: 74, color: '#065F46', sub: 'Energi • Emisi • Air • Limbah' },
  { cat: 'Sosial (S)', icon: Users, score: 79, color: '#1E40AF', sub: 'K3 • Pasien • Komunitas' },
  { cat: 'Governance (G)', icon: Shield, score: 76, color: '#4338CA', sub: 'Audit • SOP • Transparansi' },
];

const envIndicators = [
  { label: 'Intensitas Energi', value: 82, color: '#065F46' },
  { label: 'Penghematan PLN', value: 68, color: '#0F766E' },
  { label: 'PLTS Penetrasi', value: 10, color: '#059669' },
  { label: 'Efisiensi Air', value: 75, color: '#4338CA' },
  { label: 'Limbah B3 Proper', value: 90, color: '#1E40AF' },
];

const socIndicators = [
  { label: 'LTI-Free Days', value: 100, display: '280 hari', color: '#1E40AF' },
  { label: 'Pelatihan K3', value: 88, display: '88%', color: '#1D4ED8' },
  { label: 'Kepuasan Pasien', value: 84, display: '4.2/5', color: '#4338CA' },
  { label: 'Audit Internal', value: 100, display: '100%', color: '#B45309' },
  { label: 'SOP Tersertif.', value: 92, display: '92%', color: '#B45309' },
  { label: 'Akreditasi SNARS', value: 100, display: 'Paripurna', color: '#065F46' },
];

const savings = [
  { label: 'Hemat Listrik', value: 'Rp 98 jt', sub: 'YTD 4 bulan', color: '#1E88E5' },
  { label: 'Hemat Air', value: 'Rp 14 jt', sub: 'YTD 4 bulan', color: '#4527A0' },
  { label: 'Cost Avoidance', value: 'Rp 75 jt', sub: 'Breakdown dicegah', color: '#00796B' },
  { label: 'Total Savings', value: 'Rp 187 jt', sub: 'Payback: ~7 thn', color: '#059669', highlight: true },
];

export function ESG({ hospital }: ESGProps) {
  return (
    <div className="p-6 flex flex-col gap-6 max-w-[1600px] mx-auto pb-12">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-1">Laporan Keberlanjutan {hospital.name.toUpperCase()}</h2>
        <p className="text-sm text-slate-500 font-medium">Didukung data BMS real-time — konsumsi energi, emisi, efisiensi air, keselamatan kerja, kepatuhan standar</p>
      </div>

      {/* ESG Score Cards */}
      <div className="grid grid-cols-3 gap-6">
        {esgScores.map((e) => (
          <div key={e.cat} className="bg-white border border-slate-200 rounded-xl p-6 text-center flex flex-col items-center gap-3 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-3 bg-slate-50 rounded-2xl text-slate-900 shadow-inner">
              <e.icon className="w-8 h-8" />
            </div>
            <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{e.cat}</div>
            <div className="text-3xl font-black text-slate-900 tracking-tight">{e.score}</div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${e.score}%` }} />
            </div>
            <div className="text-[10px] text-slate-400 mt-2">{e.sub}</div>
          </div>
        ))}
      </div>

      {/* Indicators */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <h3 className="font-bold text-slate-800 text-xs uppercase tracking-widest mb-6">Environmental Performance</h3>
          <div className="space-y-4">
            {envIndicators.map((s) => (
              <div key={s.label}>
                <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                  <span>{s.label}</span>
                  <span className="text-slate-900">{s.value}%</span>
                </div>
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${s.value}%`, background: s.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <h3 className="font-bold text-slate-800 text-xs uppercase tracking-widest mb-6">Social & Governance Health</h3>
          <div className="space-y-4">
            {socIndicators.map((s) => (
              <div key={s.label}>
                <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                  <span>{s.label}</span>
                  <span className="text-slate-900">{s.display}</span>
                </div>
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${s.value}%`, background: s.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ROI / Savings */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <h3 className="font-bold text-slate-800 text-xs uppercase tracking-widest mb-6">BMS ROI & Energy Savings 2026</h3>
        <div className="grid grid-cols-4 gap-4">
          {savings.map((s) => (
            <div key={s.label} className={clsx('rounded-xl p-4 text-center border shadow-sm', s.highlight ? 'bg-emerald-50 border-emerald-100' : 'bg-slate-50 border-slate-100')}>
              <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">{s.label}</div>
              <div className="text-xl font-black tracking-tight text-slate-900 mb-1" style={{ color: s.color }}>{s.value}</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
