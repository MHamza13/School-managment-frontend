import { useEffect, useState } from 'react';
import { Box, CircularProgress, Stack, TextField, Typography, Paper, createTheme, ThemeProvider } from '@mui/material';
import Popup from '../../components/Popup';
import { BlueButton } from '../../components/buttonStyles';
import { addStuff } from '../../redux/userRelated/userHandle';
import { useDispatch, useSelector } from 'react-redux';
import { purple, deepPurple } from "@mui/material/colors";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

// Create a custom theme with purple as primary color
const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: deepPurple[300],
    },
    background: {
      paper: "#ffff", // Light purple background for paper elements
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h4: {
      fontWeight: 600,
      color: purple[800],
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(128,0,128,0.1)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
        },
      },
    },
  },
});

const StudentComplain = () => {
    const [complaint, setComplaint] = useState("");
    const [date, setDate] = useState("");

    const dispatch = useDispatch()

    const { status, currentUser, error } = useSelector(state => state.user);

    const user = currentUser._id
    const school = currentUser.school._id
    const address = "Complain"

    const [loader, setLoader] = useState(false)
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const fields = {
        user,
        date,
        complaint,
        school,
    };

    const submitHandler = (event) => {
        event.preventDefault()
        setLoader(true)
        dispatch(addStuff(fields, address))
    };

    useEffect(() => {
        if (status === "added") {
            setLoader(false)
            setShowPopup(true)
            setMessage("Done Successfully")
        }
        else if (error) {
            setLoader(false)
            setShowPopup(true)
            setMessage("Network Error")
        }
    }, [status, error])

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    flex: '1 1 auto',
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    py: 4,
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        maxWidth: 550,
                        px: 4,
                        py: 6,
                        width: '100%',
                        borderRadius: 4,
                    }}
                >
                    <Stack spacing={3} alignItems="center">
                        <ReportProblemIcon color="primary" sx={{ fontSize: 48 }} />
                        <Typography variant="h4" align="center">
                            Submit a Complaint
                        </Typography>
                        <Typography variant="body1" color="text.secondary" align="center">
                            Let us know your concerns. We'll address them promptly.
                        </Typography>
                    </Stack>
                    <form onSubmit={submitHandler}>
                        <Stack spacing={3} sx={{ mt: 4 }}>
                            <TextField
                                fullWidth
                                label="Select Date"
                                type="date"
                                value={date}
                                onChange={(event) => setDate(event.target.value)}
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    startAdornment: <CalendarTodayIcon color="action" sx={{ mr: 1 }} />,
                                }}
                            />
                            <TextField
                                fullWidth
                                label="Describe Your Complaint"
                                variant="outlined"
                                value={complaint}
                                onChange={(event) => {
                                    setComplaint(event.target.value);
                                }}
                                required
                                multiline
                                rows={4}
                                placeholder="Please provide details about your complaint..."
                            />
                        </Stack>
                        <BlueButton
                            fullWidth
                            size="large"
                            sx={{ mt: 4, py: 1.5 }}
                            variant="contained"
                            type="submit"
                            disabled={loader}
                        >
                            {loader ? <CircularProgress size={24} color="inherit" /> : "Submit Complaint"}
                        </BlueButton>
                    </form>
                </Paper>
            </Box>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </ThemeProvider>
    );
};

export default StudentComplain;