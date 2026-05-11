import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Chip,
  Tabs,
  Tab,
  Card,
  Stack,
  alpha,
  Avatar,
  IconButton,
  Tooltip,
  Grid, // <--- Ye missing tha, ab add kar diya hai
} from "@mui/material";
import {
  User,
  MapPin,
  Calendar,
  CheckCircle2,
  Clock,
  Bell,
  Info,
} from "lucide-react";

const TeacherTimeTable = () => {
  const primaryPurple = "#6a1b9a";
  const darkPurple = "#4a148c";

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Admin/Teacher ki taraf se aane wala static data
  const initialSchedule = {
    0: [
      {
        id: 1,
        time: "09:00",
        duration: "60",
        subject: "Advanced React",
        teacher: "Dr. Smith",
        room: "Lab 03",
        type: "Lecture",
      },
      {
        id: 2,
        time: "11:30",
        duration: "90",
        subject: "Database Systems",
        teacher: "Prof. Sarah",
        room: "Hall B",
        type: "Practical",
      },
    ],
    1: [
      {
        id: 3,
        time: "10:00",
        duration: "60",
        subject: "UI/UX Design",
        teacher: "Alex Rivera",
        room: "Studio 1",
        type: "Workshop",
      },
    ],
    2: [],
    3: [],
    4: [],
    5: [],
  };

  const [activeTab, setActiveTab] = useState(0);
  const [scheduleData] = useState(initialSchedule);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Current day ke hisab se tab set karna
    const today = new Date().getDay();
    let index = today === 0 ? 0 : today - 1; // 0 for Monday
    if (index > 5) index = 0;
    setActiveTab(index);

    // Live clock update
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Class live hai ya nahi check karne ka logic
  const isClassLive = (classTime, duration) => {
    const [hours, minutes] = classTime.split(":").map(Number);
    const start = new Date();
    start.setHours(hours, minutes, 0);

    const end = new Date(start.getTime() + duration * 60000);
    const now = new Date();

    return now >= start && now <= end;
  };

  return (
    <Box sx={{ maxWidth: "100%" }}>
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{ fontWeight: 900, color: "#1e293b", letterSpacing: "-1px" }}
          >
            Teacher Timetable
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#64748b", fontWeight: 500 }}
          >
            Academic Year 2025-26 •{" "}
            <span style={{ color: primaryPurple }}>Semester 04</span>
          </Typography>
        </Box>

        <Tooltip title="Contact Admins to change schedule">
          <IconButton
            sx={{ bgcolor: alpha(primaryPurple, 0.1), color: primaryPurple }}
          >
            <Info size={20} />
          </IconButton>
        </Tooltip>
      </Stack>

      {/* Banner Card */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: "24px",
          color: "white",
          background: `linear-gradient(135deg, ${primaryPurple} 0%, ${darkPurple} 100%)`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: `0 20px 40px ${alpha(primaryPurple, 0.2)}`,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar
            sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 56, height: 56 }}
          >
            <Calendar size={30} />
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              {days[activeTab]}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              {new Date().toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
              })}
            </Typography>
          </Box>
        </Stack>
        <Typography variant="h5" sx={{ fontWeight: 900, opacity: 0.9 }}>
          {currentTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Typography>
      </Paper>

      {/* Navigation Tabs */}
      <Box sx={{ mb: 4 }}>
        <Tabs
          value={activeTab}
          onChange={(e, v) => setActiveTab(v)}
          variant="scrollable"
          TabIndicatorProps={{
            style: {
              backgroundColor: primaryPurple,
              height: "4px",
              borderRadius: "4px",
            },
          }}
          sx={{
            "& .MuiTab-root": {
              fontWeight: 700,
              textTransform: "none",
              fontSize: "0.95rem",
              color: "#94a3b8",
            },
            "& .Mui-selected": { color: `${primaryPurple} !important` },
          }}
        >
          {days.map((day, i) => (
            <Tab key={i} label={day} />
          ))}
        </Tabs>
      </Box>

      {/* Schedule Timeline */}
      <Box>
        {(scheduleData[activeTab] || []).length > 0 ? (
          <Stack spacing={2.5}>
            {scheduleData[activeTab].map((item) => {
              const live = isClassLive(item.time, item.duration);
              return (
                <Box key={item.id} sx={{ display: "flex", gap: 3 }}>
                  <Box sx={{ minWidth: "70px", textAlign: "right", pt: 1 }}>
                    <Typography
                      sx={{
                        fontWeight: 900,
                        color: live ? primaryPurple : "#1e293b",
                      }}
                    >
                      {item.time}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ fontWeight: 700, color: "#94a3b8" }}
                    >
                      {item.duration}m
                    </Typography>
                  </Box>

                  <Card
                    sx={{
                      flexGrow: 1,
                      p: 2.5,
                      borderRadius: "20px",
                      border: live
                        ? `2px solid ${primaryPurple}`
                        : "1px solid #f1f5f9",
                      boxShadow: live
                        ? `0 10px 20px ${alpha(primaryPurple, 0.1)}`
                        : "none",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {live && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          bottom: 0,
                          width: "4px",
                          bgcolor: primaryPurple,
                        }}
                      />
                    )}

                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="flex-start"
                    >
                      <Box>
                        <Stack
                          direction="row"
                          spacing={1}
                          alignItems="center"
                          mb={1}
                        >
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: 800, color: "#1e293b" }}
                          >
                            {item.subject}
                          </Typography>
                          {live && (
                            <Chip
                              label="LIVE"
                              size="small"
                              color="secondary"
                              sx={{
                                height: 18,
                                fontSize: "0.6rem",
                                fontWeight: 900,
                              }}
                            />
                          )}
                        </Stack>

                        <Grid container spacing={2}>
                          <Grid item>
                            <Stack
                              direction="row"
                              alignItems="center"
                              gap={0.5}
                              color="#64748b"
                            >
                              <User size={14} />
                              <Typography
                                variant="body2"
                                sx={{ fontWeight: 600 }}
                              >
                                {item.teacher}
                              </Typography>
                            </Stack>
                          </Grid>
                          <Grid item>
                            <Stack
                              direction="row"
                              alignItems="center"
                              gap={0.5}
                              color="#64748b"
                            >
                              <MapPin size={14} />
                              <Typography
                                variant="body2"
                                sx={{ fontWeight: 600 }}
                              >
                                {item.room}
                              </Typography>
                            </Stack>
                          </Grid>
                        </Grid>
                      </Box>

                      <IconButton
                        size="small"
                        sx={{ bgcolor: alpha(primaryPurple, 0.05) }}
                      >
                        <Bell size={18} color={primaryPurple} />
                      </IconButton>
                    </Stack>
                  </Card>
                </Box>
              );
            })}
          </Stack>
        ) : (
          <Box
            sx={{
              textAlign: "center",
              py: 10,
              bgcolor: "#f8fafc",
              borderRadius: "32px",
              border: "1px dashed #cbd5e1",
            }}
          >
            <CheckCircle2 size={50} color="#cbd5e1" />
            <Typography
              variant="h6"
              sx={{ mt: 2, fontWeight: 700, color: "#94a3b8" }}
            >
              No Classes Scheduled
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};



export default TeacherTimeTable