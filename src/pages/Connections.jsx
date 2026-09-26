import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ScreenLoader from "../components/ScreenLoader";

import {
  connectionSelector,
  fetchConnections,
} from "../store/slices/connectionSlice";
import ConnectionCard from "../components/ConnectionCard";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";
import { Users } from "lucide-react";

const Connections = () => {
  const dispatch = useDispatch();

  const { connections, connectionsLoading, error } =
    useSelector(connectionSelector);

  useEffect(() => {
    dispatch(fetchConnections());
  }, [dispatch]);

  if (connectionsLoading) {
    return <ScreenLoader />;
  }

  if (error) {
    return (
      <ErrorState
        message={error}
        onRetry={() => dispatch(fetchConnections())}
      />
    );
  }

  if (!connections.length) {
    return (
      <EmptyState
        title="No connections yet"
        message="Start connecting with developers from your feed."
        icon={Users}
      />
    );
  }

  return (
    <div className="mx-auto min-h-[calc(100vh-64px)] max-w-5xl px-4 py-8">
      <div className="mb-7">
        <h1 className="text-3xl font-bold">My Connections</h1>

        <p className="mt-1 text-base-content/60">
          Developers you've connected with
        </p>
      </div>

      {connections?.length === 0 ? (
        <div className="py-20 text-center">
          <h2 className="text-xl font-semibold">No connections yet</h2>

          <p className="mt-2 text-base-content/60">
            Start exploring developers and make connections.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {connections.map((user) => (
            <ConnectionCard key={user._id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Connections;
