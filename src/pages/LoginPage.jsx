import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Button, Grid, Box, Typography, Paper, Checkbox, 
  FormControlLabel, TextField, CssBaseline, IconButton, 
  InputAdornment, CircularProgress, Backdrop, Stack, alpha
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { loginUser } from "../redux/userRelated/userHandle";
import Popup from "../components/Popup";
import { 
  Eye, EyeOff, Mail, Lock, User, Hash, 
  ArrowRight, ShieldCheck, CheckCircle2, Sparkles, LayoutDashboard
} from "lucide-react";

const theme = createTheme({
  typography: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    h2: { fontWeight: 800, letterSpacing: '-0.04em' },
    h3: { fontWeight: 800, letterSpacing: '-0.02em' },
    button: { textTransform: 'none', fontWeight: 700 }
  },
  palette: {
    primary: { 
      main: "#7b1fa2", 
      dark: "#6a1b9a",
      light: "#a886f0"
    },
    background: { default: "#fdfcfe" }
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            transition: '0.3s all ease-in-out',
            backgroundColor: '#ffffff',
            '& fieldset': { borderColor: '#e2e8f0' },
            '&:hover fieldset': { borderColor: '#7b1fa2' },
            '&.Mui-focused fieldset': { borderWidth: '2px', borderColor: '#7b1fa2' },
          },
        },
      },
    },
  },
});

const LoginPage = ({ role }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, currentUser, response, currentRole } = useSelector((state) => state.user);
  const [toggle, setToggle] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

 const roleContent = {
  Admin: {
    badge: "Enterprise Control",
    title: "Oversee Your Entire ",
    highlight: "Ecosystem.",
    desc: "A powerful command center designed to synchronize administration, academics, and finance.",
    features: [
      { title: "Revenue Insights", desc: "Monitor fee collections and financial health." },
      { title: "Staff Synergy", desc: "Manage faculty workflows and department efficiency." }
    ]
  },
  Teacher: {
    badge: "Smart Pedagogy",
    title: "Focus on Teaching, ",
    highlight: "Not Paperwork.",
    desc: "Automate mundane tasks and spend more time shaping the future of your students.",
    features: [
      { title: "Curriculum Manager", desc: "Plan lessons and share resources instantly." },
      { title: "Smart Assessment", desc: "Generate dynamic results and performance charts." }
    ]
  },
  Student: {
    badge: "Digital Campus",
    title: "Your Academic Universe ",
    highlight: "In One App.",
    desc: "Stay ahead of the curve with instant access to grades, schedules, and learning materials.",
    features: [
      { title: "Interactive Portal", desc: "Submit assignments and track feedback live." },
      { title: "Event Timeline", desc: "Never miss a lecture, exam, or school event." }
    ]
  }
};

  const content = roleContent[role] || roleContent.Admin;

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newErrors = {};
    const password = data.get("password");

    if (role === "Student") {
      const rollNum = data.get("rollNumber");
      const studentName = data.get("studentName");
      if (!rollNum) newErrors.rollNumber = true;
      if (!studentName) newErrors.studentName = true;
      if (!password) newErrors.password = true;
      if (Object.keys(newErrors).length === 0) {
        setLoader(true);
        dispatch(loginUser({ rollNum, studentName, password }, role));
      }
    } else {
      const email = data.get("email");
      if (!email) newErrors.email = true;
      if (!password) newErrors.password = true;
      if (Object.keys(newErrors).length === 0) {
        setLoader(true);
        dispatch(loginUser({ email, password }, role));
      }
    }
    setErrors(newErrors);
  };

  const guestModeHandler = () => {
    const password = "zxc";
    setLoader(true);
    if (role === "Admin") dispatch(loginUser({ email: "yogendra@12", password }, role));
    else if (role === "Student") dispatch(loginUser({ rollNum: "1", studentName: "Dipesh Awasthi", password }, role));
    else if (role === "Teacher") dispatch(loginUser({ email: "tony@12", password }, role));
  };

  useEffect(() => {
    if (status === "success" || currentUser !== null) {
      navigate(`/${currentRole}/dashboard`);
    } else if (status === "failed") {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    } else if (status === "error") {
      setMessage("Network Error");
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, currentRole, navigate, response, currentUser]);

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh", overflow: "hidden" }}>
        <CssBaseline />
        
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={0} square 
          sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', bgcolor: '#fdfcfe' }}>
          
          <Box sx={{ my: 4, mx: { xs: 4, md: 10 }, textAlign: 'left' }}>
            <Stack spacing={1} sx={{ mb: 4 }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <ShieldCheck size={24} color="#7b1fa2" fill={alpha("#7b1fa2", 0.1)} />
                <Typography variant="overline" sx={{ fontWeight: 800, color: "#7b1fa2", letterSpacing: 1.5 }}>
                  Authorized Access
                </Typography>
              </Stack>
              {/* Dynamic Title yahan handle kiya gaya hai */}
              <Typography variant="h3" color="#1e293b" sx={{ lineHeight: 1.2 }}>
                Sign In to <br /> 
                <span style={{ color: "#7b1fa2" }}>{role} Portal</span>
              </Typography>
              <Typography variant="body1" sx={{ color: "#64748b", mt: 1 }}>
                Welcome back! Please enter your details below.
              </Typography>
            </Stack>

            <Box component="form" noValidate onSubmit={handleSubmit}>
              {role === "Student" ? (
                <>
                  <TextField
                    fullWidth name="rollNumber" label="Roll Number" margin="normal"
                    error={errors.rollNumber} helperText={errors.rollNumber && "Roll Number is required"}
                    InputProps={{
                      startAdornment: (<InputAdornment position="start"><Hash size={18} color="#94a3b8"/></InputAdornment>)
                    }}
                  />
                  <TextField
                    fullWidth name="studentName" label="Student Name" margin="normal"
                    error={errors.studentName} helperText={errors.studentName && "Name is required"}
                    InputProps={{
                      startAdornment: (<InputAdornment position="start"><User size={18} color="#94a3b8"/></InputAdornment>)
                    }}
                  />
                </>
              ) : (
                <TextField
                  fullWidth name="email" label="Email Address" margin="normal"
                  error={errors.email} helperText={errors.email && "Email is required"}
                  InputProps={{
                    startAdornment: (<InputAdornment position="start"><Mail size={18} color="#94a3b8"/></InputAdornment>)
                  }}
                />
              )}

              <TextField
                fullWidth name="password" label="Password" margin="normal"
                type={toggle ? "text" : "password"}
                error={errors.password} helperText={errors.password && "Password is required"}
                InputProps={{
                  startAdornment: (<InputAdornment position="start"><Lock size={18} color="#94a3b8"/></InputAdornment>),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setToggle(!toggle)} edge="end">
                        {toggle ? <EyeOff size={18} /> : <Eye size={18} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 1, mb: 3 }}>
                <FormControlLabel 
                  control={<Checkbox size="small" sx={{ color: "#cbd5e1", '&.Mui-checked': { color: "#7b1fa2" } }} />} 
                  label={<Typography variant="body2" sx={{ fontWeight: 500, color: "#1e293b" }}>Keep me logged in</Typography>} 
                />
                <Typography variant="body2" sx={{ color: "#7b1fa2", fontWeight: 700, cursor: 'pointer', '&:hover': { opacity: 0.8 } }}>
                  Forgot password?
                </Typography>
              </Stack>

              <Button
                type="submit" fullWidth variant="contained" disableElevation
                sx={{ 
                  py: 1.8, borderRadius: '12px', bgcolor: "#7b1fa2",
                  fontSize: '1rem', '&:hover': { bgcolor: "#6a1b9a" },
                }}
              >
                Sign In <ArrowRight size={20} style={{ marginLeft: '8px' }} />
              </Button>

              <Button
                fullWidth variant="outlined" onClick={guestModeHandler}
                sx={{ 
                  mt: 2, py: 1.6, borderRadius: '12px', border: '1px solid #e2e8f0', color: "#1e293b",
                  '&:hover': { border: '1px solid #7b1fa2', bgcolor: alpha("#7b1fa2", 0.04) }
                }}
              >
                <Sparkles size={18} style={{ marginRight: '8px', color: '#7b1fa2' }} /> Login as Guest
              </Button>

              {role === "Admin" && (
                <Typography variant="body2" sx={{ mt: 4, textAlign: 'center', color: "#64748b" }}>
                  New Administrator?{' '}
                  <Link to="/Adminregister" style={{ color: "#7b1fa2", fontWeight: 700, textDecoration: 'none' }}>
                    Create System Account
                  </Link>
                </Typography>
              )}
            </Box>
          </Box>
        </Grid>

        <Grid item xs={false} sm={4} md={7} 
          sx={{ 
            position: 'relative',
            background: `linear-gradient(135deg, ${alpha("#7b1fa2", 0.95)} 0%, ${alpha("#4c2896", 0.9)} 100%), url(https://images.unsplash.com/photo-1523240795612-9a054b0db644)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: { xs: 'none', sm: 'flex' },
            alignItems: 'center', justifyContent: 'start', p: 8
          }}>
          
          <Stack spacing={4} sx={{ maxWidth: 600, color: '#fff' }}>
            <Box sx={{ 
              bgcolor: 'rgba(255,255,255,0.1)', p: 1, px: 2, borderRadius: '50px', 
              width: 'fit-content', border: '1px solid rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', gap: 1
            }}>
              <LayoutDashboard size={14} color="#d8b4fe" />
              <Typography variant="caption" sx={{ fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase' }}>
                {content.badge}
              </Typography>
            </Box>

            <Typography variant="h2" sx={{ lineHeight: 1.1 }}>
              {content.title} <span style={{ color: '#d8b4fe' }}>{content.highlight}</span>
            </Typography>

            <Typography variant="h6" sx={{ opacity: 0.85, fontWeight: 400, lineHeight: 1.6 }}>
              {content.desc}
            </Typography>
            
            <Grid container spacing={4} sx={{ mt: 2 }}>
              {content.features.map((item, index) => (
                <Grid item xs={6} key={index}>
                  <Stack spacing={1.5}>
                    <Box sx={{ 
                      width: 44, height: 44, bgcolor: 'rgba(216, 180, 254, 0.2)', 
                      borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' 
                    }}>
                      <CheckCircle2 size={24} color="#d8b4fe" />
                    </Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{item.title}</Typography>
                    <Typography variant="body2" sx={{ opacity: 0.7, fontSize: '0.85rem' }}>{item.desc}</Typography>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Stack>

          <Box sx={{
            position: 'absolute', bottom: 40, right: 40, p: 2, px: 3,
            bgcolor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)',
            borderRadius: '20px', border: '1px solid rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', gap: 2
          }}>
            <Box sx={{ width: 10, height: 10, bgcolor: '#10b981', borderRadius: '50%' }} />
            <Typography variant="caption" sx={{ color: '#fff', fontWeight: 700, letterSpacing: 1 }}>
              SYSTEM V8.0 SECURED
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Backdrop sx={{ zIndex: 9999, backdropFilter: "blur(12px)", bgcolor: alpha("#0f172a", 0.8) }} open={loader}>
        <Stack spacing={3} alignItems="center">
          <CircularProgress size={60} sx={{ color: "#7b1fa2" }} thickness={4} />
          <Typography sx={{ color: '#fff', fontWeight: 800, letterSpacing: 2 }}>SECURE LOGIN...</Typography>
        </Stack>
      </Backdrop>

      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </ThemeProvider>
  );
};

export default LoginPage;