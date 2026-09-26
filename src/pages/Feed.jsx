import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "../components/UserCard";
import ScreenLoader from "../components/ScreenLoader";
import {
  feedSelector,
  fetchFeed,
  removeUserFromFeed,
} from "../store/slices/feedSlice";
import { sendConnectionRequest } from "../services/connection.service";
import { Users } from "lucide-react";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";

const Feed = () => {
  const dispatch = useDispatch();

  const { users, loading, error } = useSelector(feedSelector);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  const handleConnectionRequest = async (status, userId) => {
    try {
      setActionLoading(status);

      await sendConnectionRequest(status, userId);

      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.error("Connection request failed:", error);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return <ScreenLoader />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={() => dispatch(fetchFeed())} />;
  }

  if (!users.length) {
    return (
      <EmptyState
        title="No more developers"
        message="You've viewed everyone in your feed for now."
        icon={Users}
      />
    );
  }

  const currentUser = users[0];

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-base-200 p-3">
      <UserCard
        user={currentUser}
        actionLoading={actionLoading}
        onIgnore={() => handleConnectionRequest("ignored", currentUser._id)}
        onInterested={() =>
          handleConnectionRequest("interested", currentUser._id)
        }
      />
    </div>
  );
};

export default Feed;
