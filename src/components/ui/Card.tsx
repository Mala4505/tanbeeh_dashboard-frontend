import React from 'react';
interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  action?: React.ReactNode;
}
export function Card({
  children,
  className = '',
  title,
  action
}: CardProps) {
  return <div className={`bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 ${className}`}>
      {(title || action) && <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          {title && <h3 className="text-lg font-semibold text-darkTeal">{title}</h3>}
          {action && <div>{action}</div>}
        </div>}
      <div className="p-6">{children}</div>
    </div>;
}