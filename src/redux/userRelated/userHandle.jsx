import axios from "axios";
import {
  authRequest,
  stuffAdded,
  authSuccess,
  authFailed,
  authError,
  authLogout,
  doneSuccess,
  getDeleteSuccess,
  getRequest,
  getFailed,
  getError,
} from "./userSlice";
import { BASE_URL } from "../../utils/Urls";


// ==========================================
// LOGIN USER
// ==========================================
export const loginUser = (fields, role) => async (dispatch) => {
  dispatch(authRequest());

  try {
    const result = await axios.post(`${BASE_URL}/${role}Login`, fields, {
      headers: { "Content-Type": "application/json" },
    });

    if (result.data.role) {
      dispatch(authSuccess(result.data));
    } else {
      dispatch(authFailed(result.data.message));
    }
  } catch (error) {
    dispatch(authError(error));
  }
};

// ==========================================
// REGISTER USER
// ==========================================
export const registerUser = (fields, role) => async (dispatch) => {
  dispatch(authRequest());

  try {
    // Dynamic Content-Type: Agar FormData hai (images) to multipart, nahi to JSON
    const config = {
      headers: {
        "Content-Type": fields instanceof FormData ? "multipart/form-data" : "application/json",
      },
    };

    const result = await axios.post(`${BASE_URL}/${role}Reg`, fields, config);

    if (result.data.schoolName || result.data._id) {
      // Admin registration ke baad seedha login
      dispatch(authSuccess(result.data));
    } else if (result.data.school) {
      // Student/Teacher registration successful
      dispatch(stuffAdded(result.data));
    } else {
      dispatch(authFailed(result.data.message));
    }
  } catch (error) {
    console.error("Register Error:", error);
    dispatch(authError(error));
  }
};

// ==========================================
// LOGOUT USER
// ==========================================
export const logoutUser = () => (dispatch) => {
  dispatch(authLogout());
};

// ==========================================
// GET USER DETAILS
// ==========================================
export const getUserDetails = (id, address) => async (dispatch) => {
  dispatch(getRequest());

  try {
    const result = await axios.get(`${BASE_URL}/${address}/${id}`);
    if (result.data) {
      dispatch(doneSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

// ==========================================
// DELETE USER
// ==========================================
export const deleteUser = (id, address) => async (dispatch) => {
  dispatch(getRequest());

  try {
    // Logic enable kar diya hai
    const result = await axios.delete(`${BASE_URL}/${address}/${id}`);
    
    if (result.data.message && result.data.message !== "Successfully deleted") {
       // Agar backend se koi specific error msg aaya
       dispatch(getFailed(result.data.message));
    } else {
       dispatch(getDeleteSuccess());
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

// ==========================================
// UPDATE USER (Profile & Admin Update)
// ==========================================
export const updateUser = (fields, id, address) => async (dispatch) => {
  dispatch(getRequest());

  try {
    // Dynamic Headers for File Upload
    const config = {
      headers: {
        "Content-Type": fields instanceof FormData ? "multipart/form-data" : "application/json",
      },
    };

    const result = await axios.put(`${BASE_URL}/AdminUpdate/${id}`, fields, config);

    // LOGIC:
    // 1. Agar Admin khud ko update kar raha hai (address 'AdminUpdate' hai)
    //    to hum 'authSuccess' dispatch karenge taaki Sidebar/Header turant update ho jaye.
    // 2. Agar Student/Teacher update ho raha hai, to sirf 'doneSuccess' dispatch karenge.
    
    if (address === "AdminUpdate" || result.data.role === "Admin") {
      dispatch(authSuccess(result.data));
    } else {
      dispatch(doneSuccess(result.data));
    }
    
  } catch (error) {
    dispatch(getError(error));
  }
};

// ==========================================
// ADD STUFF (Classes, Subjects, Notices)
// ==========================================
export const addStuff = (fields, address) => async (dispatch) => {
  dispatch(authRequest());

  try {
    const result = await axios.post(`${BASE_URL}/${address}Create`, fields, {
      headers: { "Content-Type": "application/json" },
    });

    if (result.data.message) {
      dispatch(authFailed(result.data.message));
    } else {
      dispatch(stuffAdded(result.data));
    }
  } catch (error) {
    dispatch(authError(error));
  }
};