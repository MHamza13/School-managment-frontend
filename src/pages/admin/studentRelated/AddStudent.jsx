import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../redux/userRelated/userHandle";
import Popup from "../../../components/Popup";
import { underControl } from "../../../redux/userRelated/userSlice";
import { getAllSclasses } from "../../../redux/sclassRelated/sclassHandle";

import {
  CircularProgress,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
  Divider,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  IconButton,
  Grid,
} from "@mui/material";

import {
  Person as PersonIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
  Numbers as NumbersIcon,
  School as SchoolIcon,
  Phone as PhoneIcon,
  Badge as BadgeIcon,
  Transgender as GenderIcon,
} from "@mui/icons-material";

const DarkPurple = "#7b1fa2";
const DarkBlueGray = "#2e3a59";

const AddStudent = ({ situation }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const userState = useSelector((state) => state.user);
  const { status, currentUser, response } = userState;
  const { sclassesList } = useSelector((state) => state.sclass);

  // --- New Schema Fields ---
  const [name, setName] = useState("");
  const [rollNum, setRollNum] = useState("");
  const [admissionNumber, setAdmissionNumber] = useState(""); // New
  const [fatherName, setFatherName] = useState(""); // New
  const [phone, setPhone] = useState(""); // New
  const [gender, setGender] = useState(""); // New
  const [password, setPassword] = useState("");
  const [className, setClassName] = useState("");
  const [sclassName, setSclassName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const adminID = currentUser._id;
  const role = "Student";

  useEffect(() => {
    if (situation === "Class") {
      setSclassName(params.id);
    }
  }, [params.id, situation]);

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (situation === "Student") {
      dispatch(getAllSclasses(adminID, "Sclass"));
    }
  }, [adminID, dispatch, situation]);

  const changeHandler = (event) => {
    if (event.target.value === "") {
      setClassName("");
      setSclassName("");
    } else {
      const selectedClass = sclassesList.find(
        (c) => c.sclassName === event.target.value
      );
      setClassName(selectedClass.sclassName);
      setSclassName(selectedClass._id);
    }
  };

  const fields = {
    name,
    rollNum,
    admissionNumber,
    fatherName,
    phone,
    gender,
    password,
    sclassName,
    adminID,
    role,
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (sclassName === "") {
      setMessage("Please select a class");
      setShowPopup(true);
      return;
    }
    setLoader(true);
    dispatch(registerUser(fields, role));
  };

  useEffect(() => {
    if (status === "added") {
      dispatch(underControl());
      navigate(-1);
    } else if (status === "failed") {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    } else if (status === "error") {
      setMessage("Network Error");
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, navigate, response, dispatch]);

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#f4f6f8",
          display: "flex",
          justifyContent: "center",
          padding: "0 !important",
        }}
      >
        <Paper elevation={10} sx={{ padding: 5, borderRadius: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <SchoolIcon sx={{ fontSize: 35, color: DarkBlueGray, mr: 2 }} />
            <Typography
              variant="h4"
              sx={{ fontWeight: 800, color: DarkBlueGray }}
            >
              STUDENT ADMISSION
            </Typography>
          </Box>
          <Divider sx={{ mb: 4 }} />

          <Box component="form" onSubmit={submitHandler}>
            <Grid container spacing={3}>
              {/* Personal Details Section */}
              <Grid item xs={12}>
                <Typography variant="h6" color="primary">
                  Personal Details
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon color="secondary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Father's Name"
                  value={fatherName}
                  onChange={(e) => setFatherName(e.target.value)}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon color="secondary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Admission Number"
                  value={admissionNumber}
                  onChange={(e) => setAdmissionNumber(e.target.value)}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BadgeIcon color="secondary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Roll Number"
                  type="number"
                  value={rollNum}
                  onChange={(e) => setRollNum(e.target.value)}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <NumbersIcon color="secondary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <FormControl fullWidth required>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    label="Gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Contact Details Section */}
              <Grid item xs={12}>
                <Typography variant="h6" color="primary">
                  Contact & Academic
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon color="secondary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                {situation === "Student" ? (
                  <FormControl fullWidth required>
                    <InputLabel>Class</InputLabel>
                    <Select
                      label="Class"
                      value={className}
                      onChange={changeHandler}
                    >
                      {sclassesList.map((item, index) => (
                        <MenuItem key={index} value={item.sclassName}>
                          {item.sclassName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  <TextField
                    fullWidth
                    label="Class"
                    value={params.id}
                    disabled
                  />
                )}
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="secondary" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loader}
                  fullWidth
                  sx={{
                    py: 2,
                    fontSize: "1.1rem",
                    borderRadius: 2,
                    background: "linear-gradient(to right, #7b1fa2, #2e3a59)",
                  }}
                >
                  {loader ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Confirm Admission"
                  )}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>

      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </>
  );
};

export default AddStudent;
