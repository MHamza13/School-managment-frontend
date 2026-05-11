import React, { useState } from "react";
import {
  Box, Card, Grid, Typography, Button, TextField, InputAdornment,
  Paper, IconButton, Select, FormControl, MenuItem, alpha,
  Stack, Divider, List, ListItem, ListItemText, ListItemIcon
} from "@mui/material";

// Lucide Icons
import {
  FileText, Download, TrendingUp, Users, 
  DollarSign, PieChart, Calendar, ChevronRight,
  Filter, Printer, Mail, Share2, Info
} from "lucide-react";

// Recharts (For Visual Data)
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area 
} from 'recharts';

const Reports = () => {
  const [reportType, setReportType] = useState("Academic");
  const primaryPurple = "#6a1b9a";

  // Dummy Chart Data
  const monthlyRevenue = [
    { name: 'Jan', amount: 4000 },
    { name: 'Feb', amount: 3000 },
    { name: 'Mar', amount: 5000 },
    { name: 'Apr', amount: 4500 },
    { name: 'May', amount: 6000 },
    { name: 'Jun', amount: 5500 },
  ];

  const reportModules = [
    { id: 1, title: "Student Performance", description: "Grade-wise analysis and pass percentage.", icon: <Users size={20} />, color: primaryPurple },
    { id: 2, title: "Fee Collection", description: "Monthly revenue and outstanding dues.", icon: <DollarSign size={20} />, color: "#059669" },
    { id: 3, title: "Attendance Report", description: "Average daily attendance for staff & students.", icon: <Calendar size={20} />, color: "#0284c7" },
    { id: 4, title: "Transport Usage", description: "Route-wise occupancy and fuel tracking.", icon: <TrendingUp size={20} />, color: "#d97706" },
  ];

  return (
    <Box sx={{ minHeight: "100vh"}}>
      
      {/* Header Section */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4, flexWrap: "wrap", gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: primaryPurple, letterSpacing: "-1px" }}>
            Reports & Analytics
          </Typography>
          <Typography variant="body2" sx={{ color: "#64748b", mt: 0.5 }}>
            Generate, view, and export comprehensive institutional reports.
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            startIcon={<Printer size={18} />}
            sx={{ borderRadius: "12px", textTransform: "none", fontWeight: 600, borderColor: "#e2e8f0", color: "#475569", bgcolor: "#fff" }}
          >
            Print All
          </Button>
          <Button
            variant="contained"
            startIcon={<Download size={18} />}
            sx={{ 
                borderRadius: "12px", textTransform: "none", fontWeight: 600, 
                bgcolor: primaryPurple, "&:hover": { bgcolor: "#4a148c" },
                boxShadow: `0 4px 12px ${alpha(primaryPurple, 0.2)}`
            }}
          >
            Export PDF
          </Button>
        </Stack>
      </Box>

      {/* Main Grid Layout */}
      <Grid container spacing={3}>
        
        {/* Left Column: Report Categories */}
        <Grid item xs={12} lg={4}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: "#1e293b", mb: 2 }}>Select Report Type</Typography>
          <Stack spacing={2}>
            {reportModules.map((module) => (
              <Card 
                key={module.id}
                sx={{ 
                  p: 2, borderRadius: "16px", cursor: "pointer",
                  border: "1px solid #e2e8f0", boxShadow: "none",
                  transition: "0.3s",
                  "&:hover": { borderColor: primaryPurple, bgcolor: alpha(primaryPurple, 0.02) }
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box sx={{ p: 1.5, bgcolor: alpha(module.color, 0.1), color: module.color, borderRadius: "12px" }}>
                    {module.icon}
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#1e293b" }}>{module.title}</Typography>
                    <Typography variant="caption" sx={{ color: "#64748b" }}>{module.description}</Typography>
                  </Box>
                  <ChevronRight size={18} color="#94a3b8" />
                </Box>
              </Card>
            ))}
          </Stack>

          {/* Quick Filters */}
          <Paper sx={{ mt: 3, p: 3, borderRadius: "20px", border: "1px solid #e2e8f0", boxShadow: "none" }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 2, color: primaryPurple }}>Filters</Typography>
            <Stack spacing={2}>
              <FormControl fullWidth size="small">
                <Typography variant="caption" sx={{ fontWeight: 700, mb: 0.5, color: "#64748b" }}>Date Range</Typography>
                <Select defaultValue="this-month" sx={{ borderRadius: "10px" }}>
                  <MenuItem value="this-month">This Month</MenuItem>
                  <MenuItem value="last-quarter">Last Quarter</MenuItem>
                  <MenuItem value="yearly">Yearly</MenuItem>
                </Select>
              </FormControl>
              <Button fullWidth variant="contained" sx={{ bgcolor: "#f1f5f9", color: "#1e293b", fontWeight: 700, borderRadius: "10px", boxShadow: "none", "&:hover": { bgcolor: "#e2e8f0" } }}>
                Apply Filters
              </Button>
            </Stack>
          </Paper>
        </Grid>

        {/* Right Column: Visual Analytics */}
        <Grid item xs={12} lg={8}>
          <Card sx={{ p: 3, borderRadius: "20px", border: "1px solid #e2e8f0", boxShadow: "none", mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, color: "#1e293b" }}>Financial Overview</Typography>
                <Typography variant="caption" sx={{ color: "#94a3b8" }}>Revenue collection trend for 2026</Typography>
              </Box>
              <Box sx={{ p: 1, bgcolor: "#f8fafc", borderRadius: "8px", display: 'flex', gap: 1 }}>
                <TrendingUp size={16} color="#059669" />
                <Typography variant="caption" sx={{ fontWeight: 700, color: "#059669" }}>+12.5% Inc.</Typography>
              </Box>
            </Box>
            
            {/* Chart Area */}
            <Box sx={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <AreaChart data={monthlyRevenue}>
                  <defs>
                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={primaryPurple} stopOpacity={0.1}/>
                      <stop offset="95%" stopColor={primaryPurple} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Area type="monotone" dataKey="amount" stroke={primaryPurple} strokeWidth={3} fillOpacity={1} fill="url(#colorAmount)" />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Card>

          {/* Recent Activity / Detailed Summary Table */}
          <Paper sx={{ borderRadius: "20px", border: "1px solid #e2e8f0", boxShadow: "none", overflow: "hidden" }}>
            <Box sx={{ p: 2.5, display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f1f5f9" }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#1e293b" }}>Recent Generated Reports</Typography>
              <IconButton size="small"><Info size={18} color="#94a3b8" /></IconButton>
            </Box>
            <List disablePadding>
              {[
                { name: "Monthly_Fee_Mar_2026.pdf", size: "1.2 MB", date: "2 mins ago" },
                { name: "Student_Attendance_Record.xlsx", size: "850 KB", date: "1 hour ago" },
                { name: "Transport_Fuel_Summary.pdf", size: "2.4 MB", date: "Yesterday" },
              ].map((report, index) => (
                <ListItem 
                  key={index} 
                  divider={index !== 2}
                  secondaryAction={
                    <Stack direction="row" spacing={1}>
                      <IconButton size="small" sx={{ color: "#64748b" }}><Share2 size={16} /></IconButton>
                      <IconButton size="small" sx={{ color: primaryPurple }}><Download size={16} /></IconButton>
                    </Stack>
                  }
                >
                  <ListItemIcon sx={{ minWidth: 45 }}>
                    <FileText size={22} color={primaryPurple} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={report.name} 
                    secondary={`${report.size} • ${report.date}`}
                    primaryTypographyProps={{ fontWeight: 700, fontSize: "14px", color: "#1e293b" }}
                    secondaryTypographyProps={{ fontSize: "12px" }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

      </Grid>
    </Box>
  );
};

export default Reports;