import { Card } from './Card';
import { Settings as SettingsIcon, User, BellRing, Shield, Database } from 'lucide-react';
import { type Hospital } from '../data/hospitals';

interface SettingsProps {
  hospital: Hospital;
}

export function Settings({ hospital }: SettingsProps) {
  const sections = [
    { icon: User, title: 'Profile Settings', desc: 'Manage your account details and preferences' },
    { icon: BellRing, title: 'Notification Routing', desc: 'Configure SMS and Email alert escalation paths' },
    { icon: Shield, title: 'Access Control', desc: 'Manage user roles and dashboard permissions' },
    { icon: Database, title: 'System Integrations', desc: 'API keys and third-party BMS connections' },
  ];

  return (
    <div className="p-6 flex flex-col gap-6 max-w-[1200px] mx-auto h-full">
      <div className="mb-2 flex items-center gap-4">
        <div className="p-3 bg-white border border-slate-200 rounded-xl text-slate-900 shadow-sm">
          <SettingsIcon className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-[#1A1A1C] tracking-tight">System Settings — {hospital.name}</h1>
          <p className="text-slate-400 mt-1">Configure dashboard preferences and integrations.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {sections.map((sec, i) => (
          <Card key={i} className="hover:bg-slate-50 transition-colors cursor-pointer group">
            <div className="flex gap-4">
              <div className="p-3 bg-slate-100 rounded-lg text-slate-400 group-hover:text-blue-600 transition-colors shrink-0">
                <sec.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">{sec.title}</h3>
                <p className="text-sm text-slate-500 mt-1">{sec.desc}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
