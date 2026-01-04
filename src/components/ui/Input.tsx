

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  multiline?: boolean; // ✅ new prop for textarea support
}

export function Input({
  label,
  error,
  className = "",
  id,
  multiline = false,
  ...props
}: InputProps) {
  const inputId = id || props.name || Math.random().toString(36).substr(2, 9);
  const errorId = `${inputId}-error`;

  const baseClasses = `
    block w-full rounded-md shadow-sm sm:text-sm
    focus:border-cerulean focus:ring-cerulean
    disabled:bg-gray-100 disabled:text-gray-500
    ${error ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-gray-300"}
    ${className}
  `;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}

      {multiline ? (
        <textarea
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={baseClasses}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={baseClasses}
          {...props}
        />
      )}

      {error && (
        <p id={errorId} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
