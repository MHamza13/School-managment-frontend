import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSubjectList } from "../../../redux/sclassRelated/sclassHandle";
import { deleteUser } from "../../../redux/userRelated/userHandle";

import { Box, IconButton, Button, Typography, Paper } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import PostAddIcon from "@mui/icons-material/PostAdd";
import VisibilityIcon from "@mui/icons-material/Visibility"; // <-- Icon

import TableTemplate from "../../../components/TableTemplate";
import SpeedDialTemplate from "../../../components/SpeedDialTemplate";
import Popup from "../../../components/Popup";
import { GreenButton } from "../../../components/buttonStyles";

// Custom Purple Color
const DEEP_PURPLE = "#512da8";

const ShowSubjects = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { subjectsList, loading, error } = useSelector((state) => state.sclass);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getSubjectList(currentUser._id, "AllSubjects"));
  }, [currentUser._id, dispatch]);

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const deleteHandler = (deleteID, address) => {
    console.log(deleteID, address);
    setMessage("Sorry, the delete function has been disabled for now.");
    setShowPopup(true);
  };

  const subjectColumns = [
    { id: "subName", label: "Subject Name", minWidth: 170 },
    { id: "sessions", label: "Sessions", minWidth: 100 },
    { id: "sclassName", label: "Class", minWidth: 170 },
    { id: "actions", label: "Actions", minWidth: 120, align: "center" }, // Added Actions column
  ];

  const subjectRows =
    Array.isArray(subjectsList) &&
    subjectsList.map((subject) => ({
      subName: subject.subName,
      sessions: subject.sessions,
      sclassName: subject.sclassName?.sclassName || "N/A",
      sclassID: subject.sclassName?._id,
      id: subject._id,
    }));

  const SubjectsButtonHaver = ({ row }) => {
    return (
      <Box display="flex" gap={1} alignItems="center" justifyContent="center">
        {/* Delete Icon Button */}
        <IconButton onClick={() => deleteHandler(row.id, "Subject")}>
          <DeleteIcon color="error" />
        </IconButton>

        {/* View Icon Button: Color changed to Purple */}
        <IconButton
          sx={{ color: DEEP_PURPLE }} // Applied Purple Color
          onClick={() =>
            navigate(`/Admin/subjects/subject/${row.sclassID}/${row.id}`)
          }
        >
          <VisibilityIcon />
        </IconButton>
      </Box>
    );
  };

  const actions = [
    {
      icon: <PostAddIcon sx={{ color: DEEP_PURPLE }} />, // Purple for SpeedDial
      name: "Add New Subject",
      action: () => navigate("/Admin/subjects/chooseclass"),
    },
    {
      icon: <DeleteIcon color="error" />,
      name: "Delete All Subjects",
      action: () => deleteHandler(currentUser._id, "Subjects"),
    },
  ];

  return (
    <>
      {loading ? (
        <Typography variant="h6" align="center" mt={4}>
          Loading...
        </Typography>
      ) : (
        <>
          {/* Top Right Buttons */}
          <Box display="flex" justifyContent="flex-end" gap={2} mt={2} mb={2}>
            <GreenButton
              variant="contained"
              startIcon={<PostAddIcon />}
              onClick={() => navigate("/Admin/subjects/chooseclass")}
              // Add Subject Button in Purple
              sx={{ bgcolor: DEEP_PURPLE, "&:hover": { bgcolor: "#673ab7" } }}
            >
              Add Subject
            </GreenButton>
            <GreenButton
              variant="contained"
              startIcon={<DeleteIcon />}
              color="error"
              onClick={() => deleteHandler(currentUser._id, "Subjects")}
            >
              Delete All
            </GreenButton>
          </Box>

          {Array.isArray(subjectsList) && subjectsList.length > 0 ? (
            <TableTemplate
              buttonHaver={SubjectsButtonHaver}
              columns={subjectColumns}
              rows={subjectRows}
              heading="Subjects List"
            />
          ) : (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              height="60vh"
              textAlign="center"
            >
              <Typography variant="h4" color="text.secondary" mb={4}>
                No subjects available.
              </Typography>
              <GreenButton
                variant="contained"
                startIcon={<PostAddIcon />}
                onClick={() => navigate("/Admin/subjects/chooseclass")}
                sx={{ bgcolor: DEEP_PURPLE, "&:hover": { bgcolor: "#673ab7" } }}
              >
                Add Subject Now
              </GreenButton>
            </Box>
          )}
        </>
      )}
      <SpeedDialTemplate actions={actions} />
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </>
  );
};

export default ShowSubjects;
