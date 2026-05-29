import { clsx } from 'clsx';
import { useEffect, useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { type Hospital } from '../data/hospitals';

interface IoTLiveProps {
  hospital: Hospital;
}

type SensorStatus = 'ok' | 'warn' | 'crit';

interface Sensor {
  id: string;
  sys: string;
  reading: string;
  location: string;
  status: string;
  statusType: SensorStatus;
  color: string;
  baseValue: number;
  unit: string;
}

const initialSensors: Sensor[] = [
  { id: 'io-kw', sys: 'Listrik', reading: '482 kW', location: 'Total Daya Aktif — LVMDP', status: 'Normal', statusType: 'ok', color: '#1E40AF', baseValue: 482, unit: ' kW' },
  { id: 'io-trafo', sys: 'Listrik', reading: '64°C', location: 'Temp Trafo Winding — MER L1', status: 'Normal <80°C', statusType: 'ok', color: '#991B1B', baseValue: 64, unit: '°C' },
  { id: 'io-ok-temp', sys: 'HVAC', reading: '20.8°C', location: 'Suhu OK Utama L5', status: 'Normal 18–22°C', statusType: 'ok', color: '#065F46', baseValue: 20.8, unit: '°C' },
  { id: 'io-icu-temp', sys: 'HVAC', reading: '22.1°C', location: 'Suhu ICU L7', status: 'Normal 20–24°C', statusType: 'ok', color: '#065F46', baseValue: 22.1, unit: '°C' },
  { id: 'io-dp', sys: 'HVAC', reading: '+8 Pa', location: 'ΔP Clean Room OK L5', status: '⚠ Low (target +10)', statusType: 'warn', color: '#B91C1C', baseValue: 8, unit: ' Pa' },
  { id: 'io-co2', sys: 'HVAC', reading: '620 ppm', location: 'CO₂ Lobby L1', status: 'Normal <1000', statusType: 'ok', color: '#4338CA', baseValue: 620, unit: ' ppm' },
  { id: 'io-gwt', sys: 'Plumbing', reading: '78%', location: 'Level GWT 136m³', status: 'Normal >20%', statusType: 'ok', color: '#0369A1', baseValue: 78, unit: '%' },
  { id: 'io-pres', sys: 'Plumbing', reading: '3.2 bar', location: 'Tekanan Distribusi Air', status: 'Normal 2.5–4 bar', statusType: 'ok', color: '#0369A1', baseValue: 3.2, unit: ' bar' },
  { id: 'io-o2', sys: 'Gas Medis', reading: '68%', location: 'Level Tangki O₂ Sentral', status: 'Normal >20%', statusType: 'ok', color: '#991B1B', baseValue: 68, unit: '%' },
  { id: 'io-o2-icu', sys: 'Gas Medis', reading: '4.1 bar', location: 'Tekanan O₂ ICU L7', status: 'Normal 3.5–5 bar', statusType: 'ok', color: '#991B1B', baseValue: 4.1, unit: ' bar' },
  { id: 'io-o2-warn', sys: 'Gas Medis', reading: '2.8 bar', location: 'Tekanan O₂ Zona C L7', status: '⚠ LOW! Threshold 3.5 bar', statusType: 'crit', color: '#B91C1C', baseValue: 2.8, unit: ' bar' },
  { id: 'io-solar', sys: 'Listrik', reading: '48 kW', location: 'Output Solar PLTS', status: 'Generating', statusType: 'ok', color: '#059669', baseValue: 48, unit: ' kW' },
];

const statusStyle: Record<SensorStatus, string> = {
  ok: 'text-emerald-600',
  warn: 'text-amber-600',
  crit: 'text-red-600',
};

const statusDot: Record<SensorStatus, string> = {
  ok: 'bg-emerald-500',
  warn: 'bg-amber-500',
  crit: 'bg-red-500',
};

function generateTrend(base: number) {
  return Array.from({ length: 30 }, (_, i) => ({
    i,
    v: parseFloat((base + (Math.random() - 0.5) * base * 0.04).toFixed(2)),
  }));
}

export function IoTLive({ hospital }: IoTLiveProps) {
  const [sensors, setSensors] = useState(initialSensors);
  const [liveTrend, setLiveTrend] = useState(generateTrend(480));
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSensors(prev => prev.map(s => {
        const jitter = (Math.random() - 0.5) * s.baseValue * 0.03;
        const newVal = parseFloat((s.baseValue + jitter).toFixed(1));
        return { ...s, reading: `${newVal}${s.unit}` };
      }));
      setLiveTrend(prev => {
        const next = [...prev.slice(1), { i: prev[prev.length - 1].i + 1, v: parseFloat((480 + (Math.random() - 0.5) * 20).toFixed(1)) }];
        return next;
      });
      setTick(t => t + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 flex flex-col gap-6 max-w-[1600px] mx-auto pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-1">Dashboard Sensor Real-time — {hospital.name}</h2>
          <p className="text-sm text-slate-500 font-medium">Data diperbarui setiap 2 detik via BACnet/IP & Modbus TCP — 847 titik I/O terpantau</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-full text-xs font-mono text-slate-600">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          LIVE · Update #{tick}
        </div>
      </div>

      {/* Sensor Grid */}
      <div className="grid grid-cols-4 gap-4">
        {sensors.map((s) => (
          <div key={s.id} className="bg-white border border-slate-200 rounded-xl p-4 relative overflow-hidden shadow-sm hover:border-slate-300 transition-all">
            <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: s.color }} />
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
              <div className={clsx('w-1.5 h-1.5 rounded-full animate-pulse', statusDot[s.statusType])} />
              <span className="font-bold uppercase tracking-wider">{s.sys}</span>
              {s.statusType === 'crit' && <AlertTriangle className="w-3 h-3 text-red-500 ml-auto" />}
            </div>
            <div className="text-2xl font-bold font-mono text-slate-900 leading-tight mb-1">{s.reading}</div>
            <div className="text-[11px] text-slate-400 font-medium mb-2">{s.location}</div>
            <div className={clsx('text-[10px] font-black uppercase tracking-widest', statusStyle[s.statusType])}>
              {s.statusType === 'ok' ? '● ' : '⚠ '}{s.status}
            </div>
          </div>
        ))}
      </div>

      {/* Live Trend Chart */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-800 text-xs uppercase tracking-widest">Live Trend — Total Daya Aktif (30 titik terakhir)</h3>
          <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <div className="flex items-center gap-1.5"><div className="w-3 h-0.5 bg-blue-500" />kW Total</div>
          </div>
        </div>
        <div style={{ height: 160 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={liveTrend}>
              <defs>
                <linearGradient id="kwGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1E40AF" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#1E40AF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="i" hide />
              <YAxis domain={['auto', 'auto']} tick={{ fontSize: 9, fill: '#64748B' }} width={40} />
              <Tooltip
                contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', fontSize: 11, borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                formatter={(v: any) => [`${v} kW`, 'Daya']}
              />
              <Area type="monotone" dataKey="v" stroke="#1E40AF" fill="url(#kwGrad)" strokeWidth={2} dot={false} isAnimationActive={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* System Status Panel */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <h3 className="font-bold text-slate-800 text-xs uppercase tracking-widest mb-4">System Status</h3>
        <div className="grid grid-cols-5 gap-3">
          {[
            { name: 'BMS Server', status: 'Online', ok: true },
            { name: 'Database', status: 'Online', ok: true },
            { name: 'Network OT', status: 'Online', ok: true },
            { name: 'FACP Link', status: 'Degraded', ok: false },
            { name: 'SIMRS Sync', status: 'Online', ok: true },
          ].map((sys) => (
            <div key={sys.name} className="flex items-center justify-between bg-slate-50 border border-slate-100 rounded-lg px-3 py-2.5 text-[10px]">
              <span className="text-slate-500 font-bold uppercase tracking-tight">{sys.name}</span>
              <span className={clsx('font-black uppercase tracking-widest flex items-center gap-1', sys.ok ? 'text-emerald-600' : 'text-amber-600')}>
                <div className={clsx('w-1.5 h-1.5 rounded-full', sys.ok ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse')} />
                {sys.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
