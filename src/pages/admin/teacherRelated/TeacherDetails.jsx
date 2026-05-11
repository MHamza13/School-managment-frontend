import React, { useEffect } from "react";
import { getTeacherDetails } from "../../../redux/teacherRelated/teacherHandle";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Stack,
  CircularProgress,
  Chip,
  Divider,
} from "@mui/material";

// --- Attractive Icons for Styling ---
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import AddIcon from "@mui/icons-material/Add";
// --- Custom Button Import (Assuming GreenButton is available) ---
import { GreenButton } from "../../../components/buttonStyles";

// Custom Purple Color
const DEEP_PURPLE = "#512da8";

// Helper component for styled detail display
const DetailItemCard = ({ title, value, icon: Icon, color }) => (
  <Card
    elevation={4}
    sx={{
      height: "100%",
      borderRadius: "12px",
      p: 2.5,
      // Left border highlights the card
      borderLeft: `6px solid ${color}`,
      transition: "transform 0.3s, box-shadow 0.3s",
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: 8,
      },
    }}
  >
    <Stack direction="row" alignItems="center" spacing={2}>
      <Icon sx={{ fontSize: 32, color: color }} />
      <Box>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ fontWeight: 600 }}
        >
          {title}
        </Typography>
        <Typography
          variant="h5"
          sx={{ fontWeight: 600, color: "text.primary", mt: 0.5 }} // Boldness reduced to 600
        >
          {value || "N/A"}
        </Typography>
      </Box>
    </Stack>
  </Card>
);

const TeacherDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { loading, teacherDetails, error } = useSelector(
    (state) => state.teacher
  );

  const teacherID = params.id;

  useEffect(() => {
    dispatch(getTeacherDetails(teacherID));
  }, [dispatch, teacherID]);

  if (error) {
    console.log(error);
  }

  const isSubjectNamePresent = teacherDetails?.teachSubject?.subName;

  const handleAddSubject = () => {
    navigate(
      `/Admin/teachers/choosesubject/${teacherDetails?.teachSclass?._id}/${teacherDetails?._id}`
    );
  };

  return (
    <Container maxWidth="xl" sx={{ p: "0 !important" , m: "0 !important" }}>
      {loading || !teacherDetails ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <CircularProgress sx={{ mb: 2 }} />
          <Typography variant="h6">Loading Teacher Data...</Typography>
        </Box>
      ) : (
        <Card elevation={15} sx={{ borderRadius: "10px", overflow: "hidden" }}>
          <Box
            sx={{
              bgcolor: DEEP_PURPLE,
              color: "white",
              p: 4,
            }}
          >
            <Stack direction="row" spacing={4} alignItems="center">
              {/* Left: Image Placeholder (Circular Avatar) */}
              <Box
                sx={{
                  height: 120,
                  width: 120,
                  borderRadius: "50%",
                  bgcolor: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  boxShadow: "0 0 0 5px rgba(255, 255, 255, 0.3)",
                }}
              >
                <PersonIcon sx={{ fontSize: 70, color: DEEP_PURPLE }} />
              </Box>

              {/* Right: Text Details */}
              <Box>
                <Typography variant="h3" sx={{ fontWeight: 600 }}>
                  {teacherDetails?.name || "Teacher Profile"}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ mt: 0.5, opacity: 0.9, fontWeight: 500 }}
                >
                  Teacher ID: {teacherDetails?._id || "N/A"}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ mt: 1, opacity: 0.8, fontStyle: "italic" }}
                >
                  Detailed Profile Overview
                </Typography>
              </Box>
            </Stack>
          </Box>
          {/* --------------------------------------------------- */}

          <CardContent sx={{ p: 5 }}>
            {/* General Information Section */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h5"
                sx={{
                  color: DEEP_PURPLE,
                  fontWeight: 700,
                  mb: 3,
                  borderBottom: `2px solid ${DEEP_PURPLE}`,
                  pb: 1,
                  display: "inline-block",
                }}
              >
                General Information
              </Typography>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <DetailItemCard
                    title="Assigned Class"
                    value={teacherDetails?.teachSclass?.sclassName}
                    icon={SchoolIcon}
                    color="#00bcd4" // Cyan/Teal for contrast
                  />
                </Grid>
              </Grid>
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* Subject Assignment Status Section */}
            <Box>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 3 }}
              >
                <Typography
                  variant="h5"
                  sx={{ color: DEEP_PURPLE, fontWeight: 700 }}
                >
                  Subject Assignment Status
                </Typography>
                {/* Status Chip placed next to the relevant title */}
                <Chip
                  label={isSubjectNamePresent ? "Assigned" : "Pending"}
                  color={isSubjectNamePresent ? "success" : "warning"}
                  icon={
                    isSubjectNamePresent ? (
                      <AssignmentTurnedInIcon />
                    ) : (
                      <AssignmentLateIcon />
                    )
                  }
                  sx={{ fontWeight: "bold", fontSize: "0.9rem", p: 1 }}
                />
              </Stack>

              <Grid container spacing={4}>
                {isSubjectNamePresent ? (
                  <>
                    <Grid item xs={12} sm={6}>
                      <DetailItemCard
                        title="Subject Name"
                        value={teacherDetails?.teachSubject?.subName}
                        icon={MenuBookIcon}
                        color="#4caf50" // Green for subject
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <DetailItemCard
                        title="Sessions Per Week"
                        value={teacherDetails?.teachSubject?.sessions}
                        icon={AccessTimeIcon}
                        color="#ff5722" // Deep Orange for time
                      />
                    </Grid>
                  </>
                ) : (
                  <Grid item xs={12} textAlign="center" mt={4}>
                    <Typography
                      variant="h6"
                      color="text.secondary"
                      sx={{ mb: 4, fontStyle: "italic" }}
                    >
                      ⚠️ This teacher is currently **not assigned** to any
                      subject. Please assign one below.
                    </Typography>
                    <GreenButton
                      variant="contained"
                      onClick={handleAddSubject}
                      startIcon={<AddIcon />}
                      size="large"
                      sx={{
                        minHeight: 55,
                        fontSize: "1.2rem",
                        fontWeight: 700,
                        px: 4,
                      }}
                    >
                      Assign Subject Now
                    </GreenButton>
                  </Grid>
                )}
              </Grid>
            </Box>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default TeacherDetails;
