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
    return (
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center">
        <p className="text-error">{error}</p>
      </div>
    );
  }

  if (!users.length) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center">
        <p className="text-base-content/60">No more developers available.</p>
      </div>
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
