import React from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../../utils/Urls"; 
import {
  Box,
  Typography,
  Grid,
  Card,
  Stack,
  Chip,
  Button,
  alpha,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  Avatar,
} from "@mui/material";
import {
  Download,
  Award,
  TrendingUp,
  CheckCircle2,
  Printer,
  UserCheck,
  GraduationCap,
} from "lucide-react";

const StudentResult = () => {
  const primaryPurple = "#6a1b9a";
  const darkPurple = "#4a148c";

  // --- REDUX STATE SE DATA NIKALNA ---
  const { currentUser } = useSelector((state) => state.user);

  // School Data Logic (Same as your CommonDashboard)
  const schoolData = currentUser?.school || currentUser;
  const rawLogo = schoolData?.schoolLogo;
  const schoolName = schoolData?.schoolName || "School Panel";

  const schoolLogo = rawLogo
    ? rawLogo.startsWith("http")
      ? rawLogo
      : `${BASE_URL}/${rawLogo.replace(/\\/g, "/")}`
    : "";

  // Student Info from Redux
  const studentInfo = {
    name: currentUser?.name || "Student Name",
    rollNo: currentUser?.rollNum || "N/A", // Assume rollNum exists in your user object
    class: currentUser?.sclassName?.sclassName || "Not Assigned", // Adjusted for typical MERN schema
    attendance: "94%", // Ye usually backend se alag se aata hai, filhal static rakha hai
  };

  // Mock Result Data (Ye ideally API se aana chahiye)
  const resultData = [
    {
      id: 1,
      subject: "Mathematics",
      theory: 75,
      practical: 25,
      obtained: 92,
      total: 100,
      grade: "A+",
      remark: "Outstanding",
    },
    {
      id: 2,
      subject: "Physics",
      theory: 60,
      practical: 20,
      obtained: 80,
      total: 100,
      grade: "A",
      remark: "Very Good",
    },
    {
      id: 3,
      subject: "Chemistry",
      theory: 55,
      practical: 22,
      obtained: 77,
      total: 100,
      grade: "B+",
      remark: "Good",
    },
    {
      id: 4,
      subject: "Computer Science",
      theory: 72,
      practical: 24,
      obtained: 96,
      total: 100,
      grade: "A+",
      remark: "Excellent",
    },
    {
      id: 5,
      subject: "English Language",
      theory: 88,
      practical: 0,
      obtained: 88,
      total: 100,
      grade: "A",
      remark: "Fluent",
    },
  ];

  const totalMarks = resultData.length * 100;
  const totalObtained = resultData.reduce(
    (acc, curr) => acc + curr.obtained,
    0,
  );
  const percentage = ((totalObtained / totalMarks) * 100).toFixed(1);

  return (
    <Box
      sx={{
        maxWidth: "100%",
        mx: "auto",
      }}
    >
      {/* Dynamic Header with School Branding */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems="center"
        mb={4}
        gap={3}
      >
        <Box>
          <Stack direction="row" spacing={2} alignItems="center">
            
            <Box>
              <Typography
                variant="h4"
                sx={{ fontWeight: 900, color: "#1e293b" }}
              >
                Result Report
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: primaryPurple, fontWeight: 700 }}
              >
                {schoolName}
              </Typography>
            </Box>
          </Stack>
        </Box>

        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            startIcon={<Printer size={18} />}
            sx={{ borderRadius: "10px", textTransform: "none" }}
          >
            Print
          </Button>
          <Button
            variant="contained"
            disableElevation
            startIcon={<Download size={18} />}
            sx={{ borderRadius: "10px", bgcolor: primaryPurple }}
          >
            Save PDF
          </Button>
        </Stack>
      </Stack>

      {/* Dynamic Student Info Card */}
      <Paper
        elevation={0}
        sx={{ p: 3, mb: 4, borderRadius: "20px", border: "1px solid #e2e8f0" }}
      >
        <Grid container spacing={3}>
          {[
            { label: "Student Name", value: studentInfo.name },
            { label: "Roll Number", value: studentInfo.rollNo },
            { label: "Current Class", value: studentInfo.class },
            {
              label: "Attendance",
              value: studentInfo.attendance,
              icon: <UserCheck size={16} color="#10b981" />,
            },
          ].map((item, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <Typography
                variant="caption"
                sx={{
                  color: "#94a3b8",
                  fontWeight: 800,
                  textTransform: "uppercase",
                }}
              >
                {item.label}
              </Typography>
              <Stack direction="row" alignItems="center" gap={1}>
                <Typography variant="body1" sx={{ fontWeight: 700 }}>
                  {item.value}
                </Typography>
                {item.icon}
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Analytics Summary */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={4}>
          <Card
            elevation={0}
            sx={{
              p: 3,
              borderRadius: "20px",
              bgcolor: darkPurple,
              color: "white",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box sx={{ position: "relative", zIndex: 2 }}>
              <Typography variant="h6" sx={{ opacity: 0.8 }}>
                Final Grade
              </Typography>
              <Typography variant="h2" sx={{ fontWeight: 900 }}>
                A+
              </Typography>
              <Typography variant="body2">
                Performance: <span style={{ fontWeight: 800 }}>Excellent</span>
              </Typography>
            </Box>
            <Award
              size={100}
              style={{
                position: "absolute",
                right: -10,
                bottom: -10,
                opacity: 0.1,
              }}
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper
            elevation={0}
            sx={{ p: 3, borderRadius: "20px", border: "1px solid #e2e8f0" }}
          >
            <Stack direction="row" justifyContent="space-between" mb={2}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <TrendingUp size={20} color={primaryPurple} /> Progress Bar
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: 900, color: "#10b981" }}
              >
                {percentage}%
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={parseFloat(percentage)}
              sx={{
                height: 12,
                borderRadius: 6,
                bgcolor: "#f1f5f9",
                "& .MuiLinearProgress-bar": { bgcolor: "#10b981" },
              }}
            />
            <Grid container spacing={2} mt={2}>
              <Grid item xs={6}>
                <Typography variant="caption">
                  Total Marks: <b>{totalMarks}</b>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption">
                  Obtained: <b>{totalObtained}</b>
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* Result Table */}
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{ borderRadius: "20px", border: "1px solid #e2e8f0" }}
      >
        <Table>
          <TableHead sx={{ bgcolor: "#f8fafc" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 800 }}>Subject</TableCell>
              <TableCell align="center" sx={{ fontWeight: 800 }}>
                Theory
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 800 }}>
                Practical
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 800 }}>
                Obtained
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 800 }}>
                Grade
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resultData.map((row) => (
              <TableRow key={row.id}>
                <TableCell sx={{ fontWeight: 700 }}>{row.subject}</TableCell>
                <TableCell align="center">{row.theory || "-"}</TableCell>
                <TableCell align="center">{row.practical || "-"}</TableCell>
                <TableCell align="center" sx={{ fontWeight: 800 }}>
                  {row.obtained}
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={row.grade}
                    size="small"
                    color={row.grade.startsWith("A") ? "success" : "warning"}
                    sx={{ fontWeight: 700 }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dynamic Note */}
      <Box
        sx={{
          mt: 3,
          p: 2,
          bgcolor: alpha(primaryPurple, 0.05),
          borderRadius: "12px",
          borderLeft: `4px solid ${primaryPurple}`,
        }}
      >
        <Typography variant="body2" color="textSecondary">
          <b>Note:</b> This result is issued by the <b>{schoolName}</b>{" "}
          examination department.
        </Typography>
      </Box>
    </Box>
  );
};

export default StudentResult;
