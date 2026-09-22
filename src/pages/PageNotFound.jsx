import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const PageNotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-base-200 px-4">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-primary">404</h1>

        <h2 className="mt-4 text-3xl font-bold">Page Not Found</h2>

        <p className="mt-3 text-base-content/60">
          The page you're looking for doesn't exist.
        </p>

        <Link to="/" className="btn btn-primary mt-7">
          <Home size={18} />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
