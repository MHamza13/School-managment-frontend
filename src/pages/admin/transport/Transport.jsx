import React, { useState } from "react";
import {
  Box, Card, Grid, Typography, Button, TextField, InputAdornment,
  Table, TableBody, TableContainer, TableHead, Paper, Chip,
  IconButton, Select, FormControl, Pagination, Stack, MenuItem, alpha,
  Dialog, DialogTitle, DialogContent, DialogActions, Menu
} from "@mui/material";

// Lucide Icons
import {
  Search, Plus, Bus, MapPin, MoreVertical, AlertTriangle, 
  Phone, X, Edit3, Trash2, ShieldCheck, Map, ChevronRight
} from "lucide-react";

// Importing your custom styles
import { StyledTableCell, StyledTableRow } from "../../../components/styles";

const Transport = () => {
  const [routeFilter, setRouteFilter] = useState("All");
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const primaryPurple = "#6a1b9a";

  // Handlers
  const handleMenuOpen = (event, vehicle) => {
    setAnchorEl(event.currentTarget);
    setSelectedVehicle(vehicle);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedVehicle(null);
  };

  const vehicles = [
    { id: 1, busNo: "B-202", driver: "Arshad Khan", contact: "0300-1234567", route: "Route 01 (City Center)", status: "Active", capacity: "60" },
    { id: 2, busNo: "B-205", driver: "Sajid Mehmood", contact: "0311-7654321", route: "Route 03 (DHA Phase 5)", status: "Maintenance", capacity: "52" },
    { id: 3, busNo: "B-108", driver: "Bilal Ahmad", contact: "0322-9876543", route: "Route 02 (Model Town)", status: "Active", capacity: "40" },
    { id: 4, busNo: "B-310", driver: "Imran Ali", contact: "0345-1122334", route: "Route 05 (Gulberg)", status: "Offline", capacity: "30" },
  ];

  const stats = [
    { label: "Total Vehicles", value: "24", icon: <Bus size={20} />, color: primaryPurple },
    { label: "Active Routes", value: "12", icon: <Map size={20} />, color: "#0284c7" },
    { label: "Maintenance", value: "02", icon: <AlertTriangle size={20} />, color: "#dc2626" },
  ];

  return (
    <Box sx={{ minHeight: "100vh" }}>
      
      {/* Header Section */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4, flexWrap: "wrap", gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: primaryPurple, letterSpacing: "-1px" }}>
            Transport Management
          </Typography>
          <Typography variant="body2" sx={{ color: "#64748b", mt: 0.5 }}>
            Monitor bus routes, driver assignments, and vehicle status.
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            startIcon={<MapPin size={18} />}
            sx={{ borderRadius: "12px", textTransform: "none", fontWeight: 600, borderColor: "#e2e8f0", color: "#475569", bgcolor: "#fff" }}
          >
            Manage Routes
          </Button>
          <Button
            variant="contained"
            onClick={() => setOpen(true)}
            startIcon={<Plus size={18} />}
            sx={{ borderRadius: "12px", textTransform: "none", fontWeight: 600, bgcolor: primaryPurple, "&:hover": { bgcolor: "#4a148c" }, boxShadow: `0 4px 12px ${alpha(primaryPurple, 0.2)}` }}
          >
            Add New Vehicle
          </Button>
        </Stack>
      </Box>

      {/* Transport Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card sx={{ p: 2.5, borderRadius: "20px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.02), 0 2px 4px -1px rgba(0,0,0,0.01)" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box sx={{ p: 1.7, bgcolor: alpha(stat.color, 0.1), color: stat.color, borderRadius: "14px", display: "flex" }}>
                  {stat.icon}
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px" }}>{stat.label}</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: "#1e293b" }}>{stat.value}</Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Main Transport Table Section */}
      <Paper sx={{ borderRadius: "20px", border: "1px solid #e2e8f0", boxShadow: "none", overflow: "hidden", bgcolor: "#fff" }}>
        
        {/* Toolbar */}
        <Box sx={{ p: 2.5, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
          <TextField
            placeholder="Search by Bus No or Driver..."
            size="small"
            InputProps={{ 
              startAdornment: <InputAdornment position="start"><Search size={18} color="#94a3b8" /></InputAdornment> 
            }}
            sx={{ width: { xs: "100%", md: "380px" }, "& .MuiOutlinedInput-root": { borderRadius: "12px", bgcolor: "#f8fafc" } }}
          />
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <FormControl size="small" sx={{ minWidth: 160 }}>
              <Select 
                value={routeFilter} 
                onChange={(e) => setRouteFilter(e.target.value)} 
                sx={{ borderRadius: "12px", fontWeight: 600, bgcolor: "#f8fafc" }}
              >
                <MenuItem value="All">All Routes</MenuItem>
                <MenuItem value="Route 01">Route 01</MenuItem>
                <MenuItem value="Route 02">Route 02</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        <TableContainer>
          <Table sx={{ minWidth: 900 }}>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Vehicle Info</StyledTableCell>
                <StyledTableCell>Driver Details</StyledTableCell>
                <StyledTableCell>Assigned Route</StyledTableCell>
                <StyledTableCell>Capacity</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {vehicles.map((v) => (
                <StyledTableRow key={v.id} hover>
                  <StyledTableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Box sx={{ p: 1, bgcolor: alpha(primaryPurple, 0.08), borderRadius: "10px", color: primaryPurple }}><Bus size={18} /></Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#1e293b" }}>{v.busNo}</Typography>
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#1e293b" }}>{v.driver}</Typography>
                    <Typography variant="caption" sx={{ color: "#94a3b8", display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Phone size={12}/> {v.contact}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: "#475569", fontWeight: 600 }}>
                      <MapPin size={16} color="#94a3b8"/> {v.route}
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell sx={{ fontWeight: 700, color: "#64748b" }}>{v.capacity} Seats</StyledTableCell>
                  <StyledTableCell>
                    <Chip 
                      label={v.status} 
                      size="small" 
                      sx={{ 
                        fontWeight: 800, fontSize: "0.7rem",
                        bgcolor: v.status === "Active" ? "#ecfdf5" : v.status === "Maintenance" ? "#fffbeb" : "#fef2f2",
                        color: v.status === "Active" ? "#059669" : v.status === "Maintenance" ? "#d97706" : "#dc2626",
                        border: "1px solid",
                        borderColor: "inherit"
                      }} 
                    />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <IconButton onClick={(e) => handleMenuOpen(e, v)} size="small" sx={{ color: "#94a3b8" }}>
                      <MoreVertical size={18} />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Footer with Pagination on Right Side */}
        <Box sx={{ 
          p: 2.5, 
          borderTop: "1px solid #f1f5f9", 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          bgcolor: "#fff"
        }}>
          <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 600 }}>
            Showing 1-4 of 24 Vehicles
          </Typography>
          <Pagination 
            count={3} 
            shape="rounded" 
            size="medium"
            sx={{
              "& .Mui-selected": {
                bgcolor: `${primaryPurple} !important`,
                color: "#fff",
              },
              "& .MuiPaginationItem-root": {
                fontWeight: 700,
                borderRadius: "8px"
              }
            }}
          />
        </Box>
      </Paper>

      {/* --- ACTIONS MENU --- */}
      <Menu 
        anchorEl={anchorEl} 
        open={Boolean(anchorEl)} 
        onClose={handleMenuClose}
        PaperProps={{
          sx: { borderRadius: "12px", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)", minWidth: 160 }
        }}
      >
        <MenuItem sx={{ gap: 1.5, fontWeight: 600, fontSize: '14px', py: 1.2 }} onClick={handleMenuClose}>
          <ShieldCheck size={16} color="#059669"/> View Fitness
        </MenuItem>
        <MenuItem sx={{ gap: 1.5, fontWeight: 600, fontSize: '14px', py: 1.2 }} onClick={handleMenuClose}>
          <Edit3 size={16} color="#0284c7"/> Edit Details
        </MenuItem>
        <MenuItem sx={{ gap: 1.5, fontWeight: 600, fontSize: '14px', py: 1.2, color: '#dc2626' }} onClick={handleMenuClose}>
          <Trash2 size={16}/> Delete Vehicle
        </MenuItem>
      </Menu>

      {/* --- ADD VEHICLE DIALOG --- */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: "24px" } }}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 3, pb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, color: primaryPurple }}>Add New Vehicle</Typography>
          <IconButton onClick={() => setOpen(false)} sx={{ bgcolor: "#f8fafc" }}><X size={20} /></IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 3, pt: 1 }}>
          <Grid container spacing={2.5}>
            <Grid item xs={6}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: "#475569" }}>Bus Number / Plate</Typography>
              <TextField fullWidth placeholder="e.g. LES-1234" sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px", bgcolor: "#f8fafc" } }} />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: "#475569" }}>Seating Capacity</Typography>
              <TextField fullWidth placeholder="e.g. 60" sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px", bgcolor: "#f8fafc" } }} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: "#475569" }}>Driver Name</Typography>
              <TextField fullWidth placeholder="Enter Driver Name" sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px", bgcolor: "#f8fafc" } }} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: "#475569" }}>Assigned Route</Typography>
              <FormControl fullWidth size="small">
                <Select defaultValue="Route 01" sx={{ borderRadius: "12px", bgcolor: "#f8fafc" }}>
                  <MenuItem value="Route 01">Route 01 (City Center)</MenuItem>
                  <MenuItem value="Route 02">Route 02 (Model Town)</MenuItem>
                  <MenuItem value="Route 03">Route 03 (DHA Phase 5)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button onClick={() => setOpen(false)} sx={{ fontWeight: 700, color: "#64748b", textTransform: 'none' }}>Cancel</Button>
          <Button 
            variant="contained" 
            sx={{ bgcolor: primaryPurple, borderRadius: "12px", px: 4, py: 1, fontWeight: 700, textTransform: 'none', "&:hover": { bgcolor: "#4a148c" } }}
          >
            Save Vehicle
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Transport;