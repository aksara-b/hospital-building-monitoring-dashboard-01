import type { ReactNode } from 'react';
import { clsx } from 'clsx';

interface CardProps {
  title?: string | ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
}

export function Card({ title, action, children, className, noPadding = false }: CardProps) {
  return (
    <div className={clsx("bg-white border border-slate-200/60 rounded-[24px] flex flex-col overflow-hidden shadow-sm", className)}>
      {(title || action) && (
        <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          {typeof title === 'string' ? (
            <h2 className="text-sm font-bold text-slate-800 tracking-tight uppercase">{title}</h2>
          ) : (
            title
          )}
          {action && <div>{action}</div>}
        </div>
      )}
      <div className={clsx("flex-1 flex flex-col min-h-0", !noPadding && "p-4")}>
        {children}
      </div>
    </div>
  );
}
