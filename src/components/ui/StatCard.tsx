import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  icon?: React.ReactNode;
  progress?: number; // percentage value from 0 to 100
  trend?: string;
  className?: string;
}

export default function StatCard({
  title,
  value,
  subtext,
  icon,
  progress,
  trend,
  className = "",
}: StatCardProps) {
  return (
    <div
      className={`bg-white rounded-xl border border-stone-200 p-5 shadow-workbook flex flex-col justify-between ${className}`}
    >
      <div>
        <div className="flex items-center justify-between text-stone-500 mb-2">
          <span className="text-sm font-medium tracking-wide uppercase">{title}</span>
          {icon && <div className="text-stone-400">{icon}</div>}
        </div>
        
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold font-sans tracking-tight text-stone-900">
            {value}
          </span>
          {trend && (
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
              {trend}
            </span>
          )}
        </div>

        {subtext && <p className="text-xs text-stone-400 mt-1">{subtext}</p>}
      </div>

      {progress !== undefined && (
        <div className="mt-4">
          <div className="w-full bg-stone-100 rounded-full h-1.5">
            <div
              className="bg-stone-800 h-1.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            ></div>
          </div>
          <div className="flex justify-end text-[10px] text-stone-400 mt-1">
            <span>{progress}% Completed</span>
          </div>
        </div>
      )}
    </div>
  );
}
