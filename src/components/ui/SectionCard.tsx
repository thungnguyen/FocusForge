import React from "react";

interface SectionCardProps {
  title?: string;
  subtitle?: string;
  headerAction?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  dotGrid?: boolean;
  onTitleChange?: (val: string) => void;
}

export default function SectionCard({
  title,
  subtitle,
  headerAction,
  children,
  className = "",
  dotGrid = false,
  onTitleChange,
}: SectionCardProps) {
  return (
    <div
      className={`bg-white rounded-xl border border-stone-200 shadow-workbook overflow-hidden ${
        dotGrid ? "dot-grid" : ""
      } ${className}`}
    >
      {(title || subtitle || headerAction) && (
        <div className="px-6 py-4 border-b border-stone-200/60 flex items-center justify-between bg-stone-50/50">
          <div className="flex-1 mr-4">
            {title && (
              onTitleChange ? (
                <input
                  type="text"
                  value={title}
                  onChange={(e) => onTitleChange(e.target.value)}
                  className="text-lg font-semibold tracking-tight text-stone-900 font-sans bg-transparent border-none outline-none focus:bg-stone-100/80 focus:ring-1 focus:ring-stone-300 rounded px-1 -ml-1 w-full max-w-md transition-colors"
                  title="Nhấp vào đây để đổi tiêu đề thẻ"
                />
              ) : (
                <h3 className="text-lg font-semibold tracking-tight text-stone-900 font-sans">
                  {title}
                </h3>
              )
            )}
            {subtitle && (
              <p className="text-xs text-stone-400 mt-0.5">{subtitle}</p>
            )}
          </div>
          {headerAction && <div className="shrink-0">{headerAction}</div>}
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
}
