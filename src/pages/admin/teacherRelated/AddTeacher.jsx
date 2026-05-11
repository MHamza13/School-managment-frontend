import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getSubjectDetails } from "../../../redux/sclassRelated/sclassHandle";
import Popup from "../../../components/Popup";
import { registerUser } from "../../../redux/userRelated/userHandle";
import { underControl } from "../../../redux/userRelated/userSlice";
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
  Grid,
} from "@mui/material";

// Icons
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import PaidIcon from "@mui/icons-material/Paid";
import BadgeIcon from "@mui/icons-material/Badge";

const DarkPurple = "#7b1fa2";
const DarkBlueGray = "#2e3a59";

const AddTeacher = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subjectID = params.id;
  const { status, response } = useSelector((state) => state.user);
  const { subjectDetails } = useSelector((state) => state.sclass);

  useEffect(() => {
    dispatch(getSubjectDetails(subjectID, "Subject"));
  }, [dispatch, subjectID]);

  // States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [qualification, setQualification] = useState("");
  const [address, setAddress] = useState("");
  const [salary, setSalary] = useState("");
  const [designation, setDesignation] = useState("Teacher");
  const [experience, setExperience] = useState("");

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);

  const role = "Teacher";

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);

    // Ab hum simple JSON bhej rahe hain kyunke image nahi hai
    const fields = {
      name,
      email,
      password,
      role,
      school: subjectDetails?.school,
      teachSubject: subjectDetails?._id,
      teachSclass: subjectDetails?.sclassName?._id,
      phone,
      gender,
      qualification,
      address,
      salary,
      designation,
      experience,
    };

    dispatch(registerUser(fields, role));
  };

  useEffect(() => {
    if (status === "added") {
      dispatch(underControl());
      navigate("/Admin/teachers");
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
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#f4f6f8",
        minHeight: "100vh",
        p: 3,
      }}
    >
      <Paper
        elevation={10}
        sx={{ width: "100%", padding: { xs: 3, md: 5 }, borderRadius: 4 }}
      >
        {/* Header */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <BadgeIcon sx={{ fontSize: 45, color: DarkPurple, mr: 2 }} />
          <Box>
            <Typography
              variant="h4"
              sx={{ fontWeight: 800, color: DarkBlueGray }}
            >
              Teacher Registration
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Assigning to: <b>{subjectDetails?.subName}</b> (
              {subjectDetails?.sclassName?.sclassName})
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 4 }} />

        <form onSubmit={submitHandler}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Full Name"
                fullWidth
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ color: DarkPurple }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon sx={{ color: DarkPurple }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                label="Phone"
                fullWidth
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon sx={{ color: DarkPurple }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                select
                label="Gender"
                fullWidth
                required
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                label="Designation"
                fullWidth
                required
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BadgeIcon sx={{ color: DarkPurple }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Qualification"
                fullWidth
                required
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SchoolIcon sx={{ color: DarkPurple }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Experience"
                placeholder="e.g. 3 Years"
                fullWidth
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <WorkIcon sx={{ color: DarkPurple }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Monthly Salary"
                type="number"
                fullWidth
                required
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PaidIcon sx={{ color: DarkPurple }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Set Password"
                type="password"
                fullWidth
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: DarkPurple }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Address"
                fullWidth
                multiline
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <HomeIcon sx={{ color: DarkPurple }} />
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
                  borderRadius: 3,
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  background: "linear-gradient(to right, #7b1fa2, #2e3a59)",
                  "&:hover": {
                    background: "linear-gradient(to right, #2e3a59, #7b1fa2)",
                  },
                }}
              >
                {loader ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "REGISTER TEACHER"
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </Box>
  );
};

export default AddTeacher;
