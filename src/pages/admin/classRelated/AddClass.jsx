import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  TextField,
  Typography,
  Divider,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addStuff } from "../../../redux/userRelated/userHandle";
import { underControl } from "../../../redux/userRelated/userSlice";
import Popup from "../../../components/Popup";
import SchoolIcon from "@mui/icons-material/School";

const AddClass = () => {
  const [sclassName, setSclassName] = useState("");
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userState = useSelector((state) => state.user);
  const { status, currentUser, response, error, tempDetails } = userState;

  const adminID = currentUser?._id;
  const address = "Sclass";

  const fields = { sclassName, adminID };

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    dispatch(addStuff(fields, address));
  };

  useEffect(() => {
    if (status === "added" && tempDetails) {
      navigate("/Admin/classes/class/" + tempDetails._id);
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
  }, [status, navigate, error, response, dispatch, tempDetails]);

  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Paper
          elevation={10}
          sx={{
            padding: 5,
            width: "100%",
            maxWidth: "100%",
            borderRadius: 2,
            backgroundColor: "#fff",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          <Stack alignItems="center" mb={2}>
            <SchoolIcon sx={{ fontSize: 50, color: "#7b1fa2" }} />
          </Stack>

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
            Add New Class
          </Typography>

          <Divider sx={{ marginBottom: 4 }} />

          <form onSubmit={submitHandler}>
            <TextField
              label="Class Name"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              value={sclassName}
              onChange={(e) => setSclassName(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SchoolIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />

            <Button
              type="submit"
              fullWidth
              size="large"
              disabled={loader}
              sx={{
                marginTop: 3,
                borderRadius: 3,
                height: 50,
                fontWeight: 600,
                background: "linear-gradient(to right, #7b1fa2, #e040fb)",
                color: "#fff",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                transition: "0.3s",
                "&:hover": {
                  background: "linear-gradient(to right, #e040fb, #7b1fa2)",
                },
              }}
            >
              {loader ? (
                <CircularProgress size={26} color="inherit" />
              ) : (
                "Create Class"
              )}
            </Button>
          </form>
        </Paper>
      </Box>

      <Popup
        message={message}
        showPopup={showPopup}
        setShowPopup={setShowPopup}
      />
    </>
  );
};

export default AddClass;
