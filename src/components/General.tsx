import { Card } from './Card';
import { MapPin, Phone, Mail, ShieldCheck, Plus } from 'lucide-react';
import { type Hospital } from '../data/hospitals';

interface GeneralProps {
  hospital: Hospital;
}

export function General({ hospital }: GeneralProps) {
  return (
    <div className="p-8 flex flex-col gap-6 max-w-[1400px] mx-auto pb-24">
      {/* Header with Add Button */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{hospital.name}</h1>
          <p className="text-slate-400 text-sm mt-1 font-medium italic">General Building Overview & Facilities Monitoring</p>
        </div>
        <button className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-lg shadow-slate-200 active:scale-95">
          <Plus className="w-4 h-4" /> Add Hospital
        </button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left Column: Hospital View & Main Info */}
        <div className="col-span-8 flex flex-col gap-6">
          <Card noPadding className="overflow-hidden border-none shadow-none bg-transparent">
            <div className="rounded-[24px] overflow-hidden">
              <img
                src={hospital.image}
                alt={hospital.name}
                className="w-full h-[400px] object-cover"
              />
            </div>
          </Card>

          <div className="bg-white rounded-[24px] p-8 border border-slate-200/60 shadow-xl">
            <div className="flex gap-6 items-start border-b border-slate-100 pb-8 mb-8">
              <div className="w-14 h-14 bg-blue-500/5 rounded-2xl flex items-center justify-center text-blue-600 shrink-0 border border-blue-500/10">
                <MapPin className="w-7 h-7" />
              </div>
              <div className="min-w-0">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">{hospital.name}</h2>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                  {hospital.address.split(',').slice(0, 2).join(',')},<br />
                  {hospital.address.split(',').slice(2).join(',')}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-8">
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-bold tracking-[0.2em] mb-2">Building Type</div>
                <div className="text-slate-800 font-bold text-base">{hospital.type}</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-bold tracking-[0.2em] mb-2">Gross Floor Area</div>
                <div className="text-slate-800 font-bold text-base">{hospital.area}</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-bold tracking-[0.2em] mb-2">Total Floors</div>
                <div className="text-slate-100 font-bold text-base text-slate-800">{hospital.floors}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: FM & Integrations */}
        <div className="col-span-4 flex flex-col gap-6">
          <Card title="Facility Management">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-lg font-extrabold text-slate-400 border border-slate-200">
                  BM
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-lg">Budi Santoso</div>
                  <div className="text-xs text-emerald-600 font-bold uppercase tracking-wider">Chief Engineer</div>
                </div>
              </div>

              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-4 text-sm text-slate-500 font-medium hover:text-slate-900 transition-colors cursor-pointer">
                  <Phone className="w-4 h-4 text-slate-400" /> +62 812-3456-7890
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-500 font-medium hover:text-slate-900 transition-colors cursor-pointer">
                  <Mail className="w-4 h-4 text-slate-400" /> {hospital.id === 'cipadung' ? 'facility@rsx.com' : 'facility@rsy.com'}
                </div>
              </div>
            </div>
          </Card>

          <Card title="System Integrations" className="flex-1">
            <div className="flex flex-col gap-3">
              {['BMS Platform', 'Fire Alarm Panel', 'Access Control', 'Nurse Call System'].map((sys, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 hover:bg-slate-100 transition-all cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-emerald-50 rounded-lg group-hover:bg-emerald-100 transition-colors">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    </div>
                    <span className="text-sm font-bold text-slate-700">{sys}</span>
                  </div>
                  <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-md tracking-widest uppercase">ONLINE</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
