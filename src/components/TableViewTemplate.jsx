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
} from "@mui/material";
import { StyledTableCell, StyledTableRow } from "./styles";

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

const TableViewTemplate = ({ columns, rows }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState(columns[0].id);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
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
    return rows.filter((row) =>
      columns.some((col) =>
        String(row[col.id]).toLowerCase().includes(searchTerm)
      )
    );
  }, [searchTerm, rows, columns]);

  const sortedRows = useMemo(() => {
    return filteredRows.sort(getComparator(order, orderBy));
  }, [filteredRows, order, orderBy]);

  const paginatedRows = sortedRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper
      sx={{
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "#fafafa",
      }}
    >
      <Box
        mb={2}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h6"
          sx={{ width: "50%", fontWeight: 600, color: "#6a1b9a", mb: 1 }}
        >
          Notice
        </Typography>
        <TextField
          label="Search"
          variant="outlined"
          style={{
            width: "50%",
          }}
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </Box>

      <TableContainer>
        <Table stickyHeader aria-label="custom styled table">
          <TableHead>
            <StyledTableRow
              sx={{
                backgroundColor: "#6a1b9a",
              }}
            >
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    backgroundColor: "#6a1b9a",
                    color: "#fff",
                  }}
                  sortDirection={orderBy === column.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : "asc"}
                    onClick={() => handleRequestSort(column.id)}
                    sx={{
                      color: "white",
                      "&:hover": {
                        color: "white", // no hover color change
                      },
                      "&.Mui-active": {
                        color: "white",
                      },
                      "& .MuiTableSortLabel-icon": {
                        color: "white !important",
                      },
                    }}
                  >
                    {column.label}
                  </TableSortLabel>
                </StyledTableCell>
              ))}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row) => (
              <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <StyledTableCell key={column.id} align={column.align}>
                      {column.format && typeof value === "number"
                        ? column.format(value)
                        : value}
                    </StyledTableCell>
                  );
                })}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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
    </Paper>
  );
};

export default TableViewTemplate;
