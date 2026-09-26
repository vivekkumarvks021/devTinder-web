import { AlertCircle, RefreshCw } from "lucide-react";

const ErrorState = ({ message = "Something went wrong.", onRetry }) => {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
      <AlertCircle size={40} className="text-error" />

      <p className="mt-3 text-sm text-error">{message}</p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="btn btn-sm btn-outline mt-4"
        >
          <RefreshCw size={16} />
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorState;
