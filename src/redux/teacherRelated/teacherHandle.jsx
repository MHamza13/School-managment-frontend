import axios from "axios";
import {
  getRequest,
  getSuccess,
  getFailed,
  getError,
  postDone,
  doneSuccess,
} from "./teacherSlice";
import { BASE_URL } from "../../utils/Urls";  


// Teachers List lana
export const getAllTeachers = (id) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const result = await axios.get(`${BASE_URL}/Teachers/${id}`);
    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(getSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

// Single Teacher Details
export const getTeacherDetails = (id) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const result = await axios.get(`${BASE_URL}/Teacher/${id}`);
    if (result.data) {
      dispatch(doneSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

// Update Teacher Subject
export const updateTeachSubject =
  (teacherId, teachSubject) => async (dispatch) => {
    dispatch(getRequest());
    try {
      await axios.put(
        `${BASE_URL}/TeacherSubject`,
        { teacherId, teachSubject },
        { headers: { "Content-Type": "application/json" } }
      );
      dispatch(postDone());
    } catch (error) {
      dispatch(getError(error));
    }
  };

// *** NEW: Update Teacher Profile (Name, Bio, Phone, etc) ***
export const updateTeacher = (id, fields) => async (dispatch) => {
  dispatch(getRequest());

  try {
    // Axios put request with headers for FormData
    const result = await axios.put(`${BASE_URL}/TeacherUpdate/${id}`, fields, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      // Success hone par updated data dispatch karein
      dispatch(doneSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};
