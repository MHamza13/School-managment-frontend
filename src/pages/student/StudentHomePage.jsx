import { Container, Paper, Typography, Box } from "@mui/material";
import { keyframes } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserDetails } from "../../redux/userRelated/userHandle";
import { getSubjectList } from "../../redux/sclassRelated/sclassHandle";
import { calculateOverallAttendancePercentage } from "../../components/attendanceCalculator";
import InfoCardsSection from "../../components/InfoCardsSection";
import NoticeSection from "../../components/NoticeSection";
import BookIcon from "@mui/icons-material/Book";
import AssignmentIcon from "@mui/icons-material/Assignment";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const StudentHomePage = () => {
  const dispatch = useDispatch();
  const { userDetails, currentUser, loading, response } = useSelector(
    (state) => state.user
  );
  const { subjectsList } = useSelector((state) => state.sclass);
  const [subjectAttendance, setSubjectAttendance] = useState([]);

  const classID = currentUser?.sclassName?._id;

  useEffect(() => {
    if (currentUser?._id && classID) {
      dispatch(getUserDetails(currentUser._id, "Student"));
      dispatch(getSubjectList(classID, "ClassSubjects"));
    }
  }, [dispatch, currentUser, classID]);

  useEffect(() => {
    if (userDetails) {
      setSubjectAttendance(userDetails.attendance || []);
    }
  }, [userDetails]);

  const numberOfSubjects = subjectsList?.length || 0;
  const numberOfAssignments = 15; 
  const overallAttendancePercentage =
    calculateOverallAttendancePercentage(subjectAttendance);
  const overallAbsentPercentage = 100 - overallAttendancePercentage;

  const cardData = [
    {
      title: "Total Subjects",
      value: numberOfSubjects,
      icon: <BookIcon sx={{ fontSize: 40, color: "#ef5350" }} />,
      duration: 2.5,
      tooltip: "Total number of subjects enrolled",
    },
    {
      title: "Total Assignments",
      value: numberOfAssignments,
      icon: <AssignmentIcon sx={{ fontSize: 40, color: "#42a5f5" }} />,
      duration: 4,
      tooltip: "Total number of assignments assigned",
    },
    {
      title: "Attendance",
      chartData: [
        { name: "Present", value: overallAttendancePercentage },
        { name: "Absent", value: overallAbsentPercentage },
      ],
      isEmpty:
        response ||
        !subjectAttendance ||
        !Array.isArray(subjectAttendance) ||
        subjectAttendance.length === 0,
      tooltip: "Overall attendance percentage",
    },
  ];

  if (loading || !currentUser) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h6" align="center" color="text.secondary">
          Loading...
        </Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ bgcolor: "#f3f4f6", minHeight: "100vh" }}>
      {/* Header */}
      <Paper
        sx={{
          p: 4,
          mb: 5,
          background: "linear-gradient(to right, #7b1fa2, #512da8)",
          color: "#fff",
          borderRadius: 3,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          animation: `${fadeIn} 0.5s ease-in-out`,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Welcome, {currentUser?.name || "Student"}
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.9 }}>
          Track your academic progress and stay updated.
        </Typography>
      </Paper>

      {/* Info Cards Section */}
      <InfoCardsSection cardData={cardData} fadeIn={fadeIn} isStudent={true} />

      {/* Notices Section */}
      <NoticeSection fadeIn={fadeIn} />
    </Box>
  );
};

export default StudentHomePage;
