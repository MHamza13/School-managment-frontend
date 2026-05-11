import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  Stack,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  alpha,
  styled,
  TextField,
  MenuItem,
  Chip,
  Tooltip,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
} from "@mui/material";
import {
  Plus,
  ClipboardCheck,
  Calendar,
  Clock,
  Search,
  MoreVertical,
  Edit3,
  Trash2,
  BookOpen,
  GraduationCap,
  FileSpreadsheet,
  X,
} from "lucide-react";

// --- Custom Styled Table Cell ---
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: "16px",
  borderBottom: "1px solid #f1f5f9",
  "&.MuiTableCell-head": {
    backgroundColor: "#6a1b9a",
    color: "#ffffff",
    fontWeight: 700,
    textTransform: "uppercase",
    fontSize: "0.75rem",
  },
}));

const TeacherExam = () => {
  const primaryPurple = "#6a1b9a";
  const [open, setOpen] = useState(false);

  // Exams Dummy Data
  const [exams] = useState([
    {
      id: 1,
      title: "Mid-Term Examination",
      subject: "Physics",
      class: "10-B",
      date: "15 April, 2026",
      duration: "2 Hours",
      totalMarks: 100,
      status: "Upcoming",
    },
    {
      id: 2,
      title: "Monthly Class Test",
      subject: "Mathematics",
      class: "9-A",
      date: "10 April, 2026",
      duration: "1 Hour",
      totalMarks: 25,
      status: "Active",
    },
    {
      id: 3,
      title: "Final Mock Test",
      subject: "Computer Science",
      class: "12-C",
      date: "02 April, 2026",
      duration: "3 Hours",
      totalMarks: 75,
      status: "Completed",
    },
  ]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ minHeight: "100vh" }}>
      {/* Header Section */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems="flex-start"
        mb={4}
        spacing={2}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{ fontWeight: 800, color: "#1e293b", letterSpacing: "-1px" }}
          >
            Exams & Assessments
          </Typography>
          <Typography variant="body2" sx={{ color: "#64748b" }}>
            Create new exams, manage schedules, and generate result reports.
          </Typography>
        </Box>

        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            startIcon={<FileSpreadsheet size={18} />}
            sx={{
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: 700,
              color: primaryPurple,
              borderColor: primaryPurple,
            }}
          >
            Export Results
          </Button>
          <Button
            variant="contained"
            disableElevation
            onClick={handleOpen}
            startIcon={<Plus size={20} />}
            sx={{
              bgcolor: primaryPurple,
              borderRadius: "12px",
              px: 3,
              fontWeight: 700,
              textTransform: "none",
              "&:hover": { bgcolor: "#4a148c" },
            }}
          >
            Schedule Exam
          </Button>
        </Stack>
      </Stack>

      {/* Quick Stats */}
      <Grid container spacing={3} mb={4}>
        {[
          {
            label: "Active Exams",
            value: "02",
            color: "#6366f1",
            icon: <ClipboardCheck size={20} />,
          },
          {
            label: "Pending Evaluations",
            value: "124",
            color: "#f59e0b",
            icon: <Clock size={20} />,
          },
          {
            label: "Avg. Class Score",
            value: "78%",
            color: "#10b981",
            icon: <GraduationCap size={20} />,
          },
        ].map((stat, idx) => (
          <Grid item xs={12} md={4} key={idx}>
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: "20px",
                border: "1px solid #e2e8f0",
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: "12px",
                  bgcolor: alpha(stat.color, 0.1),
                  color: stat.color,
                }}
              >
                {stat.icon}
              </Box>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 800 }}>
                  {stat.value}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: "#94a3b8",
                    fontWeight: 700,
                    textTransform: "uppercase",
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Exams Table */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: "20px",
          border: "1px solid #e2e8f0",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            p: 2.5,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            bgcolor: "white",
          }}
        >
          <Typography sx={{ fontWeight: 800, color: "#1e293b" }}>
            Exam Schedules
          </Typography>
          <TextField
            size="small"
            placeholder="Search by subject..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={16} />
                </InputAdornment>
              ),
            }}
            sx={{
              width: 250,
              "& .MuiOutlinedInput-root": { borderRadius: "10px" },
            }}
          />
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>Exam Title</StyledTableCell>
                <StyledTableCell>Subject & Class</StyledTableCell>
                <StyledTableCell>Date & Duration</StyledTableCell>
                <StyledTableCell>Marks</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell align="right">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {exams.map((exam) => (
                <TableRow
                  key={exam.id}
                  sx={{ "&:hover": { bgcolor: "#f8fafc" } }}
                >
                  <TableCell sx={{ fontWeight: 700, color: "#1e293b" }}>
                    {exam.title}
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {exam.subject}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#64748b" }}>
                      Grade {exam.class}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Stack spacing={0.5}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          color: "#475569",
                        }}
                      >
                        <Calendar size={14} />{" "}
                        <Typography variant="caption" sx={{ fontWeight: 600 }}>
                          {exam.date}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          color: "#94a3b8",
                        }}
                      >
                        <Clock size={14} />{" "}
                        <Typography variant="caption">
                          {exam.duration}
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>
                    {exam.totalMarks}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={exam.status}
                      size="small"
                      sx={{
                        fontWeight: 700,
                        fontSize: "0.65rem",
                        bgcolor:
                          exam.status === "Active"
                            ? alpha("#10b981", 0.1)
                            : alpha("#64748b", 0.1),
                        color: exam.status === "Active" ? "#10b981" : "#64748b",
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit">
                      <IconButton size="small">
                        <Edit3 size={16} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton size="small" sx={{ color: "#ef4444" }}>
                        <Trash2 size={16} />
                      </IconButton>
                    </Tooltip>
                    <IconButton size="small">
                      <MoreVertical size={16} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* --- Schedule Exam Popup --- */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{ sx: { borderRadius: "20px" } }}
      >
        <DialogTitle
          sx={{
            fontWeight: 800,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Schedule New Exam
          <IconButton onClick={handleClose}>
            <X size={20} />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} mt={1}>
            <TextField
              fullWidth
              label="Exam Title"
              placeholder="e.g. Final Term Phase 1"
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  select
                  fullWidth
                  label="Subject"
                  defaultValue=""
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                >
                  <MenuItem value="math">Mathematics</MenuItem>
                  <MenuItem value="sci">Science</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  select
                  fullWidth
                  label="Class"
                  defaultValue=""
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                >
                  <MenuItem value="10b">10-B</MenuItem>
                  <MenuItem value="9a">9-A</MenuItem>
                </TextField>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="Exam Date"
                  InputLabelProps={{ shrink: true }}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Total Marks"
                  type="number"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                />
              </Grid>
            </Grid>
            <TextField
              fullWidth
              label="Exam Duration"
              placeholder="e.g. 1.5 Hours"
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={handleClose}
            sx={{ color: "#64748b", fontWeight: 700 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: primaryPurple,
              borderRadius: "10px",
              px: 4,
              fontWeight: 700,
              "&:hover": { bgcolor: "#4a148c" },
            }}
          >
            Post Exam Schedule
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TeacherExam;
