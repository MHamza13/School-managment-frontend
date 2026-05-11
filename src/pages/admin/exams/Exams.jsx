import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tab,
  Grid,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Chip,
  InputAdornment,
  Avatar,
  Divider,
  Card,
  CardContent,
  Collapse,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { styled } from "@mui/material/styles";

// Icons
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AssessmentIcon from "@mui/icons-material/Assessment";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SearchIcon from "@mui/icons-material/Search";
import SaveIcon from "@mui/icons-material/Save";
import BadgeIcon from "@mui/icons-material/Badge";
import DownloadIcon from "@mui/icons-material/Download";
import SchoolIcon from "@mui/icons-material/School";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AddIcon from "@mui/icons-material/Add";
import EventNoteIcon from "@mui/icons-material/EventNote";

// --- Theme Constants ---
const DEEP_PURPLE = "#7b1fa2";
const LIGHT_PURPLE = "#ede7f6";
const GRADIENT_BG = "linear-gradient(to right, #7b1fa2, #512da8)";

// --- Styled Components ---
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
  backgroundColor: DEEP_PURPLE,
  color: theme.palette.common.white,
}));

const StyledRow = styled(TableRow)(({ theme }) => ({
  "& > *": { borderBottom: "unset" },
  "&:hover": { backgroundColor: "#f5f5f5" },
}));

const StatCard = ({ title, value, icon, color }) => (
  <Paper
    elevation={2}
    sx={{
      p: 2,
      display: "flex",
      alignItems: "center",
      borderRadius: 3,
      borderLeft: `5px solid ${color}`,
      background: "white",
    }}
  >
    <Box sx={{ p: 1.5, bgcolor: `${color}20`, borderRadius: "50%", mr: 2, color: color }}>
      {icon}
    </Box>
    <Box>
      <Typography variant="caption" color="textSecondary" fontWeight="bold">
        {title.toUpperCase()}
      </Typography>
      <Typography variant="h5" fontWeight="800" color="textPrimary">
        {value}
      </Typography>
    </Box>
  </Paper>
);

// --- Component: Expandable Exam Row ---
const ExamRow = ({ row }) => {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <StyledRow>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" fontWeight="bold">
          {row.examName}
        </TableCell>
        <TableCell>{row.className}</TableCell>
        <TableCell>
          <Chip label={`${row.schedule.length} Subjects`} size="small" color="secondary" variant="outlined" />
        </TableCell>
        <TableCell>{row.startDate}</TableCell>
        <TableCell>
          <Chip label={row.status} color={row.status === "Upcoming" ? "primary" : "success"} size="small" />
        </TableCell>
        <TableCell align="center">
          <IconButton size="small" color="primary"><EditIcon /></IconButton>
          <IconButton size="small" color="error"><DeleteIcon /></IconButton>
        </TableCell>
      </StyledRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2, ml: 6 }}>
              <Typography variant="subtitle2" gutterBottom component="div" color="primary" fontWeight="bold">
                Detailed Date Sheet
              </Typography>
              <Table size="small" aria-label="subjects">
                <TableHead>
                  <TableRow>
                    <TableCell>Subject</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Marks</TableCell>
                    <TableCell>Type</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.schedule.map((sub, index) => (
                    <TableRow key={index}>
                      <TableCell>{sub.subject}</TableCell>
                      <TableCell>{sub.date}</TableCell>
                      <TableCell>{sub.time}</TableCell>
                      <TableCell>{sub.marks}</TableCell>
                      <TableCell>{sub.type}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const Exams = () => {
  const [tabValue, setTabValue] = useState("1");
  const [openModal, setOpenModal] = useState(false);
  
  // Data
  const [examList, setExamList] = useState([
    {
      id: 1,
      examName: "Final Term 2024",
      className: "Class 10-A",
      startDate: "2024-03-15",
      status: "Upcoming",
      schedule: [
        { subject: "Math", date: "2024-03-15", time: "09:00", marks: 100, type: "Written" },
        { subject: "Physics", date: "2024-03-18", time: "09:00", marks: 75, type: "Written" },
      ]
    }
  ]);

  // Form States
  const [basicInfo, setBasicInfo] = useState({ name: "", class: "" });
  const [subjectInput, setSubjectInput] = useState({ subject: "", type: "Written", marks: "100", date: "", time: "" });
  const [addedSubjects, setAddedSubjects] = useState([]);

  // Handlers
  const handleTabChange = (event, newValue) => setTabValue(newValue);

  const handleAddSubjectToBuffer = () => {
    if (!subjectInput.subject || !subjectInput.date || !subjectInput.time) {
      alert("Please fill Subject, Date and Time.");
      return;
    }
    setAddedSubjects([...addedSubjects, subjectInput]);
    // Clear only date/time/subject, keep type/marks as they might be same
    setSubjectInput({ ...subjectInput, subject: "", date: "", time: "" }); 
  };

  const handleRemoveSubject = (index) => {
    const list = [...addedSubjects];
    list.splice(index, 1);
    setAddedSubjects(list);
  };

  const handleCreateExam = () => {
    if (addedSubjects.length === 0) return alert("Add at least one subject.");
    const newExam = {
      id: Date.now(),
      examName: basicInfo.name,
      className: basicInfo.class,
      startDate: addedSubjects[0].date,
      status: "Upcoming",
      schedule: addedSubjects
    };
    setExamList([...examList, newExam]);
    setOpenModal(false);
    setAddedSubjects([]);
    setBasicInfo({ name: "", class: "" });
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "#f4f6f8", minHeight: "100vh" }}>
      
      {/* Header */}
      <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 3, background: GRADIENT_BG, color: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box>
          <Typography variant="h4" fontWeight="bold">Examination Control</Typography>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>Manage Schedules, Results & Admit Cards</Typography>
        </Box>
        <Button 
          variant="contained" 
          onClick={() => setOpenModal(true)}
          sx={{ bgcolor: "white", color: DEEP_PURPLE, fontWeight: "bold", "&:hover": { bgcolor: "#f5f5f5" } }}
          startIcon={<AddCircleOutlineIcon />}
        >
          New Exam
        </Button>
      </Paper>

      {/* Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Upcoming Exams" value="12" icon={<CalendarMonthIcon />} color="#1976d2" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Result Declared" value="85%" icon={<FactCheckIcon />} color="#2e7d32" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Admit Cards" value="1,200" icon={<BadgeIcon />} color="#ed6c02" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Subjects" value="45" icon={<SchoolIcon />} color="#9c27b0" />
        </Grid>
      </Grid>

      {/* Tabs Content */}
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", bgcolor: "white", borderRadius: "12px 12px 0 0" }}>
          <TabList onChange={handleTabChange} textColor="secondary" indicatorColor="secondary">
            <Tab label="Exam Schedule" value="1" icon={<CalendarMonthIcon />} iconPosition="start" />
            <Tab label="Marks Entry" value="2" icon={<AssessmentIcon />} iconPosition="start" />
            <Tab label="Admit Cards" value="3" icon={<BadgeIcon />} iconPosition="start" />
          </TabList>
        </Box>

        <TabPanel value="1" sx={{ p: 0, mt: 2 }}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell />
                    <StyledTableCell>Exam Name</StyledTableCell>
                    <StyledTableCell>Class</StyledTableCell>
                    <StyledTableCell>Subjects</StyledTableCell>
                    <StyledTableCell>Start Date</StyledTableCell>
                    <StyledTableCell>Status</StyledTableCell>
                    <StyledTableCell align="center">Action</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {examList.map((row) => <ExamRow key={row.id} row={row} />)}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </TabPanel>

        {/* Placeholders for Tab 2 & 3 */}
        <TabPanel value="2" sx={{ p: 4, textAlign: 'center' }}>Marks Entry Module</TabPanel>
        <TabPanel value="3" sx={{ p: 4, textAlign: 'center' }}>Admit Card Module</TabPanel>
      </TabContext>

      {/* --- CREATE EXAM DIALOG --- */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: DEEP_PURPLE, color: "white" }}>Create Exam & Date Sheet</DialogTitle>
        <DialogContent dividers>
            
            {/* SECTION 1: Exam Info */}
            <Box mb={3}>
                <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <EventNoteIcon fontSize="small"/> BASIC DETAILS
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Exam Name (e.g. Final Term)" value={basicInfo.name} onChange={(e) => setBasicInfo({...basicInfo, name: e.target.value})} size="small" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth size="small">
                            <InputLabel>Select Class</InputLabel>
                            <Select label="Select Class" value={basicInfo.class} onChange={(e) => setBasicInfo({...basicInfo, class: e.target.value})}>
                                <MenuItem value="Class 10-A">Class 10-A</MenuItem>
                                <MenuItem value="Class 9-B">Class 9-B</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* SECTION 2: Add Subject Form (2-Line Layout) */}
            <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                <AddCircleOutlineIcon fontSize="small"/> ADD SUBJECTS TO SCHEDULE
            </Typography>
            
            <Paper elevation={0} sx={{ p: 2, bgcolor: "#f5f5f5", borderRadius: 2, border: "1px dashed #bdbdbd", mb: 3 }}>
                <Grid container spacing={2} alignItems="center">
                    
                    {/* Line 1: Subject Details */}
                    <Grid item xs={12} md={5}>
                        <FormControl fullWidth size="small" sx={{ bgcolor: "white" }}>
                            <InputLabel>Subject</InputLabel>
                            <Select label="Subject" value={subjectInput.subject} onChange={(e) => setSubjectInput({...subjectInput, subject: e.target.value})}>
                                <MenuItem value="Mathematics">Mathematics</MenuItem>
                                <MenuItem value="English">English</MenuItem>
                                <MenuItem value="Science">Science</MenuItem>
                                <MenuItem value="History">History</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth size="small" sx={{ bgcolor: "white" }}>
                            <InputLabel>Exam Type</InputLabel>
                            <Select label="Exam Type" value={subjectInput.type} onChange={(e) => setSubjectInput({...subjectInput, type: e.target.value})}>
                                <MenuItem value="Written">Written</MenuItem>
                                <MenuItem value="Practical">Practical</MenuItem>
                                <MenuItem value="Oral">Oral</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField fullWidth size="small" label="Marks" type="number" value={subjectInput.marks} onChange={(e) => setSubjectInput({...subjectInput, marks: e.target.value})} sx={{ bgcolor: "white" }} />
                    </Grid>

                    {/* Line 2: Timing & Action */}
                    <Grid item xs={12} md={5}>
                        <TextField fullWidth size="small" type="date" label="Date" InputLabelProps={{ shrink: true }} value={subjectInput.date} onChange={(e) => setSubjectInput({...subjectInput, date: e.target.value})} sx={{ bgcolor: "white" }} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField fullWidth size="small" type="time" label="Time" InputLabelProps={{ shrink: true }} value={subjectInput.time} onChange={(e) => setSubjectInput({...subjectInput, time: e.target.value})} sx={{ bgcolor: "white" }} />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Button 
                            fullWidth 
                            variant="contained" 
                            color="secondary" 
                            onClick={handleAddSubjectToBuffer} 
                            startIcon={<AddIcon />}
                            sx={{ height: "40px", fontWeight: "bold" }}
                        >
                            Add Subject
                        </Button>
                    </Grid>
                </Grid>
            </Paper>

            {/* List of Added Subjects */}
            <Box>
                <Typography variant="subtitle2" gutterBottom>Scheduled Subjects ({addedSubjects.length})</Typography>
                {addedSubjects.length > 0 ? (
                    <TableContainer component={Paper} variant="outlined">
                        <Table size="small">
                            <TableHead>
                                <TableRow sx={{ bgcolor: "#eee" }}>
                                    <TableCell>Subject</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Date & Time</TableCell>
                                    <TableCell>Marks</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {addedSubjects.map((sub, index) => (
                                    <TableRow key={index}>
                                        <TableCell><strong>{sub.subject}</strong></TableCell>
                                        <TableCell>{sub.type}</TableCell>
                                        <TableCell>{sub.date} @ {sub.time}</TableCell>
                                        <TableCell>{sub.marks}</TableCell>
                                        <TableCell align="center">
                                            <IconButton size="small" color="error" onClick={() => handleRemoveSubject(index)}>
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <Typography variant="body2" color="textSecondary" align="center" sx={{ py: 2, fontStyle: "italic" }}>
                        No subjects added yet. Fill the form above and click "Add Subject".
                    </Typography>
                )}
            </Box>

        </DialogContent>
        <DialogActions>
            <Button onClick={() => setOpenModal(false)} color="inherit">Cancel</Button>
            <Button variant="contained" onClick={handleCreateExam} sx={{ bgcolor: DEEP_PURPLE }}>Create Exam</Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
};

export default Exams;