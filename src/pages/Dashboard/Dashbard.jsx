import { useState } from "react";
import {
  CssBaseline,
  Box,
  Toolbar,
  Typography,
  Divider,
  IconButton,
  useTheme,
  Drawer as MuiDrawer,
  useMediaQuery,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight"; // Added for collapsed state
import {
  AppBar as StyledAppBar,
  Drawer as StyledDrawer,
} from "../../components/styles";
import SideBar from "./Sidebar";
import AccountMenu from "../../components/AccountMenu";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../utils/Urls";

const drawerWidth = 240;
const collapsedDrawerWidth = 60;

const CommonDashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { currentRole, currentUser } = useSelector((state) => state.user);

  // --- LOGO HANDLING LOGIC ---
  const schoolData = currentUser?.school || currentUser;
  const rawLogo = schoolData?.schoolLogo;
  const schoolName = schoolData?.schoolName || "School Panel";

  const schoolLogo = rawLogo
    ? rawLogo.startsWith("http")
      ? rawLogo
      : `${BASE_URL}/${rawLogo.replace(/\\/g, "/")}`
    : "";

  const toggleDrawer = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setOpen(!open);
    }
  };

  const dashboardTitle = () => {
    switch (currentRole) {
      case "Admin":
        return "Admin Dashboard";
      case "Student":
        return "Student Dashboard";
      case "Teacher":
        return "Teacher Dashboard";
      default:
        return "Dashboard";
    }
  };

  // --- SIDEBAR HEADER (Logo + Toggle Button) ---
  const drawerHeaderContent = (
    <Toolbar
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: open ? "space-between" : "center",
        paddingLeft: "10px !important",
        paddingRight: "10px !important",
        bgcolor: "#fff",
        py: 1,
      }}
    >
      {/* Logo & Name (Sirf tab dikhega jab Open ho) */}
      {open && (
        <Box
          sx={{
            display: "flex",
            alignItems: "left",
            overflow: "hidden",
            mr: 1,
          }}
        >
          <Avatar
            src={schoolLogo}
            alt={schoolName}
            sx={{ width: 150, height: 50, mr: 1.5, borderRadius: "00%" }}
          >
            {schoolName.charAt(0)}
          </Avatar>
        </Box>
      )}

      {/* Collapse/Expand Arrow Button */}
      <IconButton onClick={toggleDrawer} sx={{ color: "#343a40", p: 0.5 }}>
        {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>
    </Toolbar>
  );

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <CssBaseline />

      {/* --- AppBar (Top Bar) --- */}
      <StyledAppBar
        position="fixed"
        open={!isMobile && open}
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          backgroundColor: "#ffffff",
          color: "#1f2d3d",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          // Width Calculation
          width: isMobile
            ? "100%"
            : open
            ? `calc(100% - ${drawerWidth}px)`
            : `calc(100% - ${collapsedDrawerWidth}px)`,
          // Margin Left (Sirf AppBar ko push karna hai)
          ml: isMobile
            ? 0
            : open
            ? `${drawerWidth}px`
            : `${collapsedDrawerWidth}px`,
          transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Toolbar sx={{ pr: "24px", display: "flex", alignItems: "center" }}>
          {/* Mobile Menu Icon */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              display: isMobile ? "flex" : "none", // Desktop par hide, Mobile par show
            }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1 }}>
            <Typography
              component="h1"
              variant="h6"
              noWrap
              sx={{ fontWeight: 600, color: "#1f2d3d" }}
            >
              {dashboardTitle()}
            </Typography>
            <Typography
              variant="body2"
              noWrap
              sx={{ color: "#546e7a", fontSize: "0.85rem", mt: 0.5 }}
            >
              Hello, {currentUser?.name || "User"}
            </Typography>
          </Box>
          <AccountMenu />
        </Toolbar>
      </StyledAppBar>

      {/* --- Sidebar (Navigation Wrapper) --- */}
      <Box
        component="nav"
        sx={{
          width: { md: open ? drawerWidth : collapsedDrawerWidth },
          flexShrink: { md: 0 },
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        {/* MOBILE DRAWER (Temporary) */}
        {isMobile ? (
          <MuiDrawer
            variant="temporary"
            open={mobileOpen}
            onClose={toggleDrawer}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                backgroundColor: "#343a40",
                color: "#ffffff",
              },
            }}
          >
            {drawerHeaderContent}
            <SideBar open={true} />
          </MuiDrawer>
        ) : (
          /* DESKTOP DRAWER */
          <StyledDrawer
            variant="permanent"
            open={open}
            sx={{
              display: { xs: "none", md: "block" },
              "& .MuiDrawer-paper": {
                position: "fixed", 
                backgroundColor: "#343a40",
                color: "#ffffff",
                borderRight: "none",
                whiteSpace: "nowrap",
                width: open ? drawerWidth : collapsedDrawerWidth,
                transition: theme.transitions.create("width", {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.enteringScreen,
                }),
                overflowX: "hidden",
                height: "100vh",
              },
            }}
          >
            {drawerHeaderContent}
            <SideBar open={open} />
          </StyledDrawer>
        )}
      </Box>

      {/* --- Main Content Area --- */}
      <Box
        component="main"
        sx={{
          backgroundColor: "#f4f6f9",
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
          p: 3,
          transition: theme.transitions.create("all", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        <Toolbar /> 
        <Outlet />
      </Box>
    </Box>
  );
};

export default CommonDashboard;
