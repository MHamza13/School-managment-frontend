import React from "react";
import { Link } from "react-router-dom";
import { 
  Container, Grid, Box, Button, Typography, 
  Stack, alpha, Paper, useTheme, useMediaQuery 
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { 
  ArrowRight, Users, GraduationCap, 
  ShieldCheck, Sparkles, PlusCircle 
} from "lucide-react";

// --- Premium Styled Components ---
const HeroImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '& img': {
    width: '100%',
    height: 'auto',
    maxWidth: '580px',
    filter: 'drop-shadow(0 30px 60px rgba(106, 27, 154, 0.2))',
    animation: 'float 6s ease-in-out infinite',
  },
  '@keyframes float': {
    '0%, 100%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-20px)' },
  }
}));

const StatCard = styled(Paper)(({ theme }) => ({
  padding: '12px 20px',
  borderRadius: '16px',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  position: 'absolute',
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(106, 27, 154, 0.1)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.05)',
  zIndex: 2,
  transition: 'transform 0.3s ease',
  '&:hover': { transform: 'scale(1.05)' }
}));

const Homepage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  
  // Design System Colors
  const premiumGradient = "linear-gradient(135deg, #7b1fa2 50%, #7b1fa2 100%)";
  const colors = { 
    lightPurple: "#7b1fa2", 
    darkPurple: "#6a1b9a",
    dark: "#0f172a" 
  };

  return (
    <Box sx={{ 
      bgcolor: "#fdfaff", 
      minHeight: "100vh", 
      overflowX: "hidden", 
      position: 'relative',
      display: 'flex', 
      alignItems: 'center' 
    }}>
      
      {/* Background Decor */}
      <Box sx={{ 
        position: 'absolute', top: -150, right: -150, width: 550, height: 550, 
        borderRadius: '50%', background: `radial-gradient(circle, ${alpha(colors.lightPurple, 0.1)} 0%, transparent 70%)` 
      }} />

      <Container maxWidth="lg" sx={{ py: 8, position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4} alignItems="center">
          
          <Grid item xs={12} md={6}>
            <Stack spacing={4}>
              <Box>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                  <Box sx={{ p: 0.5, bgcolor: alpha(colors.lightPurple, 0.1), borderRadius: '6px' }}>
                    <Sparkles size={16} color={colors.lightPurple} />
                  </Box>
                  <Typography variant="overline" sx={{ fontWeight: 800, color: colors.lightPurple, letterSpacing: 2 }}>
                    Premium Education Solution
                  </Typography>
                </Stack>

                <Typography variant="h1" sx={{ 
                  fontWeight: 900, 
                  fontSize: { xs: "2.6rem", md: "4rem" }, 
                  color: colors.dark, 
                  lineHeight: 1.1,
                  mb: 3
                }}>
                  Smart Campus <br />
                  <Box component="span" sx={{ 
                    background: premiumGradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                  }}>
                    Management
                  </Box> System
                </Typography>

                <Typography variant="body1" sx={{ color: "#475569", fontSize: "1.1rem", lineHeight: 1.8, maxWidth: '90%' }}>
                  Elevate your institution with our all-in-one cloud platform. Automate attendance, track progress, and manage schools with ease.
                </Typography>
              </Box>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2.5}>
                {/* School Login Button - Hover: Dark Purple */}
                <Button
                  component={Link} to="/choose"
                  variant="contained"
                  endIcon={<ArrowRight size={20} />}
                  sx={{
                    background: premiumGradient, 
                    px: 5, py: 2, borderRadius: "12px", 
                    fontWeight: 700, textTransform: "none", fontSize: "1rem",
                    boxShadow: `0 10px 25px ${alpha(colors.lightPurple, 0.3)}`,
                    transition: 'all 0.3s ease',
                    "&:hover": { 
                      background: colors.darkPurple, 
                      transform: 'translateY(-2px)',
                      boxShadow: `0 15px 30px ${alpha(colors.darkPurple, 0.4)}`,
                    }
                  }}
                >
                  School Login
                </Button>
                
                {/* Register Button - Hover: Light Purple background */}
                <Button
                  component={Link} to="/Adminregister"
                  variant="outlined"
                  startIcon={<PlusCircle size={20} />}
                  sx={{
                    px: 4, py: 2, borderRadius: "12px", fontWeight: 700, 
                    textTransform: "none", fontSize: "1rem", color: colors.lightPurple,
                    borderColor: alpha(colors.lightPurple, 0.3),
                    borderWidth: '2px',
                    transition: 'all 0.3s ease',
                    "&:hover": { 
                        borderWidth: '2px',
                        bgcolor: alpha(colors.lightPurple, 0.08), // Hover pe Light Purple tint
                        borderColor: colors.lightPurple,
                        transform: 'translateY(-2px)',
                    }
                  }}
                >
                  Register School
                </Button>
              </Stack>

              <Stack direction="row" spacing={4} sx={{ pt: 2 }}>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: colors.dark }}>1,200+</Typography>
                  <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 700, textTransform: 'uppercase' }}>Active Schools</Typography>
                </Box>
                <Divider />
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: colors.dark }}>99.9%</Typography>
                  <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 700, textTransform: 'uppercase' }}>System Uptime</Typography>
                </Box>
              </Stack>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <HeroImageContainer>
              {!isMobile && (
                <>
                  <StatCard sx={{ top: '10%', left: '0%', animation: 'float 5s ease-in-out infinite' }}>
                    <Box sx={{ p: 1, bgcolor: alpha('#10b981', 0.1), borderRadius: '10px', color: '#10b981' }}>
                      <Users size={20} />
                    </Box>
                    <Box>
                      <Typography variant="caption" display="block" sx={{ color: '#64748b', fontWeight: 600 }}>Total Staff</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 800 }}>1,240+</Typography>
                    </Box>
                  </StatCard>

                  <StatCard sx={{ bottom: '15%', right: '0%', animation: 'float 7s ease-in-out infinite' }}>
                    <Box sx={{ p: 1, bgcolor: alpha(colors.lightPurple, 0.1), borderRadius: '10px', color: colors.lightPurple }}>
                      <GraduationCap size={20} />
                    </Box>
                    <Box>
                      <Typography variant="caption" display="block" sx={{ color: '#64748b', fontWeight: 600 }}>Graduates</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 800 }}>98.5%</Typography>
                    </Box>
                  </StatCard>
                </>
              )}

              <Box 
                component="img"
                src="https://illustrations.popsy.co/purple/taking-notes.svg" 
                alt="School Management"
              />
            </HeroImageContainer>
          </Grid>
        </Grid>
      </Container>

      <Box sx={{ 
        position: 'absolute', bottom: 30, left: 0, width: '100%', textAlign: 'center', opacity: 0.7 
      }}>
        <Typography variant="caption" sx={{ fontWeight: 600, color: '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
          <ShieldCheck size={14} /> SECURE CLOUD INFRASTRUCTURE • ENTERPRISE GRADE SECURITY
        </Typography>
      </Box>
    </Box>
  );
};

const Divider = () => <Box sx={{ width: '1px', bgcolor: '#e2e8f0', height: '40px' }} />;

export default Homepage;