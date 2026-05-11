import React, { useState } from "react";
import {
  Box,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  IconButton,
  Tooltip,
  Typography,
  alpha,
} from "@mui/material";
import { Settings, Logout, Person } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/Urls";

const AccountMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { currentRole, currentUser } = useSelector((state) => state.user);

  const rawProfilePic =
    currentUser?.studentImage ||
    currentUser?.teacherImage ||
    currentUser?.profilePic;

  const profilePic = rawProfilePic
    ? rawProfilePic.startsWith("http")
      ? rawProfilePic
      : `${BASE_URL}/${rawProfilePic.replace(/\\/g, "/")}`
    : "";

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{
              ml: 2,
              padding: "4px",
              border: "2px solid",
              borderColor: open ? "primary.main" : "transparent",
              transition: "0.3s",
            }}
          >
            <Avatar
              src={profilePic}
              sx={{
                width: 35,
                height: 35,
                fontSize: "1rem",
                bgcolor: "primary.main",
              }}
            >
              {String(currentUser?.name || "U")
                .charAt(0)
                .toUpperCase()}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={{
          elevation: 0,
          sx: styles.styledPaper,
        }}
      >
        {/* User Info Header */}
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 700, color: "text.primary" }}
          >
            {currentUser?.name || "User"}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              fontSize: "12px",
              textTransform: "capitalize",
            }}
          >
            {currentRole}
          </Typography>
        </Box>

        <Divider sx={{ my: 0.5, borderStyle: "dashed" }} />

        {/* Menu Items */}
        <MenuItem
          onClick={handleClose}
          component={Link}
          to={`/${currentRole}/profile`}
          sx={styles.menuItem}
        >
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>

        <MenuItem
          onClick={handleClose}
          component={Link}
          to={`/${currentRole}/settings`}
          sx={styles.menuItem}
        >
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>

        <Divider sx={{ my: 0.5, borderStyle: "dashed" }} />

        <MenuItem
          onClick={handleClose}
          component={Link}
          to="/logout"
          sx={{
            ...styles.menuItem,
            color: "error.main",
            "& .MuiSvgIcon-root": { color: "error.main" },
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default AccountMenu;

const styles = {
  styledPaper: {
    overflow: "visible",
    filter: "drop-shadow(0px 10px 20px rgba(0,0,0,0.1))",
    mt: 1.5,
    minWidth: 180,
    borderRadius: "12px",
    border: "1px solid",
    borderColor: "divider",
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
  menuItem: {
    fontSize: "14px",
    fontWeight: 500,
    mx: 1,
    borderRadius: "8px",
    my: 0.3,
    color: "text.secondary",
    textDecoration: "none", // Link ki default line khatam
    "&:hover": {
      bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
      color: "primary.main",
      "& .MuiSvgIcon-root": {
        color: "primary.main",
      },
    },
  },
};
