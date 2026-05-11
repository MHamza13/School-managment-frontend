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
} from "@mui/material";
import {
  Plus,
  FileText,
  Calendar,
  Clock,
  Search,
  MoreVertical,
  Send,
  BookOpen,
  Layout,
  GraduationCap,
  X,
} from "lucide-react";

// --- Styled Components ---
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: "16px",
  borderBottom: "1px solid #f1f5f9",
  fontSize: "0.875rem",
  "&.MuiTableCell-head": {
    background: `linear-gradient(135deg, #6a1b9a 0%, #4a148c 100%)`,
    color: "#ffffff",
    fontWeight: 700,
    textTransform: "uppercase",
    fontSize: "0.75rem",
  },
}));

const TeacherAssignments = () => {
  const primaryPurple = "#6a1b9a";

  // Popup State
  const [open, setOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    class: "",
    type: "Homework",
    dueDate: "",
    marks: "",
  });

  // Dummy Data
  const [assignments] = useState([
    {
      id: 1,
      title: "Algebra Exercise 2.4",
      subject: "Math",
      class: "Grade 9-A",
      dueDate: "05 April, 2026",
      submissions: "38/45",
      type: "Homework",
      marks: "20",
    },
    {
      id: 2,
      title: "Solar System Model",
      subject: "Science",
      class: "Grade 8-C",
      dueDate: "08 April, 2026",
      submissions: "12/40",
      type: "Project",
      marks: "50",
    },
    {
      id: 3,
      title: "Urdu Adab Essay",
      subject: "Urdu",
      class: "Grade 10-B",
      dueDate: "02 April, 2026",
      submissions: "45/45",
      type: "Test",
      marks: "15",
    },
  ]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("New Assignment Data:", formData);
    handleClose(); 
  };

  return (
    <Box
      sx={{
        maxWidth: "100%",
        mx: "auto",
        minHeight: "100vh",
      }}
    >
      {/* Header Section */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems="center"
        mb={4}
        spacing={2}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{ fontWeight: 800, color: "#1e293b", letterSpacing: "-1px" }}
          >
            School Assignments
          </Typography>
          <Typography variant="body2" sx={{ color: "#64748b" }}>
            Manage and track student tasks efficiently.
          </Typography>
        </Box>

        <Button
          variant="contained"
          disableElevation
          onClick={handleOpen}
          startIcon={<Plus size={20} />}
          sx={{
            bgcolor: primaryPurple,
            borderRadius: "12px",
            px: 3,
            py: 1.2,
            textTransform: "none",
            fontWeight: 700,
            "&:hover": { bgcolor: "#4a148c" },
          }}
        >
          Create Assignment
        </Button>
      </Stack>

      {/* Stats Section */}
      <Grid container spacing={3} mb={4}>
        {[
          {
            label: "Pending Reviews",
            count: "14",
            icon: <Clock size={20} />,
            color: "#f59e0b",
          },
          {
            label: "Today's Due",
            count: "03",
            icon: <Calendar size={20} />,
            color: "#ef4444",
          },
          {
            label: "Live Classes",
            count: "05",
            icon: <Layout size={20} />,
            color: "#6366f1",
          },
        ].map((stat, i) => (
          <Grid item xs={12} md={4} key={i}>
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
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 800, color: "#1e293b" }}
                >
                  {stat.count}
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

      {/* Assignments Table List */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: "20px",
          border: "1px solid #e2e8f0",
          overflow: "hidden",
          bgcolor: "white",
        }}
      >
        <Box
          sx={{
            p: 2.5,
            borderBottom: "1px solid #f1f5f9",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontWeight: 800, color: "#1e293b" }}>
            Recent Assignments
          </Typography>
          <TextField
            size="small"
            placeholder="Search tasks..."
            InputProps={{
              startAdornment: (
                <Search
                  size={16}
                  style={{ marginRight: 8, color: "#94a3b8" }}
                />
              ),
            }}
            sx={{
              width: 220,
              "& .MuiOutlinedInput-root": { borderRadius: "10px" },
            }}
          />
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>Assignment & Class</StyledTableCell>
                <StyledTableCell>Type</StyledTableCell>
                <StyledTableCell>Due Date</StyledTableCell>
                <StyledTableCell>Submissions</StyledTableCell>
                <StyledTableCell align="right">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {assignments.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:hover": { bgcolor: "#fbfaff" } }}
                >
                  <TableCell>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar
                        sx={{
                          bgcolor: alpha(primaryPurple, 0.1),
                          color: primaryPurple,
                          width: 40,
                          height: 40,
                        }}
                      >
                        <FileText size={20} />
                      </Avatar>
                      <Box>
                        <Typography
                          sx={{
                            fontWeight: 700,
                            color: "#1e293b",
                            fontSize: "0.85rem",
                          }}
                        >
                          {row.title}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#64748b",
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <GraduationCap size={12} /> {row.class} •{" "}
                          {row.subject}
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={row.type}
                      size="small"
                      sx={{
                        fontWeight: 700,
                        fontSize: "0.65rem",
                        bgcolor: "#f1f5f9",
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, color: "#475569" }}
                    >
                      {row.dueDate}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#94a3b8" }}>
                      Marks: {row.marks}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography
                        sx={{ fontWeight: 700, color: primaryPurple }}
                      >
                        {row.submissions}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#94a3b8" }}>
                        received
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Send Reminder">
                      <IconButton size="small">
                        <Send size={16} color={primaryPurple} />
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

      {/* --- CREATE ASSIGNMENT POPUP (DIALOG) --- */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{ sx: { borderRadius: "20px", p: 1 } }}
      >
        <DialogTitle
          sx={{
            m: 0,
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              color: "#1e293b",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <BookOpen size={22} color={primaryPurple} /> Create New Assignment
          </Typography>
          <IconButton onClick={handleClose} sx={{ color: "#94a3b8" }}>
            <X size={20} />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers sx={{ borderBottom: "none" }}>
          <Stack spacing={2.5} mt={1}>
            <TextField
              fullWidth
              name="title"
              label="Assignment Title"
              placeholder="e.g. Weekly Math Quiz"
              onChange={handleInputChange}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
            />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  select
                  fullWidth
                  name="class"
                  label="Select Class"
                  value={formData.class}
                  onChange={handleInputChange}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                >
                  <MenuItem value="9a">Grade 9-A</MenuItem>
                  <MenuItem value="10b">Grade 10-B</MenuItem>
                  <MenuItem value="8c">Grade 8-C</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  select
                  fullWidth
                  name="type"
                  label="Task Type"
                  value={formData.type}
                  onChange={handleInputChange}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                >
                  <MenuItem value="Homework">Homework</MenuItem>
                  <MenuItem value="Project">Project</MenuItem>
                  <MenuItem value="Test">Class Test</MenuItem>
                </TextField>
              </Grid>
            </Grid>

            <TextField
              fullWidth
              name="dueDate"
              type="date"
              label="Submission Deadline"
              InputLabelProps={{ shrink: true }}
              onChange={handleInputChange}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
            />

            <TextField
              fullWidth
              name="marks"
              label="Total Marks"
              type="number"
              onChange={handleInputChange}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={handleClose}
            sx={{ color: "#64748b", fontWeight: 700, textTransform: "none" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              bgcolor: primaryPurple,
              borderRadius: "12px",
              px: 4,
              fontWeight: 700,
              textTransform: "none",
              "&:hover": { bgcolor: "#4a148c" },
            }}
          >
            Create & Post
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TeacherAssignments;
