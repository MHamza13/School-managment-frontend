import React, { useState } from "react";
import {
  Box, Typography, Grid, Card, Stack, Chip, Button, LinearProgress,
  InputAdornment, TextField, Tabs, Tab, alpha, Paper, Dialog,
  DialogTitle, DialogContent, DialogActions, IconButton, List, ListItem,
  ListItemIcon, ListItemText
} from "@mui/material";
import {
  Search, FileText, Clock, CheckCircle2, AlertCircle, Calendar,
  ArrowRight, X, Check, Circle
} from "lucide-react";

const Assignments = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  
  // State for Modal
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const primaryPurple = "#6a1b9a";
  const darkPurple = "#4a148c";

  // Mock Data with Task Lists
  const assignmentsData = [
    {
      id: 1,
      title: "React Hooks Deep Dive",
      subject: "Advanced Web Dev",
      dueDate: "2026-04-10",
      status: "Pending",
      marks: "100",
      progress: 60,
      tasks: [
        { id: 1, label: "Setup Basic Project Structure", completed: true },
        { id: 2, label: "Implement useState & useEffect", completed: true },
        { id: 3, label: "Create Custom useFetch Hook", completed: true },
        { id: 4, label: "Add Form Validation", completed: false },
        { id: 5, label: "Final Deployment on Vercel", completed: false },
      ]
    },
    {
      id: 2,
      title: "Database Normalization Quiz",
      subject: "Database Systems",
      dueDate: "2026-04-05",
      status: "Submitted",
      marks: "50",
      progress: 100,
      tasks: [
        { id: 1, label: "Understand 1NF, 2NF, 3NF", completed: true },
        { id: 2, label: "Draft ER Diagram", completed: true },
        { id: 3, label: "Submit Final Document", completed: true },
      ]
    },
    {
      id: 3,
      title: "UI/UX Case Study",
      subject: "Design Thinking",
      dueDate: "2026-03-28",
      status: "Overdue",
      marks: "80",
      progress: 20,
      tasks: [
        { id: 1, label: "User Persona Research", completed: true },
        { id: 2, label: "Wireframing", completed: false },
        { id: 3, label: "Prototyping", completed: false },
      ]
    },
  ];

  const handleOpen = (task) => {
    setSelectedTask(task);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTask(null);
  };

  const filteredAssignments = assignmentsData.filter((item) => {
    const matchesTab =
      tabValue === 0 ||
      (tabValue === 1 && item.status !== "Submitted") ||
      (tabValue === 2 && item.status === "Submitted");

    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Submitted": return "#10b981";
      case "Overdue": return "#ef4444";
      case "Pending": return "#f59e0b";
      default: return "#64748b";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Submitted": return <CheckCircle2 size={16} />;
      case "Overdue": return <AlertCircle size={16} />;
      case "Pending": return <Clock size={16} />;
      default: return <FileText size={16} />;
    }
  };

  return (
    <Box sx={{ maxWidth: "100%", mx: "auto", minHeight: "100vh" }}>
      
      {/* Header Section */}
      <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems="center" mb={4} gap={2}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 900, color: "#1e293b", letterSpacing: "-1px" }}>
            My Assignments
          </Typography>
          <Typography variant="body2" sx={{ color: "#64748b", mt: 0.5 }}>
            Academic Session 2025-26
          </Typography>
        </Box>

        <TextField
          placeholder="Search by title..."
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={18} color="#94a3b8" />
              </InputAdornment>
            ),
          }}
          sx={{ width: { xs: "100%", sm: "300px" }, "& .MuiOutlinedInput-root": { borderRadius: "12px", bgcolor: "white" } }}
        />
      </Stack>

      {/* Tabs */}
      <Tabs 
        value={tabValue} 
        onChange={(e, v) => setTabValue(v)}
        sx={{ 
          mb: 3, 
          borderBottom: "1px solid #e2e8f0",
          "& .MuiTab-root": { textTransform: "none", fontWeight: 700, fontSize: "1rem" },
          "& .Mui-selected": { color: `${primaryPurple} !important` },
          "& .MuiTabs-indicator": { bgcolor: primaryPurple, height: 3 }
        }}
      >
        <Tab label="All Tasks" />
        <Tab label="In Progress" />
        <Tab label="Completed" />
      </Tabs>

      {/* Assignments Grid */}
      <Grid container spacing={3}>
        {filteredAssignments.map((task) => (
          <Grid item xs={12} md={6} key={task.id}>
            <Card 
              elevation={0} 
              sx={{ 
                p: 3, borderRadius: "24px", border: "1px solid #e2e8f0",
                "&:hover": { boxShadow: "0 10px 30px rgba(0,0,0,0.04)" }
              }}
            >
              <Stack direction="row" justifyContent="space-between" mb={2}>
                <Box>
                  <Chip 
                    label={task.subject} size="small" 
                    sx={{ fontWeight: 700, bgcolor: alpha(primaryPurple, 0.1), color: primaryPurple, mb: 1 }} 
                  />
                  <Typography variant="h6" sx={{ fontWeight: 800, color: "#1e293b" }}>{task.title}</Typography>
                </Box>
                <Chip 
                  icon={getStatusIcon(task.status)} label={task.status} 
                  sx={{ 
                    fontWeight: 800, bgcolor: alpha(getStatusColor(task.status), 0.1), color: getStatusColor(task.status),
                  }} 
                />
              </Stack>

              <Box sx={{ mb: 3 }}>
                <Stack direction="row" justifyContent="space-between" mb={1}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: "#94a3b8" }}>Current Progress</Typography>
                  <Typography variant="caption" sx={{ fontWeight: 700 }}>{task.progress}%</Typography>
                </Stack>
                <LinearProgress 
                  variant="determinate" value={task.progress} 
                  sx={{ height: 8, borderRadius: 4, bgcolor: "#f1f5f9", "& .MuiLinearProgress-bar": { bgcolor: getStatusColor(task.status) } }} 
                />
              </Box>

              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" spacing={2}>
                  <Stack direction="row" alignItems="center" gap={0.5}>
                    <Calendar size={14} color="#64748b" />
                    <Typography variant="caption" sx={{ fontWeight: 600, color: "#64748b" }}>{task.dueDate}</Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" gap={0.5}>
                    <FileText size={14} color="#64748b" />
                    <Typography variant="caption" sx={{ fontWeight: 600, color: "#64748b" }}>{task.marks} pts</Typography>
                  </Stack>
                </Stack>
                
                <Button 
                  variant="contained" disableElevation size="small"
                  onClick={() => handleOpen(task)}
                  endIcon={<ArrowRight size={16} />}
                  sx={{ 
                    borderRadius: "10px", textTransform: "none", fontWeight: 700,
                    bgcolor: task.status === "Submitted" ? "#f1f5f9" : primaryPurple,
                    color: task.status === "Submitted" ? "#94a3b8" : "white",
                    "&:hover": { bgcolor: task.status === "Submitted" ? "#f1f5f9" : darkPurple }
                  }}
                >
                  {task.status === "Submitted" ? "Details" : "Open"}
                </Button>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* --- POPUP MODAL --- */}
      <Dialog 
        open={open} onClose={handleClose} fullWidth maxWidth="sm"
        PaperProps={{ sx: { borderRadius: "24px", p: 1 } }}
      >
        {selectedTask && (
          <>
            <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h6" sx={{ fontWeight: 900 }}>Project Roadmap</Typography>
              <IconButton onClick={handleClose}><X size={20} /></IconButton>
            </DialogTitle>

            <DialogContent dividers>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 900, color: primaryPurple }}>{selectedTask.title}</Typography>
                <Typography variant="body2" color="textSecondary">{selectedTask.subject}</Typography>
              </Box>

              <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1, color: "#64748b" }}>TASKS & MILESTONES</Typography>
              
              <List sx={{ bgcolor: "#f8fafc", borderRadius: "16px" }}>
                {selectedTask.tasks.map((t) => (
                  <ListItem key={t.id} sx={{ py: 1 }}>
                    <ListItemIcon sx={{ minWidth: 35 }}>
                      {t.completed ? <Check size={20} color="#10b981" strokeWidth={3} /> : <Circle size={18} color="#cbd5e1" />}
                    </ListItemIcon>
                    <ListItemText 
                      primary={t.label} 
                      primaryTypographyProps={{ 
                        fontWeight: 600, 
                        color: t.completed ? "#94a3b8" : "#1e293b",
                        sx: { textDecoration: t.completed ? "line-through" : "none" }
                      }} 
                    />
                    {t.completed && <Chip label="Done" size="small" sx={{ height: 20, bgcolor: "#dcfce7", color: "#166534", fontWeight: 700, fontSize: "0.65rem" }} />}
                  </ListItem>
                ))}
              </List>
            </DialogContent>

            <DialogActions sx={{ p: 3 }}>
              <Button 
                fullWidth variant="contained" disableElevation
                sx={{ borderRadius: "12px", bgcolor: primaryPurple, py: 1.2, fontWeight: 700, textTransform: "none", "&:hover": { bgcolor: darkPurple } }}
              >
                {selectedTask.status === "Submitted" ? "Review Project" : "Continue Project"}
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default Assignments;