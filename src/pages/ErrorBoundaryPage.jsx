import { Link, useRouteError } from "react-router-dom";

import { AlertTriangle, Home, RefreshCw } from "lucide-react";

const ErrorBoundaryPage = () => {
  const error = useRouteError();

  console.error(error);

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-md text-center">
        <AlertTriangle size={64} className="mx-auto text-error" />

        <h1 className="mt-5 text-3xl font-bold">Something went wrong</h1>

        <p className="mt-3 text-base-content/60">
          An unexpected error occurred. Please try again.
        </p>

        <div className="mt-7 flex justify-center gap-3">
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => window.location.reload()}
          >
            <RefreshCw size={18} />
            Try Again
          </button>

          <Link to="/" className="btn btn-primary">
            <Home size={18} />
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorBoundaryPage;
