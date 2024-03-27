import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  trackingData: null,
  loading: false,
  error: null,
};

const trackingSlice = createSlice({
  name: 'tracking',
  initialState,
  reducers: {
    fetchTrackingDataStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchTrackingDataSuccess(state, action) {
      state.loading = false;
      state.trackingData = action.payload;
    },
    fetchTrackingDataFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchTrackingDataStart, fetchTrackingDataSuccess, fetchTrackingDataFailure } = trackingSlice.actions;

export const selectTrackingData = state => state.tracking.trackingData;
export const selectLoading = state => state.tracking.loading;
export const selectError = state => state.tracking.error;

export default trackingSlice.reducer;
