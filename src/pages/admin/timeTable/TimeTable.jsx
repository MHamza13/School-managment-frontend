import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  IconButton,
  Switch,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// Icons
import PrintIcon from "@mui/icons-material/Print";
import SaveIcon from "@mui/icons-material/Save";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import RoomIcon from "@mui/icons-material/Room";
import PersonIcon from "@mui/icons-material/Person";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteIcon from "@mui/icons-material/Delete";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import InfoIcon from "@mui/icons-material/Info";

// --- Redux Imports ---
import {
  getAllSclasses,
  getSubjectList,
} from "../../../redux/sclassRelated/sclassHandle";
import { getAllTeachers } from "../../../redux/teacherRelated/teacherHandle";
import {
  getTimetableDetails,
  addTimetable,
} from "../../../redux/timetableRelated/timetableHandle";
import { resetState } from "../../../redux/timetableRelated/timetableSlice";

// --- Theme Colors ---
const DEEP_PURPLE = "#512da8";
const LIGHT_PURPLE = "#ede7f6";
const GRADIENT_BG = "linear-gradient(to right, #7b1fa2, #512da8)";
const PrimaryColor = "#080a43";
const AccentColor = "#4a148c";

// --- Styled Components ---
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${theme.breakpoints.down("sm")}`]: {
    fontSize: "0.7rem",
    padding: "4px",
  },
  borderRight: "1px solid #e0e0e0",
  textAlign: "center",
  position: "relative",
}));

const HeaderCell = styled(StyledTableCell)(({ theme }) => ({
  background: DEEP_PURPLE,
  color: theme.palette.common.white,
  fontWeight: "bold",
  textTransform: "uppercase",
  minWidth: "120px",
}));

const SubjectCard = styled(Box)(({ theme, colorcode }) => ({
  backgroundColor: colorcode || LIGHT_PURPLE,
  borderRadius: "8px",
  padding: "8px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "4px",
  minHeight: "80px",
  cursor: "pointer",
  border: "1px dashed transparent",
  transition: "0.3s",
  "&:hover": {
    backgroundColor: "#fff",
    border: `1px dashed ${DEEP_PURPLE}`,
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    transform: "translateY(-2px)",
  },
}));

// Days Array
const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const TimeTable = () => {
  const dispatch = useDispatch();

  // --- Redux Selectors ---
  const { currentUser } = useSelector((state) => state.user);
  
  // Sclass Slice (Classes & Subjects)
  const { 
    sclassesList, 
    subjectsList, 
    loading: sclassLoading 
  } = useSelector((state) => state.sclass);

  // Teacher Slice
  const { teachersList, loading: teacherLoading } = useSelector(
    (state) => state.teacher
  );

  // Timetable Slice
  const {
    timetableData,
    loading: timetableLoading,
    response,
    error,
  } = useSelector((state) => state.timetable);

  console.log("Timetabe:", timetableData);

  // --- Local States ---
  const [selectedClassID, setSelectedClassID] = useState("");
  
  // 1. Periods (Managed via Manage Periods Dialog) - Starts Empty
  const [periods, setPeriods] = useState([]); 
  
  // 2. Timetable Data (The actual schedule) - Starts Empty
  const [timetable, setTimetable] = useState({});

  // Dialog States
  const [openDialog, setOpenDialog] = useState(false); // Assign Subject
  const [openSettingsDialog, setOpenSettingsDialog] = useState(false); // Manage Periods

  // Edit Cell State
  const [currentCell, setCurrentCell] = useState({ day: "", period: "" });
  const [editData, setEditData] = useState({
    subject: "",
    teacher: "",
    room: "",
  });

  // Add Period Form State
  const [newPeriod, setNewPeriod] = useState({
    name: "",
    time: "",
    type: "class",
  });

  // --- 1. Initial Data Fetch ---
  useEffect(() => {
    if (currentUser?._id) {
      dispatch(getAllSclasses(currentUser._id, "Sclass"));
      dispatch(getAllTeachers(currentUser._id));
    }
  }, [currentUser, dispatch]);

  // --- 2. Sync Data from Backend (CRITICAL STEP) ---
  useEffect(() => {
    if (timetableData && Object.keys(timetableData).length > 0) {
      // 1. Set Periods (Columns) from Database
      if (timetableData.periodDefinitions && timetableData.periodDefinitions.length > 0) {
        setPeriods(timetableData.periodDefinitions);
      } else {
        setPeriods([]); 
      }

      // 2. Set Schedule (Assignments) from Database
      // Yeh 'Monday', 'Tuesday' wala object hai
      if (timetableData.schedule) {
        setTimetable(timetableData.schedule);
      } else {
        setTimetable({});
      }
    } else {
      // Reset if data is empty or switching classes
      setPeriods([]);
      setTimetable({});
    }
  }, [timetableData]);

  // --- 3. Handle Response (Success/Error) ---
  useEffect(() => {
    if (response) {
      // alert("✅ Operation Successful: " + response); 
      dispatch(resetState());
    } else if (error) {
      alert("❌ Error: " + error);
      dispatch(resetState());
    }
  }, [response, error, dispatch]);

  // --- HANDLERS ---

  const handleClassChange = (event) => {
    const classID = event.target.value;
    setSelectedClassID(classID);

    // Reset current view before fetching
    setPeriods([]);
    setTimetable({});

    // Fetch new data (Timetable + Subjects)
    dispatch(getTimetableDetails(classID));
    dispatch(getSubjectList(classID, "ClassSubjects"));
  };

  const handleCellClick = (day, periodId, type) => {
    if (type === "break") return;
    setCurrentCell({ day, period: periodId });
    
    // Check if data exists in DB state for this cell
    const existingData = timetable[day]?.[periodId] || {
      subject: "",
      teacher: "",
      room: "",
    };
    setEditData(existingData);
    setOpenDialog(true);
  };

  // --- AUTO-SAVE HELPER ---
  const saveChangesToBackend = (updatedPeriods, updatedTimetable) => {
    if (!selectedClassID) return;

    const dataToSend = {
      sclass: selectedClassID,
      periodDefinitions: updatedPeriods, 
      schedule: updatedTimetable,
    };

    console.log("Auto-Saving:", dataToSend);
    dispatch(addTimetable(dataToSend));
  };

  // --- ACTION 1: Teacher/Subject Assign karna (Auto Save) ---
  const handleSaveCell = () => {
    const updatedTimetable = {
      ...timetable,
      [currentCell.day]: {
        ...timetable[currentCell.day],
        [currentCell.period]: editData,
      },
    };

    setTimetable(updatedTimetable);
    setOpenDialog(false);
    saveChangesToBackend(periods, updatedTimetable);
  };

  // --- ACTION 2: Period Add karna (Auto Save) ---
  const handleAddPeriod = () => {
    if (!newPeriod.name || !newPeriod.time)
      return alert("Please fill Name and Time");

    const id = newPeriod.type === "break" ? `break-${Date.now()}` : `p-${Date.now()}`;

    const newSlot = {
      id: id,
      name: newPeriod.name,
      time: newPeriod.time,
      type: newPeriod.type,
    };

    const updatedPeriods = [...periods, newSlot];
    setPeriods(updatedPeriods);
    setNewPeriod({ name: "", time: "", type: "class" });
    saveChangesToBackend(updatedPeriods, timetable);
  };

  // --- ACTION 3: Period Delete karna (Auto Save) ---
  const handleDeletePeriod = (id) => {
    const updatedPeriods = periods.filter((p) => p.id !== id);
    
    // Cleanup deleted period data
    const updatedTimetable = { ...timetable };
    Object.keys(updatedTimetable).forEach((day) => {
      if (updatedTimetable[day] && updatedTimetable[day][id]) {
        delete updatedTimetable[day][id];
      }
    });

    setPeriods(updatedPeriods);
    setTimetable(updatedTimetable);
    saveChangesToBackend(updatedPeriods, updatedTimetable);
  };

  // Manual Save (Backup)
  const saveTimetableToBackend = () => {
    if (!selectedClassID) return alert("Select a class!");
    saveChangesToBackend(periods, timetable);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1", p: 2 }}>
      
      {/* Header */}
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 4, background: GRADIENT_BG, color: "white" }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
          <Box display="flex" alignItems="center" gap={2}>
            <CalendarMonthIcon sx={{ fontSize: 40 }} />
            <Box>
              <Typography variant="h5" fontWeight="bold">Class Timetable</Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>View and Manage Schedule</Typography>
            </Box>
          </Box>
          <Box display="flex" gap={2}>
            {selectedClassID && (
              <Button
                variant="contained"
                startIcon={<SettingsIcon />}
                onClick={() => setOpenSettingsDialog(true)}
                sx={{ bgcolor: "rgba(255,255,255,0.2)", "&:hover": { bgcolor: "rgba(255,255,255,0.3)" } }}
              >
                Manage Periods
              </Button>
            )}
            <Button
              variant="contained"
              startIcon={timetableLoading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
              onClick={saveTimetableToBackend}
              sx={{ bgcolor: "white", color: DEEP_PURPLE, fontWeight: "bold", "&:hover": { bgcolor: "#f5f5f5" } }}
              disabled={timetableLoading}
            >
              {timetableLoading ? "Saving..." : "Save All"}
            </Button>
            <Button
              variant="outlined"
              startIcon={<PrintIcon />}
              onClick={() => window.print()}
              sx={{ borderColor: "white", color: "white", "&:hover": { borderColor: "#f5f5f5", bgcolor: "rgba(255,255,255,0.1)" } }}
            >
              Print
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Class Filter */}
      <Paper sx={{ p: 2, mb: 3, borderRadius: 3 }} elevation={1}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Select Class</InputLabel>
              <Select
                value={selectedClassID}
                label="Select Class"
                onChange={handleClassChange}
                disabled={sclassLoading}
              >
                {sclassLoading ? (
                  <MenuItem value="">Loading...</MenuItem>
                ) : sclassesList?.length > 0 ? (
                  sclassesList.map((item) => (
                    <MenuItem key={item._id} value={item._id}>
                      {item.sclassName}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="">No Classes Found</MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="caption" color="text.secondary">
              {selectedClassID ? "Data Loaded. Changes auto-save." : "Select a class to load data."}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Empty State */}
      {selectedClassID && periods.length === 0 ? (
        <Paper elevation={1} sx={{ p: 5, textAlign: "center", borderRadius: 3, bgcolor: "#f9f9f9", border: "1px dashed #ccc" }}>
          <InfoIcon sx={{ fontSize: 50, color: "#999", mb: 2 }} />
          <Typography variant="h6" color="textSecondary" gutterBottom>No Periods Defined</Typography>
          <Button variant="contained" color="primary" startIcon={<SettingsIcon />} onClick={() => setOpenSettingsDialog(true)}>
            Create Periods
          </Button>
        </Paper>
      ) : (
        <TableContainer component={Paper} elevation={4} sx={{ borderRadius: 3, overflowX: "auto" }}>
          <Table sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow>
                <HeaderCell sx={{ width: "100px", bgcolor: "#4527a0" }}>Day / Time</HeaderCell>
                {/* Dynamic Headers from API */}
                {periods.map((period) => (
                  <HeaderCell key={period.id}>
                    <Box>{period.name}</Box>
                    <Box display="flex" alignItems="center" justifyContent="center" gap={0.5}>
                      <AccessTimeIcon sx={{ fontSize: 12, opacity: 0.8 }} />
                      <Typography variant="caption" sx={{ opacity: 0.8, fontWeight: "normal" }}>
                        {period.time}
                      </Typography>
                    </Box>
                  </HeaderCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {days.map((day) => (
                <TableRow key={day} sx={{ "&:hover": { bgcolor: "#fafafa" } }}>
                  <StyledTableCell sx={{ fontWeight: "bold", color: DEEP_PURPLE, bgcolor: "#f3e5f5" }}>
                    {day}
                  </StyledTableCell>

                  {periods.map((period) => {
                    // 1. Check for Break
                    if (period.type === "break") {
                      return (
                        <StyledTableCell key={period.id} sx={{ bgcolor: "#fff3e0", minWidth: "50px" }}>
                          <Typography sx={{ writingMode: "vertical-rl", margin: "0 auto", fontWeight: "bold", color: "#e65100" }}>
                            {period.name.toUpperCase()}
                          </Typography>
                        </StyledTableCell>
                      );
                    }

                    // 2. Get Data from Schedule (Using Day + Period ID)
                    // Example: timetable["Monday"]["p-1768556791280"]
                    const cellData = timetable[day]?.[period.id];

                    return (
                      <StyledTableCell key={period.id} onClick={() => handleCellClick(day, period.id, period.type)}>
                        {cellData && cellData.subject ? (
                          <SubjectCard colorcode="#e3f2fd">
                            <Typography variant="subtitle2" fontWeight="800" color="#1565c0">
                              {cellData.subject}
                            </Typography>
                            <Box display="flex" alignItems="center" gap={0.5} justify="center">
                              <PersonIcon sx={{ fontSize: 14, color: "#555" }} />
                              <Typography variant="caption" color="text.secondary">
                                {cellData.teacher}
                              </Typography>
                            </Box>
                            <Chip icon={<RoomIcon sx={{ fontSize: "12px !important" }} />} label={cellData.room || "N/A"} size="small" sx={{ height: 18, fontSize: "0.6rem", bgcolor: "rgba(255,255,255,0.8)", mt: 0.5 }} />
                          </SubjectCard>
                        ) : (
                          <SubjectCard colorcode="#f5f5f5">
                            <AddCircleOutlineIcon color="disabled" fontSize="small" />
                            <Typography variant="caption" color="text.secondary">Assign</Typography>
                          </SubjectCard>
                        )}
                      </StyledTableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* --- Assign Dialog --- */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="xs">
        <DialogTitle sx={{ background: GRADIENT_BG, color: "white" }}>
          Assign Slot ({currentCell.day})
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            {/* Subject Dropdown */}
            <FormControl fullWidth>
              <InputLabel>Select Subject</InputLabel>
              <Select value={editData.subject} label="Select Subject" onChange={(e) => setEditData({ ...editData, subject: e.target.value })}>
                {subjectsList && subjectsList.length > 0 ? (
                  subjectsList.map((sub) => (
                    <MenuItem key={sub._id} value={sub.subName}>{sub.subName} ({sub.subCode})</MenuItem>
                  ))
                ) : <MenuItem value="">No Subjects Found</MenuItem>}
              </Select>
            </FormControl>

            {/* Teacher Dropdown */}
            <FormControl fullWidth>
              <InputLabel>Select Teacher</InputLabel>
              <Select value={editData.teacher} label="Select Teacher" onChange={(e) => setEditData({ ...editData, teacher: e.target.value })} disabled={teacherLoading}>
                {teachersList && teachersList.length > 0 ? (
                  teachersList.map((teacher) => (
                    <MenuItem key={teacher._id} value={teacher.name}>{teacher.name}</MenuItem>
                  ))
                ) : <MenuItem value="">No Teachers Found</MenuItem>}
              </Select>
            </FormControl>

            <TextField label="Room Number" fullWidth value={editData.room} onChange={(e) => setEditData({ ...editData, room: e.target.value })} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">Cancel</Button>
          <Button onClick={handleSaveCell} variant="contained" sx={{ bgcolor: DEEP_PURPLE }}>Update & Auto-Save</Button>
        </DialogActions>
      </Dialog>

      {/* --- Manage Periods Dialog --- */}
      <Dialog open={openSettingsDialog} onClose={() => setOpenSettingsDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ background: GRADIENT_BG, color: "white" }}>Manage Periods</DialogTitle>
        <DialogContent>
          <Paper variant="outlined" sx={{ p: 2, mt: 2, mb: 2, bgcolor: "#f9f9f9" }}>
            <Typography variant="subtitle2" gutterBottom fontWeight="bold" color={PrimaryColor}>Add New Slot</Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={4}>
                <TextField size="small" label="Name (e.g. Period 1)" fullWidth value={newPeriod.name} onChange={(e) => setNewPeriod({ ...newPeriod, name: e.target.value })} />
              </Grid>
              <Grid item xs={4}>
                <TextField size="small" label="Time (e.g. 09:00-10:00)" fullWidth value={newPeriod.time} onChange={(e) => setNewPeriod({ ...newPeriod, time: e.target.value })} />
              </Grid>
              <Grid item xs={2}>
                <FormControlLabel control={<Switch checked={newPeriod.type === "break"} onChange={(e) => setNewPeriod({ ...newPeriod, type: e.target.checked ? "break" : "class" })} size="small" />} label="Break" />
              </Grid>
              <Grid item xs={2}>
                <Button variant="contained" size="small" onClick={handleAddPeriod} sx={{ bgcolor: AccentColor }}>Add</Button>
              </Grid>
            </Grid>
          </Paper>
          <Divider />
          <List dense sx={{ bgcolor: "background.paper" }}>
            {periods.length > 0 ? (
              periods.map((period, index) => (
                <ListItem key={period.id} secondaryAction={<IconButton edge="end" aria-label="delete" color="error" onClick={() => handleDeletePeriod(period.id)}><DeleteIcon /></IconButton>}>
                  <ListItemText primary={<Box display="flex" alignItems="center" gap={1}><Typography fontWeight="bold">{index + 1}. {period.name}</Typography>{period.type === "break" && <Chip label="BREAK" size="small" color="warning" sx={{ height: 20 }} />}</Box>} secondary={`Time: ${period.time}`} />
                </ListItem>
              ))
            ) : <Box p={2} textAlign="center"><Typography variant="caption">No slots defined yet.</Typography></Box>}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSettingsDialog(false)} variant="contained" color="primary">Done</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TimeTable;