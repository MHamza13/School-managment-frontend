import React, { useEffect, useState } from "react";
import {
  getClassStudents,
  getSubjectDetails,
} from "../../../redux/sclassRelated/sclassHandle";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Tab,
  Container,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Divider,
  Button,
} from "@mui/material";

import TableTemplate from "../../../components/TableTemplate";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

// Icons
import InsertChartIcon from "@mui/icons-material/InsertChart";
import TableChartIcon from "@mui/icons-material/TableChart";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import GroupIcon from "@mui/icons-material/Group";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TagIcon from "@mui/icons-material/Tag";
import SchoolIcon from "@mui/icons-material/School";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

const buttonStyle = {
  backgroundColor: "#7b1fa2",
  "&:hover": { backgroundColor: "#6a1b9a" },
  textTransform: "none",
  fontWeight: 600,
};

const ViewSubject = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { subloading, subjectDetails, sclassStudents, getresponse, error } =
    useSelector((state) => state.sclass);

  const { classID, subjectID } = params;

  useEffect(() => {
    dispatch(getSubjectDetails(subjectID, "Subject"));
    dispatch(getClassStudents(classID));
  }, [dispatch, subjectID, classID]);

  if (error) {
    console.log(error);
  }

  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [selectedSection, setSelectedSection] = useState("attendance");
  const handleSectionChange = (event, newSection) => {
    setSelectedSection(newSection);
  };

  const studentColumns = [
    { id: "rollNum", label: "Roll No.", minWidth: 100 },
    { id: "name", label: "Name", minWidth: 170 },
  ];

  const studentRows = sclassStudents.map((student) => {
    return {
      rollNum: student.rollNum,
      name: student.name,
      id: student._id,
    };
  });

  // Buttons for Attendance Table
  const StudentsAttendanceButtonHaver = ({ row }) => {
    return (
      <Stack direction="row" spacing={1}>
        <Button
          variant="contained"
          sx={buttonStyle}
          onClick={() => navigate("/Admin/students/student/" + row.id)}
        >
          View
        </Button>
        <Button
          variant="contained"
          sx={buttonStyle}
          onClick={() =>
            navigate(`/Admin/subject/student/attendance/${row.id}/${subjectID}`)
          }
        >
          Take Attendance
        </Button>
      </Stack>
    );
  };

  // Buttons for Marks Table
  const StudentsMarksButtonHaver = ({ row }) => {
    return (
      <Stack direction="row" spacing={1}>
        <Button
          variant="contained"
          sx={buttonStyle}
          onClick={() => navigate("/Admin/students/student/" + row.id)}
        >
          View
        </Button>
        <Button
          variant="contained"
          sx={buttonStyle}
          onClick={() =>
            navigate(`/Admin/subject/student/marks/${row.id}/${subjectID}`)
          }
        >
          Provide Marks
        </Button>
      </Stack>
    );
  };

  // Students Tab Section
  const SubjectStudentsSection = () => {
    return (
      <Box sx={{ pb: 7 }}>
        {getresponse ? (
          <Stack alignItems="center" spacing={2} sx={{ mt: 5 }}>
            <Typography variant="h6" color="text.secondary">
              No Students in this Class yet.
            </Typography>
            <Button
              variant="contained"
              sx={buttonStyle}
              onClick={() => navigate("/Admin/class/addstudents/" + classID)}
            >
              Add Students
            </Button>
          </Stack>
        ) : (
          <>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
              mt={1}
            >
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Students List:
              </Typography>
              <Button
                variant="contained"
                sx={buttonStyle}
                onClick={() => navigate("/Admin/class/addstudents/" + classID)}
              >
                Add More Students
              </Button>
            </Stack>

            {selectedSection === "attendance" && (
              <TableTemplate
                buttonHaver={StudentsAttendanceButtonHaver}
                columns={studentColumns}
                rows={studentRows}
              />
            )}
            {selectedSection === "marks" && (
              <TableTemplate
                buttonHaver={StudentsMarksButtonHaver}
                columns={studentColumns}
                rows={studentRows}
              />
            )}

            {/* Bottom Navigation */}
            <Paper
              sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 10,
              }}
              elevation={6}
            >
              <BottomNavigation
                value={selectedSection}
                onChange={handleSectionChange}
                showLabels
              >
                <BottomNavigationAction
                  label="Attendance"
                  value="attendance"
                  icon={
                    <TableChartIcon
                      color={
                        selectedSection === "attendance" ? "primary" : "inherit"
                      }
                    />
                  }
                />
                <BottomNavigationAction
                  label="Marks"
                  value="marks"
                  icon={
                    <InsertChartIcon
                      color={
                        selectedSection === "marks" ? "primary" : "inherit"
                      }
                    />
                  }
                />
              </BottomNavigation>
            </Paper>
          </>
        )}
      </Box>
    );
  };

  // Subject Stat Card
  const SubjectStatCard = ({ title, value, icon: Icon, color }) => (
    <Card
      elevation={3}
      sx={{
        p: 2,
        textAlign: "center",
        height: "100%",
        borderRadius: "12px",
        borderBottom: `4px solid ${color}`,
      }}
    >
      <Icon sx={{ fontSize: 36, color: color, mb: 1 }} />
      <Typography variant="h6" sx={{ fontWeight: 600, color: color }}>
        {value || "N/A"}
      </Typography>
      <Typography variant="subtitle2" color="text.secondary">
        {title}
      </Typography>
    </Card>
  );

  // Detail Item
  const DetailItem = ({ title, value, icon: Icon, color = "text.primary" }) => (
    <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 1 }}>
      <Icon sx={{ fontSize: 24, color: color }} />
      <Box>
        <Typography variant="subtitle2" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 500 }}>
          {value || "N/A"}
        </Typography>
      </Box>
    </Stack>
  );

  // Subject Details Section
  const SubjectDetailsSection = () => {
    const numberOfStudents = sclassStudents.length;
    const teacherAssigned = subjectDetails?.teacher;
    const teacherName = teacherAssigned
      ? subjectDetails.teacher.name
      : "Unassigned";

    return (
      <Card
        sx={{
          borderRadius: "14px",
          overflow: "hidden",
          border: "1px solid #dcdcdc",
        }}
      >
        {/* Header */}
        <Box sx={{ bgcolor: "primary.dark", color: "white", p: 3 }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <MenuBookIcon sx={{ fontSize: 36 }} />
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {subjectDetails?.subName || "Subject Details"}
            </Typography>
          </Stack>
        </Box>

        {/* Body */}
        <CardContent sx={{ p: 4 }}>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={4}>
              <SubjectStatCard
                title="Subject Name"
                value={subjectDetails?.subName}
                icon={MenuBookIcon}
                color="#4caf50"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <SubjectStatCard
                title="Subject Code"
                value={subjectDetails?.subCode}
                icon={TagIcon}
                color="#ff9800"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <SubjectStatCard
                title="Total Sessions"
                value={subjectDetails?.sessions}
                icon={AccessTimeIcon}
                color="#2196f3"
              />
            </Grid>
          </Grid>

          <Divider sx={{ mb: 4 }} />

          {/* Second Row */}
          <Grid container spacing={4}>
            {/* Column 1 */}
            <Grid item xs={12} sm={6}>
              <Typography
                variant="h6"
                sx={{
                  color: "primary.dark",
                  mb: 2,
                  borderBottom: "2px solid #f0f0f0",
                }}
              >
                Context Information
              </Typography>
              <Stack spacing={2}>
                <DetailItem
                  title="Class Name"
                  value={subjectDetails?.sclassName?.sclassName}
                  icon={SchoolIcon}
                  color="secondary.main"
                />
                <DetailItem
                  title="Students Enrolled"
                  value={numberOfStudents}
                  icon={GroupIcon}
                  color="info.main"
                />
              </Stack>
            </Grid>

            {/* Column 2 */}
            <Grid item xs={12} sm={6}>
              <Typography
                variant="h6"
                sx={{
                  color: "primary.dark",
                  mb: 2,
                  borderBottom: "2px solid #f0f0f0",
                }}
              >
                Teacher Status
              </Typography>

              <DetailItem
                title="Teacher Name"
                value={teacherName}
                icon={AssignmentIndIcon}
                color={teacherAssigned ? "success.main" : "error.main"}
              />

              {!teacherAssigned && (
                <Box sx={{ mt: 3, ml: 1 }}>
                  <Button
                    variant="contained"
                    sx={buttonStyle}
                    onClick={() =>
                      navigate(
                        "/Admin/teachers/addteacher/" + subjectDetails._id
                      )
                    }
                  >
                    Assign Teacher Now
                  </Button>
                </Box>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  };

  // Final Render
  return (
    <Container maxWidth="xl" sx={{ m: "0 !important", p: "0 !important" }}>
      {subloading || !subjectDetails ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="80vh"
        >
          <CircularProgress />
          <Typography variant="h6" sx={{ ml: 2 }}>
            Loading Subject Data...
          </Typography>
        </Box>
      ) : (
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
              >
                <Tab label="Details" value="1" />
                <Tab label="Students" value="2" />
              </TabList>
            </Box>

            <Container
              maxWidth="xl"
              sx={{ p: "0 !important", m: "0 !important" }}
            >
              <TabPanel value="1" sx={{ p: 0, mt: 2 }}>
                <SubjectDetailsSection />
              </TabPanel>

              <TabPanel value="2" sx={{ p: 0, mt: 2 }}>
                <SubjectStudentsSection />
              </TabPanel>
            </Container>
          </TabContext>
        </Box>
      )}
    </Container>
  );
};

export default ViewSubject;
