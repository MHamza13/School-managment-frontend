import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  Box,
  IconButton,
  Typography,
  CircularProgress,
  Stack,
} from "@mui/material";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import { getAllNotices } from "../../../redux/noticeRelated/noticeHandle";
import { deleteUser } from "../../../redux/userRelated/userHandle";
import TableTemplate from "../../../components/TableTemplate";
import { GreenButton } from "../../../components/buttonStyles";

const ShowNotices = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { noticesList, loading, error, response } = useSelector(
    (state) => state.notice
  );
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllNotices(currentUser._id, "Notice"));
  }, [currentUser._id, dispatch]);

  const deleteHandler = (deleteID, address) => {
    dispatch(deleteUser(deleteID, address)).then(() => {
      dispatch(getAllNotices(currentUser._id, "Notice"));
    });
  };

  const noticeColumns = [
    { id: "title", label: "Title", minWidth: 170 },
    { id: "details", label: "Details", minWidth: 100 },
    { id: "date", label: "Date", minWidth: 170 },
  ];

  const noticeRows = Array.isArray(noticesList)
    ? noticesList.map((notice) => {
        const date = new Date(notice.date);
        const dateString = !isNaN(date)
          ? date.toISOString().substring(0, 10)
          : "Invalid Date";
        return {
          title: notice.title,
          details: notice.details,
          date: dateString,
          id: notice._id,
        };
      })
    : [];

  const NoticeButtonHaver = ({ row }) => (
    <IconButton onClick={() => deleteHandler(row.id, "Notice")}>
      <DeleteIcon color="error" />
    </IconButton>
  );

  return (
    <Box>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="200px"
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box display="flex" justifyContent="flex-end" gap={2} mb={2}>
            <GreenButton
              variant="contained"
              startIcon={<NoteAddIcon />}
              onClick={() => navigate("/Admin/addnotice")}
            >
              Add Notice
            </GreenButton>
            <GreenButton
              variant="contained"
              startIcon={<DeleteIcon />}
              color="error"
              onClick={() => deleteHandler(currentUser._id, "Notices")}
            >
              Delete All
            </GreenButton>
          </Box>

          <Paper
            elevation={3}
            sx={{
              backgroundColor: "transparent",
              boxShadow: "none",
            }}
          >
            {noticeRows.length > 0 ? (
              <TableTemplate
                buttonHaver={NoticeButtonHaver}
                columns={noticeColumns}
                rows={noticeRows}
                heading="Notice"
              />
            ) : (
              <Box textAlign="center" py={5}>
                <Typography variant="h6" color="text.secondary">
                  No notices found.
                </Typography>
                <GreenButton
                  variant="contained"
                  sx={{ mt: 2 }}
                  onClick={() => navigate("/Admin/addnotice")}
                >
                  Add Your First Notice
                </GreenButton>
              </Box>
            )}
          </Paper>
        </>
      )}
    </Box>
  );
};

export default ShowNotices;
