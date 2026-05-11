import { Container, Paper, Typography, Box } from "@mui/material";
import { keyframes } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getClassStudents,
  getSubjectDetails,
} from "../../redux/sclassRelated/sclassHandle";
import InfoCardsSection from "../../components/InfoCardsSection";
import NoticeSection from "../../components/NoticeSection";
import PeopleIcon from "@mui/icons-material/People";
import BookIcon from "@mui/icons-material/Book";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const TeacherHomePage = () => {
  const dispatch = useDispatch();
  const { currentUser, loading } = useSelector((state) => state.user);
  const { sclassStudents, subjectDetails } = useSelector(
    (state) => state.sclass
  );

  const classID = currentUser?.teachSclass?._id;
  const subjectID = currentUser?.teachSubject?._id;

  useEffect(() => {
    if (subjectID && classID) {
      dispatch(getSubjectDetails(subjectID, "Subject"));
      dispatch(getClassStudents(classID));
    }
  }, [dispatch, subjectID, classID]);

  const numberOfStudents = sclassStudents?.length || 0;
  const numberOfSessions = subjectDetails?.sessions || 0;
  const numberOfTests = 24;
  const totalHours = 30;

  const cardData = [
    {
      title: "Class Students",
      value: numberOfStudents,
      icon: <PeopleIcon sx={{ fontSize: 40, color: "#42a5f5" }} />,
      duration: 2.5,
      tooltip: "Total number of students in the class",
    },
    {
      title: "Total Lessons",
      value: numberOfSessions,
      icon: <BookIcon sx={{ fontSize: 40, color: "#ef5350" }} />,
      duration: 5,
      tooltip: "Total number of lessons conducted",
    },
    {
      title: "Tests Taken",
      value: numberOfTests,
      icon: <AssignmentIcon sx={{ fontSize: 40, color: "#66bb6a" }} />,
      duration: 4,
      tooltip: "Total number of tests taken",
    },
    {
      title: "Total Hours",
      value: totalHours,
      icon: <AccessTimeIcon sx={{ fontSize: 40, color: "#ab47bc" }} />,
      duration: 4,
      prefix: "",
      suffix: "hrs",
      tooltip: "Total hours spent teaching",
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
          Welcome, {currentUser?.name || "Teacher"}
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.9 }}>
          Manage your classes and track progress.
        </Typography>
      </Paper>

      {/* Info Cards Section */}
      <InfoCardsSection cardData={cardData} fadeIn={fadeIn} isStudent={false} />

      {/* Notices Section */}
      <NoticeSection fadeIn={fadeIn} />
    </Box>
  );
};

export default TeacherHomePage;
