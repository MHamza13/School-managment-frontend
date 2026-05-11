import React, { useState } from "react";
import {
  Box,
  Card,
  Grid,
  Typography,
  Button,
  TextField,
  Switch,
  Paper,
  IconButton,
  Select,
  MenuItem,
  alpha,
  Stack,
  Divider,
  Avatar,
  Badge,
  Tab,
  Tabs,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

// Lucide Icons
import {
  User,
  Lock,
  Bell,
  Globe,
  Save,
  Camera,
  Server,
  LogOut,
  ShieldCheck,
  Languages,
  Coins,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Setting = () => {
  const [tabValue, setTabValue] = useState(0);
  const navigate = useNavigate();
  const primaryPurple = "#6a1b9a";

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ minHeight: "100vh", p: { xs: 2, md: 4 }, bgcolor: "#f8fafc" }}>
      {/* Header Section */}
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              color: primaryPurple,
              letterSpacing: "-1px",
            }}
          >
            Settings & Control
          </Typography>
          <Typography variant="body2" sx={{ color: "#64748b", mt: 0.5 }}>
            Master configuration for your administrative account and system-wide
            rules.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Save size={18} />}
          sx={{
            bgcolor: primaryPurple,
            borderRadius: "10px",
            px: 3,
            fontWeight: 700,
            textTransform: "none",
            display: { xs: "none", md: "flex" },
            "&:hover": { bgcolor: "#4a148c" },
          }}
        >
          Save All Changes
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Left Sidebar: Navigation Tabs */}
        <Grid item xs={12} md={3}>
          <Paper
            sx={{
              borderRadius: "20px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 6px -1px rgba(0,0,0,0.02)",
              overflow: "hidden",
              bgcolor: "#fff",
            }}
          >
            <Tabs
              orientation="vertical"
              value={tabValue}
              onChange={handleTabChange}
              sx={{
                borderRight: 0,
                "& .MuiTabs-indicator": {
                  bgcolor: primaryPurple,
                  width: 4,
                  borderRadius: "0 4px 4px 0",
                  left: 0,
                },
                "& .MuiTab-root": {
                  justifyContent: "flex-start",
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: "14px",
                  py: 2.2,
                  px: 3,
                  color: "#64748b",
                  minHeight: "auto",
                  transition: "0.2s",
                  "&.Mui-selected": {
                    color: primaryPurple,
                    bgcolor: alpha(primaryPurple, 0.08),
                  },
                  "&:hover": {
                    bgcolor: alpha(primaryPurple, 0.03),
                    color: primaryPurple,
                  },
                },
              }}
            >
              <Tab
                icon={<User size={18} />}
                iconPosition="start"
                label="Account Profile"
              />
              <Tab
                icon={<Lock size={18} />}
                iconPosition="start"
                label="Security & Privacy"
              />
              <Tab
                icon={<Bell size={18} />}
                iconPosition="start"
                label="Notifications"
              />
              <Tab
                icon={<Globe size={18} />}
                iconPosition="start"
                label="System Config"
              />
              <Tab
                icon={<Server size={18} />}
                iconPosition="start"
                label="SMTP / Mail Server"
              />
            </Tabs>
          </Paper>

          {/* Logout Button Fixed */}
          <Button
            onClick={() => navigate("/logout")}
            fullWidth
            startIcon={<LogOut size={18} />}
            sx={{
              mt: 2,
              borderRadius: "14px",
              color: "#dc2626",
              fontWeight: 700,
              textTransform: "none",
              py: 1.5,
              justifyContent: "flex-start",
              px: 3,
              bgcolor: alpha("#dc2626", 0.05),
              "&:hover": { bgcolor: "#fee2e2" },
            }}
          >
            Logout Sessions
          </Button>
        </Grid>

        {/* Right Content Area */}
        <Grid item xs={12} md={9}>
          {/* TAB 0: PROFILE SETTINGS */}
          {tabValue === 0 && (
            <Card
              sx={{
                p: 4,
                borderRadius: "24px",
                border: "1px solid #e2e8f0",
                boxShadow: "none",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: 800, mb: 3, color: "#1e293b" }}
              >
                Profile Details
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                  mb: 4,
                  p: 2,
                  bgcolor: "#f8fafc",
                  borderRadius: "20px",
                }}
              >
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  badgeContent={
                    <IconButton
                      sx={{
                        bgcolor: primaryPurple,
                        color: "#fff",
                        p: 0.8,
                        border: "4px solid #fff",
                        "&:hover": { bgcolor: "#4a148c" },
                      }}
                    >
                      <Camera size={16} />
                    </IconButton>
                  }
                >
                  <Avatar
                    sx={{
                      width: 100,
                      height: 100,
                      bgcolor: primaryPurple,
                      fontWeight: 800,
                      fontSize: "32px",
                    }}
                  >
                    JD
                  </Avatar>
                </Badge>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    John Doe
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#64748b" }}>
                    Super Administrator • Active
                  </Typography>
                </Box>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 700, mb: 1 }}
                  >
                    Display Name
                  </Typography>
                  <TextField
                    fullWidth
                    defaultValue="John Doe Admin"
                    sx={{
                      "& .MuiOutlinedInput-root": { borderRadius: "12px" },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 700, mb: 1 }}
                  >
                    Contact Number
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="+92 300 1234567"
                    sx={{
                      "& .MuiOutlinedInput-root": { borderRadius: "12px" },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 700, mb: 1 }}
                  >
                    Email Address
                  </Typography>
                  <TextField
                    fullWidth
                    defaultValue="admin@example.com"
                    sx={{
                      "& .MuiOutlinedInput-root": { borderRadius: "12px" },
                    }}
                  />
                </Grid>
              </Grid>
            </Card>
          )}

          {/* TAB 1: SECURITY */}
          {tabValue === 1 && (
            <Card
              sx={{
                p: 4,
                borderRadius: "24px",
                border: "1px solid #e2e8f0",
                boxShadow: "none",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                Security & Password
              </Typography>
              <Typography variant="body2" sx={{ color: "#64748b", mb: 4 }}>
                Manage authentication settings.
              </Typography>
              <Stack spacing={4} divider={<Divider />}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box
                      sx={{
                        p: 1.5,
                        bgcolor: alpha("#059669", 0.1),
                        color: "#059669",
                        borderRadius: "12px",
                      }}
                    >
                      <ShieldCheck />
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        Two-Factor Authentication
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#94a3b8" }}>
                        Use your phone to verify logins.
                      </Typography>
                    </Box>
                  </Stack>
                  <Switch
                    defaultChecked
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: primaryPurple,
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                        { bgcolor: primaryPurple },
                    }}
                  />
                </Box>
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 800, mb: 3 }}
                  >
                    Change Password
                  </Typography>
                  <Grid container spacing={2.5}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Current Password"
                        type="password"
                        sx={{
                          "& .MuiOutlinedInput-root": { borderRadius: "12px" },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="New Password"
                        type="password"
                        sx={{
                          "& .MuiOutlinedInput-root": { borderRadius: "12px" },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Confirm Password"
                        type="password"
                        sx={{
                          "& .MuiOutlinedInput-root": { borderRadius: "12px" },
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    variant="contained"
                    sx={{
                      mt: 3,
                      bgcolor: primaryPurple,
                      borderRadius: "10px",
                      textTransform: "none",
                      fontWeight: 700,
                      "&:hover": { bgcolor: "#4a148c" },
                    }}
                  >
                    Update Password
                  </Button>
                </Box>
              </Stack>
            </Card>
          )}

          {/* TAB 3: SYSTEM CONFIG */}
          {tabValue === 3 && (
            <Card
              sx={{
                p: 4,
                borderRadius: "24px",
                border: "1px solid #e2e8f0",
                boxShadow: "none",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>
                System Localization
              </Typography>
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Languages size={16} /> Language
                  </Typography>
                  <Select
                    fullWidth
                    defaultValue="en"
                    sx={{ borderRadius: "12px", bgcolor: "#f8fafc" }}
                  >
                    <MenuItem value="en">English (US)</MenuItem>
                    <MenuItem value="ur">Urdu (Pakistan)</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Coins size={16} /> Currency
                  </Typography>
                  <Select
                    fullWidth
                    defaultValue="pkr"
                    sx={{ borderRadius: "12px", bgcolor: "#f8fafc" }}
                  >
                    <MenuItem value="pkr">PKR (Rs.)</MenuItem>
                    <MenuItem value="usd">USD ($)</MenuItem>
                  </Select>
                </Grid>
              </Grid>
              <Divider sx={{ my: 4 }} />
              <Typography
                variant="h6"
                sx={{ fontWeight: 800, mb: 3, color: "#dc2626" }}
              >
                Maintenance Mode
              </Typography>
              <Box
                sx={{
                  p: 2,
                  bgcolor: "#fff1f1",
                  border: "1px solid #fee2e2",
                  borderRadius: "16px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 700, color: "#991b1b" }}
                  >
                    Activate Maintenance
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#b91c1c" }}>
                    Only admins will have access.
                  </Typography>
                </Box>
                <Switch color="error" />
              </Box>
            </Card>
          )}

          {/* Note: Baki tabs (Notifications, SMTP) bhi isi tarhan Card ke andar wrap honge */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Setting;
