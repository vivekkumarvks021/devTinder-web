import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import feedReducer from "./slices/feedSlice";
import connectionReducer from "./slices/connectionSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    feed: feedReducer,
    connections: connectionReducer,
  },
});
