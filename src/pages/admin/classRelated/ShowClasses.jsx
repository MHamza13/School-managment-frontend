import { useEffect, useState } from "react";
import {
  IconButton,
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  Tooltip,
  Button,
  Typography,
  Paper,
  Container,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import PostAddIcon from "@mui/icons-material/PostAdd";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import AddCardIcon from "@mui/icons-material/AddCard";
import MoreVertIcon from "@mui/icons-material/MoreVert"; // Use a standard menu icon
import VisibilityIcon from "@mui/icons-material/Visibility";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getAllSclasses } from "../../../redux/sclassRelated/sclassHandle";

import TableTemplate from "../../../components/TableTemplate";
import Popup from "../../../components/Popup";

// Define the custom color used in TableTemplate for consistency
const CustomPurple = "#512da8";

// --- Styled Components for modern look ---

// Styled Paper for a cleaner, more elevated look
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[8],
  backgroundColor: theme.palette.background.paper,
}));

// Primary Action Button (Deep Indigo/Navy)
const PrimaryActionButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#512da8", // Deep Indigo
  color: "#fff",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "#5e3bb0ff",
    transform: "translateY(-2px)",
    boxShadow: theme.shadows[6],
  },
  fontWeight: 600,
  textTransform: "uppercase",
  minWidth: 100,
}));

// Delete Action Button (Error Red)
const DeleteActionButton = styled(PrimaryActionButton)(({ theme }) => ({
  backgroundColor: theme.palette.error.dark,
  "&:hover": {
    backgroundColor: theme.palette.error.main,
    transform: "translateY(-2px)",
    boxShadow: theme.shadows[6],
  },
}));

// --- Action Menu Component (Refactored to use IconButton as trigger) ---
const ActionMenu = ({ actions }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Add Students & Subjects">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{
            color: CustomPurple,
            // Using a slightly different hover effect for menu
            "&:hover": { backgroundColor: `${CustomPurple}10` },
          }}
          aria-controls={open ? "class-action-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="class-action-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 4,
          sx: {
            minWidth: 200,
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.2))",
            mt: 1.5,
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {actions.map((action, index) => (
          <MenuItem key={index} onClick={action.action}>
            <ListItemIcon>{action.icon}</ListItemIcon>
            <Typography variant="body2">{action.name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

// --- Main Component ---
const ShowClasses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { sclassesList, loading, error } = useSelector((state) => state.sclass);
  const { currentUser } = useSelector((state) => state.user);
  const adminID = currentUser._id;

  useEffect(() => {
    dispatch(getAllSclasses(adminID, "Sclass"));
  }, [adminID, dispatch]);

  if (error) {
    console.log(error);
  }

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const deleteHandler = (deleteID, address) => {
    console.log(deleteID);
    console.log(address);
    setMessage("Sorry, the delete function has been disabled for now.");
    setShowPopup(true);
    // Dispatch delete action here if needed
  };

  const sclassColumns = [{ id: "name", label: "Class Name", minWidth: 170 }];

  const sclassRows =
    sclassesList && sclassesList.length > 0
      ? sclassesList.map((sclass) => ({
          name: sclass.sclassName,
          id: sclass._id,
        }))
      : [];

  // --- ButtonHaver Component for Table Actions (Row Level) ---
  const SclassButtonHaver = ({ row }) => {
    const actions = [
      {
        icon: <PostAddIcon color="action" />,
        name: "Add Subjects",
        action: () => navigate("/Admin/addsubject/" + row.id),
      },
      {
        icon: <PersonAddAlt1Icon color="action" />,
        name: "Add Student",
        action: () => navigate("/Admin/class/addstudents/" + row.id),
      },
    ];
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0.5, // Reduced gap for a compact look
        }}
      >
        {/* 1. Delete Action */}
        <Tooltip title="Delete Class">
          <IconButton
            onClick={() => deleteHandler(row.id, "Sclass")}
            color="error"
            size="small"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        {/* 2. View Action */}
        <Tooltip title="View Details">
          <IconButton
            onClick={() => navigate("/Admin/classes/class/" + row.id)}
            size="small"
            sx={{
              color: CustomPurple,
              "&:hover": {
                backgroundColor: `${CustomPurple}10`,
              },
            }}
          >
            <VisibilityIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        {/* 3. More Actions Menu */}
        <ActionMenu actions={actions} />
      </Box>
    );
  };

  // --- Main Render ---
  return (
    <Container maxWidth="xl" sx={{ py: 4 , m: "0 !important" , p: "0 !important" }}>
      {loading ? (
        <Typography
          variant="h5"
          align="center"
          sx={{ mt: 4, color: "text.secondary" }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 200,
            }}
          >
            Loading Class Data...
          </Box>
        </Typography>
      ) : (
        <>
          {/* Main Title and Top Actions (Add/Delete All) */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 700,
                color: CustomPurple,
                mb: 1,
                letterSpacing: 1,
              }}
            >
              CLASS MANAGEMENT
            </Typography>

            <Box display="flex" gap={2}>
              <PrimaryActionButton
                variant="contained"
                startIcon={<AddCardIcon />}
                onClick={() => navigate("/Admin/addclass")}
              >
                Add Class
              </PrimaryActionButton>
              <DeleteActionButton
                variant="contained"
                startIcon={<DeleteIcon />}
                onClick={() => deleteHandler(adminID, "Sclasses")}
              >
                Delete All
              </DeleteActionButton>
            </Box>
          </Box>

          <hr
            style={{
              border: "none",
              height: "1px",
              backgroundColor: "#bdbdbd",
              marginBottom: "30px",
            }}
          />

          <StyledPaper
            style={{
              border: "none",
              padding: "0px",
            }}
          >
            {Array.isArray(sclassesList) && sclassesList.length > 0 ? (
              <TableTemplate
                buttonHaver={SclassButtonHaver}
                columns={sclassColumns}
                rows={sclassRows}
                heading="List of Classes"
              />
            ) : (
              <Box textAlign="center" py={5}>
                <Typography variant="h5" color="textSecondary">
                  <PostAddIcon
                    sx={{ fontSize: 40, mb: 1, color: "text.disabled" }}
                  />
                  <br />
                  No classes available. Start by adding a new class!
                </Typography>
                <PrimaryActionButton
                  onClick={() => navigate("/Admin/addclass")}
                  variant="contained"
                  sx={{ mt: 3 }}
                >
                  Create First Class
                </PrimaryActionButton>
              </Box>
            )}
          </StyledPaper>
        </>
      )}
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </Container>
  );
};

export default ShowClasses;
