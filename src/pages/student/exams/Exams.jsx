import React, { useState } from "react";
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
  BookOpen,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Trophy,
  ArrowRight,
  Timer,
} from "lucide-react";

const StudentExams = () => {
  const primaryPurple = "#6a1b9a";
  const darkPurple = "#4a148c";

  // Mock Data
  const upcomingExams = [
    {
      id: 1,
      subject: "Data Structures",
      date: "Oct 15, 2026",
      time: "10:00 AM",
      duration: "2 Hours",
      status: "Upcoming",
    },
    {
      id: 2,
      subject: "Operating Systems",
      date: "Oct 20, 2026",
      time: "02:00 PM",
      duration: "1.5 Hours",
      status: "Upcoming",
    },
  ];

  const pastResults = [
    {
      id: 1,
      subject: "Mathematics",
      date: "Sep 20, 2026",
      score: "85/100",
      status: "Pass",
    },
    {
      id: 2,
      subject: "Physics",
      date: "Sep 15, 2026",
      score: "72/100",
      status: "Pass",
    },
    {
      id: 3,
      subject: "English Literature",
      date: "Sep 10, 2026",
      score: "45/100",
      status: "Pass",
    },
  ];

  return (
    <Box
      sx={{
        maxWidth: "100%",
        mx: "auto",
        minHeight: "100vh",
      }}
    >
      {/* Header Section */}
      <Box mb={4}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 900, color: "#1e293b", letterSpacing: "-1px" }}
        >
          Exams & Assessments
        </Typography>
        <Typography variant="body2" sx={{ color: "#64748b", mt: 0.5 }}>
          Track your academic performance and upcoming schedules.
        </Typography>
      </Box>

      {/* Quick Stats */}
      <Grid container spacing={3} mb={5}>
        {[
          {
            label: "Overall Grade",
            val: "A-",
            icon: <Trophy color="#f59e0b" />,
            bg: "#fffbeb",
          },
          {
            label: "Exams Taken",
            val: "12",
            icon: <CheckCircle2 color="#10b981" />,
            bg: "#ecfdf5",
          },
          {
            label: "Pending Exams",
            val: "03",
            icon: <Clock color="#6366f1" />,
            bg: "#eef2ff",
          },
        ].map((stat, i) => (
          <Grid item xs={12} sm={4} key={i}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: "24px",
                border: "1px solid #e2e8f0",
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Box sx={{ p: 2, borderRadius: "16px", bgcolor: stat.bg }}>
                {stat.icon}
              </Box>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 900 }}>
                  {stat.val}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: "#64748b",
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

      <Grid container spacing={4}>
        {/* Left Side: Upcoming Exams */}
        <Grid item xs={12} lg={7}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              mb: 2,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Timer size={20} color={primaryPurple} /> Upcoming Schedules
          </Typography>

          <Stack spacing={2}>
            {upcomingExams.map((exam) => (
              <Card
                key={exam.id}
                elevation={0}
                sx={{
                  p: 2.5,
                  borderRadius: "20px",
                  border: "1px solid #e2e8f0",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Side Accent */}
                <Box
                  sx={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: "6px",
                    bgcolor: primaryPurple,
                  }}
                />

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  justifyContent="space-between"
                  alignItems={{ sm: "center" }}
                  gap={2}
                >
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                      {exam.subject}
                    </Typography>
                    <Stack direction="row" spacing={2} mt={0.5}>
                      <Stack direction="row" alignItems="center" gap={0.5}>
                        <Calendar size={14} color="#64748b" />
                        <Typography
                          variant="caption"
                          sx={{ color: "#64748b", fontWeight: 600 }}
                        >
                          {exam.date}
                        </Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center" gap={0.5}>
                        <Clock size={14} color="#64748b" />
                        <Typography
                          variant="caption"
                          sx={{ color: "#64748b", fontWeight: 600 }}
                        >
                          {exam.time}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Box>

                  <Button
                    variant="contained"
                    disableElevation
                    sx={{
                      borderRadius: "10px",
                      bgcolor: primaryPurple,
                      textTransform: "none",
                      fontWeight: 700,
                      "&:hover": { bgcolor: darkPurple },
                    }}
                  >
                    View Details
                  </Button>
                </Stack>
              </Card>
            ))}
          </Stack>
        </Grid>

        {/* Right Side: Recent Results Table */}
        <Grid item xs={12} lg={5}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              mb: 2,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <CheckCircle2 size={20} color="#10b981" /> Recent Results
          </Typography>

          <TableContainer
            component={Paper}
            elevation={0}
            sx={{
              borderRadius: "24px",
              border: "1px solid #e2e8f0",
              overflow: "hidden",
            }}
          >
            <Table>
              <TableHead sx={{ bgcolor: "#f1f5f9" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 800, color: "#64748b" }}>
                    Subject
                  </TableCell>
                  <TableCell sx={{ fontWeight: 800, color: "#64748b" }}>
                    Score
                  </TableCell>
                  <TableCell sx={{ fontWeight: 800, color: "#64748b" }}>
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pastResults.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell sx={{ fontWeight: 700 }}>
                      {row.subject}
                    </TableCell>
                    <TableCell sx={{ fontWeight: 800, color: primaryPurple }}>
                      {row.score}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={row.status}
                        size="small"
                        sx={{
                          fontWeight: 800,
                          bgcolor: "#ecfdf5",
                          color: "#10b981",
                          borderRadius: "6px",
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Performance Summary Card */}
          <Card
            elevation={0}
            sx={{
              mt: 3,
              p: 3,
              borderRadius: "24px",
              bgcolor: darkPurple,
              color: "white",
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1 }}>
              Performance Level
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8, mb: 2 }}>
              You are doing better than 85% of your classmates!
            </Typography>
            <LinearProgress
              variant="determinate"
              value={85}
              sx={{
                height: 10,
                borderRadius: 5,
                bgcolor: alpha("#fff", 0.2),
                "& .MuiLinearProgress-bar": { bgcolor: "#10b981" },
              }}
            />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StudentExams;
