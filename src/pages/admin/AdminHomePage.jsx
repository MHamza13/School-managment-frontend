import { Container, Box, Paper, Typography } from "@mui/material";
import { keyframes } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllSclasses } from "../../redux/sclassRelated/sclassHandle";
import { getAllStudents } from "../../redux/studentRelated/studentHandle";
import { getAllTeachers } from "../../redux/teacherRelated/teacherHandle";
import InfoCardsSection from "../../components/InfoCardsSection";
import NoticeSection from "../../components/NoticeSection";
import PersonIcon from "@mui/icons-material/Person";
import ClassIcon from "@mui/icons-material/Class";
import SchoolIcon from "@mui/icons-material/School";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const AdminHomePage = () => {
  const dispatch = useDispatch();
  const { studentsList, loading: studentLoading } = useSelector(
    (state) => state.student
  );
  const { sclassesList, loading: sclassLoading } = useSelector(
    (state) => state.sclass
  );
  const { teachersList, loading: teacherLoading } = useSelector(
    (state) => state.teacher
  );
  const { currentUser } = useSelector((state) => state.user);

  const adminID = currentUser?._id;
  const adminName = currentUser?.name || "Admin";

  useEffect(() => {
    if (adminID && !studentsList && !sclassesList && !teachersList) {
      dispatch(getAllStudents(adminID));
      dispatch(getAllSclasses(adminID, "Sclass"));
      dispatch(getAllTeachers(adminID));
    }
  }, [adminID, dispatch, studentsList, sclassesList, teachersList]);

  const numberOfStudents = studentsList?.length || 0;
  const numberOfClasses = sclassesList?.length || 0;
  const numberOfTeachers = teachersList?.length || 0;
  const feesCollection = 23000;

  const cardData = [
    {
      title: "Total Students",
      value: numberOfStudents,
      icon: <PersonIcon sx={{ fontSize: 40, color: "#42a5f5" }} />,
      delay: 0.5,
      tooltip: "Total number of enrolled students",
    },
    {
      title: "Total Classes",
      value: numberOfClasses,
      icon: <ClassIcon sx={{ fontSize: 40, color: "#66bb6a" }} />,
      delay: 1.0,
      tooltip: "Total number of created classes",
    },
    {
      title: "Total Teachers",
      value: numberOfTeachers,
      icon: <SchoolIcon sx={{ fontSize: 40, color: "#ab47bc" }} />,
      delay: 1.5,
      tooltip: "Total number of registered teachers",
    },
    {
      title: "Fees Collected",
      value: feesCollection,
      icon: <AttachMoneyIcon sx={{ fontSize: 40, color: "#26c6da" }} />,
      delay: 2.0,
      prefix: "$",
      tooltip: "Total amount of fees collected",
    },
  ];

  if (studentLoading || sclassLoading || teacherLoading || !adminID) {
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
          Welcome, {adminName}
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.9 }}>
          Manage your school with real-time data and insights.
        </Typography>
      </Paper>

      {/* Info Cards Section */}
      <InfoCardsSection cardData={cardData} fadeIn={fadeIn} />

      {/* Notices Section */}
      <NoticeSection />
    </Box>
  );
};

export default AdminHomePage;
