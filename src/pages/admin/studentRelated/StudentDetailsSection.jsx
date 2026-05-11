import React from "react";
import { Paper, Typography, Box, Button, Collapse, Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowUp from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import CustomPieChart from "../../../components/CustomPieChart"; 

// Component now explicitly accepts all required props
const StudentDetailsSection = ({
  userDetails,
  sclassName,
  studentSchool,
  subjectAttendance,
  overallAttendancePercentage,
  chartData,
  showTab,
  setShowTab,
  name,
  rollNum,
  password,
  setName,
  setRollNum,
  setPassword,
  submitHandler,
  deleteHandler,
  styles, 
  DEEP_PURPLE,
  LIGHT_PURPLE,
}) => {
  // Safety check: if userDetails or styles are not yet available, render nothing or a loading state
  if (!userDetails || !styles) {
    return (
      <Typography variant="h6" align="center" mt={4}>
        Loading Details...
      </Typography>
    );
  }

  return (
    <Paper
      sx={{
        p: 0,
        mt: 3,
        borderRadius: "16px",
        boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
      }}
    >
      {/* Header */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          color: DEEP_PURPLE,
          fontWeight: 700,
          borderBottom: "3px solid #F3E5F5",
          paddingBottom: 1,
          marginBottom: 3,
        }}
      >
        Student Profile Details
      </Typography>

      {/* Profile Details */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6}>
          {/* The error was here, now fixed because styles is passed as prop */}
          <Typography variant="subtitle1" sx={styles.detailText}>
            <Box component="span" fontWeight="bold">
              Name:
            </Box>{" "}
            {userDetails.name}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" sx={styles.detailText}>
            <Box component="span" fontWeight="bold">
              Roll Number:
            </Box>{" "}
            {userDetails.rollNum}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* Added optional chaining for safety in case sclassName is null/undefined */}
          <Typography variant="subtitle1" sx={styles.detailText}>
            <Box component="span" fontWeight="bold">
              Class:
            </Box>{" "}
            {sclassName?.sclassName || "N/A"}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* Added optional chaining for safety in case studentSchool is null/undefined */}
          <Typography variant="subtitle1" sx={styles.detailText}>
            <Box component="span" fontWeight="bold">
              School:
            </Box>{" "}
            {studentSchool?.schoolName || "N/A"}
          </Typography>
        </Grid>
      </Grid>

      {/* Overall Attendance Pie Chart and Percentage */}
      {subjectAttendance &&
        Array.isArray(subjectAttendance) &&
        subjectAttendance.length > 0 && (
          <Box
            sx={{
              height: 300,
              my: 4,
              p: 2,
              border: `1px dashed ${LIGHT_PURPLE}`,
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            {/* Pie Chart Component */}
            <CustomPieChart data={chartData} />

            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", mt: 1, color: DEEP_PURPLE }}
            >
              Overall Attendance: {overallAttendancePercentage.toFixed(2)}%
            </Typography>
          </Box>
        )}

      {/* Action Buttons */}
      <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
        <Button
          variant="contained"
          sx={styles.deleteButton}
          startIcon={<DeleteIcon />}
          onClick={deleteHandler}
        >
          Delete Student
        </Button>

        {/* Edit Details Toggle Button (Purple Theme) */}
        <Button
          variant="contained"
          sx={styles.purpleButton}
          onClick={() => {
            setShowTab(!showTab);
          }}
        >
          {showTab ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          {showTab ? "Hide Edit Form" : "Edit Details"}
        </Button>
      </Box>

      {/* Edit Form Collapse */}
      <Collapse in={showTab} timeout="auto" unmountOnExit>
        <Box
          component="form"
          onSubmit={submitHandler}
          sx={{
            mt: 4,
            p: 4,
            border: `2px solid ${DEEP_PURPLE}`,
            borderRadius: "12px",
            bgcolor: "#FBFBFF",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{ color: DEEP_PURPLE, fontWeight: 600, mb: 3 }}
          >
            Update Student Details
          </Typography>

          {/* Form Fields */}
          <Box
            component="label"
            sx={{ display: "block", marginTop: "10px", fontWeight: "bold" }}
          >
            Name
          </Box>
          <input
            style={styles.inputField}
            type="text"
            placeholder="Enter user's name..."
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name"
            required
          />

          <Box
            component="label"
            sx={{ display: "block", marginTop: "10px", fontWeight: "bold" }}
          >
            Roll Number
          </Box>
          <input
            style={styles.inputField}
            type="number"
            placeholder="Enter user's Roll Number..."
            value={rollNum}
            onChange={(event) => setRollNum(event.target.value)}
            required
          />

          <Box
            component="label"
            sx={{ display: "block", marginTop: "10px", fontWeight: "bold" }}
          >
            Password (Leave empty to keep old)
          </Box>
          <input
            style={styles.inputField}
            type="password"
            placeholder="Enter new password..."
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="new-password"
          />

          <Button
            type="submit"
            variant="contained"
            sx={{ ...styles.purpleButton, mt: 3 }}
            fullWidth
          >
            Update
          </Button>
        </Box>
      </Collapse>
    </Paper>
  );
};

export default StudentDetailsSection;
