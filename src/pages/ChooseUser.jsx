import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid, Paper, Box, Container, Typography,
  CircularProgress, Backdrop, Stack, alpha, Button, Divider
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/userRelated/userHandle";
import Popup from "../components/Popup";
import {
  UserCog, GraduationCap, UsersRound, 
  ArrowRight, Home, ShieldCheck, LifeBuoy, Circle
} from "lucide-react";

const ChooseUser = ({ visitor }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const password = "zxc";
  const { status, currentUser, currentRole } = useSelector((state) => state.user);

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  // Updated to your premium color
  const colors = {
    primary: "#7b1fa2", 
    secondary: "#7b1fa2",
    dark: "#0f172a",
    lightText: "#64748b",
  };

  const navigateHandler = (user) => {
    const guestCredentials = {
      Admin: { email: "yogendra@12", password },
      Student: { rollNum: "1", studentName: "Dipesh Awasthi", password },
      Teacher: { email: "tony@12", password },
    };

    if (visitor === "guest") {
      setLoader(true);
      dispatch(loginUser(guestCredentials[user], user));
    } else {
      navigate(`/${user}login`);
    }
  };

  useEffect(() => {
    if (status === "success" || currentUser !== null) {
      navigate(`/${currentRole}/dashboard`);
    } else if (status === "error") {
      setLoader(false);
      setMessage("Network Error");
      setShowPopup(true);
    }
  }, [status, currentRole, navigate, currentUser]);

  return (
    <Box sx={{
      width: "100vw", minHeight: "100vh",
      background: `radial-gradient(circle at 50% 0%, ${alpha(colors.primary, 0.05)} 0%, #f8fafc 100%)`,
      display: "flex", flexDirection: "column",
      alignItems: "center", position: "relative", overflowX: "hidden", p: { xs: 2, md: 4 },
    }}>
      
      {/* Decorative Background Elements */}
      <Box sx={{
        position: "absolute", top: "20%", right: "-5%", width: 400, height: 400,
        background: alpha(colors.primary, 0.03), filter: "blur(100px)", borderRadius: "50%", zIndex: 0
      }} />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, my: "auto" }}>
        {/* Header Section */}
        <Stack spacing={2} alignItems="center" sx={{ mb: { xs: 6, md: 10 } }}>
          <Stack direction="row" spacing={1} alignItems="center" sx={{
            bgcolor: "#fff", px: 2, py: 0.8, borderRadius: "50px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.05)"
          }}>
            <ShieldCheck size={16} color={colors.primary} />
            <Typography variant="caption" sx={{ color: colors.dark, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>
              Enterprise Grade Security
            </Typography>
          </Stack>
          
          {/* Main Heading with requested color */}
          <Typography variant="h2" sx={{
            fontWeight: 900, color: colors.dark,
            fontSize: { xs: "2.4rem", md: "4rem" },
            textAlign: "center", letterSpacing: "-0.05em", lineHeight: 1.1
          }}>
            Choose Your <Box component="span" sx={{ 
              color: colors.primary,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 8,
                left: 0,
                width: '100%',
                height: '8px',
                bgcolor: alpha(colors.primary, 0.1),
                zIndex: -1
              }
            }}>Gateway</Box>
          </Typography>
          
          <Typography variant="body1" sx={{ color: colors.lightText, fontWeight: 500, textAlign: 'center', maxWidth: 500 }}>
            Select your account type to continue. Your session is encrypted and secure.
          </Typography>
        </Stack>

        {/* Cards Grid */}
        <Grid container spacing={4} justifyContent="center">
          {[
            { role: "Admin", Icon: UserCog, color: colors.primary, desc: "System architecture, user management & school settings." },
            { role: "Teacher", Icon: UsersRound, color: "#3b82f6", desc: "Course planning, student tracking & automated grading." },
            { role: "Student", Icon: GraduationCap, color: "#10b981", desc: "Learning materials, performance analytics & schedules." }
          ].map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.role}>
              <Paper
                onClick={() => navigateHandler(item.role)}
                elevation={0}
                sx={{
                  height: "auto", p: 5, borderRadius: "40px",
                  background: "#fff",
                  border: "1px solid rgba(0,0,0,0.05)",
                  cursor: "pointer",
                  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
                  "&:hover": {
                    transform: "translateY(-15px)",
                    boxShadow: `0 40px 70px ${alpha(item.color, 0.15)}`,
                    borderColor: alpha(item.color, 0.2),
                    "& .icon-box": { bgcolor: item.color, color: "#fff", transform: "scale(1.1)" },
                    "& .action-text": { color: item.color, gap: 1.5 }
                  },
                }}
              >
                <Box className="icon-box" sx={{
                  width: 90, height: 90, borderRadius: "30px",
                  bgcolor: alpha(item.color, 0.08), color: item.color,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  mb: 4, transition: "all 0.4s ease"
                }}>
                  <item.Icon size={40} strokeWidth={1.5} />
                </Box>

                <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, color: colors.dark }}>
                  {item.role}
                </Typography>
                <Typography variant="body2" sx={{ color: colors.lightText, mb: 4, lineHeight: 1.7 }}>
                  {item.desc}
                </Typography>

                <Stack direction="row" alignItems="center" spacing={1} className="action-text" 
                  sx={{ mt: "auto", transition: "all 0.3s", color: colors.lightText }}>
                  <Typography variant="button" sx={{ fontWeight: 800, letterSpacing: 0.5 }}>Access Portal</Typography>
                  <ArrowRight size={18} />
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* --- Enhanced Bottom Navigation --- */}
        <Stack 
          direction={{ xs: "column", sm: "row" }} 
          spacing={2} 
          alignItems="center" 
          justifyContent="center" 
          sx={{ mt: 12, mb: 4 }}
        >
          <Box sx={{ 
            display: 'flex', alignItems: 'center', p: 1,
            bgcolor: alpha("#fff", 0.6), backdropFilter: "blur(10px)",
            borderRadius: "100px", border: "1px solid rgba(0,0,0,0.05)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.02)"
          }}>
            <Button 
              startIcon={<Home size={18} />} 
              onClick={() => navigate("/")}
              sx={{ 
                px: 3, borderRadius: "100px", color: colors.dark, fontWeight: 700,
                textTransform: "none", "&:hover": { bgcolor: "#fff", color: colors.primary }
              }}
            >
              Back to Home
            </Button>
            <Divider orientation="vertical" flexItem sx={{ mx: 1, height: 24, my: 'auto' }} />
            <Button 
              startIcon={<LifeBuoy size={18} />} 
              sx={{ 
                px: 3, borderRadius: "100px", color: colors.lightText, fontWeight: 600,
                textTransform: "none", "&:hover": { color: colors.primary }
              }}
            >
              Contact Support
            </Button>
          </Box>

          {/* System Status Indicator */}
          <Stack direction="row" spacing={1} alignItems="center" sx={{ 
            px: 3, py: 1.5, bgcolor: alpha("#10b981", 0.05), borderRadius: "100px" 
          }}>
            <Circle size={8} fill="#10b981" color="#10b981" style={{ animation: 'pulse-green 2s infinite' }} />
            <Typography variant="caption" sx={{ color: "#065f46", fontWeight: 700, letterSpacing: 0.5 }}>
              SYSTEM ONLINE
            </Typography>
          </Stack>
        </Stack>
      </Container>

      {/* CSS Animations */}
      <style>{`
        @keyframes pulse-green {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>

      <Backdrop sx={{ color: "#fff", zIndex: 9999, backdropFilter: "blur(15px)", bgcolor: "rgba(15, 23, 42, 0.9)" }} open={loader}>
        <Stack spacing={3} alignItems="center">
          <CircularProgress sx={{ color: colors.primary }} size={80} thickness={2} />
          <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: 5 }}>SECURE GATEWAY</Typography>
        </Stack>
      </Backdrop>

      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </Box>
  );
};

export default ChooseUser;