import { useMemo } from 'react';
import { Card } from './Card';
import { getAlarmList } from '../data/mockData';
import { clsx } from 'clsx';
import { AlertOctagon, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';
import { type Hospital } from '../data/hospitals';

interface AlarmsProps {
  hospital: Hospital;
}

export function Alarms({ hospital }: AlarmsProps) {
  const alarmList = useMemo(() => getAlarmList(hospital.id), [hospital.id]);
  const activeCritical = alarmList.filter(a => a.severity === 'Critical' && a.status === 'Active').length;
  const activeWarning = alarmList.filter(a => a.severity === 'Warning' && a.status === 'Active').length;

  return (
    <div className="p-6 flex flex-col gap-6 max-w-[1600px] mx-auto pb-24">
      <div className="flex gap-4 mb-2">
        <div className="bg-rose-50 border border-rose-100 rounded-xl p-4 flex-1 flex items-center gap-4 shadow-sm">
          <div className="p-3 bg-rose-100 rounded-full text-rose-600">
            <AlertOctagon className="w-8 h-8" />
          </div>
          <div>
            <div className="text-[10px] font-black text-rose-400 uppercase tracking-widest">Active Critical</div>
            <div className="text-3xl font-black text-rose-900">{activeCritical}</div>
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex-1 flex items-center gap-4 shadow-sm">
          <div className="p-3 bg-amber-100 rounded-full text-amber-600">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <div>
            <div className="text-[10px] font-black text-amber-400 uppercase tracking-widest">Active Warnings</div>
            <div className="text-3xl font-black text-slate-900">{activeWarning}</div>
          </div>
        </div>
      </div>

      <Card title={`Alarm History & Active Center — ${hospital.name}`} className="flex-1 flex flex-col min-h-0" noPadding>
        <div className="flex flex-col h-[700px] overflow-hidden">
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <table className="w-full text-sm text-left">
              <thead className="text-[10px] text-slate-500 uppercase bg-slate-50 sticky top-0 border-b border-slate-100 z-10 font-black tracking-widest">
                <tr>
                  <th className="px-6 py-4">Time</th>
                  <th className="px-6 py-4">Severity</th>
                  <th className="px-6 py-4">System</th>
                  <th className="px-6 py-4">Message</th>
                  <th className="px-6 py-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {alarmList.map((alarm, i) => (
                  <tr key={alarm.id} className={clsx("border-b border-slate-50 hover:bg-slate-50/50 transition-colors", i % 2 === 0 ? "bg-slate-50/20" : "")}>
                    <td className="px-6 py-4 text-slate-500 font-mono text-xs font-bold">{alarm.time}</td>
                    <td className="px-6 py-4">
                      {alarm.severity === 'Critical' && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-50 text-rose-600 border border-rose-100 text-[10px] font-black uppercase tracking-widest"><AlertOctagon className="w-3.5 h-3.5" /> Critical</span>}
                      {alarm.severity === 'Warning' && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 text-amber-600 border border-amber-100 text-[10px] font-black uppercase tracking-widest"><AlertTriangle className="w-3.5 h-3.5" /> Warning</span>}
                      {alarm.severity === 'Info' && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-blue-600 border border-blue-100 text-[10px] font-black uppercase tracking-widest"><Info className="w-3.5 h-3.5" /> Info</span>}
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-800">{alarm.system}</td>
                    <td className="px-6 py-4 text-slate-600 font-medium text-xs">{alarm.message}</td>
                    <td className="px-6 py-4 text-right">
                      {alarm.status === 'Active' ? (
                        <span className="text-rose-600 font-black text-[10px] uppercase tracking-widest animate-pulse">Active</span>
                      ) : alarm.status === 'Acknowledged' ? (
                        <span className="text-amber-600 font-black text-[10px] uppercase tracking-widest">Ack'd</span>
                      ) : (
                        <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest flex items-center justify-end gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Cleared</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
}
