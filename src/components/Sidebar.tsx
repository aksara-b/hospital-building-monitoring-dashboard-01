import { Home, LayoutDashboard, Users, Wind, Zap, Droplets, Bell, FileText, BarChart2, Settings, FlaskConical, Flame, Wrench, Leaf, RadioTower, LogOut } from 'lucide-react';
import { clsx } from 'clsx';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard' },
  { icon: Home, label: 'General' },
  { icon: Users, label: 'Occupancy' },
  { icon: Wind, label: 'HVAC' },
  { icon: Zap, label: 'Power' },
  { icon: Droplets, label: 'Water' },
  { icon: FlaskConical, label: 'Medical Gas' },
  { icon: Flame, label: 'Fire' },
  { icon: Wrench, label: 'Maintenance' },
  { icon: Leaf, label: 'ESG' },
  { icon: RadioTower, label: 'IoT Live' },
  { icon: Bell, label: 'Alarms' },
  { icon: FileText, label: 'Reports' },
  { icon: BarChart2, label: 'Analytics' },
  { icon: Settings, label: 'Settings' },
];

import { type Hospital } from '../data/hospitals';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  role: string;
  activeHospital: Hospital;
  onLogout: () => void;
}

export function Sidebar({ currentPage, onNavigate, role, activeHospital, onLogout }: SidebarProps) {
  return (
    <aside className="sidebar-island h-screen sticky top-0 shrink-0 flex flex-col z-30 bg-slate-900 border-r border-white/5">
      {/* Logo */}
      <div className="flex items-center gap-3 px-[12px] py-[18px] border-b border-white/5 overflow-hidden">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-2xl overflow-hidden bg-white/10 p-1.5">
          <img src="/favicon.png" alt="Logo" className="w-full h-full object-contain" />
        </div>
        <div className="sidebar-label flex flex-col leading-tight">
          <span className="text-white font-bold text-sm tracking-tight whitespace-nowrap uppercase">{activeHospital.name}</span>
          <span className="text-white/40 text-[10px] font-mono whitespace-nowrap">BMS DASHBOARD MONITORING</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 flex flex-col gap-0.5 sidebar-nav-scroll">
        {navItems.map((item, index) => {
          const isActive = currentPage === item.label;
          const Icon = item.icon;
          return (
            <button
              key={index}
              onClick={() => onNavigate(item.label)}
              title={item.label}
              className={clsx(
                'flex items-center gap-3 w-full px-[18px] py-2.5 transition-all duration-150 relative overflow-hidden group/btn',
                isActive
                  ? 'text-sky-400 bg-sky-500/10'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              )}
            >
              {/* Active indicator */}
              {isActive && (
                <div className="absolute left-0 top-2 bottom-2 w-[3px] bg-sky-400 rounded-r-full" />
              )}
              <Icon className={clsx('w-[18px] h-[18px] shrink-0', isActive ? 'text-sky-400' : 'text-slate-400 group-hover/btn:text-white')} />
              <span className={clsx(
                'sidebar-label text-xs font-bold uppercase tracking-wider whitespace-nowrap',
                isActive ? 'text-sky-400' : 'text-slate-400'
              )}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* User profile & Logout */}
      <div className="px-[12px] py-4 border-t border-white/5 overflow-hidden">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shrink-0 shadow-lg shadow-blue-900/20">
            {role.charAt(0).toUpperCase()}
          </div>
          <div className="sidebar-label flex flex-col min-w-0">
            <span className="text-white text-xs font-bold whitespace-nowrap capitalize">{role}</span>
            <span className="text-white/40 text-[10px] whitespace-nowrap">Online</span>
          </div>
          <button 
            onClick={onLogout}
            className="sidebar-label ml-auto p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-lg transition-all"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
