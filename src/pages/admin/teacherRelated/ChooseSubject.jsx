import React, { useEffect, useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableSortLabel,
  TextField,
  Typography,
  Paper,
  Box,
  Button,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getTeacherFreeClassSubjects } from "../../../redux/sclassRelated/sclassHandle";
import { updateTeachSubject } from "../../../redux/teacherRelated/teacherHandle";
import { StyledTableCell, StyledTableRow } from "../../../components/styles";

// ⬇️ Custom Purple Button (#7b1fa2)
const PurpleBtn = ({ children, ...props }) => {
  return (
    <Button
      {...props}
      variant="contained"
      sx={{
        backgroundColor: "#7b1fa2",
        color: "#fff",
        textTransform: "none",
        fontWeight: "600",
        "&:hover": { backgroundColor: "#6a1b9a" },
        borderRadius: "8px",
        px: 3,
      }}
    >
      {children}
    </Button>
  );
};

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

const ChooseSubject = ({ situation }) => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [classID, setClassID] = useState("");
  const [teacherID, setTeacherID] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("subName");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loader, setLoader] = useState(false);

  const { subjectsList, loading, error, response } = useSelector(
    (state) => state.sclass
  );

  useEffect(() => {
    if (situation === "Norm") {
      setClassID(params.id);
      dispatch(getTeacherFreeClassSubjects(params.id));
    } else if (situation === "Teacher") {
      setClassID(params.classID);
      setTeacherID(params.teacherID);
      dispatch(getTeacherFreeClassSubjects(params.classID));
    }
  }, [situation, params, dispatch]);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    setPage(0);
  };

  const updateSubjectHandler = (teacherId, subjectId) => {
    setLoader(true);
    dispatch(updateTeachSubject(teacherId, subjectId));
    navigate("/Admin/teachers");
  };

  const filteredRows = useMemo(() => {
    return (
      subjectsList?.filter((row) =>
        ["subName", "subCode"].some((field) =>
          row[field]?.toLowerCase().includes(searchTerm)
        )
      ) || []
    );
  }, [subjectsList, searchTerm]);

  const sortedRows = useMemo(() => {
    return filteredRows.sort(getComparator(order, orderBy));
  }, [filteredRows, order, orderBy]);

  const paginatedRows = sortedRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  if (loading) return <Typography>Loading...</Typography>;
  if (response)
    return (
      <Box>
        <Typography variant="h6" color="error">
          Sorry, all subjects already have assigned teachers.
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          {/* Purple Button */}
          <PurpleBtn onClick={() => navigate("/Admin/addsubject/" + classID)}>
            Add Subjects
          </PurpleBtn>
        </Box>
      </Box>
    );
  if (error) return <Typography color="error">Error occurred</Typography>;

  return (
    <Paper
      sx={{ p: 3, boxShadow: 3, borderRadius: 2, backgroundColor: "#fafafa" }}
    >
      {/* Header + Search */}
      <Box
        mb={2}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, color: "#6a1b9a" }}>
          Choose a Subject
        </Typography>

        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ width: "40%" }}
        />
      </Box>

      {/* Table */}
      <TableContainer>
        <Table stickyHeader aria-label="subject table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell style={{ background: "#7b1fa2" }}>
                #
              </StyledTableCell>

              <StyledTableCell
                sortDirection={orderBy === "subName" ? order : false}
                style={{ background: "#7b1fa2" }}
              >
                <TableSortLabel
                  active={orderBy === "subName"}
                  direction={orderBy === "subName" ? order : "asc"}
                  onClick={() => handleRequestSort("subName")}
                  sx={{
                    color: "white !important",
                    "& .MuiTableSortLabel-icon": {
                      color: "white !important",
                    },
                  }}
                >
                  Subject Name
                </TableSortLabel>
              </StyledTableCell>

              <StyledTableCell
                sortDirection={orderBy === "subCode" ? order : false}
                style={{ background: "#7b1fa2" }}
              >
                <TableSortLabel
                  active={orderBy === "subCode"}
                  direction={orderBy === "subCode" ? order : "asc"}
                  onClick={() => handleRequestSort("subCode")}
                  sx={{
                    color: "white",
                    "& .MuiTableSortLabel-icon": {
                      color: "white !important",
                    },
                  }}
                >
                  Subject Code
                </TableSortLabel>
              </StyledTableCell>

              <StyledTableCell style={{ background: "#7b1fa2" }}>
                Actions
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>

          <TableBody>
            {paginatedRows.map((subject, index) => (
              <StyledTableRow key={subject._id}>
                <StyledTableCell>
                  {page * rowsPerPage + index + 1}
                </StyledTableCell>

                <StyledTableCell>{subject.subName}</StyledTableCell>
                <StyledTableCell>{subject.subCode}</StyledTableCell>

                <StyledTableCell align="center">
                  {situation === "Norm" ? (
                    <PurpleBtn
                      onClick={() =>
                        navigate(`/Admin/teachers/addteacher/${subject._id}`)
                      }
                    >
                      Choose
                    </PurpleBtn>
                  ) : (
                    <PurpleBtn
                      disabled={loader}
                      onClick={() =>
                        updateSubjectHandler(teacherID, subject._id)
                      }
                    >
                      {loader ? "Loading..." : "Choose"}
                    </PurpleBtn>
                  )}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={sortedRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        sx={{ mt: 2 }}
      />
    </Paper>
  );
};

export default ChooseSubject;
