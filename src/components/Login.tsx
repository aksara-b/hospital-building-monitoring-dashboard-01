import { useState } from 'react';
import { ChevronDown, MapPin, Phone, Building2, CheckCircle2 } from 'lucide-react';
import { hospitals, type Hospital } from '../data/hospitals';
import { clsx } from 'clsx';

interface LoginProps {
  onLogin: (role: string, hospital: Hospital) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [selectedHospital, setSelectedHospital] = useState<Hospital>(hospitals[0]);
  const [isHospitalOpen, setIsHospitalOpen] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const validRoles = ['direktur', 'manajer', 'teknisi'];

    if (validRoles.includes(username.toLowerCase()) && password === '1234') {
      onLogin(username.toLowerCase(), selectedHospital);
    } else {
      setError('Username atau password salah');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center relative w-full max-w-[520px]">

        {/* Brand Header */}
        <div className="flex items-center gap-5 mb-10 w-full">
          <img src="/favicon.png" alt="Logo" className="w-16 h-16 drop-shadow-xl rounded-2xl" />
          <div className="flex flex-col justify-center">
            <h1 className="text-2xl font-black text-[#0F172A] leading-none mb-0.5 tracking-tight">Building Management System</h1>
            <p className="text-sm text-slate-400 font-semibold tracking-wide">Dashboard Monitoring · BMS</p>
          </div>
        </div>

        {/* Login Card */}
        <div className="w-full bg-white rounded-3xl p-8 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.10)] border border-slate-100">

          {/* Hospital Selector */}
          <div className="mb-6">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Pilih Rumah Sakit</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsHospitalOpen(!isHospitalOpen)}
                className="w-full flex items-center gap-3 bg-slate-50 border-2 border-slate-100 hover:border-blue-200 rounded-2xl px-4 py-3.5 transition-all text-left group"
              >
                <div className="w-9 h-9 rounded-xl overflow-hidden shrink-0 border border-slate-200 shadow-sm">
                  <img src={selectedHospital.image} alt={selectedHospital.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-slate-800 text-sm truncate">{selectedHospital.name}</div>
                  <div className="text-[10px] text-slate-400 font-semibold truncate">{selectedHospital.city} · {selectedHospital.floors}</div>
                </div>
                <ChevronDown className={clsx('w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200', isHospitalOpen && 'rotate-180')} />
              </button>

              {isHospitalOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsHospitalOpen(false)} />
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-2xl shadow-slate-200/60 overflow-hidden z-20">
                    <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-100">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Daftar Rumah Sakit</span>
                    </div>
                    {hospitals.map((h) => (
                      <button
                        key={h.id}
                        type="button"
                        onClick={() => {
                          setSelectedHospital(h);
                          setIsHospitalOpen(false);
                        }}
                        className={clsx(
                          'w-full flex items-center gap-3 px-4 py-3 text-left transition-all border-b border-slate-50 last:border-0',
                          selectedHospital.id === h.id
                            ? 'bg-blue-50'
                            : 'hover:bg-slate-50'
                        )}
                      >
                        <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 border border-slate-200">
                          <img src={h.image} alt={h.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={clsx('font-bold text-sm', selectedHospital.id === h.id ? 'text-blue-700' : 'text-slate-700')}>{h.name}</div>
                          <div className="text-[10px] text-slate-400 font-semibold">{h.city}</div>
                        </div>
                        {selectedHospital.id === h.id && (
                          <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Selected Hospital Info Card */}
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-slate-50 rounded-2xl border border-blue-100/70">
            <div className="flex items-start gap-3">
              <div className="w-16 h-14 rounded-xl overflow-hidden shrink-0 shadow-md">
                <img src={selectedHospital.image} alt={selectedHospital.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-black text-slate-800 text-sm mb-1 truncate">{selectedHospital.name}</div>
                <div className="flex items-center gap-1 text-[10px] text-slate-500 font-semibold mb-0.5">
                  <MapPin className="w-3 h-3 text-blue-400 shrink-0" />
                  <span className="truncate">{selectedHospital.address}</span>
                </div>
                {selectedHospital.phone && (
                  <div className="flex items-center gap-1 text-[10px] text-slate-500 font-semibold mb-0.5">
                    <Phone className="w-3 h-3 text-blue-400 shrink-0" />
                    <span>{selectedHospital.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-1 text-[10px] text-slate-500 font-semibold">
                  <Building2 className="w-3 h-3 text-blue-400 shrink-0" />
                  <span>{selectedHospital.floors} · {selectedHospital.area}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 my-6" />

          {/* Login Form */}
          <h2 className="text-xl font-black text-slate-800 mb-5 tracking-tight">Masuk ke Dashboard</h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Username (direktur / manajer / teknisi)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-50 rounded-2xl px-5 py-4 outline-none border-2 border-transparent focus:border-blue-200 focus:bg-white transition-all text-sm text-slate-700 font-semibold placeholder:text-slate-300 shadow-sm"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 rounded-2xl px-5 py-4 outline-none border-2 border-transparent focus:border-blue-200 focus:bg-white transition-all text-sm text-slate-700 font-semibold placeholder:text-slate-300 shadow-sm"
              />
            </div>

            {error && <p className="text-rose-500 text-xs font-bold ml-2">{error}</p>}

            <button
              type="submit"
              className="w-full bg-[#0F172A] text-white rounded-2xl py-4 text-sm font-black tracking-wider hover:bg-slate-700 transition-all mt-2 shadow-lg shadow-slate-900/10 active:scale-[0.98]"
            >
              LOGIN →
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="fixed bottom-8 w-full text-center">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
          © 2026 PT Parametrik Solusi Integrasi
        </p>
      </footer>
    </div>
  );
}
