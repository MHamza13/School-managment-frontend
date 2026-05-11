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
  Menu,
} from "@mui/material";

// Lucide Icons
import {
  Search,
  Plus,
  Download,
  Filter,
  MoreVertical,
  Wallet,
  Clock,
  CheckCircle,
  CreditCard,
  Receipt,
  X,
  User,
  Hash,
  Banknote,
  Calendar,
  Eye,
  Edit3,
  Trash2,
} from "lucide-react";

// Importing your custom styles
import { StyledTableCell, StyledTableRow } from "../../../components/styles";

const Fees = () => {
  const [statusFilter, setStatusFilter] = useState("All");
  const [open, setOpen] = useState(false); // Modal State
  const [anchorEl, setAnchorEl] = useState(null); // Menu State
  const [selectedRecord, setSelectedRecord] = useState(null);

  const primaryPurple = "#6a1b9a";

  // Menu Handlers
  const handleMenuOpen = (event, record) => {
    setAnchorEl(event.currentTarget);
    setSelectedRecord(record);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRecord(null);
  };

  // Dialog Handlers
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const feeRecords = [
    {
      id: 1,
      name: "Ali Ahmed",
      rollNo: "101",
      amount: "5,000",
      date: "2026-03-25",
      method: "Cash",
      status: "Paid",
    },
    {
      id: 2,
      name: "Sara Khan",
      rollNo: "102",
      amount: "5,000",
      date: "2026-03-28",
      method: "Bank Transfer",
      status: "Paid",
    },
    {
      id: 3,
      name: "Hamza Malik",
      rollNo: "103",
      amount: "5,000",
      date: "-",
      method: "-",
      status: "Pending",
    },
    {
      id: 4,
      name: "Zoya Sheikh",
      rollNo: "104",
      amount: "2,500",
      date: "2026-04-01",
      method: "Online",
      status: "Partial",
    },
  ];

  const stats = [
    {
      label: "Total Revenue",
      value: "RS 450,000",
      icon: <Wallet size={20} />,
      color: primaryPurple,
    },
    {
      label: "Collected",
      value: "RS 380,000",
      icon: <CheckCircle size={20} />,
      color: "#059669",
    },
    {
      label: "Pending",
      value: "RS 70,000",
      icon: <Clock size={20} />,
      color: "#dc2626",
    },
  ];

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
            Fees Management
          </Typography>
          <Typography variant="body2" sx={{ color: "#64748b" }}>
            Track student payments, invoices, and pending dues.
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
            Report
          </Button>
          <Button
            variant="contained"
            onClick={handleOpen}
            startIcon={<Receipt size={18} />}
            sx={{
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: 600,
              bgcolor: primaryPurple,
              "&:hover": { bgcolor: "#4a148c" },
            }}
          >
            Collect Fee
          </Button>
        </Stack>
      </Box>

      {/* Financial Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
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

      {/* Main Table Section */}
      <Paper
        sx={{
          borderRadius: "16px",
          border: "1px solid #e2e8f0",
          boxShadow: "none",
          overflow: "hidden",
        }}
      >
        {/* Filters Toolbar */}
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
            placeholder="Search student..."
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={18} color="#94a3b8" />
                </InputAdornment>
              ),
            }}
            sx={{
              width: { xs: "100%", md: "350px" },
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                bgcolor: "#f8fafc",
              },
            }}
          />
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Filter size={18} color="#64748b" />
            <FormControl size="small" sx={{ minWidth: 160 }}>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                sx={{ borderRadius: "10px", fontWeight: 600 }}
              >
                <MenuItem value="All">All Status</MenuItem>
                <MenuItem value="Paid">Paid</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Partial">Partial</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        <TableContainer>
          <Table sx={{ minWidth: 800 }}>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Student Info</StyledTableCell>
                <StyledTableCell>Amount</StyledTableCell>
                <StyledTableCell>Payment Date</StyledTableCell>
                <StyledTableCell>Method</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {feeRecords.map((fee) => (
                <StyledTableRow key={fee.id} hover>
                  <StyledTableCell>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 700, color: "#1e293b" }}
                    >
                      {fee.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#94a3b8" }}>
                      Roll No: {fee.rollNo}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell sx={{ fontWeight: 700, color: "#334155" }}>
                    RS {fee.amount}
                  </StyledTableCell>
                  <StyledTableCell sx={{ color: "#64748b" }}>
                    {fee.date}
                  </StyledTableCell>
                  <StyledTableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {fee.method !== "-" && (
                        <CreditCard size={14} color="#64748b" />
                      )}
                      <Typography
                        variant="body2"
                        sx={{ color: "#64748b", fontWeight: 500 }}
                      >
                        {fee.method}
                      </Typography>
                    </Stack>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Chip
                      label={fee.status}
                      size="small"
                      sx={{
                        fontWeight: 800,
                        fontSize: "0.7rem",
                        bgcolor:
                          fee.status === "Paid"
                            ? "#ecfdf5"
                            : fee.status === "Partial"
                              ? "#fffbeb"
                              : "#fef2f2",
                        color:
                          fee.status === "Paid"
                            ? "#059669"
                            : fee.status === "Partial"
                              ? "#d97706"
                              : "#dc2626",
                      }}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <IconButton
                      onClick={(e) => handleMenuOpen(e, fee)}
                      size="small"
                    >
                      <MoreVertical size={18} color="#94a3b8" />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination Section (Placeholder) */}
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #f1f5f9",
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: "#64748b", fontWeight: 600 }}
          >
            Viewing 1-4 of 500
          </Typography>
          <Pagination count={5} size="small" shape="rounded" />
        </Box>
      </Paper>

      {/* --- ACTIONS DROPDOWN MENU --- */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            minWidth: 150,
          },
        }}
      >
        <MenuItem
          onClick={handleMenuClose}
          sx={{ gap: 1.5, py: 1, fontSize: "0.875rem", fontWeight: 600 }}
        >
          <Eye size={16} color="#64748b" /> View Receipt
        </MenuItem>
        <MenuItem
          onClick={handleMenuClose}
          sx={{ gap: 1.5, py: 1, fontSize: "0.875rem", fontWeight: 600 }}
        >
          <Edit3 size={16} color="#0284c7" /> Edit Record
        </MenuItem>
        <MenuItem
          onClick={handleMenuClose}
          sx={{
            gap: 1.5,
            py: 1,
            fontSize: "0.875rem",
            fontWeight: 600,
            color: "#dc2626",
          }}
        >
          <Trash2 size={16} color="#dc2626" /> Delete
        </MenuItem>
      </Menu>

      {/* --- COLLECT FEES DIALOG --- */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: "20px" } }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 3,
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: 800, color: primaryPurple }}
          >
            Collect Fee
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <X size={20} />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 3, pt: 0 }}>
          <Grid container spacing={2.5}>
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
                Search Student
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter Student Name or Roll No"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search size={18} />
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
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
                Amount to Pay
              </Typography>
              <TextField
                fullWidth
                placeholder="5000"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Banknote size={18} />
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
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
                Payment Date
              </Typography>
              <TextField
                type="date"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Calendar size={18} />
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

            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
                Payment Method
              </Typography>
              <FormControl fullWidth>
                <Select
                  defaultValue="Cash"
                  sx={{ borderRadius: "12px", bgcolor: "#f8fafc" }}
                >
                  <MenuItem value="Cash">Cash</MenuItem>
                  <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                  <MenuItem value="Online">Online / Card</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={handleClose}
            sx={{ color: "#64748b", fontWeight: 700 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleClose}
            sx={{
              bgcolor: primaryPurple,
              px: 4,
              borderRadius: "10px",
              fontWeight: 700,
            }}
          >
            Generate Receipt
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Fees;
