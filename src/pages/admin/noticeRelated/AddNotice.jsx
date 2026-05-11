import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
  Divider,
  InputAdornment,
  Stack,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DescriptionIcon from "@mui/icons-material/Description";
import NotesIcon from "@mui/icons-material/Notes";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addStuff } from "../../../redux/userRelated/userHandle";
import { underControl } from "../../../redux/userRelated/userSlice";
import Popup from "../../../components/Popup";

const AddNotice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, response, error, currentUser } = useSelector(
    (state) => state.user
  );

  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [date, setDate] = useState("");
  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const adminID = currentUser?._id;
  const fields = { title, details, date, adminID };
  const address = "Notice";

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    dispatch(addStuff(fields, address));
  };

  useEffect(() => {
    if (status === "added") {
      navigate("/Admin/notices");
      dispatch(underControl());
    } else if (status === "error") {
      setMessage("Network Error");
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, navigate, error, response, dispatch]);

  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center" py={6}>
        <Paper
          elevation={10}
          sx={{
            padding: 5,
            width: "100%",
            maxWidth: 600,
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
            Add New Notice
          </Typography>

          <Divider sx={{ mb: 4 }} />

          <form onSubmit={submitHandler}>
            <TextField
              label="Notice Title"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DescriptionIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />

            <TextField
              label="Notice Details"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              multiline
              rows={4}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <NotesIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />

            <TextField
              label="Select Date"
              type="date"
              fullWidth
              required
              margin="normal"
              InputLabelProps={{ shrink: true }}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarTodayIcon color="action" />
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
                mt: 3,
                borderRadius: 3,
                height: 50,
                fontWeight: 600,
                background: "linear-gradient(to right, #7b1fa2, #e040fb)",
                color: "#fff",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                transition: "0.3s",
                "&:hover": {
                  background: "linear-gradient(to right, #e040fb, #7b1fa2)",
                },
              }}
            >
              {loader ? (
                <CircularProgress size={26} color="inherit" />
              ) : (
                "Add Notice"
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

export default AddNotice;
