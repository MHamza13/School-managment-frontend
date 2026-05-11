import React, { useState } from "react";
// SweetAlert2 import karein
import Swal from "sweetalert2";
import {
  Box,
  Typography,
  Grid,
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
  Avatar,
  LinearProgress,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import {
  Search,
  Download,
  Save,
  TrendingUp,
  UserCheck,
  AlertCircle,
  Award,
  MoreVertical,
  FileText,
} from "lucide-react";

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

const TeacherGrads = () => {
  const primaryPurple = "#6a1b9a";

  const [students] = useState([
    {
      id: 101,
      name: "Zaid Khan",
      roll: "2024-001",
      exam: "Mid-Term",
      marks: 85,
      total: 100,
      status: "Passed",
      grade: "A",
    },
    {
      id: 102,
      name: "Ali Ahmed",
      roll: "2024-002",
      exam: "Mid-Term",
      marks: 92,
      total: 100,
      status: "Passed",
      grade: "A+",
    },
    {
      id: 103,
      name: "Sara Sheikh",
      roll: "2024-003",
      exam: "Mid-Term",
      marks: 45,
      total: 100,
      status: "Needs Improvement",
      grade: "C",
    },
    {
      id: 104,
      name: "Hamza Malik",
      roll: "2024-004",
      exam: "Mid-Term",
      marks: 78,
      total: 100,
      status: "Passed",
      grade: "B+",
    },
  ]);

  // --- SweetAlert Function ---
  const handlePublish = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to publish the results for Class 10-B?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#6a1b9a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Publish it!",
      borderRadius: "20px",
      // --- Z-Index Fix ---
      customClass: {
        container: "my-swal-container",
      },
      didOpen: () => {
        // Direct inject z-index to container
        const container = Swal.getContainer();
        if (container) {
          container.style.zIndex = "9999";
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Publishing...",
          html: "Sending results to students and parents.",
          allowOutsideClick: false,
          customClass: { container: "my-swal-container" },
          didOpen: () => {
            Swal.showLoading();
            Swal.getContainer().style.zIndex = "9999";
          },
        });

        setTimeout(() => {
          Swal.fire({
            title: "Success!",
            text: "Results have been published successfully.",
            icon: "success",
            confirmButtonColor: "#6a1b9a",
            timer: 2500,
            customClass: { container: "my-swal-container" },
            didOpen: () => {
              Swal.getContainer().style.zIndex = "9999";
            },
          });
        }, 1500);
      }
    });
  };

  return (
    <Box sx={{ minHeight: "100vh" }}>
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
            Student Grading
          </Typography>
          <Typography variant="body2" sx={{ color: "#64748b" }}>
            Analyze class performance and manage student results.
          </Typography>
        </Box>

        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            startIcon={<Download size={18} />}
            sx={{
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: 700,
              color: primaryPurple,
              borderColor: primaryPurple,
            }}
          >
            Download CSV
          </Button>
          <Button
            variant="contained"
            disableElevation
            onClick={handlePublish} // Yahan click par SweetAlert chalega
            startIcon={<Save size={20} />}
            sx={{
              bgcolor: primaryPurple,
              borderRadius: "12px",
              px: 3,
              fontWeight: 700,
              textTransform: "none",
              "&:hover": { bgcolor: "#4a148c" },
            }}
          >
            Publish Results
          </Button>
        </Stack>
      </Stack>

      {/* Performance Summary Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={4}>
          <Paper
            elevation={0}
            sx={{ p: 2.5, borderRadius: "20px", border: "1px solid #e2e8f0" }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: "12px",
                  bgcolor: alpha("#10b981", 0.1),
                  color: "#10b981",
                }}
              >
                <TrendingUp size={24} />
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <Typography
                  variant="caption"
                  sx={{ color: "#94a3b8", fontWeight: 700 }}
                >
                  CLASS AVERAGE
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 800 }}>
                  76.4%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={76}
                  sx={{
                    mt: 1,
                    borderRadius: 5,
                    height: 6,
                    bgcolor: "#f1f5f9",
                    "& .MuiLinearProgress-bar": { bgcolor: "#10b981" },
                  }}
                />
              </Box>
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            elevation={0}
            sx={{ p: 2.5, borderRadius: "20px", border: "1px solid #e2e8f0" }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: "12px",
                  bgcolor: alpha(primaryPurple, 0.1),
                  color: primaryPurple,
                }}
              >
                <UserCheck size={24} />
              </Box>
              <Box>
                <Typography
                  variant="caption"
                  sx={{ color: "#94a3b8", fontWeight: 700 }}
                >
                  STUDENTS GRADED
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 800 }}>
                  42 / 45
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "#10b981", fontWeight: 600 }}
                >
                  93% Completed
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            elevation={0}
            sx={{ p: 2.5, borderRadius: "20px", border: "1px solid #e2e8f0" }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: "12px",
                  bgcolor: alpha("#ef4444", 0.1),
                  color: "#ef4444",
                }}
              >
                <AlertCircle size={24} />
              </Box>
              <Box>
                <Typography
                  variant="caption"
                  sx={{ color: "#94a3b8", fontWeight: 700 }}
                >
                  LOW PERFORMANCE
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 800 }}>
                  03 Students
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "#ef4444", fontWeight: 600 }}
                >
                  Requires attention
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      {/* Grading Table */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: "20px",
          border: "1px solid #e2e8f0",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{ p: 2.5, borderBottom: "1px solid #f1f5f9", bgcolor: "white" }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search student or roll no..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search size={16} />
                    </InputAdornment>
                  ),
                }}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
              />
            </Grid>
          </Grid>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>Student Info</StyledTableCell>
                <StyledTableCell>Roll Number</StyledTableCell>
                <StyledTableCell>Exam Type</StyledTableCell>
                <StyledTableCell>Marks</StyledTableCell>
                <StyledTableCell>Grade</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell align="right">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow
                  key={student.id}
                  sx={{ "&:hover": { bgcolor: "#fbfaff" } }}
                >
                  <TableCell>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Avatar
                        sx={{
                          bgcolor: alpha(primaryPurple, 0.1),
                          color: primaryPurple,
                          width: 36,
                          height: 36,
                          fontSize: "0.9rem",
                          fontWeight: 700,
                        }}
                      >
                        {student.name.charAt(0)}
                      </Avatar>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          color: "#1e293b",
                          fontSize: "0.85rem",
                        }}
                      >
                        {student.name}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell sx={{ color: "#64748b", fontWeight: 600 }}>
                    {student.roll}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={student.exam}
                      size="small"
                      variant="outlined"
                      sx={{ fontWeight: 700, fontSize: "0.65rem" }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        fontWeight: 800,
                        color: student.marks < 50 ? "#ef4444" : "#1e293b",
                      }}
                    >
                      {student.marks}{" "}
                      <span style={{ color: "#94a3b8", fontWeight: 400 }}>
                        / {student.total}
                      </span>
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        color: student.grade === "A+" ? "#10b981" : "#1e293b",
                      }}
                    >
                      <Award size={16} />
                      <Typography sx={{ fontWeight: 800 }}>
                        {student.grade}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={student.status}
                      size="small"
                      sx={{
                        fontWeight: 700,
                        fontSize: "0.65rem",
                        bgcolor:
                          student.status === "Passed"
                            ? alpha("#10b981", 0.1)
                            : alpha("#ef4444", 0.1),
                        color:
                          student.status === "Passed" ? "#10b981" : "#ef4444",
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="View Report">
                      <IconButton size="small">
                        <FileText size={16} />
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
    </Box>
  );
};

export default TeacherGrads;
