import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
  Divider,
  Grid,
  InputAdornment,
  Stack,
} from "@mui/material";
import SubjectIcon from "@mui/icons-material/MenuBook";
import CodeIcon from "@mui/icons-material/Bookmark";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addStuff } from "../../../redux/userRelated/userHandle";
import { underControl } from "../../../redux/userRelated/userSlice";
import Popup from "../../../components/Popup";

const SubjectForm = () => {
  const [subjects, setSubjects] = useState([
    { subName: "", subCode: "", sessions: "" },
  ]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const { status, currentUser, response, error } = useSelector(
    (state) => state.user
  );

  const sclassName = params.id;
  const adminID = currentUser?._id;
  const address = "Subject";

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);

  const handleChange = (index, field) => (event) => {
    const newSubjects = [...subjects];
    newSubjects[index][field] = event.target.value;
    setSubjects(newSubjects);
  };

  const handleAddSubject = () => {
    setSubjects([...subjects, { subName: "", subCode: "", sessions: "" }]);
  };

  const handleRemoveSubject = (index) => () => {
    const newSubjects = [...subjects];
    newSubjects.splice(index, 1);
    setSubjects(newSubjects);
  };

  const fields = {
    sclassName,
    subjects: subjects.map(({ subName, subCode, sessions }) => ({
      subName,
      subCode,
      sessions,
    })),
    adminID,
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    dispatch(addStuff(fields, address));
  };

  useEffect(() => {
    if (status === "added") {
      navigate("/Admin/subjects");
      dispatch(underControl());
      setLoader(false);
    } else if (status === "failed") {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    } else if (status === "error") {
      setMessage("Network Error");
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, navigate, error, response, dispatch]);

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Paper
        elevation={10}
        sx={{
          padding: 5,
          width: "100%",
          borderRadius: 4,
          backgroundColor: "#fff",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: "#2e3a59",
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          Add Subjects
        </Typography>

        <Divider sx={{ mb: 4 }} />

        <form onSubmit={submitHandler}>
          <Grid container spacing={2}>
            {subjects.map((subject, index) => (
              <React.Fragment key={index}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    required
                    label="Subject Name"
                    value={subject.subName}
                    onChange={handleChange(index, "subName")}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SubjectIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    required
                    label="Subject Code"
                    value={subject.subCode}
                    onChange={handleChange(index, "subCode")}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CodeIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    required
                    label="Sessions"
                    type="number"
                    value={subject.sessions}
                    onChange={handleChange(index, "sessions")}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccessTimeIcon color="action" />
                        </InputAdornment>
                      ),
                      inputProps: { min: 0 },
                    }}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                  />
                </Grid>
                <Grid item xs={12} md={1} display="flex" alignItems="center">
                  <Button
                    variant="outlined"
                    color={index === 0 ? "primary" : "error"}
                    onClick={
                      index === 0
                        ? handleAddSubject
                        : handleRemoveSubject(index)
                    }
                    sx={{ minWidth: "100%" }}
                  >
                    {index === 0 ? "Add" : "Remove"}
                  </Button>
                </Grid>
              </React.Fragment>
            ))}

            <Grid item xs={12}>
              <Box display="flex" justifyContent="flex-end">
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loader}
                  size="large"
                  sx={{
                    borderRadius: 3,
                    height: 50,
                    fontWeight: 600,
                    background: "linear-gradient(to right, #7b1fa2, #e040fb)",
                    color: "#fff",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    "&:hover": {
                      background: "linear-gradient(to right, #e040fb, #7b1fa2)",
                    },
                  }}
                >
                  {loader ? (
                    <CircularProgress size={26} color="inherit" />
                  ) : (
                    "Save Subjects"
                  )}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Popup
        message={message}
        showPopup={showPopup}
        setShowPopup={setShowPopup}
      />
    </Box>
  );
};

export default SubjectForm;
