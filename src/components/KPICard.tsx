import type { ReactNode } from 'react';
import { clsx } from 'clsx';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  unit?: string;
  trend?: number;
  trendLabel?: string;
  subtitle?: string;
  subtitleValue?: string | ReactNode;
  chart?: ReactNode;
  className?: string;
}

export function KPICard({
  title,
  value,
  unit,
  trend,
  trendLabel = 'vs Yesterday',
  subtitle,
  subtitleValue,
  chart,
  className
}: KPICardProps) {
  const isPositive = trend && trend > 0;
  const isNegative = trend && trend < 0;

  return (
    <div className={clsx("bg-white border border-slate-200/60 rounded-xl p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow", className)}>
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">{title}</h3>

      <div className="flex items-baseline gap-1 mb-1">
        <span className="text-3xl font-bold text-slate-900 tracking-tight">{value}</span>
        {unit && <span className="text-sm text-slate-400 font-bold ml-1">{unit}</span>}

        {trend !== undefined && (
          <div className={clsx(
            "ml-auto flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full",
            isPositive ? "bg-emerald-50 text-emerald-600" : isNegative ? "bg-rose-50 text-rose-600" : "bg-slate-50 text-slate-500"
          )}>
            {isPositive ? <TrendingUp className="w-3 h-3" /> : isNegative ? <TrendingDown className="w-3 h-3" /> : null}
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>

      {(subtitle || subtitleValue || trendLabel) && (
        <div className="text-[10px] text-slate-500 font-medium flex justify-between mt-2 z-10 uppercase tracking-wide">
          <span>{subtitle} {subtitleValue && <span className="text-slate-900 font-bold ml-1">{subtitleValue}</span>}</span>
          {trend !== undefined && <span className="opacity-60">{trendLabel}</span>}
        </div>
      )}

      {chart && (
        <div className="mt-4 h-12 w-full z-10">
          {chart}
        </div>
      )}

      {/* Subtle hover effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-800/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
}
