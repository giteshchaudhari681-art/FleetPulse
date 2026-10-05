interface ErrorMessageProps {
  title?: string;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function ErrorMessage({ title = 'Error', message, action }: ErrorMessageProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full shadow-sm text-center">
      <div className="text-red-500 mb-4 flex justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-red-900 mb-2">{title}</h3>
      <p className="text-sm text-red-700 mb-6">{message}</p>

      {action && (
        <button
          onClick={action.onClick}
          className="bg-red-100 text-red-700 hover:bg-red-200 font-medium py-2 px-4 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
