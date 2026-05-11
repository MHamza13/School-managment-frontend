import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubjectList } from "../../redux/sclassRelated/sclassHandle";
import {
  BottomNavigation,
  BottomNavigationAction,
  Container,
  Paper,
  Table,
  TableBody,
  TableHead,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  createTheme,
  ThemeProvider,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Avatar,
} from "@mui/material";
import { getUserDetails } from "../../redux/userRelated/userHandle";
import CustomBarChart from "../../components/CustomBarChart";

import InsertChartIcon from "@mui/icons-material/InsertChart";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import TableChartIcon from "@mui/icons-material/TableChart";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import SchoolIcon from "@mui/icons-material/School";
import BookIcon from "@mui/icons-material/Book";
import SubjectIcon from "@mui/icons-material/Subject"; // Added for subject avatars
import { purple, deepPurple } from "@mui/material/colors";
import { StyledTableCell, StyledTableRow } from "../../components/styles";

// Create a custom theme with purple as primary color
const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: deepPurple[300],
    },
    background: {
      paper: "#ffff", // Light purple background for paper elements
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h4: {
      fontWeight: 600,
      color: purple[800],
    },
    h5: {
      color: purple[700],
    },
    h6: {
      color: purple[600],
    },
    subtitle1: {
      color: deepPurple[500],
    },
  },
  components: {
    MuiTable: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff",
          borderRadius: 8,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: purple[50],
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(6, 0, 6, 0.1)",
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 6px 16px rgba(6, 0, 6, 0.1)",
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: purple[100],
          color: purple[800],
        },
      },
    },
  },
});

const StudentSubjects = () => {
  const dispatch = useDispatch();
  const { subjectsList, sclassDetails } = useSelector((state) => state.sclass);
  const { userDetails, currentUser, loading, response, error } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(getUserDetails(currentUser._id, "Student"));
  }, [dispatch, currentUser._id]);

  if (response) {
    console.log(response);
  } else if (error) {
    console.log(error);
  }

  const [subjectMarks, setSubjectMarks] = useState([]);
  const [selectedSection, setSelectedSection] = useState("table");

  useEffect(() => {
    if (userDetails) {
      setSubjectMarks(userDetails.examResult || []);
    }
  }, [userDetails]);

  useEffect(() => {
    if (subjectMarks.length === 0 && currentUser?.sclassName?._id) {
      dispatch(getSubjectList(currentUser.sclassName._id, "ClassSubjects"));
    }
  }, [subjectMarks, dispatch, currentUser.sclassName._id]);

  const handleSectionChange = (event, newSection) => {
    setSelectedSection(newSection);
  };

  const renderTableSection = () => {
    return (
      <Paper elevation={3} sx={{ p: 3, borderRadius: 4, mb: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Subject Marks
        </Typography>
        <Table>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Subject</StyledTableCell>
              <StyledTableCell>Marks</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {subjectMarks.map((result, index) => {
              if (!result.subName || !result.marksObtained) {
                return null;
              }
              return (
                <StyledTableRow key={index}>
                  <StyledTableCell>{result.subName.subName}</StyledTableCell>
                  <StyledTableCell>{result.marksObtained}</StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  };

  const renderChartSection = () => {
    return (
      <Paper elevation={3} sx={{ p: 3, borderRadius: 4, mb: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Subject Marks Chart
        </Typography>
        <CustomBarChart
          chartData={subjectMarks}
          dataKey="marksObtained"
          barColor={purple[500]} // Pass purple color to the chart
        />
      </Paper>
    );
  };

  const renderClassDetailsSection = () => {
    return (
      <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
        <Typography variant="h4" align="left" gutterBottom>
          Class Details
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <SchoolIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={`You are currently in Class ${
                sclassDetails && sclassDetails.sclassName
              }`}
              primaryTypographyProps={{ variant: "h5" }}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <BookIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Your Subjects:"
              primaryTypographyProps={{ variant: "h6" }}
            />
          </ListItem>
        </List>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {subjectsList &&
            subjectsList.map((subject, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardHeader
                    avatar={
                      <Avatar>
                        <SubjectIcon />
                      </Avatar>
                    }
                    title={subject.subName}
                    subheader={`Code: ${subject.subCode}`}
                    titleTypographyProps={{
                      variant: "subtitle1",
                      fontWeight: 600,
                    }}
                    subheaderTypographyProps={{
                      variant: "body2",
                      color: "text.secondary",
                    }}
                  />
                  <CardContent sx={{ pt: 0 }}>
                    {/* You can add more details here if available, like teacher name or description */}
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Paper>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      {loading ? (
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Typography variant="h5">Loading...</Typography>
        </Container>
      ) : (
        <Container
          sx={{
            padding: "0 !important",
            maxWidth: "100% !important",
            mt: 0,
            mb: 0,
          }}
        >
          {subjectMarks &&
          Array.isArray(subjectMarks) &&
          subjectMarks.length > 0 ? (
            <>
              {selectedSection === "table" && renderTableSection()}
              {selectedSection === "chart" && renderChartSection()}

              <Paper
                sx={{
                  position: "fixed",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  zIndex: 1300,
                }}
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
            renderClassDetailsSection()
          )}
        </Container>
      )}
    </ThemeProvider>
  );
};

export default StudentSubjects;
