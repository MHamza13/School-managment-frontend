import React, { useState } from "react";
import {
  Box, Typography, Grid, Card, Stack, Chip, Button, Paper, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, 
  alpha, Tooltip, styled,
} from "@mui/material";
import {
  Receipt, Calendar, CheckCircle2, AlertCircle, Download,
  CreditCard, History, ChevronLeft, ChevronRight,
} from "lucide-react";

// --- Custom Styled Components for Library-Style Header ---
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: "16px",
  borderBottom: "1px solid #f1f5f9",
  fontSize: "0.875rem",
  // Header Styling to match Library System
  "&.MuiTableCell-head": {
    background: `linear-gradient(135deg, #6a1b9a 0%, #6a1b9a 100%)`, // Library-style gradient
    color: "#ffffff",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    fontSize: "0.8rem",
    border: "none",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: alpha("#6a1b9a", 0.04), // Subtle purple hover
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StudentFees = () => {
  const primaryPurple = "#6a1b9a";
  const [selectedYear, setSelectedYear] = useState(2026);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const feeSummary = {
    totalYearly: 120000,
    paidSoFar: 25000,
    balance: 95000,
  };

  const monthlyRecords = months.map((month, index) => {
    let status = "Upcoming";
    if (index < 3) status = "Paid";
    else if (index === 3) status = "Pending";

    return {
      id: index + 1,
      month: month,
      date: status === "Paid" ? `05 ${month.substring(0, 3)} ${selectedYear}` : "---",
      amount: 10000,
      status: status,
      method: status === "Paid" ? "Online" : "---",
    };
  });

  return (
    <Box sx={{ maxWidth: "100%", mx: "auto", minHeight: "100vh" }}>
      
      {/* Header & Year Switcher */}
      <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems="center" mb={4} spacing={2}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: "#1e293b", letterSpacing: "-1px" }}>
            Fee Ledger
          </Typography>
          <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 500 }}>
            Track your academic installments and financial history for <b>{selectedYear}</b>
          </Typography>
        </Box>

        <Stack direction="row" spacing={2}>
          <Paper 
            elevation={0} 
            sx={{ 
              display: "flex", alignItems: "center", borderRadius: "12px", 
              border: "1px solid #e2e8f0", bgcolor: "white", p: 0.5 
            }}
          >
            <IconButton size="small" onClick={() => setSelectedYear((p) => p - 1)}>
              <ChevronLeft size={18} color="#64748b" />
            </IconButton>
            <Typography sx={{ fontWeight: 700, px: 2, color: "#1e293b", minWidth: "60px", textAlign: "center" }}>
              {selectedYear}
            </Typography>
            <IconButton size="small" onClick={() => setSelectedYear((p) => p + 1)}>
              <ChevronRight size={18} color="#64748b" />
            </IconButton>
          </Paper>
          <Button
            variant="contained"
            disableElevation
            startIcon={<CreditCard size={18} />}
            sx={{
              bgcolor: primaryPurple,
              borderRadius: "12px",
              px: 3,
              textTransform: "none",
              fontWeight: 700,
              "&:hover": { bgcolor: "#4a148c" },
            }}
          >
            Pay Full Year
          </Button>
        </Stack>
      </Stack>

      {/* Stats Section */}
      <Grid container spacing={3} mb={5}>
        {[
          { label: "Total Payable", value: `PKR ${feeSummary.totalYearly.toLocaleString()}`, icon: <Receipt size={20} />, color: primaryPurple, bg: alpha(primaryPurple, 0.1) },
          { label: "Total Paid", value: `PKR ${feeSummary.paidSoFar.toLocaleString()}`, icon: <CheckCircle2 size={20} />, color: "#10b981", bg: "#f0fdf4" },
          { label: "Remaining", value: `PKR ${feeSummary.balance.toLocaleString()}`, icon: <AlertCircle size={20} />, color: "#f59e0b", bg: "#fffbeb" },
        ].map((item, i) => (
          <Grid item xs={12} sm={4} key={i}>
            <Card elevation={0} sx={{ p: 2.5, borderRadius: "20px", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: 2, bgcolor: "white" }}>
              <Box sx={{ p: 1.5, borderRadius: "14px", bgcolor: item.bg, color: item.color, display: "flex" }}>{item.icon}</Box>
              <Box>
                <Typography variant="caption" sx={{ color: "#94a3b8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>{item.label}</Typography>
                <Typography variant="h5" sx={{ fontWeight: 800, color: "#1e293b" }}>{item.value}</Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Main Table Paper */}
      <Paper elevation={0} sx={{ borderRadius: "20px", border: "1px solid #e2e8f0", overflow: "hidden", bgcolor: "white", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05)" }}>
        <Box sx={{ p: 3, display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f1f5f9" }}>
          <Typography variant="h6" sx={{ fontWeight: 800, color: "#1e293b", display: "flex", alignItems: "center", gap: 1.5 }}>
            <History size={22} strokeWidth={2.5} color={primaryPurple} /> Installment Records
          </Typography>
          <Button 
            size="small" 
            variant="outlined" 
            sx={{ borderRadius: "10px", textTransform: "none", fontWeight: 600, borderColor: "#e2e8f0", color: "#64748b" }} 
            startIcon={<Download size={16} />}
          >
            Export PDF
          </Button>
        </Box>

        <TableContainer>
          <Table sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow>
                <StyledTableCell sx={{ borderTopLeftRadius: "0px" }}>MONTHLY SESSION</StyledTableCell>
                <StyledTableCell>TRANSACTION DATE</StyledTableCell>
                <StyledTableCell>AMOUNT</StyledTableCell>
                <StyledTableCell>PAYMENT METHOD</StyledTableCell>
                <StyledTableCell align="center">STATUS</StyledTableCell>
                <StyledTableCell align="right" sx={{ borderTopRightRadius: "0px" }}>ACTION</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {monthlyRecords.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Box sx={{ p: 1, bgcolor: "#f1f5f9", borderRadius: "8px", color: "#64748b", display: "flex" }}>
                        <Calendar size={18} />
                      </Box>
                      <Typography sx={{ fontWeight: 700, color: "#1e293b" }}>{row.month}</Typography>
                    </Stack>
                  </StyledTableCell>
                  
                  <StyledTableCell sx={{ color: "#64748b", fontWeight: 500 }}>{row.date}</StyledTableCell>

                  <StyledTableCell sx={{ fontWeight: 800, color: "#1e293b" }}>
                    PKR {row.amount.toLocaleString()}
                  </StyledTableCell>

                  <StyledTableCell>
                    <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 600 }}>{row.method}</Typography>
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    <Chip
                      label={row.status}
                      size="small"
                      sx={{
                        fontWeight: 800, fontSize: "0.65rem", height: "24px",
                        bgcolor: row.status === "Paid" ? "#dcfce7" : row.status === "Pending" ? "#fee2e2" : "#f1f5f9",
                        color: row.status === "Paid" ? "#15803d" : row.status === "Pending" ? "#b91c1c" : "#475569",
                        borderRadius: "6px", textTransform: "uppercase"
                      }}
                    />
                  </StyledTableCell>

                  <StyledTableCell align="right">
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      {row.status === "Paid" ? (
                        <Tooltip title="Download Receipt">
                          <IconButton size="small" sx={{ color: primaryPurple, bgcolor: alpha(primaryPurple, 0.05), "&:hover": { bgcolor: alpha(primaryPurple, 0.1) } }}>
                            <Download size={18} />
                          </IconButton>
                        </Tooltip>
                      ) : row.status === "Pending" ? (
                        <Button 
                          variant="contained" 
                          size="small" 
                          disableElevation 
                          sx={{ fontWeight: 700, textTransform: "none", bgcolor: primaryPurple, borderRadius: "8px", fontSize: "0.75rem", px: 2 }}
                        >
                          Pay Now
                        </Button>
                      ) : (
                        <Typography variant="caption" sx={{ color: "#cbd5e1", fontWeight: 700 }}>---</Typography>
                      )}
                    </Stack>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Info Banner */}
      <Box sx={{ mt: 4, p: 2, display: "flex", alignItems: "center", gap: 2, bgcolor: "#eff6ff", borderRadius: "16px", border: "1px solid #dbeafe" }}>
        <Box sx={{ bgcolor: "#3b82f6", color: "white", p: 0.5, borderRadius: "50%", display: "flex" }}>
          <AlertCircle size={14} />
        </Box>
        <Typography variant="body2" sx={{ color: "#1e40af", fontWeight: 600 }}>
          Notice: Monthly vouchers are issued on the 1st. A late fee of PKR 500 applies after the 10th of each month.
        </Typography>
      </Box>
    </Box>
  );
};

export default StudentFees;