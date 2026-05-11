import React, { useState } from "react";
import {
  Box,
  Card,
  Grid,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Paper,
  Chip,
  IconButton,
  Select,
  FormControl,
  Pagination,
  Stack,
  MenuItem,
  alpha,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

// Lucide Icons
import {
  Search,
  Plus,
  Download,
  AlertCircle,
  MoreVertical,
  Filter,
  UserCheck,
  Users,
  X,
  User,
  Hash,
  GraduationCap,
  ClipboardCheck,
} from "lucide-react";

// Importing our custom styles
import { StyledTableCell, StyledTableRow } from "../../../components/styles";

const Result = () => {
  const [selectedClass, setSelectedClass] = useState("All");
  const [open, setOpen] = useState(false); // Popup state

  const primaryPurple = "#6a1b9a";

  const students = [
    {
      id: 1,
      name: "Ali Ahmed",
      rollNo: "101",
      class: "10th",
      marks: "850/1100",
      status: "Pass",
      grade: "A",
    },
    {
      id: 2,
      name: "Sara Khan",
      rollNo: "102",
      class: "9th",
      marks: "920/1100",
      status: "Pass",
      grade: "A+",
    },
    {
      id: 3,
      name: "Hamza Malik",
      rollNo: "103",
      class: "10th",
      marks: "320/1100",
      status: "Fail",
      grade: "F",
    },
    {
      id: 4,
      name: "Zoya Sheikh",
      rollNo: "104",
      class: "8th",
      marks: "780/1100",
      status: "Pass",
      grade: "B",
    },
  ];

  // Popup control handlers
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ minHeight: "100vh" }}>
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              color: primaryPurple,
              letterSpacing: "-1px",
            }}
          >
            Results Management
          </Typography>
          <Typography variant="body2" sx={{ color: "#64748b" }}>
            Academic performance tracking and student records.
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            startIcon={<Download size={18} />}
            sx={{
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: 600,
              borderColor: "#e2e8f0",
              color: "#475569",
            }}
          >
            Export
          </Button>
          <Button
            variant="contained"
            onClick={handleOpen} // Open popup here
            startIcon={<Plus size={18} />}
            sx={{
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: 600,
              bgcolor: primaryPurple,
              "&:hover": { bgcolor: "#4a148c" },
            }}
          >
            Add New Result
          </Button>
        </Stack>
      </Box>

      {/* Stats Cards (Same as before) */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          {
            label: "Total Students",
            value: "1,240",
            icon: <Users size={20} />,
            color: primaryPurple,
          },
          {
            label: "Passed",
            value: "1,180",
            icon: <UserCheck size={20} />,
            color: "#059669",
          },
          {
            label: "Failed",
            value: "60",
            icon: <AlertCircle size={20} />,
            color: "#dc2626",
          },
        ].map((stat, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card
              sx={{
                p: 2.5,
                borderRadius: "16px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box
                  sx={{
                    p: 1.5,
                    bgcolor: alpha(stat.color, 0.1),
                    color: stat.color,
                    borderRadius: "12px",
                    display: "flex",
                  }}
                >
                  {stat.icon}
                </Box>
                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 700,
                      color: "#94a3b8",
                      textTransform: "uppercase",
                    }}
                  >
                    {stat.label}
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 800, color: "#1e293b" }}
                  >
                    {stat.value}
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Table Section */}
      <Paper
        sx={{
          borderRadius: "16px",
          border: "1px solid #e2e8f0",
          boxShadow: "none",
          overflow: "hidden",
        }}
      >
        {/* Toolbar code remains same... */}
        <Box
          sx={{
            p: 2.5,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            bgcolor: "#fff",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <TextField
            placeholder="Search students..."
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={18} color="#94a3b8" />
                </InputAdornment>
              ),
            }}
            sx={{
              width: { xs: "100%", md: "300px" },
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                bgcolor: "#f8fafc",
              },
            }}
          />
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Filter size={18} color="#64748b" />
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <Select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                sx={{
                  borderRadius: "10px",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                }}
              >
                <MenuItem value="All">All Classes</MenuItem>
                <MenuItem value="9th">9th Class</MenuItem>
                <MenuItem value="10th">10th Class</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        <TableContainer>
          <Table sx={{ minWidth: 800 }}>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Student Name</StyledTableCell>
                <StyledTableCell>Roll No</StyledTableCell>
                <StyledTableCell>Class</StyledTableCell>
                <StyledTableCell>Marks</StyledTableCell>
                <StyledTableCell>Grade</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <StyledTableRow key={student.id} hover>
                  <StyledTableCell sx={{ fontWeight: 700, color: "#334155" }}>
                    {student.name}
                  </StyledTableCell>
                  <StyledTableCell sx={{ color: "#64748b", fontWeight: 500 }}>
                    {student.rollNo}
                  </StyledTableCell>
                  <StyledTableCell>
                    <Chip
                      label={student.class}
                      size="small"
                      sx={{
                        fontWeight: 700,
                        bgcolor: "#f1f5f9",
                        borderRadius: "6px",
                      }}
                    />
                  </StyledTableCell>
                  <StyledTableCell sx={{ fontWeight: 700 }}>
                    {student.marks}
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{ fontWeight: 800, color: primaryPurple }}
                  >
                    {student.grade}
                  </StyledTableCell>
                  <StyledTableCell>
                    <Chip
                      label={student.status}
                      size="small"
                      sx={{
                        fontWeight: 800,
                        fontSize: "0.7rem",
                        bgcolor:
                          student.status === "Pass" ? "#ecfdf5" : "#fef2f2",
                        color:
                          student.status === "Pass" ? "#059669" : "#dc2626",
                        border: `1px solid ${student.status === "Pass" ? "#d1fae5" : "#fee2e2"}`,
                      }}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <IconButton size="small">
                      <MoreVertical size={18} color="#94a3b8" />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination Section... */}
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #f1f5f9",
            bgcolor: "#fff",
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: "#64748b", fontWeight: 600 }}
          >
            Showing 1-4 of 124
          </Typography>
          <Pagination
            count={10}
            shape="rounded"
            size="small"
            sx={{
              "& .MuiPaginationItem-root": {
                borderRadius: "8px",
                fontWeight: 700,
              },
              "& .Mui-selected": {
                bgcolor: `${primaryPurple} !important`,
                color: "#fff",
              },
            }}
          />
        </Box>
      </Paper>

      {/* --- ADD NEW RESULT POPUP (DIALOG) --- */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: "20px", p: 1 },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pb: 1,
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: 800, color: primaryPurple }}
          >
            Add New Result
          </Typography>
          <IconButton
            onClick={handleClose}
            size="small"
            sx={{ color: "#94a3b8" }}
          >
            <X size={20} />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Typography variant="body2" sx={{ color: "#64748b", mb: 3 }}>
            Enter student performance details to update the record.
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 700, mb: 1, color: "#334155" }}
              >
                Student Name
              </Typography>
              <TextField
                fullWidth
                placeholder="e.g. John Doe"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <User size={18} color="#94a3b8" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    bgcolor: "#f8fafc",
                  },
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 700, mb: 1, color: "#334155" }}
              >
                Roll Number
              </Typography>
              <TextField
                fullWidth
                placeholder="101"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Hash size={18} color="#94a3b8" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    bgcolor: "#f8fafc",
                  },
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 700, mb: 1, color: "#334155" }}
              >
                Class
              </Typography>
              <FormControl fullWidth size="small">
                <Select
                  defaultValue="10th"
                  sx={{ borderRadius: "12px", bgcolor: "#f8fafc" }}
                >
                  <MenuItem value="9th">9th Class</MenuItem>
                  <MenuItem value="10th">10th Class</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 700, mb: 1, color: "#334155" }}
              >
                Obtained Marks
              </Typography>
              <TextField
                fullWidth
                placeholder="850"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ClipboardCheck size={18} color="#94a3b8" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    bgcolor: "#f8fafc",
                  },
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 700, mb: 1, color: "#334155" }}
              >
                Total Marks
              </Typography>
              <TextField
                fullWidth
                placeholder="1100"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    bgcolor: "#f8fafc",
                  },
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button
            onClick={handleClose}
            sx={{ color: "#64748b", fontWeight: 700, textTransform: "none" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleClose}
            sx={{
              bgcolor: primaryPurple,
              borderRadius: "10px",
              px: 4,
              textTransform: "none",
              fontWeight: 700,
              "&:hover": { bgcolor: "#4a148c" },
            }}
          >
            Save Result
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Result;
