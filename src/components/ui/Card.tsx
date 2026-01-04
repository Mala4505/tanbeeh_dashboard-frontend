

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  action?: React.ReactNode;
  noPadding?: boolean; // ✅ new prop
}

export function Card({
  children,
  className = "",
  title,
  action,
  noPadding = false,
}: CardProps) {
  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 ${className}`}
    >
      {(title || action) && (
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          {title && (
            <h2 className="text-lg font-semibold text-darkTeal">{title}</h2>
          )}
          {action && <div>{action}</div>}
        </div>
      )}
      <div className={noPadding ? "" : "p-6"}>{children}</div>
    </div>
  );
}
