import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Check, Heart, X } from "lucide-react";

import ScreenLoader from "../components/ScreenLoader";

import {
  connectionSelector,
  fetchRequests,
  reviewRequest,
} from "../store/slices/connectionSlice";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";

const Requests = () => {
  const dispatch = useDispatch();

  const { requests, loading, actionLoading, error } =
    useSelector(connectionSelector);

  useEffect(() => {
    dispatch(fetchRequests());
  }, [dispatch]);

  const handleReview = (status, requestId) => {
    dispatch(
      reviewRequest({
        status,
        requestId,
      }),
    );
  };

  if (loading) {
    return <ScreenLoader />;
  }

  if (error) {
    return (
      <ErrorState message={error} onRetry={() => dispatch(fetchRequests())} />
    );
  }

  if (!requests.length) {
    return (
      <EmptyState
        title="No pending requests"
        message="You don't have any connection requests right now."
        icon={Heart}
      />
    );
  }

  return (
    <div className="mx-auto min-h-[calc(100vh-64px)] max-w-4xl px-4 py-8">
      <div className="mb-7">
        <h1 className="text-3xl font-bold">Connection Requests</h1>

        <p className="mt-1 text-base-content/60">
          Developers interested in connecting with you
        </p>
      </div>

      {error && (
        <div className="alert alert-error mb-5">
          <span>{error}</span>
        </div>
      )}

      {requests.length === 0 ? (
        <div className="flex min-h-100 items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold">No pending requests</h2>

            <p className="mt-2 text-base-content/60">
              New connection requests will appear here.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => {
            const user = request.fromUserId;

            const isProcessing = actionLoading === request._id;

            return (
              <div
                key={request._id}
                className="
                  flex
                  items-center
                  gap-5
                  rounded-2xl
                  border
                  border-base-content/10
                  bg-base-100
                  p-5
                  shadow-sm
                "
              >
                {/* Profile Image */}
                <div className="avatar">
                  <div className="h-20 w-20 rounded-2xl">
                    <img
                      src={user?.photoUrl || "/male-avatar.png"}
                      alt={`${user.firstName} ${user.lastName}`}
                      onError={(e) => {
                        e.currentTarget.src = "/male-avatar.png";
                      }}
                    />
                  </div>
                </div>

                {/* User Details */}
                <div className="min-w-0 flex-1">
                  <h2 className="text-xl font-semibold">
                    {user.firstName} {user.lastName}
                    {user.age && (
                      <span className="ml-2 font-normal text-base-content/60">
                        {user.age}
                      </span>
                    )}
                  </h2>

                  {user.about && (
                    <p className="mt-1 line-clamp-2 text-sm text-base-content/70">
                      {user.about}
                    </p>
                  )}

                  {user.skills?.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {user.skills.slice(0, 4).map((skill) => (
                        <span
                          key={skill}
                          className="badge badge-outline badge-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={() => handleReview("rejected", request._id)}
                    className="btn btn-circle btn-outline btn-error"
                    title="Reject"
                  >
                    {isProcessing ? (
                      <span className="loading loading-spinner loading-sm" />
                    ) : (
                      <X size={20} />
                    )}
                  </button>

                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={() => handleReview("accepted", request._id)}
                    className="btn btn-circle btn-success"
                    title="Accept"
                  >
                    {isProcessing ? (
                      <span className="loading loading-spinner loading-sm" />
                    ) : (
                      <Check size={20} />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Requests;
