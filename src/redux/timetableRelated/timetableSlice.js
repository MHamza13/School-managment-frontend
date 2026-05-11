import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  timetableData: {
    periodDefinitions: [], // Default empty array
    schedule: {}, // Default empty object
  },
  loading: false,
  error: null,
  response: null,
  statestatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
};

const timetableSlice = createSlice({
  name: "timetable",
  initialState,
  reducers: {
    getRequest: (state) => {
      state.loading = true;
      state.statestatus = "loading";
    },
    getSuccess: (state, action) => {
      state.loading = false;
      state.timetableData = action.payload; // API se aaya hua data yahan set hoga
      state.error = null;
      state.statestatus = "succeeded";
    },
    // Agar save success ho jaye
    saveSuccess: (state, action) => {
      state.loading = false;
      state.response = action.payload.message; // "Timetable updated successfully"
      state.error = null;
      state.statestatus = "succeeded";
    },
    getFailed: (state, action) => {
      state.loading = false;
      state.response = action.payload;
      state.error = action.payload;
      state.statestatus = "failed";
    },
    getError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.statestatus = "error";
    },
    // Reset function taake messages clear ho sakein
    resetState: (state) => {
      state.response = null;
      state.error = null;
      state.statestatus = "idle";
    },
  },
});

export const {
  getRequest,
  getSuccess,
  saveSuccess,
  getFailed,
  getError,
  resetState,
} = timetableSlice.actions;

export const timetableReducer = timetableSlice.reducer;
