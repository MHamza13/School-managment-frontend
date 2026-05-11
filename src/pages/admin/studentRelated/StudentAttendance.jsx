import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getUserDetails,
  updateUser,
} from "../../../redux/userRelated/userHandle";
import { useNavigate, useParams } from "react-router-dom";
import { getSubjectList } from "../../../redux/sclassRelated/sclassHandle";
import {
  Box,
  Button,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableHead,
  Typography,
  Tab,
  Paper,
  BottomNavigation,
  BottomNavigationAction,
  Container,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  KeyboardArrowUp,
  KeyboardArrowDown,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import {
  removeStuff,
  updateStudentFields,
} from "../../../redux/studentRelated/studentHandle";
import {
  calculateOverallAttendancePercentage,
  calculateSubjectAttendancePercentage,
  groupAttendanceBySubject,
} from "../../../components/attendanceCalculator";
import CustomBarChart from "../../../components/CustomBarChart";
import CustomPieChart from "../../../components/CustomPieChart";
import { StyledTableCell, StyledTableRow } from "../../../components/styles";

import InsertChartIcon from "@mui/icons-material/InsertChart";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import TableChartIcon from "@mui/icons-material/TableChart";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import Popup from "../../../components/Popup";

const ViewStudent = () => {
  const [showTab, setShowTab] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { userDetails, response, loading, error } = useSelector(
    (state) => state.user
  );

  const studentID = params.id;
  const address = "Student";

  useEffect(() => {
    dispatch(getUserDetails(studentID, address));
  }, [dispatch, studentID]);

  useEffect(() => {
    if (
      userDetails &&
      userDetails.sclassName &&
      userDetails.sclassName._id !== undefined
    ) {
      dispatch(getSubjectList(userDetails.sclassName._id, "ClassSubjects"));
    }
  }, [dispatch, userDetails]);

  const [name, setName] = useState("");
  const [rollNum, setRollNum] = useState("");
  const [password, setPassword] = useState("");
  const [sclassName, setSclassName] = useState("");
  const [studentSchool, setStudentSchool] = useState("");
  const [subjectMarks, setSubjectMarks] = useState("");
  const [subjectAttendance, setSubjectAttendance] = useState([]);
  const [openStates, setOpenStates] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const handleOpen = (subId) => {
    setOpenStates((prevState) => ({
      ...prevState,
      [subId]: !prevState[subId],
    }));
  };

  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [selectedSection, setSelectedSection] = useState("table");
  const handleSectionChange = (event, newSection) => {
    setSelectedSection(newSection);
  };

  const fields =
    password === "" ? { name, rollNum } : { name, rollNum, password };

  useEffect(() => {
    if (userDetails) {
      setName(userDetails.name || "");
      setRollNum(userDetails.rollNum || "");
      setSclassName(userDetails.sclassName || "");
      setStudentSchool(userDetails.school || "");
      setSubjectMarks(userDetails.examResult || "");
      setSubjectAttendance(userDetails.attendance || []);
    }
  }, [userDetails]);

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(updateUser(fields, studentID, address))
      .then(() => {
        dispatch(getUserDetails(studentID, address));
      })
      .catch((error) => console.error(error));
  };

  const deleteHandler = () => {
    setMessage("Sorry the delete function has been disabled for now.");
    setShowPopup(true);
  };

  const removeHandler = (id, deladdress) => {
    dispatch(removeStuff(id, deladdress)).then(() => {
      dispatch(getUserDetails(studentID, address));
    });
  };

  const removeSubAttendance = (subId) => {
    dispatch(
      updateStudentFields(studentID, { subId }, "RemoveStudentSubAtten")
    ).then(() => {
      dispatch(getUserDetails(studentID, address));
    });
  };

  const overallAttendancePercentage =
    calculateOverallAttendancePercentage(subjectAttendance);
  const overallAbsentPercentage = 100 - overallAttendancePercentage;

  const chartData = [
    { name: "Present", value: overallAttendancePercentage },
    { name: "Absent", value: overallAbsentPercentage },
  ];

  const subjectData = Object.entries(
    groupAttendanceBySubject(subjectAttendance)
  ).map(([subName, { subCode, present, sessions }]) => {
    const subjectAttendancePercentage = calculateSubjectAttendancePercentage(
      present,
      sessions
    );
    return {
      subject: subName,
      attendancePercentage: subjectAttendancePercentage,
      totalClasses: sessions,
      attendedClasses: present,
    };
  });

  // ------------------- Attendance Section -------------------
  const StudentAttendanceSection = () => {
    const renderTableSection = () => (
      <>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
          Attendance Records
        </Typography>
        <Table sx={{ borderRadius: 2, overflow: "hidden", boxShadow: 3 }}>
          <TableHead sx={{ bgcolor: "#7b1fa2" }}>
            <StyledTableRow>
              <StyledTableCell sx={{ color: "#fff" }}>Subject</StyledTableCell>
              <StyledTableCell sx={{ color: "#fff" }}>Present</StyledTableCell>
              <StyledTableCell sx={{ color: "#fff" }}>
                Total Sessions
              </StyledTableCell>
              <StyledTableCell sx={{ color: "#fff" }}>
                Attendance %
              </StyledTableCell>
              <StyledTableCell sx={{ color: "#fff" }} align="center">
                Actions
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          {Object.entries(groupAttendanceBySubject(subjectAttendance)).map(
            ([subName, { present, allData, subId, sessions }], index) => {
              const subjectAttendancePercentage =
                calculateSubjectAttendancePercentage(present, sessions);
              return (
                <TableBody key={index}>
                  <StyledTableRow hover>
                    <StyledTableCell>{subName}</StyledTableCell>
                    <StyledTableCell>{present}</StyledTableCell>
                    <StyledTableCell>{sessions}</StyledTableCell>
                    <StyledTableCell>
                      {subjectAttendancePercentage}%
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        variant="contained"
                        size="small"
                        sx={styles.attendanceButton}
                        onClick={() => handleOpen(subId)}
                      >
                        {openStates[subId] ? (
                          <KeyboardArrowUp />
                        ) : (
                          <KeyboardArrowDown />
                        )}
                        Details
                      </Button>
                      <IconButton onClick={() => removeSubAttendance(subId)}>
                        <DeleteIcon sx={{ color: "#ff1744" }} />
                      </IconButton>
                      <Button
                        variant="contained"
                        size="small"
                        sx={styles.attendanceButton}
                        onClick={() =>
                          navigate(
                            `/Admin/subject/student/attendance/${studentID}/${subId}`
                          )
                        }
                      >
                        Change
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={6}
                    >
                      <Collapse
                        in={openStates[subId]}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Box sx={{ margin: 2 }}>
                          <Typography variant="h6">
                            Attendance Details
                          </Typography>
                          <Table size="small">
                            <TableHead>
                              <StyledTableRow sx={{ bgcolor: "#7b1fa2" }}>
                                <StyledTableCell sx={{ color: "#fff" }}>
                                  Date
                                </StyledTableCell>
                                <StyledTableCell
                                  sx={{ color: "#fff" }}
                                  align="right"
                                >
                                  Status
                                </StyledTableCell>
                              </StyledTableRow>
                            </TableHead>
                            <TableBody>
                              {allData.map((data, idx) => {
                                const date = new Date(data.date);
                                const dateString =
                                  date.toString() !== "Invalid Date"
                                    ? date.toISOString().substring(0, 10)
                                    : "Invalid Date";
                                return (
                                  <StyledTableRow key={idx} hover>
                                    <StyledTableCell>
                                      {dateString}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                      {data.status}
                                    </StyledTableCell>
                                  </StyledTableRow>
                                );
                              })}
                            </TableBody>
                          </Table>
                        </Box>
                      </Collapse>
                    </StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              );
            }
          )}
        </Table>
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
          Overall Attendance: {overallAttendancePercentage.toFixed(2)}%
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            startIcon={<DeleteIcon />}
            sx={{ ...styles.styledButton, backgroundColor: "#7b1fa2" }}
            onClick={() => removeHandler(studentID, "RemoveStudentAtten")}
          >
            Delete All
          </Button>
          <Button
            variant="contained"
            sx={{ ...styles.styledButton, ml: 2 }}
            onClick={() =>
              navigate("/Admin/students/student/attendance/" + studentID)
            }
          >
            Add Attendance
          </Button>
        </Box>
      </>
    );

    const renderChartSection = () => (
      <CustomBarChart chartData={subjectData} dataKey="attendancePercentage" />
    );

    return (
      <>
        {subjectAttendance &&
        Array.isArray(subjectAttendance) &&
        subjectAttendance.length > 0 ? (
          <>
            {selectedSection === "table" && renderTableSection()}
            {selectedSection === "chart" && renderChartSection()}
            <Paper
              sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
              elevation={3}
            >
              <BottomNavigation
                value={selectedSection}
                onChange={handleSectionChange}
                showLabels
              >
                <BottomNavigationAction
                  label="Table"
                  value="table"
                  icon={
                    selectedSection === "table" ? (
                      <TableChartIcon />
                    ) : (
                      <TableChartOutlinedIcon />
                    )
                  }
                />
                <BottomNavigationAction
                  label="Chart"
                  value="chart"
                  icon={
                    selectedSection === "chart" ? (
                      <InsertChartIcon />
                    ) : (
                      <InsertChartOutlinedIcon />
                    )
                  }
                />
              </BottomNavigation>
            </Paper>
          </>
        ) : (
          <Button
            variant="contained"
            sx={styles.styledButton}
            onClick={() =>
              navigate("/Admin/students/student/attendance/" + studentID)
            }
          >
            Add Attendance
          </Button>
        )}
      </>
    );
  };

  // ------------------- Marks Section -------------------
  const StudentMarksSection = () => {
    const renderTableSection = () => (
      <>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
          Subject Marks
        </Typography>
        <Table sx={{ borderRadius: 2, overflow: "hidden", boxShadow: 3 }}>
          <TableHead sx={{ bgcolor: "#7b1fa2" }}>
            <StyledTableRow>
              <StyledTableCell sx={{ color: "#fff" }}>Subject</StyledTableCell>
              <StyledTableCell sx={{ color: "#fff" }}>Marks</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {subjectMarks.map((result, index) => {
              if (!result.subName || !result.marksObtained) return null;
              return (
                <StyledTableRow key={index} hover>
                  <StyledTableCell>{result.subName.subName}</StyledTableCell>
                  <StyledTableCell>{result.marksObtained}</StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
        <Button
          variant="contained"
          sx={styles.styledButton}
          onClick={() => navigate("/Admin/students/student/marks/" + studentID)}
        >
          Add Marks
        </Button>
      </>
    );

    const renderChartSection = () => (
      <CustomBarChart chartData={subjectMarks} dataKey="marksObtained" />
    );

    return (
      <>
        {subjectMarks &&
        Array.isArray(subjectMarks) &&
        subjectMarks.length > 0 ? (
          <>
            {selectedSection === "table" && renderTableSection()}
            {selectedSection === "chart" && renderChartSection()}
            <Paper
              sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
              elevation={3}
            >
              <BottomNavigation
                value={selectedSection}
                onChange={handleSectionChange}
                showLabels
              >
                <BottomNavigationAction
                  label="Table"
                  value="table"
                  icon={
                    selectedSection === "table" ? (
                      <TableChartIcon />
                    ) : (
                      <TableChartOutlinedIcon />
                    )
                  }
                />
                <BottomNavigationAction
                  label="Chart"
                  value="chart"
                  icon={
                    selectedSection === "chart" ? (
                      <InsertChartIcon />
                    ) : (
                      <InsertChartOutlinedIcon />
                    )
                  }
                />
              </BottomNavigation>
            </Paper>
          </>
        ) : (
          <Button
            variant="contained"
            sx={styles.styledButton}
            onClick={() =>
              navigate("/Admin/students/student/marks/" + studentID)
            }
          >
            Add Marks
          </Button>
        )}
      </>
    );
  };

  // ------------------- Details Section -------------------
  const StudentDetailsSection = () => (
    <Card sx={{ p: 1, boxShadow: 5, borderRadius: 2, mb: 3 }}>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
          Student Details
        </Typography>
        <Typography>Name: {userDetails.name}</Typography>
        <Typography>Roll Number: {userDetails.rollNum}</Typography>
        <Typography>Class: {sclassName.sclassName}</Typography>
        <Typography>School: {studentSchool.schoolName}</Typography>

        {subjectAttendance &&
          Array.isArray(subjectAttendance) &&
          subjectAttendance.length > 0 && (
            <Box sx={{ mt: 2, mb: 2 }}>
              <CustomPieChart data={chartData} />
            </Box>
          )}

        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            sx={{ ...styles.styledButton, backgroundColor: "#7b1fa2" }}
            onClick={deleteHandler}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            sx={{ ...styles.styledButton, ml: 2, backgroundColor: "#7b1fa2" }}
            onClick={() => setShowTab(!showTab)}
          >
            {showTab ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            Edit Student
          </Button>
        </Box>

        <Collapse in={showTab} timeout="auto" unmountOnExit sx={{ mt: 2 }}>
          <Card sx={{ p: 2, boxShadow: 3, borderRadius: 2 }}>
            <form onSubmit={submitHandler}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Edit Details
              </Typography>
              <input
                type="text"
                placeholder="Enter user's name..."
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                style={styles.inputField}
              />
              <input
                type="number"
                placeholder="Enter user's Roll Number..."
                value={rollNum}
                onChange={(event) => setRollNum(event.target.value)}
                required
                style={styles.inputField}
              />
              <input
                type="password"
                placeholder="Enter user's password..."
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                style={styles.inputField}
              />
              <Button
                type="submit"
                variant="contained"
                sx={styles.styledButton}
              >
                Update
              </Button>
            </form>
          </Card>
        </Collapse>
      </CardContent>
    </Card>
  );

  return (
    <>
      {loading ? (
        <Typography sx={{ mt: 5, textAlign: "center" }}>Loading...</Typography>
      ) : (
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                sx={{
                  position: "fixed",
                  width: "100%",
                  bgcolor: "background.paper",
                  zIndex: 1,
                  boxShadow: 3,
                }}
              >
                <Tab label="Details" value="1" />
                <Tab label="Attendance" value="2" />
                <Tab label="Marks" value="3" />
              </TabList>
            </Box>
            <Container sx={{ mt: "4rem", mb: "5rem", px: 0 }}>
              <TabPanel value="1" sx={{ p: 0 }}>
                <StudentDetailsSection />
              </TabPanel>
              <TabPanel value="2" sx={{ p: 0 }}>
                <StudentAttendanceSection />
              </TabPanel>
              <TabPanel value="3" sx={{ p: 0 }}>
                <StudentMarksSection />
              </TabPanel>
            </Container>
          </TabContext>
        </Box>
      )}
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </>
  );
};

export default ViewStudent;

const styles = {
  attendanceButton: {
    margin: "5px",
    backgroundColor: "#7b1fa2",
    "&:hover": {
      backgroundColor: "#9c27b0",
    },
  },
  styledButton: {
    marginTop: "10px",
    marginBottom: "10px",
    backgroundColor: "#7b1fa2",
    "&:hover": {
      backgroundColor: "#9c27b0",
    },
  },
  inputField: {
    display: "block",
    width: "100%",
    padding: "10px 15px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
};
