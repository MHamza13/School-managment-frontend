import axios from "axios";
import {
  getRequest,
  getSuccess,
  getFailed,
  getError,
  stuffDone,
} from "./studentSlice";
import { BASE_URL } from "../../utils/Urls";


// --- GET ALL STUDENTS ---
export const getAllStudents = (id) => async (dispatch) => {
  dispatch(getRequest());

  try {
    const result = await axios.get(`${BASE_URL}/Students/${id}`);
    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(getSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

// --- UPDATE STUDENT (Profile + Image) ---
export const updateStudent = (id, fields) => async (dispatch) => {
  dispatch(getRequest());

  try {
    // Axios put request. 
    // Note: Jab hum 'fields' (FormData) bhejte hain, to Content-Type header 
    // axios automatic set kar deta hai (multipart/form-data), isliye manually likhne ki zaroorat nahi.
    const result = await axios.put(`${BASE_URL}/Student/${id}`, fields);

    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(stuffDone());
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

// --- GENERIC UPDATE FIELD (Old/Generic method) ---
export const updateStudentFields = (id, fields, address) => async (dispatch) => {
  dispatch(getRequest());

  try {
    const result = await axios.put(`${BASE_URL}/${address}/${id}`, fields, {
      headers: { "Content-Type": "application/json" },
    });
    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(stuffDone());
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

// --- REMOVE STUFF ---
export const removeStuff = (id, address) => async (dispatch) => {
  dispatch(getRequest());

  try {
    const result = await axios.put(`${BASE_URL}/${address}/${id}`);
    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(stuffDone());
    }
  } catch (error) {
    dispatch(getError(error));
  }
};