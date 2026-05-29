import { useState } from 'react';

interface LoginProps {
  onLogin: (role: string) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const validRoles = ['direktur', 'manajer', 'teknisi'];
    
    if (validRoles.includes(username.toLowerCase()) && password === '1234') {
      onLogin(username.toLowerCase());
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      {/* Container to center the card while keeping header above */}
      <div className="flex flex-col items-center relative">
        
        {/* Brand Header (Positioned above the card) */}
        <div className="absolute bottom-full mb-12 flex items-center gap-6 w-max">
          <img src="/favicon.png" alt="Logo" className="w-24 h-24 drop-shadow-2xl" />
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-[#0F172A] leading-none mb-1">Building Management System</h1>
            <p className="text-xl text-slate-400 font-medium tracking-tight">Dashboard Monitoring</p>
          </div>
        </div>

        {/* Login Card */}
        <div className="w-full min-w-[480px] bg-[#F8F9FA] rounded-[48px] p-12 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] border border-white">
          <h2 className="text-3xl font-bold text-slate-800 mb-10">Login</h2>
          
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white rounded-3xl px-8 py-5 outline-none border-2 border-transparent focus:border-slate-100 transition-all text-lg text-slate-700 font-medium placeholder:text-slate-300 shadow-sm"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white rounded-3xl px-8 py-5 outline-none border-2 border-transparent focus:border-slate-100 transition-all text-lg text-slate-700 font-medium placeholder:text-slate-300 shadow-sm"
              />
            </div>

            {error && <p className="text-rose-500 text-sm font-bold ml-4">{error}</p>}

            <button
              type="submit"
              className="w-full bg-[#0F172A] text-white rounded-3xl py-5 text-lg font-bold tracking-wide hover:bg-slate-800 transition-all mt-6 shadow-xl shadow-slate-200 active:scale-[0.98]"
            >
              Login
            </button>
          </form>
        </div>
      </div>

      {/* Footer (Sticks to bottom) */}
      <footer className="fixed bottom-10 w-full text-center">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
          © 2026 PT Parametrik Solusi Integrasi
        </p>
      </footer>
    </div>
  );
}
