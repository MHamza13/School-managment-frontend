import * as React from "react";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Box,
  Avatar,
  Typography,
  Divider,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../utils/Urls";

// Icons imports
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AnnouncementOutlinedIcon from "@mui/icons-material/AnnouncementOutlined";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
import SupervisorAccountOutlinedIcon from "@mui/icons-material/SupervisorAccountOutlined";
import ReportIcon from "@mui/icons-material/Report";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SchoolIcon from "@mui/icons-material/School";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PaymentIcon from "@mui/icons-material/Payment";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import GradeIcon from "@mui/icons-material/Grade";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const SideBar = ({ open }) => {
  const { currentRole, currentUser } = useSelector((state) => state.user);
  const location = useLocation();

  const colors = {
    background: "#ffffff",
    sidebarBorder: "#eef0f2",
    activeBg: "#f3e5f5",
    activeText: "#7b1fa2",
    inactiveText: "#5f6368",
    subheader: "#9aa0a6",
    hoverBg: "#f8f9fa",
  };

  const rawProfilePic = currentUser?.studentImage || currentUser?.teacherImage || currentUser?.profilePic;
  const profilePic = rawProfilePic
    ? rawProfilePic.startsWith("http")
      ? rawProfilePic
      : `${BASE_URL}/${rawProfilePic.replace(/\\/g, "/")}`
    : "";

  const schoolName = currentUser?.school?.schoolName || "School Panel";

  const getMenuGroups = () => {
    // 1. Profile Item (Common)
    const profileItem = {
      label: "My Profile",
      path: `/${currentRole}/profile`,
      icon: (
        <Avatar
          src={profilePic}
          sx={{
            width: 24,
            height: 24,
            border: location.pathname.includes("profile") 
              ? `2px solid ${colors.activeText}` 
              : `1px solid ${colors.sidebarBorder}`,
          }}
        >
          {!profilePic && <AccountCircleIcon sx={{ fontSize: "1.3rem" }} />}
        </Avatar>
      ),
    };

    // 2. Dashboard Item (Common)
    const dashboardItem = { label: "Dashboard", path: "/", icon: <DashboardIcon /> };

    // Common Groups structure
    const profileGroup = { subheader: "", items: [profileItem] }; // No subheader text
    const mainGroup = { subheader: "Main", items: [dashboardItem] };

    switch (currentRole) {
      case "Admin":
        return [
          profileGroup, // Profile Sabse Upar
          mainGroup,    // Main mein sirf Dashboard
          { subheader: "Management", items: [
            { label: "Classes", path: "/Admin/classes", icon: <ClassOutlinedIcon /> },
            { label: "Subjects", path: "/Admin/subjects", icon: <AssignmentIcon /> },
            { label: "Teachers", path: "/Admin/teachers", icon: <SupervisorAccountOutlinedIcon /> },
            { label: "Students", path: "/Admin/students", icon: <PersonOutlineIcon /> },
          ]},
          { subheader: "Academics", items: [
            { label: "Timetable", path: "/Admin/timetable", icon: <CalendarTodayIcon /> },
            { label: "Exams", path: "/Admin/exams", icon: <AssessmentIcon /> },
            { label: "Results", path: "/Admin/results", icon: <GradeIcon /> },
          ]},
          { subheader: "Services", items: [
            { label: "Fees", path: "/Admin/fees", icon: <PaymentIcon /> },
            { label: "Library", path: "/Admin/library", icon: <LibraryBooksIcon /> },
            { label: "Transport", path: "/Admin/transport", icon: <LocalTaxiIcon /> },
          ]},
          { subheader: "Communication", items: [
            { label: "Notices", path: "/Admin/notices", icon: <AnnouncementOutlinedIcon /> },
            { label: "Complains", path: "/Admin/complains", icon: <ReportIcon /> },
          ]},
          { subheader: "System", items: [
            { label: "Reports", path: "/Admin/reports", icon: <BarChartIcon /> },
            { label: "Settings", path: "/Admin/settings", icon: <SettingsIcon /> },
          ]},
        ];
      case "Student":
        return [
          profileGroup,
          mainGroup,
          { subheader: "Academics", items: [
            { label: "Subjects", path: "/Student/subjects", icon: <AssignmentIcon /> },
            { label: "Timetable", path: "/Student/timetable", icon: <CalendarTodayIcon /> },
            { label: "Attendance", path: "/Student/attendance", icon: <ClassOutlinedIcon /> },
            { label: "Assignments", path: "/Student/assignments", icon: <AssignmentTurnedInIcon /> },
            { label: "Exams", path: "/Student/exams", icon: <AssessmentIcon /> },
            { label: "Results", path: "/Student/results", icon: <GradeIcon /> },
          ]},
          { subheader: "Services", items: [
            { label: "Fees", path: "/Student/fees", icon: <PaymentIcon /> },
            { label: "Library", path: "/Student/library", icon: <LibraryBooksIcon /> },
            { label: "Complain", path: "/Student/complain", icon: <AnnouncementOutlinedIcon /> },
          ]},
        ];
      case "Teacher":
        return [
          profileGroup,
          mainGroup,
          { subheader: "Classroom", items: [
            { label: `Class ${currentUser?.teachSclass?.sclassName || ""}`, path: "/Teacher/class", icon: <ClassOutlinedIcon /> },
            { label: "Timetable", path: "/Teacher/timetable", icon: <CalendarTodayIcon /> },
            { label: "Attendance", path: "/Teacher/attendance", icon: <ClassOutlinedIcon /> },
            { label: "Assignments", path: "/Teacher/assignments", icon: <AssignmentTurnedInIcon /> },
            { label: "Exams", path: "/Teacher/exams", icon: <AssessmentIcon /> },
            { label: "Grades", path: "/Teacher/grades", icon: <GradeIcon /> },
            { label: "Complain", path: "/Teacher/complain", icon: <AnnouncementOutlinedIcon /> },
          ]},
        ];
      default: return [];
    }
  };

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/" || location.pathname === `/${currentRole}/dashboard`;
    }
    return location.pathname.startsWith(path);
  };

  const renderListItem = (item) => {
    const active = isActive(item.path);
    return (
      <ListItemButton
        key={item.label}
        component={Link}
        to={item.path}
        sx={{
          borderRadius: "0 24px 24px 0",
          mr: 1.5,
          mb: 0.5,
          py: 1,
          pl: 1, 
          backgroundColor: active ? colors.activeBg : "transparent",
          color: active ? colors.activeText : colors.inactiveText,
          "&:hover": { backgroundColor: active ? colors.activeBg : colors.hoverBg },
        }}
      >
        <ListItemIcon
          sx={{
            color: active ? colors.activeText : colors.inactiveText,
            minWidth: 40,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {React.isValidElement(item.icon) && item.icon.type === Avatar 
            ? item.icon 
            : React.cloneElement(item.icon, { sx: { fontSize: "1.3rem" } })
          }
        </ListItemIcon>
        {open && (
          <ListItemText
            primary={item.label}
            primaryTypographyProps={{
              fontSize: "0.88rem",
              fontWeight: active ? 600 : 500,
              ml: 1, 
            }}
          />
        )}
      </ListItemButton>
    );
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%", bgcolor: colors.background, borderRight: `1px solid ${colors.sidebarBorder}` }}>
      <Divider sx={{ mb: 1, opacity: 0.5 }} />
      
      {/* Branding Header */}
      <Box sx={{ p: 2, display: "flex", alignItems: "center", minHeight: 80, justifyContent: open ? "flex-start" : "center" }}>
        <Avatar variant="rounded" sx={{ width: 40, height: 40, bgcolor: colors.activeText, boxShadow: "0 4px 10px rgba(123, 31, 162, 0.2)" }}>
          <SchoolIcon sx={{ color: "#fff" }} />
        </Avatar>
        {open && (
          <Box sx={{ ml: 2, overflow: "hidden" }}>
            <Typography variant="subtitle2" noWrap sx={{ fontWeight: 800, color: "#202124" }}>{schoolName}</Typography>
            <Typography variant="caption" sx={{ color: colors.activeText, fontWeight: 700 }}>{currentRole} Portal</Typography>
          </Box>
        )}
      </Box>

      <Divider sx={{ mb: 1, opacity: 0.5 }} />

      {/* Navigation Menu */}
      <Box sx={{ flexGrow: 1, overflowY: "auto", overflowX: "hidden", "&::-webkit-scrollbar": { width: "4px" }, "&::-webkit-scrollbar-thumb": { background: "#D1D5DB", borderRadius: "10px" } }}>
        {getMenuGroups().map((group, groupIndex) => (
          <Box key={groupIndex} sx={{ mb: 1.5 }}>
            {/* Condition updated: Subheader tabhi dikhega jab open ho aur text exist karta ho */}
            {open && group.subheader && (
              <ListSubheader sx={{ bgcolor: "transparent", color: colors.subheader, lineHeight: "34px", fontWeight: 700, fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.8px", pl: 3 }}>
                {group.subheader}
              </ListSubheader>
            )}
            {group.items.map(renderListItem)}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SideBar;