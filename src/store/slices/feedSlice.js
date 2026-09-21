import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getFeed } from "../../services/feed.service";

export const fetchFeed = createAsyncThunk(
  "feed/fetchFeed",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getFeed();

      return response.data.feed;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch feed",
      );
    }
  },
);

const initialState = {
  users: [],
  loading: false,
  error: null,
};

const feedSlice = createSlice({
  name: "feed",

  initialState,

  reducers: {
    removeUserFromFeed: (state, action) => {
      state.users = state.users.filter((user) => user._id !== action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })

      .addCase(fetchFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const feedSelector = (state) => state.feed;
export const { removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;
