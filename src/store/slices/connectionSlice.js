import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getReceivedRequests,
  reviewConnectionRequest,
  getConnections,
} from "../../services/connection.service";

export const fetchRequests = createAsyncThunk(
  "connections/fetchRequests",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getReceivedRequests();

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch requests",
      );
    }
  },
);

export const reviewRequest = createAsyncThunk(
  "connections/reviewRequest",
  async ({ status, requestId }, { rejectWithValue }) => {
    try {
      await reviewConnectionRequest(status, requestId);

      return requestId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to review request",
      );
    }
  },
);

export const fetchConnections = createAsyncThunk(
  "connections/fetchConnections",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getConnections();

      return response.data.connections;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch connections",
      );
    }
  },
);

const initialState = {
  requests: [],
  connections: [],

  loading: false,
  connectionsLoading: false,

  actionLoading: null,
  error: null,
};

const connectionSlice = createSlice({
  name: "connections",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload;
      })

      .addCase(fetchRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(reviewRequest.pending, (state, action) => {
        state.actionLoading = action.meta.arg.requestId;
      })

      .addCase(reviewRequest.fulfilled, (state, action) => {
        state.actionLoading = null;

        state.requests = state.requests.filter(
          (request) => request._id !== action.payload,
        );
      })

      .addCase(reviewRequest.rejected, (state, action) => {
        state.actionLoading = null;
        state.error = action.payload;
      })

      .addCase(fetchConnections.pending, (state) => {
        state.connectionsLoading = true;
        state.error = null;
      })

      .addCase(fetchConnections.fulfilled, (state, action) => {
        state.connectionsLoading = false;
        state.connections = action.payload;
      })

      .addCase(fetchConnections.rejected, (state, action) => {
        state.connectionsLoading = false;
        state.error = action.payload;
      });
  },
});

export const connectionSelector = (state) => state.connections;

export default connectionSlice.reducer;
