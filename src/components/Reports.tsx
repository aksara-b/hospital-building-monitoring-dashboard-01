import { Card } from './Card';
import { FileText, Download, Calendar } from 'lucide-react';
import { type Hospital } from '../data/hospitals';

interface ReportsProps {
  hospital: Hospital;
}

export function Reports({ hospital }: ReportsProps) {
  return (
    <div className="p-6 flex flex-col gap-6 max-w-[1200px] mx-auto h-full">
      {/* <div className="mb-2">
        <h1 className="text-3xl font-bold text-[#1A1A1C] tracking-tight">Reports Generation — {hospital.name}</h1>
        <p className="text-slate-400 mt-2">Download daily, weekly, or monthly system performance reports for {hospital.name}.</p>
      </div> */}

      <div className="grid grid-cols-3 gap-6">
        {['Daily Operations', 'Weekly Maintenance', 'Monthly Energy Efficiency'].map((report, i) => (
          <Card key={i} className="group hover:border-blue-200 transition-colors cursor-pointer relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex flex-col gap-4 relative z-10">
              <div className="p-3 bg-slate-50 border border-slate-100 w-max rounded-lg text-blue-600 shadow-sm">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">{report} Report</h3>
                <p className="text-xs text-slate-400 mt-1 font-medium">Generated automatically</p>
              </div>
              <button className="mt-4 flex items-center justify-center gap-2 w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-sm font-bold transition-all shadow-md shadow-slate-200">
                <Download className="w-4 h-4" /> Download PDF
              </button>
            </div>
          </Card>
        ))}
      </div>

      <Card title="Recent Archives" className="flex-1 mt-4">
        <div className="flex flex-col items-center justify-center h-48 text-slate-500">
          <Calendar className="w-12 h-12 mb-4 opacity-50" />
          <p>No archived reports for {hospital.name} for this month yet.</p>
        </div>
      </Card>
    </div>
  );
}
