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
  Divider,
  List,
  ListItem,
  ListItemText,
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

// --- Theme Colors (Matching ClassDetails) ---
const PrimaryColor = "#080a43";
const AccentColor = "#4a148c";
const DEEP_PURPLE = "#512da8";
const LIGHT_PURPLE = "#ede7f6";
const GRADIENT_BG = "linear-gradient(135deg, #080a43 0%, #4a148c 100%)";

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
  background: GRADIENT_BG,
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

// Default Periods (Initial State)
const defaultPeriods = [
  { id: "p1", name: "1st Period", time: "08:00 - 09:00", type: "class" },
  { id: "p2", name: "2nd Period", time: "09:00 - 10:00", type: "class" },
  { id: "break", name: "Break", time: "10:00 - 10:30", type: "break" },
  { id: "p3", name: "3rd Period", time: "10:30 - 11:30", type: "class" },
];

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
  const {
    sclassesList,
    subjectsList,
    loading: sclassLoading,
  } = useSelector((state) => state.sclass);
  const { teachersList, loading: teacherLoading } = useSelector(
    (state) => state.teacher
  );
  const {
    timetableData,
    loading: timetableLoading,
    response,
    error,
  } = useSelector((state) => state.timetable);

  // --- Local States ---
  const [selectedClassID, setSelectedClassID] = useState("");

  // 1. Periods State (Dynamic Columns)
  const [periods, setPeriods] = useState(defaultPeriods);

  // 2. Timetable Schedule State
  const [timetable, setTimetable] = useState({});

  // Dialog States
  const [openAssignDialog, setOpenAssignDialog] = useState(false);
  const [openSettingsDialog, setOpenSettingsDialog] = useState(false);

  // Edit Cell State
  const [currentCell, setCurrentCell] = useState({ day: "", period: "" });
  const [editData, setEditData] = useState({
    subject: "",
    teacher: "",
    room: "",
  });

  // Add New Period State
  const [newPeriod, setNewPeriod] = useState({
    name: "",
    time: "",
    type: "class",
  });

  // --- Initial Data Fetch ---
  useEffect(() => {
    if (currentUser?._id) {
      dispatch(getAllSclasses(currentUser._id, "Sclass"));
      dispatch(getAllTeachers(currentUser._id));
    }
  }, [currentUser, dispatch]);

  // --- Sync Data from Backend ---
  useEffect(() => {
    if (timetableData) {
      // Sync Schedule
      if (
        timetableData.schedule &&
        Object.keys(timetableData.schedule).length > 0
      ) {
        setTimetable(timetableData.schedule);
      } else {
        setTimetable({});
      }
      // Sync Periods (Columns)
      if (
        timetableData.periodDefinitions &&
        timetableData.periodDefinitions.length > 0
      ) {
        setPeriods(timetableData.periodDefinitions);
      } else {
        setPeriods(defaultPeriods);
      }
    }
  }, [timetableData]);

  // --- Handle API Responses ---
  useEffect(() => {
    if (response) {
      alert("✅ Success: " + response);
      dispatch(resetState());
    } else if (error) {
      alert("❌ Error: " + error);
      dispatch(resetState());
    }
  }, [response, error, dispatch]);

  // --- HANDLERS ---

  // 1. Class Selection
  const handleClassChange = (event) => {
    const classID = event.target.value;
    setSelectedClassID(classID);
    dispatch(getTimetableDetails(classID)); // Get Timetable
    dispatch(getSubjectList(classID, "ClassSubjects")); // Get Subjects
  };

  // 2. Open Assign Dialog
  const handleCellClick = (day, periodId, type) => {
    if (type === "break") return;
    setCurrentCell({ day, period: periodId });
    const existingData = timetable[day]?.[periodId] || {
      subject: "",
      teacher: "",
      room: "",
    };
    setEditData(existingData);
    setOpenAssignDialog(true);
  };

  // 3. Save Assignment to Local State
  const handleSaveAssignment = () => {
    setTimetable((prev) => ({
      ...prev,
      [currentCell.day]: {
        ...prev[currentCell.day],
        [currentCell.period]: editData,
      },
    }));
    setOpenAssignDialog(false);
  };

  // 4. Delete Assignment (Clear Cell)
  const handleClearAssignment = () => {
    const updatedTimetable = { ...timetable };
    if (updatedTimetable[currentCell.day]) {
      delete updatedTimetable[currentCell.day][currentCell.period];
    }
    setTimetable(updatedTimetable);
    setOpenAssignDialog(false);
  };

  // 5. Manage Periods: Add New Slot
  const handleAddPeriod = () => {
    if (!newPeriod.name || !newPeriod.time)
      return alert("Please fill Name and Time");
    const id =
      newPeriod.type === "break" ? `break-${Date.now()}` : `p-${Date.now()}`;
    setPeriods([...periods, { ...newPeriod, id }]);
    setNewPeriod({ name: "", time: "", type: "class" }); // Reset Form
  };

  // 6. Manage Periods: Delete Slot
  const handleDeletePeriod = (id) => {
    const updatedPeriods = periods.filter((p) => p.id !== id);
    setPeriods(updatedPeriods);

    // Cleanup schedule for deleted period
    const updatedTimetable = { ...timetable };
    Object.keys(updatedTimetable).forEach((day) => {
      if (updatedTimetable[day][id]) delete updatedTimetable[day][id];
    });
    setTimetable(updatedTimetable);
  };

  // 7. FINAL SAVE TO BACKEND
  const saveTimetableToBackend = () => {
    if (!selectedClassID) return alert("Please select a class first!");

    const payload = {
      sclass: selectedClassID,
      periodDefinitions: periods, // Saves columns structure
      schedule: timetable, // Saves assigned data
    };

    dispatch(addTimetable(payload));
  };

  return (
    <Box sx={{ width: "100%", typography: "body1", p: 2 }}>
      {/* --- Top Header --- */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 4,
          background: GRADIENT_BG,
          color: "white",
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          gap={2}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <CalendarMonthIcon sx={{ fontSize: 40 }} />
            <Box>
              <Typography variant="h5" fontWeight="bold">
                Timetable Management
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                View, Edit & Configure Schedule
              </Typography>
            </Box>
          </Box>
          <Box display="flex" gap={2}>
            {selectedClassID && (
              <Button
                variant="contained"
                startIcon={<SettingsIcon />}
                onClick={() => setOpenSettingsDialog(true)}
                sx={{
                  bgcolor: "rgba(255,255,255,0.2)",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
                }}
              >
                Manage Periods
              </Button>
            )}
            <Button
              variant="contained"
              startIcon={
                timetableLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <SaveIcon />
                )
              }
              onClick={saveTimetableToBackend}
              sx={{
                bgcolor: "white",
                color: PrimaryColor,
                fontWeight: "bold",
                "&:hover": { bgcolor: "#f0f0f0" },
              }}
              disabled={timetableLoading}
            >
              {timetableLoading ? "Saving..." : "Save All Changes"}
            </Button>
            <Button
              variant="outlined"
              startIcon={<PrintIcon />}
              onClick={() => window.print()}
              sx={{
                borderColor: "white",
                color: "white",
                "&:hover": {
                  borderColor: "#f0f0f0",
                  bgcolor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              Print
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* --- Class Selection --- */}
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
              {selectedClassID
                ? "You can now edit the schedule. Use 'Manage Periods' to add/remove slots."
                : "Please select a class to load the timetable."}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* --- Main Grid Table --- */}
      <TableContainer
        component={Paper}
        elevation={4}
        sx={{ borderRadius: 3, overflowX: "auto" }}
      >
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <HeaderCell sx={{ width: "100px", bgcolor: "#333" }}>
                Day / Time
              </HeaderCell>
              {periods.map((period) => (
                <HeaderCell key={period.id}>
                  <Box>{period.name}</Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap={0.5}
                  >
                    <AccessTimeIcon sx={{ fontSize: 12, opacity: 0.8 }} />
                    <Typography
                      variant="caption"
                      sx={{ opacity: 0.8, fontWeight: "normal" }}
                    >
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
                <StyledTableCell
                  sx={{
                    fontWeight: "bold",
                    color: PrimaryColor,
                    bgcolor: "#f5f5f5",
                  }}
                >
                  {day}
                </StyledTableCell>

                {periods.map((period) => {
                  // Break Slot Logic
                  if (period.type === "break") {
                    return (
                      <StyledTableCell
                        key={period.id}
                        sx={{ bgcolor: "#fff3e0", minWidth: "60px" }}
                      >
                        <Typography
                          sx={{
                            writingMode: "vertical-rl",
                            margin: "0 auto",
                            fontWeight: "bold",
                            color: "#e65100",
                            letterSpacing: 1,
                          }}
                        >
                          {period.name.toUpperCase()}
                        </Typography>
                      </StyledTableCell>
                    );
                  }

                  // Class Slot Logic
                  const cellData = timetable[day]?.[period.id];

                  return (
                    <StyledTableCell
                      key={period.id}
                      onClick={() =>
                        handleCellClick(day, period.id, period.type)
                      }
                    >
                      {cellData && cellData.subject ? (
                        <SubjectCard colorcode="#e3f2fd">
                          <Typography
                            variant="subtitle2"
                            fontWeight="800"
                            color="#1565c0"
                          >
                            {cellData.subject}
                          </Typography>
                          <Box
                            display="flex"
                            alignItems="center"
                            gap={0.5}
                            mt={0.5}
                          >
                            <PersonIcon sx={{ fontSize: 14, color: "#555" }} />
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {cellData.teacher || "No Teacher"}
                            </Typography>
                          </Box>
                          <Chip
                            icon={
                              <RoomIcon sx={{ fontSize: "12px !important" }} />
                            }
                            label={cellData.room || "Room N/A"}
                            size="small"
                            sx={{
                              height: 18,
                              fontSize: "0.6rem",
                              bgcolor: "rgba(255,255,255,0.8)",
                              mt: 0.5,
                            }}
                          />
                        </SubjectCard>
                      ) : (
                        <SubjectCard colorcode="#f8f9fa">
                          <AddCircleOutlineIcon
                            color="disabled"
                            fontSize="small"
                          />
                          <Typography variant="caption" color="text.secondary">
                            Assign
                          </Typography>
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

      {/* --- DIALOG 1: Assign Subject/Teacher --- */}
      <Dialog
        open={openAssignDialog}
        onClose={() => setOpenAssignDialog(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle sx={{ background: GRADIENT_BG, color: "white" }}>
          Assign {currentCell.day}
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <FormControl fullWidth>
              <InputLabel>Select Subject</InputLabel>
              <Select
                value={editData.subject}
                label="Select Subject"
                onChange={(e) =>
                  setEditData({ ...editData, subject: e.target.value })
                }
              >
                {subjectsList?.length > 0 ? (
                  subjectsList.map((sub) => (
                    <MenuItem key={sub._id} value={sub.subName}>
                      {sub.subName} ({sub.subCode})
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="">No Subjects in this Class</MenuItem>
                )}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Select Teacher</InputLabel>
              <Select
                value={editData.teacher}
                label="Select Teacher"
                onChange={(e) =>
                  setEditData({ ...editData, teacher: e.target.value })
                }
                disabled={teacherLoading}
              >
                {teachersList?.length > 0 ? (
                  teachersList.map((teacher) => (
                    <MenuItem key={teacher._id} value={teacher.name}>
                      {teacher.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="">No Teachers Found</MenuItem>
                )}
              </Select>
            </FormControl>

            <TextField
              label="Room Number"
              fullWidth
              value={editData.room}
              onChange={(e) =>
                setEditData({ ...editData, room: e.target.value })
              }
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClearAssignment} color="error">
            Clear Slot
          </Button>
          <Button onClick={() => setOpenAssignDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleSaveAssignment}
            variant="contained"
            sx={{ bgcolor: PrimaryColor }}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* --- DIALOG 2: Manage Periods (Dynamic Time & Break) --- */}
      <Dialog
        open={openSettingsDialog}
        onClose={() => setOpenSettingsDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ background: GRADIENT_BG, color: "white" }}>
          Manage Periods & Time Slots
        </DialogTitle>
        <DialogContent>
          {/* Add New Period Form */}
          <Paper
            variant="outlined"
            sx={{ p: 2, mt: 2, mb: 2, bgcolor: "#f9f9f9" }}
          >
            <Typography
              variant="subtitle2"
              gutterBottom
              fontWeight="bold"
              color={PrimaryColor}
            >
              Add New Slot
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={4}>
                <TextField
                  size="small"
                  label="Name (e.g. Period 1)"
                  fullWidth
                  value={newPeriod.name}
                  onChange={(e) =>
                    setNewPeriod({ ...newPeriod, name: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  size="small"
                  label="Time (e.g. 09:00-10:00)"
                  fullWidth
                  value={newPeriod.time}
                  onChange={(e) =>
                    setNewPeriod({ ...newPeriod, time: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={newPeriod.type === "break"}
                      onChange={(e) =>
                        setNewPeriod({
                          ...newPeriod,
                          type: e.target.checked ? "break" : "class",
                        })
                      }
                      size="small"
                    />
                  }
                  label="Break"
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleAddPeriod}
                  sx={{ bgcolor: AccentColor }}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Paper>

          {/* Existing Periods List */}
          <Typography variant="subtitle2" sx={{ mt: 2 }} color="text.secondary">
            Current Slots Order:
          </Typography>
          <List dense sx={{ bgcolor: "background.paper" }}>
            {periods.map((period, index) => (
              <ListItem
                key={period.id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    color="error"
                    onClick={() => handleDeletePeriod(period.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
                sx={{ borderBottom: "1px solid #eee" }}
              >
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography fontWeight="bold">
                        {index + 1}. {period.name}
                      </Typography>
                      {period.type === "break" && (
                        <Chip
                          label="BREAK"
                          size="small"
                          color="warning"
                          sx={{ height: 20 }}
                        />
                      )}
                    </Box>
                  }
                  secondary={`Time: ${period.time}`}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenSettingsDialog(false)}
            variant="contained"
            color="primary"
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TimeTable;
