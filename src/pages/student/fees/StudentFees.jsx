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

import { styled, alpha } from "@mui/material/styles";

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

// ================= Styled =================

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: "16px",
  borderBottom: "1px solid #f1f5f9",
  fontSize: "0.875rem",

  "&.MuiTableCell-head": {
    background: "#6a1b9a",
    color: "#fff",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    fontSize: "0.8rem",
    border: "none",
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  transition: "0.2s",
  "&:hover": {
    backgroundColor: alpha("#6a1b9a", 0.04),
  },
}));

// ================= Component =================

const StudentFees = () => {
  const primary = "#6a1b9a";
  const [selectedYear, setSelectedYear] = useState(2026);

  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const feeSummary = {
    totalYearly: 120000,
    paidSoFar: 25000,
    balance: 95000,
  };

  const monthlyRecords = months.map((m, i) => {
    let status = "Upcoming";
    if (i < 3) status = "Paid";
    else if (i === 3) status = "Pending";

    return {
      id: i,
      month: m,
      date: status === "Paid" ? `05 ${m.slice(0,3)} ${selectedYear}` : "---",
      amount: 10000,
      status,
      method: status === "Paid" ? "Online" : "---",
    };
  });

  return (
    <Box sx={{ p: 2 }}>

      {/* Header */}
      <Stack direction="row" justifyContent="space-between" mb={3}>
        <Box>
          <Typography variant="h4" fontWeight={800}>
            Fee Ledger
          </Typography>
          <Typography variant="body2">
            Year: {selectedYear}
          </Typography>
        </Box>

        <Stack direction="row" spacing={1}>
          <IconButton onClick={() => setSelectedYear(y => y - 1)}>
            <ChevronLeft />
          </IconButton>

          <IconButton onClick={() => setSelectedYear(y => y + 1)}>
            <ChevronRight />
          </IconButton>

          <Button
            variant="contained"
            sx={{ bgcolor: primary }}
            startIcon={<CreditCard />}
          >
            Pay Full
          </Button>
        </Stack>
      </Stack>

      {/* Table */}
      <Paper>
        <TableContainer>
          <Table>

            <TableHead>
              <TableRow>
                <StyledTableCell>Month</StyledTableCell>
                <StyledTableCell>Date</StyledTableCell>
                <StyledTableCell>Amount</StyledTableCell>
                <StyledTableCell>Method</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell align="right">Action</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {monthlyRecords.map(row => (
                <StyledTableRow key={row.id}>

                  <StyledTableCell>{row.month}</StyledTableCell>
                  <StyledTableCell>{row.date}</StyledTableCell>
                  <StyledTableCell>PKR {row.amount}</StyledTableCell>
                  <StyledTableCell>{row.method}</StyledTableCell>

                  <StyledTableCell>
                    <Chip
                      label={row.status}
                      sx={{
                        bgcolor:
                          row.status === "Paid"
                            ? "#dcfce7"
                            : row.status === "Pending"
                            ? "#fee2e2"
                            : "#f1f5f9",
                      }}
                    />
                  </StyledTableCell>

                  <StyledTableCell align="right">
                    {row.status === "Paid" ? (
                      <Tooltip title="Download">
                        <IconButton>
                          <Download />
                        </IconButton>
                      </Tooltip>
                    ) : row.status === "Pending" ? (
                      <Button size="small" variant="contained">
                        Pay
                      </Button>
                    ) : (
                      "---"
                    )}
                  </StyledTableCell>

                </StyledTableRow>
              ))}
            </TableBody>

          </Table>
        </TableContainer>
      </Paper>

    </Box>
  );
};

export default StudentFees;