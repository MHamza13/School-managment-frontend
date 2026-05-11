import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllTeachers } from "../../../redux/teacherRelated/teacherHandle";
import { deleteUser } from "../../../redux/userRelated/userHandle";

// Added Avatar for Profile Image
import { IconButton, Typography, Box, Stack, Avatar } from "@mui/material";

import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye"; 
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Fallback icon

import { BlueButton, GreenButton } from "../../../components/buttonStyles";
import SpeedDialTemplate from "../../../components/SpeedDialTemplate";
import Popup from "../../../components/Popup";
import TableTemplate from "../../../components/TableTemplate";
import { BASE_URL } from "../../../utils/Urls"; // Image URL ke liye zaroori

// Custom Purple Color for Theme Consistency
const DEEP_PURPLE = "#512da8";

const ShowTeachers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { teachersList, loading, error, response } = useSelector(
    (state) => state.teacher
  );
  const { currentUser } = useSelector((state) => state.user);

  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    dispatch(getAllTeachers(currentUser._id));
  }, [dispatch, currentUser._id]);

  const deleteHandler = (deleteID, address) => {
    setMessage("Sorry, the delete function has been disabled for now.");
    setShowPopup(true);
  };

  // ✅ Updated Columns (Profile, Education, Status added)
  const columns = [
    { id: "profile", label: "Profile", minWidth: 80 }, 
    { id: "name", label: "Name", minWidth: 150 },
    { id: "teachSubject", label: "Subject", minWidth: 100 },
    { id: "teachSclass", label: "Class", minWidth: 100 },
    { id: "education", label: "Education", minWidth: 120 },
    { id: "status", label: "Status", minWidth: 100 },      
  ];

  // ✅ Updated Rows Logic
  const rows = Array.isArray(teachersList)
    ? teachersList.map((teacher) => {
        // Image URL handling
        const rawProfilePic = teacher.teacherImage || teacher.profilePic;
        const profilePic = rawProfilePic
          ? rawProfilePic.startsWith("http")
            ? rawProfilePic
            : `${BASE_URL}/${rawProfilePic}`
          : null;

        return {
          // 1. Profile: Avatar Show karna
          profile: (
            <Avatar
              src={profilePic}
              alt={teacher.name}
              sx={{ width: 40, height: 40, bgcolor: DEEP_PURPLE }}
            >
              {!profilePic && teacher.name ? teacher.name[0].toUpperCase() : <AccountCircleIcon />}
            </Avatar>
          ),
          
          // 2. Name
          name: teacher.name,

          // 3. Subject
          teachSubject: teacher.teachSubject?.subName || "Not Assigned",

          // 4. Class
          teachSclass: teacher.teachSclass?.sclassName || "N/A",
          teachSclassID: teacher.teachSclass?._id,

          // 5. Education (Agar DB me 'qualification' field hai to wo, nahi to N/A)
          education: teacher.qualification || teacher.education || "N/A",

          // 6. Status (Styled Badge)
          status: (
            <Box
              sx={{
                bgcolor: "#e8f5e9", // Light Green Background
                color: "#2e7d32",   // Dark Green Text
                borderRadius: "12px",
                py: 0.5,
                px: 1.5,
                display: "inline-block",
                fontWeight: "bold",
                fontSize: "0.75rem",
                textAlign: "center"
              }}
            >
              Active
            </Box>
          ),

          // ID for logic
          id: teacher._id,
        };
      })
    : [];

  const TeacherButtonHaver = ({ row }) => {
    return (
      <Stack direction="row" spacing={0.5} justifyContent="center">
        {/* Delete Button */}
        <IconButton onClick={() => deleteHandler(row.id, "Teacher")}>
          <PersonRemoveIcon color="error" />
        </IconButton>

        {/* View Details Button */}
        <IconButton
          onClick={() => navigate("/Admin/teachers/teacher/" + row.id)}
          sx={{ color: DEEP_PURPLE }}
        >
          <RemoveRedEyeIcon />
        </IconButton>

        {/* Add Subject Button (if missing) */}
        {row.teachSubject === "Not Assigned" && (
          <BlueButton
            variant="contained"
            onClick={() =>
              navigate(
                `/Admin/teachers/choosesubject/${row.teachSclassID}/${row.id}`
              )
            }
            size="small"
            sx={{ ml: 1, whiteSpace: "nowrap", fontSize: "0.7rem" }}
          >
            Add Sub
          </BlueButton>
        )}
      </Stack>
    );
  };

  const actions = [
    {
      icon: <PersonAddAlt1Icon color="primary" />,
      name: "Add New Teacher",
      action: () => navigate("/Admin/teachers/chooseclass"),
    },
    {
      icon: <PersonRemoveIcon color="error" />,
      name: "Delete All Teachers",
      action: () => deleteHandler(currentUser._id, "Teachers"),
    },
  ];

  return (
    <>
      <Box display="flex" justifyContent="flex-end" gap={2} mt={2} mb={2}>
        <GreenButton
          variant="contained"
          startIcon={<PersonAddAlt1Icon />}
          onClick={() => navigate("/Admin/teachers/chooseclass")}
          sx={{ bgcolor: DEEP_PURPLE, "&:hover": { bgcolor: "#673ab7" } }}
        >
          Add Teacher
        </GreenButton>
        <GreenButton
          variant="contained"
          color="error"
          startIcon={<PersonRemoveIcon />}
          onClick={() => deleteHandler(currentUser._id, "Teachers")}
        >
          Delete All
        </GreenButton>
      </Box>

      {loading ? (
        <Typography variant="h6" align="center" mt={4}>
          Loading...
        </Typography>
      ) : (
        <>
          {response ? (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              height="60vh"
              textAlign="center"
            >
              <Typography variant="h4" color="text.secondary" mb={2}>
                No Teachers Found
              </Typography>
              <GreenButton
                variant="contained"
                startIcon={<PersonAddAlt1Icon />}
                onClick={() => navigate("/Admin/teachers/chooseclass")}
                sx={{ bgcolor: DEEP_PURPLE, "&:hover": { bgcolor: "#673ab7" } }}
              >
                Add Teacher
              </GreenButton>
            </Box>
          ) : (
            <>
              <TableTemplate
                columns={columns}
                rows={rows}
                heading="Teachers List"
                buttonHaver={TeacherButtonHaver}
              />
              <SpeedDialTemplate actions={actions} />
            </>
          )}
        </>
      )}

      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </>
  );
};

export default ShowTeachers;