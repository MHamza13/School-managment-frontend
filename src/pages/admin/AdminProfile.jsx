import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Typography,
  Box,
  useTheme,
  Container,
  Paper,
  Grid,
  Avatar,
  TextField,
  Button,
  IconButton,
  CircularProgress,
  Badge,
  Divider,
} from "@mui/material";

// Icons
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone"; // If you add phone later
import LocationOnIcon from "@mui/icons-material/LocationOn"; // If you add address
import SchoolIcon from "@mui/icons-material/School";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

import { BASE_URL } from "../../utils/Urls";
import { updateUser } from "../../redux/userRelated/userHandle"; 
// ^ Make sure path is correct based on your project structure

const TeacherProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const theme = useTheme();

  // --- STATE MANAGEMENT ---
  const [isEditing, setIsEditing] = useState(false);
  const [loader, setLoader] = useState(false);

  // Form Data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    schoolName: "",
    password: "", 
  });

  // Image Preview States
  const [previews, setPreviews] = useState({
    schoolBanner: "",
    profilePic: "",
    schoolLogo: "",
  });

  // Selected Files
  const [files, setFiles] = useState({
    schoolBanner: null,
    profilePic: null,
    schoolLogo: null,
  });

  // --- CONFIGURATION ---
  const defaultBanner =
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1920&auto=format&fit=crop";
  const defaultProfile =
    "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg";
  const defaultLogo = "https://cdn-icons-png.flaticon.com/512/8074/8074800.png";

  // Helper: Get Image URL
  const getImageUrl = (imagePath, placeholder) => {
    if (!imagePath) return placeholder;
    if (imagePath.startsWith("http")) return imagePath; // Already a full URL
    const cleanPath = imagePath.replace(/\\/g, "/");
    return `${BASE_URL}/${cleanPath}`;
  };

  // --- LOAD DATA ON MOUNT ---
  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || "",
        email: currentUser.email || "",
        schoolName: currentUser.schoolName || "",
        password: "", // Always reset password field on load
      });

      setPreviews({
        schoolBanner: getImageUrl(currentUser.schoolBanner, defaultBanner),
        profilePic: getImageUrl(currentUser.profilePic, defaultProfile),
        schoolLogo: getImageUrl(currentUser.schoolLogo, defaultLogo),
      });
    }
  }, [currentUser]);

  // --- HANDLERS ---
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Generic Image Handler
  const handleImageChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setFiles((prev) => ({ ...prev, [fieldName]: file }));
      setPreviews((prev) => ({
        ...prev,
        [fieldName]: URL.createObjectURL(file),
      }));
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset Data to Current User
    setFormData({
      name: currentUser.name || "",
      email: currentUser.email || "",
      schoolName: currentUser.schoolName || "",
      password: "",
    });
    // Reset Previews
    setPreviews({
      schoolBanner: getImageUrl(currentUser.schoolBanner, defaultBanner),
      profilePic: getImageUrl(currentUser.profilePic, defaultProfile),
      schoolLogo: getImageUrl(currentUser.schoolLogo, defaultLogo),
    });
    setFiles({ schoolBanner: null, profilePic: null, schoolLogo: null });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoader(true);

    const updateData = new FormData();
    updateData.append("name", formData.name);
    updateData.append("email", formData.email);
    updateData.append("schoolName", formData.schoolName);
    
    // Only append password if user typed something
    if (formData.password) {
      updateData.append("password", formData.password);
    }

    // Append Images if changed
    if (files.schoolBanner) updateData.append("schoolBanner", files.schoolBanner);
    if (files.profilePic) updateData.append("profilePic", files.profilePic);
    if (files.schoolLogo) updateData.append("schoolLogo", files.schoolLogo);

    // Dispatch Update Action
    // Note: Assuming address is "Admin" based on backend logic for Admin updates
    // If it's a Teacher, change "Admin" to "Teacher"
    const address = currentUser.role === "Admin" ? "Admin" : "Teacher";
    
    await dispatch(updateUser(updateData, currentUser._id, address));

    setLoader(false);
    setIsEditing(false);
  };

  // Static info for non-editable fields
  const joiningDate = currentUser.joiningDate
    ? new Date(currentUser.joiningDate).toLocaleDateString()
    : "N/A";

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper
        elevation={4}
        sx={{
          borderRadius: 4,
          overflow: "hidden",
          bgcolor: "background.paper",
          position: "relative",
        }}
        component="form"
        onSubmit={submitHandler}
      >
        {/* --- 1. BANNER SECTION --- */}
        <Box
          sx={{
            height: "240px",
            width: "100%",
            backgroundImage: `url(${previews.schoolBanner})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
          }}
        >
          {/* Banner Overlay */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.3)",
            }}
          />
          
          {/* Edit Banner Button */}
          {isEditing && (
            <Box position="absolute" top={20} right={20}>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="banner-upload"
                type="file"
                onChange={(e) => handleImageChange(e, "schoolBanner")}
              />
              <label htmlFor="banner-upload">
                <Button
                  variant="contained"
                  component="span"
                  startIcon={<CameraAltIcon />}
                  sx={{ bgcolor: "white", color: "black", "&:hover": { bgcolor: "#f0f0f0" } }}
                >
                  Change Banner
                </Button>
              </label>
            </Box>
          )}
        </Box>

        {/* --- 2. PROFILE & HEADER SECTION --- */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            mt: -10,
            px: 4,
            position: "relative",
          }}
        >
          {/* Profile Picture */}
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              isEditing && (
                <IconButton
                  component="label"
                  sx={{
                    bgcolor: "white",
                    boxShadow: 2,
                    "&:hover": { bgcolor: "#f0f0f0" },
                  }}
                >
                  <CameraAltIcon color="primary" />
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={(e) => handleImageChange(e, "profilePic")}
                  />
                </IconButton>
              )
            }
          >
            <Avatar
              src={previews.profilePic}
              alt={currentUser.name}
              sx={{
                width: 160,
                height: 160,
                border: `5px solid ${theme.palette.background.paper}`,
                boxShadow: theme.shadows[4],
                bgcolor: theme.palette.grey[300],
              }}
            />
          </Badge>

          {/* Name & Role */}
          <Box mt={2} ml={2}>
            {isEditing ? (
              <TextField
                fullWidth
                label="Admin Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                variant="outlined"
                sx={{ mt: 1, minWidth: 300 }}
              />
            ) : (
              <Typography variant="h4" fontWeight="bold" textTransform="capitalize">
                {currentUser.name}
              </Typography>
            )}

            <Box display="flex" alignItems="center" gap={1} mt={1}>
              <VerifiedUserIcon color="primary" fontSize="small" />
              <Typography variant="subtitle1" color="primary" fontWeight="medium">
                {currentUser.role || "Admin"}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* --- 3. DETAILED INFO GRID --- */}
        <Box sx={{ p: { xs: 2, md: 4 } }}>
          <Grid container spacing={4}>
            {/* Left Column: Personal/Account Details */}
            <Grid item xs={12} md={6}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  borderBottom: `3px solid ${theme.palette.primary.main}`,
                  display: "inline-block",
                  mb: 3,
                }}
              >
                Account Details
              </Typography>

              {/* Email Field */}
              <Box display="flex" alignItems="center" mb={3}>
                <EmailIcon color="action" sx={{ mr: 2, fontSize: 30 }} />
                <Box width="100%">
                  <Typography variant="caption" color="text.secondary">
                    Email
                  </Typography>
                  {isEditing ? (
                    <TextField
                      fullWidth
                      size="small"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  ) : (
                    <Typography variant="body1" fontWeight="medium">
                      {currentUser.email}
                    </Typography>
                  )}
                </Box>
              </Box>

              {/* Password Field (Only Edit Mode) */}
              {isEditing && (
                <Box display="flex" alignItems="center" mb={3}>
                  <VerifiedUserIcon color="action" sx={{ mr: 2, fontSize: 30 }} />
                  <Box width="100%">
                    <Typography variant="caption" color="text.secondary">
                      Change Password (Optional)
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      type="password"
                      name="password"
                      placeholder="Enter new password to change"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </Box>
                </Box>
              )}

              {/* Static Fields (Phone/Qual can be added to state if needed) */}
              <Box display="flex" alignItems="center" mb={3}>
                <PhoneIcon color="action" sx={{ mr: 2, fontSize: 30 }} />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Phone
                  </Typography>
                  <Typography variant="body1" color="text.secondary" fontStyle="italic">
                    {currentUser.phone || "Not Provided"}
                  </Typography>
                </Box>
              </Box>

              <Box display="flex" alignItems="center" mb={3}>
                <SchoolIcon color="action" sx={{ mr: 2, fontSize: 30 }} />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Qualification
                  </Typography>
                  <Typography variant="body1" color="text.secondary" fontStyle="italic">
                    {currentUser.qualification || "Administrator"}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* Right Column: School Information */}
            <Grid item xs={12} md={6}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  borderBottom: `3px solid ${theme.palette.secondary.main}`,
                  display: "inline-block",
                  mb: 3,
                }}
              >
                Institution Information
              </Typography>

              {/* School Logo & Name Card */}
              <Paper
                elevation={0}
                variant="outlined"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: 2,
                  borderRadius: 2,
                  mb: 3,
                  bgcolor: theme.palette.grey[50],
                }}
              >
                {/* Logo Upload */}
                <Box position="relative" mr={2}>
                  <Avatar
                    src={previews.schoolLogo}
                    variant="rounded"
                    sx={{ width: 80, height: 80, bgcolor: "transparent" }}
                    imgProps={{ style: { objectFit: "contain" } }}
                  />
                  {isEditing && (
                     <IconButton
                     component="label"
                     size="small"
                     sx={{
                       position: 'absolute',
                       bottom: -10,
                       right: -10,
                       bgcolor: 'white',
                       boxShadow: 1
                     }}
                   >
                     <CameraAltIcon fontSize="small" />
                     <input
                       hidden
                       accept="image/*"
                       type="file"
                       onChange={(e) => handleImageChange(e, "schoolLogo")}
                     />
                   </IconButton>
                  )}
                </Box>

                <Box width="100%">
                  <Typography variant="caption" color="text.secondary">
                    Institution Name
                  </Typography>
                  {isEditing ? (
                    <TextField
                      fullWidth
                      size="small"
                      name="schoolName"
                      value={formData.schoolName}
                      onChange={handleChange}
                    />
                  ) : (
                    <Typography variant="h6" sx={{ fontWeight: "bold", lineHeight: 1.2 }}>
                      {currentUser.schoolName}
                    </Typography>
                  )}
                </Box>
              </Paper>

              <Box display="flex" alignItems="center" mb={3}>
                <LocationOnIcon color="action" sx={{ mr: 2, fontSize: 30 }} />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Address
                  </Typography>
                  <Typography variant="body1" color="text.secondary" fontStyle="italic">
                    {currentUser.address || "Not Provided"}
                  </Typography>
                </Box>
              </Box>

              <Box display="flex" alignItems="center" mb={3}>
                <CalendarMonthIcon color="action" sx={{ mr: 2, fontSize: 30 }} />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Joined Since
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {joiningDate}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>

          {/* --- ACTION BUTTONS --- */}
          <Divider sx={{ my: 3 }} />
          <Box display="flex" justifyContent="center" gap={2}>
            {!isEditing ? (
              <Button
                variant="contained"
                size="large"
                startIcon={<EditIcon />}
                onClick={() => setIsEditing(true)}
                sx={{ borderRadius: 8, px: 4 }}
              >
                Edit Profile
              </Button>
            ) : (
              <>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<CancelIcon />}
                  onClick={handleCancel}
                  disabled={loader}
                  sx={{ borderRadius: 8, px: 3 }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  startIcon={loader ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                  disabled={loader}
                  sx={{ borderRadius: 8, px: 4 }}
                >
                  {loader ? "Saving..." : "Save Changes"}
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default TeacherProfile;