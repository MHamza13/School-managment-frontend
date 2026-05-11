import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllStudents } from "../../../redux/studentRelated/studentHandle";
import { deleteUser } from "../../../redux/userRelated/userHandle";

import {
  Paper,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Button,
  ButtonGroup,
  Typography,
  Chip,
  Avatar,
  Tooltip,
} from "@mui/material";

// --- Icons ---
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EmailIcon from "@mui/icons-material/Email";

import TableTemplate from "../../../components/TableTemplate";
import SpeedDialTemplate from "../../../components/SpeedDialTemplate";
import Popup from "../../../components/Popup";
import { calculateOverallAttendancePercentage } from "../../../components/attendanceCalculator";
import { BASE_URL } from "../../../utils/Urls";

// Custom Colors
const DEEP_PURPLE = "#512da8";
const PURPLE_HOVER = "#673ab7";

const ShowStudents = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { studentsList, loading } = useSelector((state) => state.student);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllStudents(currentUser._id));
  }, [currentUser._id, dispatch]);

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const deleteHandler = (deleteID, address) => {
    setMessage("Sorry, the delete function has been disabled for now.");
    setShowPopup(true);
  };

  // --- Table Columns based on your data structure ---
  const studentColumns = [
    { id: "info", label: "Student Info", minWidth: 220 },
    { id: "rollNum", label: "Roll No.", minWidth: 80 },
    { id: "fatherName", label: "Father Name", minWidth: 150 },
    { id: "sclassName", label: "Class", minWidth: 80 },
    { id: "status", label: "Status", minWidth: 100 },
    { id: "attendance", label: "Atten. %", minWidth: 100 },
  ];

  const studentRows = Array.isArray(studentsList)
    ? studentsList.map((student) => {
        const attendancePercentage = calculateOverallAttendancePercentage(
          student.attendance || []
        );

        // Image path handling (Backend static folder)
        const publicURL = BASE_URL;

        return {
          id: student._id,
          rollNum: student.rollNum,
          fatherName: student.fatherName || "N/A",
          sclassName: student.sclassName?.sclassName || "N/A",
          attendance: `${attendancePercentage}%`,

          // --- Custom Student Info Column (Image + Name + Email) ---
          info: (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar
                src={
                  student.studentImage
                    ? `${publicURL}${student.studentImage.replace("\\", "/")}`
                    : ""
                }
                alt={student.name}
              />
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                  {student.name}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <EmailIcon sx={{ fontSize: 12, color: "text.secondary" }} />
                  <Typography variant="caption" color="textSecondary">
                    {student.email}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ),

          // --- Status Column (using backend 'Active' field) ---
          status: (
            <Chip
              label={student.status || "Inactive"}
              size="small"
              sx={{
                bgcolor: student.status === "Active" ? "#e8f5e9" : "#f5f5f5",
                color: student.status === "Active" ? "#2e7d32" : "#757575",
                fontWeight: "bold",
                borderRadius: "6px",
              }}
            />
          ),
        };
      })
    : [];

  // --- UI Components ---
  const PurpleBtn = ({ children, ...props }) => (
    <Button
      {...props}
      sx={{
        bgcolor: DEEP_PURPLE,
        color: "#fff",
        "&:hover": { bgcolor: PURPLE_HOVER },
        textTransform: "none",
        fontWeight: 600,
        borderRadius: "8px",
        ...props.sx,
      }}
    >
      {children}
    </Button>
  );

  const StudentButtonHaver = ({ row }) => {
    const options = ["Take Attendance", "Provide Marks"];
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [menuAnchor, setMenuAnchor] = useState(null);

    return (
      <Box display="flex" gap={1} alignItems="center" justifyContent="center">
        <Tooltip title="Delete">
          <IconButton onClick={() => deleteHandler(row.id, "Student")}>
            <PersonRemoveIcon color="error" />
          </IconButton>
        </Tooltip>

        <Tooltip title="View Profile">
          <IconButton
            onClick={() => navigate(`/Admin/students/student/${row.id}`)}
            sx={{ color: DEEP_PURPLE }}
          >
            <VisibilityIcon />
          </IconButton>
        </Tooltip>

        <ButtonGroup variant="contained" size="small">
          <PurpleBtn
            onClick={() =>
              navigate(
                selectedIndex === 0
                  ? `/Admin/students/student/attendance/${row.id}`
                  : `/Admin/students/student/marks/${row.id}`
              )
            }
          >
            {options[selectedIndex]}
          </PurpleBtn>
          <Button
            sx={{ bgcolor: DEEP_PURPLE, minWidth: "40px" }}
            onClick={(e) => setMenuAnchor(e.currentTarget)}
          >
            <MoreVertIcon sx={{ color: "white" }} />
          </Button>
        </ButtonGroup>

        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={() => setMenuAnchor(null)}
        >
          {options.map((option, index) => (
            <MenuItem
              key={option}
              selected={index === selectedIndex}
              onClick={() => {
                setSelectedIndex(index);
                setMenuAnchor(null);
              }}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </Box>
    );
  };

  return (
    <Box>
      {loading ? (
        <Typography variant="h6" align="center" mt={4}>
          Loading Data...
        </Typography>
      ) : (
        <>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={4}
          >
            <Typography variant="h4" fontWeight="bold" color={DEEP_PURPLE}>
              Students List
            </Typography>
            <Box display="flex" gap={2}>
              <PurpleBtn
                startIcon={<PersonAddAlt1Icon />}
                onClick={() => navigate("/Admin/addstudents")}
              >
                Add Student
              </PurpleBtn>
              <Button
                variant="outlined"
                startIcon={<PersonRemoveIcon />}
                color="error"
                onClick={() => deleteHandler(currentUser._id, "Students")}
              >
                Delete All
              </Button>
            </Box>
          </Box>

          {studentRows.length > 0 ? (
            <Paper
              sx={{
                width: "100%",
                overflow: "hidden",
                borderRadius: "16px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}
            >
              <TableTemplate
                buttonHaver={StudentButtonHaver}
                columns={studentColumns}
                rows={studentRows}
              />
            </Paper>
          ) : (
            <Box textAlign="center" mt={10}>
              <Typography variant="h5" color="text.secondary">
                No students enrolled yet.
              </Typography>
              <PurpleBtn
                sx={{ mt: 2 }}
                onClick={() => navigate("/Admin/addstudents")}
              >
                Add Now
              </PurpleBtn>
            </Box>
          )}
        </>
      )}
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </Box>
  );
};

export default ShowStudents;
