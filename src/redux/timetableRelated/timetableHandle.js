import axios from "axios";
import {
  getRequest,
  getSuccess,
  saveSuccess,
  getFailed,
  getError,
} from "./timetableSlice";
import { BASE_URL } from "../../utils/Urls";

// 1. GET - Fetch Timetable by Class ID
export const getTimetableDetails = (classId) => async (dispatch) => {
  dispatch(getRequest());

  try {
    const result = await axios.get(`${BASE_URL}/Timetable/${classId}`);

    // --- DEBUGGING LOGS ---
    console.log("📥 [API] Get Timetable Response:", result.data);

    // Case 1: Agar Backend bole "No timetable found" (New Class)
    if (result.data.message && !result.data.schedule) {
      console.log(
        "ℹ️ No timetable exists for this class. Loading empty template."
      );
      const emptyData = {
        periodDefinitions: [],
        schedule: {},
      };
      dispatch(getSuccess(emptyData));
    }
    // Case 2: Agar Data Successfully mil gaya
    else if (result.data.periodDefinitions || result.data.schedule) {
      console.log("✅ Timetable Data Loaded Successfully");
      dispatch(getSuccess(result.data));
    }
    // Case 3: Fallback (Agar response format alag ho)
    else {
      console.warn("⚠️ Unexpected Response format:", result.data);
      dispatch(getSuccess({ periodDefinitions: [], schedule: {} }));
    }
  } catch (error) {
    console.error("❌ [API] Error Fetching Timetable:", error);
    dispatch(getError(error.response?.data?.message || error.message));
  }
};

// 2. POST - Create/Save New Timetable
export const addTimetable = (fields) => async (dispatch) => {
  dispatch(getRequest());

  try {
    console.log("📤 [API] Sending Data to Save:", fields);

    const result = await axios.post(`${BASE_URL}/Timetable/save`, fields, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("✅ [API] Save Response:", result.data);

    if (result.data.message) {
      dispatch(saveSuccess(result.data));
    } else {
      dispatch(getFailed("Failed to save timetable"));
    }
  } catch (error) {
    console.error("❌ [API] Error Saving Timetable:", error);
    dispatch(getError(error.response?.data?.message || error.message));
  }
};

// 3. PUT - Update Existing Timetable
export const updateTimetable = (fields) => async (dispatch) => {
  dispatch(getRequest());

  try {
    console.log("📤 [API] Sending Data to Update:", fields);

    const result = await axios.put(`${BASE_URL}/Timetable/update`, fields);

    if (result.data.message) {
      dispatch(saveSuccess(result.data));
    } else {
      dispatch(getFailed("Failed to update timetable"));
    }
  } catch (error) {
    dispatch(getError(error.response?.data?.message || error.message));
  }
};

// 4. DELETE - Delete Timetable by Class ID
export const deleteTimetable = (classId) => async (dispatch) => {
  dispatch(getRequest());

  try {
    const result = await axios.delete(`${BASE_URL}/Timetable/${classId}`);

    if (result.data.message) {
      dispatch(saveSuccess(result.data));
    } else {
      dispatch(getFailed("Failed to delete timetable"));
    }
  } catch (error) {
    dispatch(getError(error.response?.data?.message || error.message));
  }
};
