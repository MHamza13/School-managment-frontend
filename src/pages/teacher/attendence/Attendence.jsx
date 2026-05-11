import React, { useState } from "react";
import {
  Box, Typography, Grid, Card, Stack, Chip, Button, Paper, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, 
  alpha, styled, Avatar, Modal, Fade, Backdrop
} from "@mui/material";
import {
  Users, Calendar, CheckCircle2, XCircle, Clock, Search, 
  Filter, Save, UserCheck, CheckCircle
} from "lucide-react";

// --- Styled Components (Existing) ---
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: "12px 16px",
  borderBottom: "1px solid #f1f5f9",
  fontSize: "0.875rem",
  "&.MuiTableCell-head": {
    background: `linear-gradient(135deg, #6a1b9a 0%, #6a1b9a 100%)`,
    color: "#ffffff",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    fontSize: "0.8rem",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: alpha("#6a1b9a", 0.04),
  },
}));

const Attendance = () => {
  const primaryPurple = "#6a1b9a";
  
  // States
  const [students, setStudents] = useState([
    { id: "S101", name: "Zaid Khan", rollNo: "2024-001", status: "Present", avatar: "" },
    { id: "S102", name: "Ali Ahmed", rollNo: "2024-002", status: "Absent", avatar: "" },
    { id: "S103", name: "Sara Malik", rollNo: "2024-003", status: "Present", avatar: "" },
    { id: "S104", name: "Osman Sheikh", rollNo: "2024-004", status: "Late", avatar: "" },
    { id: "S105", name: "Ayesha Noor", rollNo: "2024-005", status: "Present", avatar: "" },
  ]);

  const [openSuccess, setOpenSuccess] = useState(false);

  // Status Toggle Function
  const toggleStatus = (id, newStatus) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
  };

  // --- Submit Function ---
  const handleSubmitAttendance = () => {
    // Yahan aap apna API call kar sakte hain backend ke liye
    console.log("Submitting Data:", students);
    
    // Popup show karne ke liye
    setOpenSuccess(true);
  };

  return (
    <Box sx={{ maxWidth: "100%", mx: "auto", minHeight: "100vh" }}>
      
      {/* Header Section */}
      <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems="flex-start" mb={4} spacing={2}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: "#1e293b", letterSpacing: "-1px" }}>
            Student Attendance
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
            <Typography variant="body2" sx={{ color: "#64748b", display: "flex", alignItems: "center", gap: 0.5 }}>
              <Calendar size={16} /> 03 April, 2026
            </Typography>
            <Typography variant="body2" sx={{ color: "#64748b", display: "flex", alignItems: "center", gap: 0.5 }}>
              <Clock size={16} /> Section: A (Morning)
            </Typography>
          </Stack>
        </Box>

        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            startIcon={<Save size={18} />}
            sx={{ borderRadius: "12px", textTransform: "none", fontWeight: 700, borderColor: "#e2e8f0", color: "#64748b" }}
          >
            Save Draft
          </Button>
          <Button
            variant="contained"
            disableElevation
            onClick={handleSubmitAttendance} // Submit Click
            startIcon={<UserCheck size={18} />}
            sx={{ bgcolor: primaryPurple, borderRadius: "12px", px: 3, textTransform: "none", fontWeight: 700, "&:hover": { bgcolor: "#4a148c" } }}
          >
            Submit Attendance
          </Button>
        </Stack>
      </Stack>

      {/* Stats Summary */}
      <Grid container spacing={3} mb={4}>
        {[
          { label: "Total Students", value: "45", icon: <Users size={20} />, color: "#6366f1", bg: "#f5f3ff" },
          { label: "Present Today", value: "38", icon: <CheckCircle2 size={20} />, color: "#10b981", bg: "#f0fdf4" },
          { label: "Absent Today", value: "05", icon: <XCircle size={20} />, color: "#ef4444", bg: "#fef2f2" },
          { label: "Late Arrival", value: "02", icon: <Clock size={20} />, color: "#f59e0b", bg: "#fffbeb" },
        ].map((item, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Card elevation={0} sx={{ p: 2, borderRadius: "16px", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: 2 }}>
              <Box sx={{ p: 1, borderRadius: "12px", bgcolor: item.bg, color: item.color, display: "flex" }}>{item.icon}</Box>
              <Box>
                <Typography variant="caption" sx={{ color: "#94a3b8", fontWeight: 700, textTransform: "uppercase" }}>{item.label}</Typography>
                <Typography variant="h6" sx={{ fontWeight: 800, color: "#1e293b" }}>{item.value}</Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Attendance Table */}
      <Paper elevation={0} sx={{ borderRadius: "20px", border: "1px solid #e2e8f0", overflow: "hidden", bgcolor: "white" }}>
        <Box sx={{ p: 2.5, display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f1f5f9" }}>
          <Stack direction="row" spacing={2}>
             <Button size="small" variant="text" sx={{ color: primaryPurple, fontWeight: 700 }}>BS Computer Science - 4th Sem</Button>
          </Stack>
          <Stack direction="row" spacing={1}>
             <IconButton size="small" sx={{ border: "1px solid #e2e8f0" }}><Search size={18} /></IconButton>
             <IconButton size="small" sx={{ border: "1px solid #e2e8f0" }}><Filter size={18} /></IconButton>
          </Stack>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>ROLL NO</StyledTableCell>
                <StyledTableCell>STUDENT NAME</StyledTableCell>
                <StyledTableCell align="center">ATTENDANCE STATUS</StyledTableCell>
                <StyledTableCell align="right">QUICK ACTIONS</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <StyledTableRow key={student.id}>
                  <StyledTableCell>
                    <Typography sx={{ fontWeight: 700, color: primaryPurple }}>{student.rollNo}</Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar sx={{ width: 35, height: 35, fontSize: "0.9rem", bgcolor: alpha(primaryPurple, 0.1), color: primaryPurple, fontWeight: 700 }}>
                        {student.name.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography sx={{ fontWeight: 700, color: "#1e293b", fontSize: "0.9rem" }}>{student.name}</Typography>
                        <Typography variant="caption" sx={{ color: "#94a3b8" }}>ID: {student.id}</Typography>
                      </Box>
                    </Stack>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      {["Present", "Absent", "Late"].map((st) => (
                        <Chip 
                          key={st}
                          label={st} 
                          onClick={() => toggleStatus(student.id, st)}
                          sx={{ 
                            cursor: "pointer", fontWeight: 700, fontSize: "0.7rem",
                            bgcolor: student.status === st ? (st === "Present" ? "#dcfce7" : st === "Absent" ? "#fee2e2" : "#fffbeb") : "#f1f5f9",
                            color: student.status === st ? (st === "Present" ? "#15803d" : st === "Absent" ? "#b91c1c" : "#d97706") : "#94a3b8",
                            border: student.status === st ? `1px solid currentColor` : "1px solid transparent"
                          }} 
                        />
                      ))}
                    </Stack>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Typography variant="caption" sx={{ fontWeight: 600, color: "#64748b" }}>
                      Last Update: 09:15 AM
                    </Typography>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Success Modal */}
      <Modal
        open={openSuccess}
        onClose={() => setOpenSuccess(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500, sx: { backdropFilter: 'blur(4px)', backgroundColor: 'rgba(0,0,0,0.2)' } }}
      >
        <Fade in={openSuccess}>
          <Box sx={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: 320, bgcolor: 'white', borderRadius: '24px', p: 4, textAlign: 'center', outline: 'none',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            <Box sx={{ display: 'inline-flex', p: 2, borderRadius: '50%', bgcolor: '#f0fdf4', color: '#10b981', mb: 2 }}>
              <CheckCircle size={48} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e293b', mb: 1 }}>
              Submission Successful!
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748b', mb: 3 }}>
              Attendance for BSCS 4th Sem has been successfully recorded in the system.
            </Typography>
            <Button 
              fullWidth variant="contained" 
              onClick={() => setOpenSuccess(false)}
              sx={{ bgcolor: primaryPurple, borderRadius: '12px', py: 1.5, fontWeight: 700, textTransform: 'none', "&:hover": { bgcolor: "#4a148c" } }}
            >
              Back to Dashboard
            </Button>
          </Box>
        </Fade>
      </Modal>

      <Box sx={{ mt: 3, p: 2, bgcolor: alpha(primaryPurple, 0.05), borderRadius: "12px", border: `1px dashed ${primaryPurple}` }}>
          <Typography variant="caption" sx={{ color: primaryPurple, fontWeight: 600 }}>
            * Note: Clicking on the status chips will update the attendance for that student instantly. Don't forget to click "Submit" to finalize the records.
          </Typography>
      </Box>
    </Box>
  );
};

export default Attendance;