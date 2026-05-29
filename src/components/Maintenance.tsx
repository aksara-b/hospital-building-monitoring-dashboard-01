import { clsx } from 'clsx';
import { AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import { type Hospital } from '../data/hospitals';

interface MaintenanceProps {
  hospital: Hospital;
}

const kpis = [
  { label: 'PM Selesai Bulan Ini', value: '9', unit: '/16', delta: '56% completion', deltaOk: true, color: '#059669' },
  { label: 'PM Pending', value: '5', unit: '', delta: 'Due minggu ini', deltaOk: false, color: '#B45309' },
  { label: 'PM Overdue', value: '2', unit: '', delta: 'Segera tindak!', deltaOk: false, color: '#991B1B' },
  { label: 'MTBF Rata-rata', value: '4,820', unit: 'jam', delta: 'Up 8% YoY', deltaOk: true, color: '#1E40AF' },
  { label: 'Cost Avoidance', value: 'Rp 75', unit: 'jt', delta: 'Breakdown dicegah', deltaOk: true, color: '#4338CA' },
  { label: 'Genset Run Hours', value: '1,240', unit: 'h', delta: 'Next PM: 260h lagi', deltaOk: true, color: '#B45309' },
];

type BadgeType = 'ok' | 'warn' | 'crit';

const badgeClass: Record<BadgeType, string> = {
  ok: 'bg-emerald-50 text-emerald-600',
  warn: 'bg-amber-50 text-amber-600',
  crit: 'bg-rose-50 text-rose-600',
};

const predictions = [
  { tag: 'O2', tagColor: 'text-rose-600', bg: 'bg-rose-50/50 border-rose-100', title: 'Proyeksi Habis O2:', desc: 'Level + flow rate + sisa waktu ~38 jam. Order ulang!' },
  { tag: 'PAB', tagColor: 'text-amber-600', bg: 'bg-amber-50/50 border-amber-100', title: 'Prediksi Failure Pompa:', desc: 'Ampere PAB-2 naik +8% 3 hari terakhir. Schedule PM.' },
  { tag: 'kWh', tagColor: 'text-blue-600', bg: 'bg-blue-50/50 border-blue-100', title: 'Proyeksi Energi Mei:', desc: 'Berdasarkan BOR & cuaca + est. 122,000 kWh (budget 120k).' },
  { tag: 'AC', tagColor: 'text-teal-600', bg: 'bg-teal-50/50 border-teal-100', title: 'PM Optimal:', desc: 'AC VRV L7 capai 2,980 jam -> jadwal PM tanpa ganggu ICU shift pagi.' },
];

export function Maintenance({ hospital }: MaintenanceProps) {
  const pmSchedule: { asset: string; action: string; trigger: string; freq: string; freqColor: string; pic: string; status: string; badge: BadgeType }[] = [
    { asset: 'Genset 900 KVA', action: 'Cek oli, coolant, fuel, battery, load test', trigger: 'Run hours > 250 jam OR fuel < 40%', freq: 'MONTHLY', freqColor: '#880E4F', pic: 'Teknisi Listrik', status: 'Selesai', badge: 'ok' },
    { asset: 'ATS PLN & Genset', action: 'Test switching, cek kontak, cycle time', trigger: 'Switching count > 500 cycles', freq: 'QUARTERLY', freqColor: '#0D47A1', pic: 'Teknisi Listrik', status: 'Pending', badge: 'warn' },
    { asset: 'Transformator (3 unit)', action: 'Thermography winding, terminasi, cleaning', trigger: 'Suhu > 70C > 4 jam/hari', freq: 'SEMI-ANNUAL', freqColor: '#E65100', pic: 'Teknisi Sr + Vendor', status: 'Selesai', badge: 'ok' },
    { asset: 'Panel SDP (10 unit)', action: 'Thermography, pengecekan terminasi', trigger: 'Current imbalance > 15% atau trip log', freq: 'SEMI-ANNUAL', freqColor: '#E65100', pic: 'Teknisi Listrik', status: 'Selesai', badge: 'ok' },
    { asset: `UPS Per Lantai (${hospital.floorCount} unit)`, action: 'Test battery capacity, replacement plan', trigger: 'Autonomy < 50% rated', freq: 'QUARTERLY', freqColor: '#0D47A1', pic: 'Teknisi Listrik', status: 'Overdue', badge: 'crit' },
    { asset: 'AC Unit / VRV', action: 'Refrigerant, filter, drain, ampere check', trigger: 'Runtime > 3000 jam OR suhu naik > 2C', freq: 'QUARTERLY', freqColor: '#0D47A1', pic: 'Teknisi HVAC', status: 'Pending', badge: 'warn' },
    { asset: `Filter AHU (${hospital.floorCount - 1} unit)`, action: 'Bersihkan / ganti filter G4/F7/H13', trigger: 'DP > 250 Pa - dirty filter alarm BMS', freq: 'CBM-DRIVEN', freqColor: '#880E4F', pic: 'Teknisi HVAC', status: `Overdue L${hospital.floorCount - 1}`, badge: 'crit' },
    { asset: 'Exhaust Fan / PAF', action: 'Belt, bearing, balancing, ampere', trigger: 'Ampere naik > 10% dari baseline', freq: 'SEMI-ANNUAL', freqColor: '#E65100', pic: 'Teknisi HVAC', status: 'Selesai', badge: 'ok' },
    { asset: 'Pompa Air Bersih (PAB)', action: 'Seal, coupling, bearing, tekanan impeller', trigger: 'Run hours > 4000 jam, pressure turun >15%', freq: 'SEMI-ANNUAL', freqColor: '#E65100', pic: 'Teknisi Plumbing', status: 'Selesai', badge: 'ok' },
    { asset: 'GWT & Rooftop Tank', action: 'Cleaning tangki, coating, kalibrasi sensor', trigger: '6 bulan sekali atau water quality out-spec', freq: 'SEMI-ANNUAL', freqColor: '#E65100', pic: 'Teknisi Plumbing', status: 'Pending Apr-30', badge: 'warn' },
    { asset: 'Kompresor Gas Medis', action: 'Filter udara, oli, v-belt, test pressure', trigger: 'Run hours > 2000 jam per unit', freq: 'QUARTERLY', freqColor: '#0D47A1', pic: 'Tek. Gas Medis', status: 'Selesai', badge: 'ok' },
    { asset: 'Pompa Hydrant', action: 'Test run, pressure, impeller, packing', trigger: 'Wajib bulanan - regulasi NFPA 25', freq: 'MONTHLY', freqColor: '#880E4F', pic: 'Teknisi MEP + K3', status: 'Selesai', badge: 'ok' },
    { asset: 'Elevator (4 unit)', action: 'Lubrifikasi, safety device, load test', trigger: 'Door fault > 5x/bulan atau run hours', freq: 'MONTHLY', freqColor: '#880E4F', pic: 'Vendor Lift', status: 'Selesai', badge: 'ok' },
    { asset: 'Sensor BMS Kalibrasi', action: 'Kalibrasi suhu, tekanan, flow, level', trigger: 'Drift > 2% dari referensi kalibrasi', freq: 'ANNUAL', freqColor: '#1B5E20', pic: 'Teknisi Instrumen', status: 'Pending Mei', badge: 'warn' },
    { asset: 'Kulkas Obat & Cold Room', action: 'Kalibrasi termometer, cek seal, kompresor', trigger: 'Suhu excursion log atau runtime > 6000 jam', freq: 'SEMI-ANNUAL', freqColor: '#E65100', pic: 'Teknisi + Apoteker', status: 'Selesai', badge: 'ok' },
    { asset: 'Software BMS Update', action: 'Update, backup DB, audit log, test redundancy', trigger: 'Jadwal vendor + backup harian otomatis', freq: 'MONTHLY', freqColor: '#880E4F', pic: 'IT / Parametrik', status: 'Selesai', badge: 'ok' }
  ];

  return (
    <div className="p-6 flex flex-col gap-6 max-w-[1600px] mx-auto pb-24">
      {/* <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-1">Maintenance Program — {hospital.name}</h2>
          <p className="text-sm text-slate-500 font-medium">BMS-Driven PM - Scheduled by run hours, sensor trends, and real-time asset health</p>
        </div>
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
          Maintenance 4.0
        </div>
      </div> */}

      <div className="grid grid-cols-6 gap-4">
        {kpis.map((k) => (
          <div key={k.label} className="bg-white border border-slate-200/60 rounded-xl p-5 relative overflow-hidden shadow-sm group transition-all">
            <div className="absolute top-0 left-0 right-0 h-[4px]" style={{ background: k.color }} />
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-3">{k.label}</div>
            <div className="text-2xl font-black text-slate-900 tracking-tight mb-2">
              {k.value}<span className="text-xs text-slate-400 font-bold uppercase ml-1">{k.unit}</span>
            </div>
            <div className={clsx('text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5', k.deltaOk ? 'text-emerald-600' : 'text-rose-600')}>
              {k.deltaOk ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
              {k.delta}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <h3 className="font-black text-slate-800 text-xs uppercase tracking-[0.2em]">PM Schedule - April 2026</h3>
          <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <Clock className="w-3.5 h-3.5" />{pmSchedule.length} Registered Assets
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-[10px] text-slate-500 uppercase bg-slate-50 border-b border-slate-100 font-black tracking-widest">
              <tr>
                <th className="px-6 py-4">Subsistem / Aset</th>
                <th className="px-6 py-4">Tindakan PM</th>
                <th className="px-6 py-4">Trigger CBM (BMS)</th>
                <th className="px-6 py-4 text-center">Frekuensi</th>
                <th className="px-6 py-4">PIC</th>
                <th className="px-6 py-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {pmSchedule.map((row, i) => (
                <tr key={row.asset} className={clsx('border-b border-slate-50 hover:bg-slate-50/50 transition-colors', i % 2 === 0 ? 'bg-slate-50/20' : '')}>
                  <td className="px-6 py-3.5 font-bold text-slate-800 whitespace-nowrap">{row.asset}</td>
                  <td className="px-6 py-3.5 text-slate-500 text-xs font-medium max-w-[220px]">{row.action}</td>
                  <td className="px-6 py-3.5 text-slate-500 text-xs font-medium max-w-[200px] italic">{row.trigger}</td>
                  <td className="px-6 py-3.5 text-center">
                    <span className="text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest" style={{ background: row.freqColor + '11', color: row.freqColor }}>{row.freq}</span>
                  </td>
                  <td className="px-6 py-3.5 text-slate-500 text-xs font-bold whitespace-nowrap uppercase tracking-wider">{row.pic}</td>
                  <td className="px-6 py-3.5 text-center">
                    <span className={clsx('text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest', badgeClass[row.badge])}>{row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm">
          <h3 className="font-black text-slate-800 text-xs uppercase tracking-[0.2em] mb-5">Automated PM Reports - BMS Intelligence</h3>
          <div className="flex flex-col gap-3 text-sm">
            {[
              { bg: 'bg-blue-50/50 border-blue-100', label: 'Daily 07:00:', desc: 'kWh, m3 air, alarm summary, aset bermasalah, run hours kritis + Email PDF' },
              { bg: 'bg-teal-50/50 border-teal-100', label: 'Weekly Senin 08:00:', desc: 'Tren energi 7 hari, PM due, alarm trend, anomali baseline + Email PDF' },
              { bg: 'bg-amber-50/50 border-amber-100', label: 'Monthly Tgl-1:', desc: 'Konsumsi vs budget, PM completion rate, reliability score, cost avoidance + PDF + Excel' },
              { bg: 'bg-indigo-50/50 border-indigo-100', label: 'Annual:', desc: 'Asset lifecycle, ROI BMS, benchmark industri RS, rencana penggantian aset + Full Report' },
            ].map((r) => (
              <div key={r.label} className={clsx('rounded-xl p-4 border text-[11px] font-medium shadow-sm', r.bg)}>
                <strong className="text-slate-900 font-black uppercase tracking-tight mr-2">{r.label}</strong>
                <span className="text-slate-500">{r.desc}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm">
          <h3 className="font-black text-slate-800 text-xs uppercase tracking-[0.2em] mb-5">Predictive Analytics - AI Engine</h3>
          <div className="flex flex-col gap-3">
            {predictions.map((p) => (
              <div key={p.tag} className={clsx('rounded-xl p-4 border flex gap-4 text-[11px] font-medium items-start shadow-sm', p.bg)}>
                <span className={clsx('font-black text-sm shrink-0 w-8', p.tagColor)}>{p.tag}</span>
                <div className="text-slate-500"><strong className="text-slate-900 font-black uppercase tracking-tight block mb-1">{p.title}</strong> {p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
