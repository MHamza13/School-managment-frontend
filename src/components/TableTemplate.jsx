import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableSortLabel,
  TextField,
  Paper,
  Typography,
  Box,
  InputAdornment,
  Divider,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/material/styles";

import { StyledTableCell, StyledTableRow } from "./styles";

const CustomPurple = "#6a1b9a";
const LightPurple = "#9c27b0";

// --- Utility Functions ---
const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

// --- Custom Styled Paper ---
const CustomPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  boxShadow: theme.shadows[8],
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: theme.palette.background.default,
}));

// --- Action Component ---
const RowActionButtons = ({ row }) => {
  const handleView = () => {
    console.log(`Viewing row ID: ${row.id}`);
    alert(`Viewing Details for: ${row.id}`);
  };

  const handleEdit = () => {
    console.log(`Editing row ID: ${row.id}`);
    alert(`Editing Record: ${row.id}`);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
      <Button
        variant="contained"
        onClick={handleView}
        size="small"
        startIcon={<VisibilityIcon fontSize="small" />}
        sx={{
          backgroundColor: CustomPurple,
          "&:hover": { backgroundColor: LightPurple },
          textTransform: "none",
          borderRadius: "4px",
        }}
      >
        View
      </Button>

      <Button
        variant="outlined"
        onClick={handleEdit}
        size="small"
        startIcon={<EditIcon fontSize="small" />}
        sx={{
          color: CustomPurple,
          borderColor: CustomPurple,
          "&:hover": {
            backgroundColor: `${CustomPurple}10`,
            borderColor: LightPurple,
          },
          textTransform: "none",
          borderRadius: "4px",
        }}
      >
        Update
      </Button>
    </Box>
  );
};

// --- Main Table Component ---

const TableTemplate = ({
  columns,
  rows,
  heading,
  buttonHaver = RowActionButtons,
}) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState(columns[0].id);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    setPage(0);
  };

  const filteredRows = useMemo(() => {
    if (!rows || rows.length === 0) return [];
    return rows.filter((row) =>
      columns.some((col) => {
        const value = row[col.id];
        return String(value ?? "")
          .toLowerCase()
          .includes(searchTerm);
      })
    );
  }, [searchTerm, rows, columns]);

  const sortedRows = useMemo(() => {
    return filteredRows.slice().sort(getComparator(order, orderBy));
  }, [filteredRows, order, orderBy]);

  const paginatedRows = sortedRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const ActionButtonsComponent = buttonHaver;

  return (
    <CustomPaper>
      {/* Top Bar */}
      <Box
        mb={3}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "flex-start", sm: "center" },
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          sx={{
            fontWeight: 700,
            color: CustomPurple,
            borderBottom: `3px solid ${CustomPurple}80`,
            paddingBottom: "4px",
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          {heading}
        </Typography>

        <TextField
          label="Search Records"
          variant="outlined"
          size="small"
          sx={{ width: { xs: "100%", sm: "40%" }, minWidth: 200 }}
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            style: { borderRadius: "8px", backgroundColor: "#ffffff" },
          }}
        />
      </Box>

      {/* 
         👇👇👇 MAIN CHANGES HERE 👇👇👇
         Table Container: Added scroll logic and custom scrollbar styling 
      */}
      <TableContainer
        sx={{
          maxHeight: 500, // Fixed height limits the area
          borderRadius: "8px",
          border: `1px solid ${CustomPurple}30`,

          // Change from "hidden" to "auto" to enable scrolling
          overflowY: "auto",
          overflowX: "auto",

          // Custom Scrollbar Styling (Matches Purple Theme)
          "&::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: CustomPurple,
            borderRadius: "4px",
            "&:hover": {
              backgroundColor: LightPurple,
            },
          },
        }}
      >
        <Table stickyHeader aria-label="data table">
          <TableHead>
            <StyledTableRow>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    backgroundColor: CustomPurple,
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                  sortDirection={orderBy === column.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : "asc"}
                    onClick={() => handleRequestSort(column.id)}
                    sx={{
                      color: "white",
                      "&:hover": { color: "white" },
                      "&.Mui-active": { color: "white" },
                      "& .MuiTableSortLabel-icon": {
                        color: "white !important",
                      },
                    }}
                  >
                    {column.label}
                  </TableSortLabel>
                </StyledTableCell>
              ))}
              <StyledTableCell
                align="center"
                style={{
                  backgroundColor: CustomPurple,
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                Actions
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>

          <TableBody>
            {paginatedRows.length > 0 ? (
              paginatedRows.map((row) => (
                <StyledTableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.id}
                >
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <StyledTableCell key={column.id} align={column.align}>
                        <Typography variant="body2">
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </Typography>
                      </StyledTableCell>
                    );
                  })}
                  <StyledTableCell align="center" sx={{ py: 1.5 }}>
                    <ActionButtonsComponent row={row} />
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell
                  colSpan={columns.length + 1}
                  align="center"
                  sx={{ py: 3 }}
                >
                  <Typography variant="subtitle1" color="textSecondary">
                    😔 No records match your search criteria.
                  </Typography>
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Divider sx={{ mt: 2, mb: 1, backgroundColor: LightPurple }} />

      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={sortedRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
        sx={{ mt: 2 }}
      />
    </CustomPaper>
  );
};

export default TableTemplate;
