import { createSlice } from "@reduxjs/toolkit";

const initialState: PaintingJobsSliceState = {
  paintingJobs: [],
  loading: false,
  error: null,
  success: false,
};

const paintingJobsSlice = createSlice({
  name: "paintingJobs",
  initialState,
  reducers: {
    getPaintingJobs: (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    },
    getPaintingJobsSuccess: (state, { payload }) => {
      state.paintingJobs = payload;
      state.loading = false;
      state.error = null;
      state.success = true;
    },
    getPaintingJobsFailed: (state, { payload: { message } }) => {
      state.loading = false;
      state.error = message;
      state.success = null;
    },
    createPaintingJob: (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    },
    createPaintingJobSuccess: (state) => {
      state.loading = false;
      state.error = null;
      state.success = true;
    },
    createPaintingJobFailed: (state, { payload: { message } }) => {
      state.loading = false;
      state.error = message;
      state.success = null;
    },
    updatePaintingJob: (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    },
    updatePaintingJobSuccess: (state) => {
      state.loading = false;
      state.error = null;
      state.success = true;
    },
    updatePaintingJobFailed: (state, { payload: { message } }) => {
      state.loading = false;
      state.error = message;
      state.success = null;
    },
    deletePaintingJob: (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    },
    deletePaintingJobSuccess: (state) => {
      state.loading = false;
      state.error = null;
      state.success = true;
    },
    deletePaintingJobFailed: (state, { payload: { message } }) => {
      state.loading = false;
      state.error = message;
      state.success = null;
    },
  },
});

export const {
  getPaintingJobs,
  getPaintingJobsSuccess,
  getPaintingJobsFailed,
  updatePaintingJob,
  updatePaintingJobSuccess,
  updatePaintingJobFailed,
  deletePaintingJob,
  deletePaintingJobSuccess,
  deletePaintingJobFailed,
} = paintingJobsSlice.actions;

export default paintingJobsSlice.reducer;
