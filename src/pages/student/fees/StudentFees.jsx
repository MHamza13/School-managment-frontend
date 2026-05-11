import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  Stack,
  Chip,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
} from "@mui/material";

import { alpha, styled } from "@mui/material/styles";

import {
  Receipt,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Download,
  CreditCard,
  History,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// ================= Styled Components =================

const StyledTableCell = styled(TableCell)(() => ({
  padding: "16px",
  borderBottom: "1px solid #f1f5f9",
  fontSize: "0.875rem",

  "&.MuiTableCell-head": {
    background: "linear-gradient(135deg, #6a1b9a 0%, #6a1b9a 100%)",
    color: "#ffffff",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    fontSize: "0.8rem",
    border: "none",
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  transition: "all 0.2s ease",

  "&:hover": {
    backgroundColor: alpha("#6a1b9a", 0.04),
  },

  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// ================= Component =================

const StudentFees = () => {
  const primaryPurple = "#6a1b9a";

  const [selectedYear, setSelectedYear] = useState(2026);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
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
      month,
      date:
        status === "Paid"
          ? `05 ${month.substring(0, 3)} ${selectedYear}`
          : "---",
      amount: 10000,
      status,
      method: status === "Paid" ? "Online" : "---",
    };
  });

  return (
    <Box sx={{ maxWidth: "100%", mx: "auto", minHeight: "100vh" }}>
      {/* Header */}

      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems="center"
        mb={4}
        spacing={2}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              color: "#1e293b",
              letterSpacing: "-1px",
            }}
          >
            Fee Ledger
          </Typography>

          <Typography
            variant="body2"
            sx={{ color: "#64748b", fontWeight: 500 }}
          >
            Track your academic installments and financial history for{" "}
            <b>{selectedYear}</b>
          </Typography>
        </Box>

        <Stack direction="row" spacing={2}>
          <Paper
            elevation={0}
            sx={{
              display: "flex",
              alignItems: "center",
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
              bgcolor: "white",
              p: 0.5,
            }}
          >
            <IconButton
              size="small"
              onClick={() => setSelectedYear((prev) => prev - 1)}
            >
              <ChevronLeft size={18} color="#64748b" />
            </IconButton>

            <Typography
              sx={{
                fontWeight: 700,
                px: 2,
                color: "#1e293b",
                minWidth: "60px",
                textAlign: "center",
              }}
            >
              {selectedYear}
            </Typography>

            <IconButton
              size="small"
              onClick={() => setSelectedYear((prev) => prev + 1)}
            >
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
              "&:hover": {
                bgcolor: "#4a148c",
              },
            }}
          >
            Pay Full Year
          </Button>
        </Stack>
      </Stack>

      {/* Stats */}

      <Grid container spacing={3} mb={5}>
        {[
          {
            label: "Total Payable",
            value: `PKR ${feeSummary.totalYearly.toLocaleString()}`,
            icon: <Receipt size={20} />,
            color: primaryPurple,
            bg: alpha(primaryPurple, 0.1),
          },
          {
            label: "Total Paid",
            value: `PKR ${feeSummary.paidSoFar.toLocaleString()}`,
            icon: <CheckCircle2 size={20} />,
            color: "#10b981",
            bg: "#f0fdf4",
          },
          {
            label: "Remaining",
            value: `PKR ${feeSummary.balance.toLocaleString()}`,
            icon: <AlertCircle size={20} />,
            color: "#f59e0b",
            bg: "#fffbeb",
          },
        ].map((item, i) => (
          <Grid item xs={12} sm={4} key={i}>
            <Card
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: "20px",
                border: "1px solid #e2e8f0",
                display: "flex",
                alignItems: "center",
                gap: 2,
                bgcolor: "white",
              }}
            >
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: "14px",
                  bgcolor: item.bg,
                  color: item.color,
                  display: "flex",
                }}
              >
                {item.icon}
              </Box>

              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: "#94a3b8",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {item.label}
                </Typography>

                <Typography
                  variant="h5"
                  sx={{ fontWeight: 800, color: "#1e293b" }}
                >
                  {item.value}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StudentFees;