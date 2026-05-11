import * as React from "react";
import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid, Box, Typography, Paper, Checkbox, 
  FormControlLabel, CssBaseline, IconButton, 
  InputAdornment, CircularProgress, TextField, 
  Button, Link, Avatar, Stack, alpha, Divider
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { registerUser } from "../../redux/userRelated/userHandle";
import Popup from "../../components/Popup";

// Icons
import { 
  Eye, EyeOff, Mail, Lock, User, Building2, 
  Phone, GraduationCap, MapPin, UploadCloud, 
  CheckCircle2, ShieldCheck, Image as ImageIcon
} from "lucide-react";

// --- Colors configuration ---
const colors = { 
  lightPurple: "#7b1fa2", 
  darkPurple: "#6a1b9a",
  dark: "#0f172a" 
};

const theme = createTheme({
  typography: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    h2: { fontWeight: 800, letterSpacing: '-0.04em' },
    h4: { fontWeight: 800, letterSpacing: '-0.02em' },
    subtitle2: { fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }
  },
  palette: {
    primary: { 
      main: colors.lightPurple, 
      dark: colors.darkPurple 
    },
    background: { default: "#f8fafc" }
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            '& fieldset': { borderColor: '#e2e8f0' },
            '&:hover fieldset': { borderColor: colors.lightPurple },
            '&.Mui-focused fieldset': { borderColor: colors.lightPurple },
          },
        },
      },
    },
  },
});

const AdminRegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, currentUser, response, currentRole } = useSelector((state) => state.user);

  const [toggle, setToggle] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const [profilePic, setProfilePic] = useState(null);
  const [schoolLogo, setSchoolLogo] = useState(null);
  const [schoolBanner, setSchoolBanner] = useState(null);

  const [previews, setPreviews] = useState({ profile: "", logo: "", banner: "" });

  const role = "Admin";

  const handleImageChange = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (type === 'profile') { setProfilePic(file); setPreviews(prev => ({ ...prev, profile: url })); }
      if (type === 'logo') { setSchoolLogo(file); setPreviews(prev => ({ ...prev, logo: url })); }
      if (type === 'banner') { setSchoolBanner(file); setPreviews(prev => ({ ...prev, banner: url })); }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("adminName");
    const schoolName = data.get("schoolName");
    const email = data.get("email");
    const password = data.get("password");

    if (!name || !schoolName || !email || !password) {
        setErrors({
            adminName: !name,
            schoolName: !schoolName,
            email: !email,
            password: !password
        });
        return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("schoolName", schoolName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("phone", data.get("phone"));
    formData.append("address", data.get("address"));
    formData.append("qualification", data.get("qualification"));

    if (profilePic) formData.append("profilePic", profilePic);
    if (schoolLogo) formData.append("schoolLogo", schoolLogo);
    if (schoolBanner) formData.append("schoolBanner", schoolBanner);

    setLoader(true);
    dispatch(registerUser(formData, role));
  };

  useEffect(() => {
    if (status === "success" || (currentUser !== null && currentRole === "Admin")) {
      navigate("/Admin/dashboard");
    } else if (status === "failed") {
      setMessage(response); setShowPopup(true); setLoader(false);
    } else if (status === "error") {
      setLoader(false);
    }
  }, [status, currentUser, currentRole, navigate, response]);

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh", overflow: "hidden" }}>
        <CssBaseline />
        
        {/* Left Side: Registration Form */}
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={0} square 
          sx={{ 
            height: '100vh', overflowY: 'auto', bgcolor: '#fdfcfe',
            '&::-webkit-scrollbar': { width: '5px' },
            '&::-webkit-scrollbar-thumb': { background: '#e2e8f0', borderRadius: '10px' }
          }}>
          
          <Box sx={{ py: 6, px: { xs: 4, md: 7 } }}>
            <Stack spacing={1} sx={{ mb: 4 }}>
                <Stack direction="row" spacing={1} alignItems="center">
                    <ShieldCheck size={20} color={colors.lightPurple} />
                    <Typography variant="overline" sx={{ fontWeight: 800, color: colors.lightPurple }}>
                        System Onboarding
                    </Typography>
                </Stack>
                <Typography variant="h4" color={colors.dark}>Create Admin Account</Typography>
                <Typography variant="body2" color="text.secondary">
                    Set up your institutional profile to start managing.
                </Typography>
            </Stack>

            <Box component="form" noValidate onSubmit={handleSubmit}>
              
              {/* SECTION: ADMIN DETAILS */}
              <Typography variant="subtitle2" color="primary" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <User size={16} /> Personal Information
              </Typography>
              
              <Stack direction="row" spacing={3} alignItems="center" sx={{ mb: 3 }}>
                <Avatar src={previews.profile} sx={{ width: 80, height: 80, border: `3px solid ${colors.lightPurple}`, boxShadow: `0 4px 12px ${alpha(colors.lightPurple, 0.2)}` }} />
                <Button variant="outlined" component="label" startIcon={<UploadCloud size={16} />} 
                  sx={{ borderRadius: '8px', textTransform: 'none', borderColor: '#e2e8f0', color: '#475569', '&:hover': { borderColor: colors.lightPurple } }}>
                  Upload Photo
                  <input type="file" hidden accept="image/*" onChange={(e) => handleImageChange(e, 'profile')} />
                </Button>
              </Stack>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField fullWidth size="small" name="adminName" label="Full Name" error={errors.adminName}
                    InputProps={{ startAdornment: <InputAdornment position="start"><User size={18} color="#94a3b8"/></InputAdornment> }} />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth size="small" name="phone" label="Phone"
                    InputProps={{ startAdornment: <InputAdornment position="start"><Phone size={18} color="#94a3b8"/></InputAdornment> }} />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth size="small" name="qualification" label="Qualification"
                    InputProps={{ startAdornment: <InputAdornment position="start"><GraduationCap size={18} color="#94a3b8"/></InputAdornment> }} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth size="small" name="address" label="Office Address"
                    InputProps={{ startAdornment: <InputAdornment position="start"><MapPin size={18} color="#94a3b8"/></InputAdornment> }} />
                </Grid>
              </Grid>

              <Divider sx={{ my: 4 }} />

              {/* SECTION: SCHOOL DETAILS */}
              <Typography variant="subtitle2" color="primary" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Building2 size={16} /> Institutional Profile
              </Typography>

              <TextField fullWidth size="small" name="schoolName" label="School/College Name" error={errors.schoolName} sx={{ mb: 3 }}
                InputProps={{ startAdornment: <InputAdornment position="start"><Building2 size={18} color="#94a3b8"/></InputAdornment> }} />

              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6}>
                   <Box sx={{ border: '1px dashed #cbd5e1', p: 2, borderRadius: '12px', textAlign: 'center', bgcolor: '#f8fafc' }}>
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>SCHOOL LOGO</Typography>
                      <Box sx={{ height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', my: 1 }}>
                        {previews.logo ? <img src={previews.logo} style={{ height: '100%' }} alt="logo" /> : <ImageIcon size={30} color="#cbd5e1" />}
                      </Box>
                      <Button variant="text" component="label" size="small" sx={{ fontSize: '0.7rem', color: colors.lightPurple }}>
                        Change Logo <input type="file" hidden onChange={(e) => handleImageChange(e, 'logo')} />
                      </Button>
                   </Box>
                </Grid>
                <Grid item xs={6}>
                   <Box sx={{ border: '1px dashed #cbd5e1', p: 2, borderRadius: '12px', textAlign: 'center', bgcolor: '#f8fafc' }}>
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>SCHOOL BANNER</Typography>
                      <Box sx={{ height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', my: 1, borderRadius: '4px', overflow: 'hidden' }}>
                        {previews.banner ? <img src={previews.banner} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="banner" /> : <ImageIcon size={30} color="#cbd5e1" />}
                      </Box>
                      <Button variant="text" component="label" size="small" sx={{ fontSize: '0.7rem', color: colors.lightPurple }}>
                        Set Banner <input type="file" hidden onChange={(e) => handleImageChange(e, 'banner')} />
                      </Button>
                   </Box>
                </Grid>
              </Grid>

              <Divider sx={{ my: 4 }} />

              {/* SECTION: CREDENTIALS */}
              <Typography variant="subtitle2" color="primary" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Lock size={16} /> Security Credentials
              </Typography>

              <TextField fullWidth size="small" name="email" label="Email Address" error={errors.email} sx={{ mb: 2 }}
                InputProps={{ startAdornment: <InputAdornment position="start"><Mail size={18} color="#94a3b8"/></InputAdornment> }} />
              
              <TextField fullWidth size="small" name="password" label="System Password" type={toggle ? "text" : "password"} error={errors.password}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Lock size={18} color="#94a3b8"/></InputAdornment>,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setToggle(!toggle)} size="small">
                        {toggle ? <EyeOff size={18} /> : <Eye size={18} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button type="submit" fullWidth variant="contained" disableElevation
                sx={{ mt: 4, py: 1.5, borderRadius: '12px', bgcolor: colors.lightPurple, '&:hover': { bgcolor: colors.darkPurple }, fontWeight: 700, fontSize: '1rem' }}>
                {loader ? <CircularProgress size={24} color="inherit" /> : "Complete Registration"}
              </Button>

              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Already have an account? {' '}
                  <Link component={RouterLink} to="/Adminlogin" sx={{ color: colors.lightPurple, fontWeight: 700, textDecoration: 'none' }}>
                    Login Here
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* Right Side: Visual Section */}
        <Grid item xs={false} sm={4} md={7}
          sx={{
            background: `linear-gradient(rgba(106, 27, 154, 0.85), rgba(76, 40, 150, 0.9)), url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop)`,
            backgroundSize: "cover", backgroundPosition: "center",
            display: 'flex', alignItems: 'center', justifyContent: 'start', p: 8
          }}>
          
          <Stack spacing={4} sx={{ maxWidth: 600, color: '#fff' }}>
            <Box sx={{ bgcolor: 'rgba(255,255,255,0.1)', p: 1, px: 2, borderRadius: '50px', width: 'fit-content', border: '1px solid rgba(255,255,255,0.2)' }}>
              <Typography variant="caption" sx={{ fontWeight: 800, letterSpacing: 1.5 }}>✨ TRUSTED BY 1000+ SCHOOLS</Typography>
            </Box>
            <Typography variant="h2" sx={{ fontWeight: 800, lineHeight: 1.1 }}>
              Take Full Control of Your <span style={{ color: '#d8b4fe' }}>Education Hub.</span>
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.8, fontWeight: 400 }}>
              Join the most advanced management ecosystem designed for modern institutions.
            </Typography>
            
            <Stack spacing={3} sx={{ mt: 2 }}>
              {[
                { t: "Institutional Intelligence", d: "Real-time analytics and financial tracking." },
                { t: "Automated Workflows", d: "Streamline admissions and examinations." }
              ].map((item, i) => (
                <Stack key={i} direction="row" spacing={2} alignItems="flex-start">
                  <Box sx={{ bgcolor: 'rgba(216, 180, 254, 0.2)', p: 1, borderRadius: '10px' }}>
                    <CheckCircle2 size={20} color="#d8b4fe" />
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{item.t}</Typography>
                    <Typography variant="body2" sx={{ opacity: 0.7 }}>{item.d}</Typography>
                  </Box>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Grid>
      </Grid>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </ThemeProvider>
  );
};

export default AdminRegisterPage;