import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
// Actions imports
import { updateStudent } from "../../redux/studentRelated/studentHandle";
import { getUserDetails } from "../../redux/userRelated/userHandle";

import {
  Container,
  Paper,
  Box,
  Avatar,
  Typography,
  Grid,
  Chip,
  Divider,
  Card,
  CardContent,
  Button,
  TextField,
  IconButton,
  Badge,
  CircularProgress,
} from "@mui/material";
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  CalendarMonth as CalendarIcon,
  Person as PersonIcon,
  School as SchoolIcon,
  Class as ClassIcon,
  Numbers as NumberIcon,
  FamilyRestroom as FamilyIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  CameraAlt as CameraIcon,
} from "@mui/icons-material";
import styled from "@emotion/styled";
import { BASE_URL } from "../../utils/Urls";

const StudentProfile = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  // --- LOCAL STATE FOR EDITING ---
  const [isEditing, setIsEditing] = useState(false);
  const [loader, setLoader] = useState(false);

  // --- IMAGE HANDLING ---
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  // --- FORM DATA STATE ---
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    fatherName: "",
    motherName: "",
    guardianPhone: "",
  });

  // --- 1. LOAD DATA ON MOUNT ---
  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || "",
        dob: currentUser.dob
          ? new Date(currentUser.dob).toISOString().split("T")[0]
          : "",
        gender: currentUser.gender || "",
        phone: currentUser.phone || "",
        email: currentUser.email || "",
        address: currentUser.address || "",
        fatherName: currentUser.fatherName || "",
        motherName: currentUser.motherName || "",
        guardianPhone: currentUser.guardianPhone || "",
      });

      // Set Image Preview
      if (currentUser.studentImage) {
        if (currentUser.studentImage.startsWith("http")) {
          setPreviewImage(currentUser.studentImage);
        } else {
          const cleanPath = currentUser.studentImage.replace(/\\/g, "/");
          setPreviewImage(`${BASE_URL}/${cleanPath}`);
        }
      } else {
        setPreviewImage("");
      }
    }
  }, [currentUser]);

  // --- HANDLERS ---
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleAvatarClick = () => {
    if (isEditing) {
      fileInputRef.current.click();
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedImage(null);
    // Revert Image
    if (currentUser.studentImage) {
      const cleanPath = currentUser.studentImage.replace(/\\/g, "/");
      setPreviewImage(
        currentUser.studentImage.startsWith("http")
          ? currentUser.studentImage
          : `${BASE_URL}/${cleanPath}`
      );
    } else {
      setPreviewImage("");
    }
    // Revert Data
    setFormData({
      name: currentUser.name || "",
      dob: currentUser.dob
        ? new Date(currentUser.dob).toISOString().split("T")[0]
        : "",
      gender: currentUser.gender || "",
      phone: currentUser.phone || "",
      email: currentUser.email || "",
      address: currentUser.address || "",
      fatherName: currentUser.fatherName || "",
      motherName: currentUser.motherName || "",
      guardianPhone: currentUser.guardianPhone || "",
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoader(true);

    const updateData = new FormData();
    updateData.append("name", formData.name);
    updateData.append("dob", formData.dob);
    updateData.append("gender", formData.gender);
    updateData.append("phone", formData.phone);
    updateData.append("email", formData.email);
    updateData.append("address", formData.address);
    updateData.append("fatherName", formData.fatherName);
    updateData.append("motherName", formData.motherName);
    updateData.append("guardianPhone", formData.guardianPhone);

    if (selectedImage) {
      updateData.append("studentImage", selectedImage);
    }

    // 1. Update API Call
    await dispatch(updateStudent(currentUser._id, updateData));

    // 2. Refresh Data from DB
    // IMPORTANT: Make sure getUserDetails is correctly imported from userHandle
    await dispatch(getUserDetails(currentUser._id, "Student"));

    setLoader(false);
    setIsEditing(false);
  };

  // --- STATIC DATA HELPERS ---
  const rollNum = currentUser?.rollNum || "";
  const className = currentUser?.sclassName?.sclassName || "Not Assigned";
  const schoolName = currentUser?.school?.schoolName || "School Name";

  // Format Date for Display (DD Month YYYY)
  const displayDob = formData.dob
    ? new Date(formData.dob).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Not Provided";

  // Academic Stats (Hardcoded for now)
  const attendance = "85%";
  const grade = "A";
  const feesStatus = "Paid";

  return (
    <Container
      sx={{
        padding: "0 !important",
        maxWidth: "100% !important",
        mt: 0,
        mb: 0,
      }}
    >
      <StyledPaper elevation={3}>
        {/* Hidden Input for Image */}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImageChange}
          accept="image/*"
        />

        {/* --- Header Section --- */}
        <HeaderBackground>
          <Box sx={{ position: "absolute", bottom: -60 }}>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                isEditing ? (
                  <IconButton
                    onClick={handleAvatarClick}
                    sx={{
                      bgcolor: "#fff",
                      boxShadow: 2,
                      "&:hover": { bgcolor: "#f0f0f0" },
                    }}
                  >
                    <CameraIcon color="primary" />
                  </IconButton>
                ) : null
              }
            >
              <ProfileAvatar
                alt={formData.name}
                src={previewImage || "/default-student.png"}
                isEditing={isEditing}
                onClick={handleAvatarClick}
              >
                {!previewImage && formData.name?.charAt(0).toUpperCase()}
              </ProfileAvatar>
            </Badge>
          </Box>
        </HeaderBackground>

        {/* --- Main Body --- */}
        <Box sx={{ pt: 8, pb: 4, px: { xs: 2, md: 4 } }}>
          {/* Name & Roll Number */}
          <Box sx={{ textAlign: "left", mb: 5 }}>
            {isEditing ? (
              <TextField
                name="name"
                value={formData.name}
                onChange={handleChange}
                variant="standard"
                inputProps={{
                  style: {
                    textAlign: "center",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                  },
                }}
                sx={{ maxWidth: 300 }}
              />
            ) : (
              <Typography variant="h4" fontWeight="bold" color="#2c3e50">
                {formData.name}
              </Typography>
            )}

            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Student at {schoolName}
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "left",
                mt: 1,
                flexWrap: "wrap",
              }}
            >
              <Chip
                icon={<NumberIcon />}
                label={`Roll No: ${rollNum}`}
                color="primary"
                variant="outlined"
              />
              <Chip
                icon={<ClassIcon />}
                label={`Class: ${className}`}
                color="success"
                variant="outlined"
              />
            </Box>
          </Box>

          <Grid container spacing={4}>
            {/* --- Left Column: Personal Details --- */}
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ height: "100%", borderRadius: 2 }}>
                <CardContent>
                  <SectionTitle>
                    <PersonIcon color="primary" /> Personal Information
                  </SectionTitle>
                  <Divider sx={{ mb: 2 }} />

                  {/* DOB */}
                  <InfoItem>
                    <CalendarIcon color="action" fontSize="small" />
                    <Box width="100%">
                      <Typography variant="caption" color="text.secondary">
                        Date of Birth
                      </Typography>
                      {isEditing ? (
                        <TextField
                          fullWidth
                          type="date"
                          size="small"
                          name="dob"
                          value={formData.dob}
                          onChange={handleChange}
                        />
                      ) : (
                        <Typography variant="body1">{displayDob}</Typography>
                      )}
                    </Box>
                  </InfoItem>

                  {/* Gender */}
                  <InfoItem>
                    <PersonIcon color="action" fontSize="small" />
                    <Box width="100%">
                      <Typography variant="caption" color="text.secondary">
                        Gender
                      </Typography>
                      {isEditing ? (
                        <TextField
                          fullWidth
                          size="small"
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          placeholder="Male/Female"
                        />
                      ) : (
                        <Typography
                          variant="body1"
                          sx={{ textTransform: "capitalize" }}
                        >
                          {formData.gender || "Not Provided"}
                        </Typography>
                      )}
                    </Box>
                  </InfoItem>

                  {/* Email */}
                  <InfoItem>
                    <EmailIcon color="action" fontSize="small" />
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
                        <Typography variant="body1">
                          {formData.email || "No Email"}
                        </Typography>
                      )}
                    </Box>
                  </InfoItem>

                  {/* Phone */}
                  <InfoItem>
                    <PhoneIcon color="action" fontSize="small" />
                    <Box width="100%">
                      <Typography variant="caption" color="text.secondary">
                        Phone / Mobile
                      </Typography>
                      {isEditing ? (
                        <TextField
                          fullWidth
                          size="small"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      ) : (
                        <Typography variant="body1">
                          {formData.phone || "Not Provided"}
                        </Typography>
                      )}
                    </Box>
                  </InfoItem>

                  {/* Address */}
                  <InfoItem>
                    <LocationOnIconStyled color="action" fontSize="small" />
                    <Box width="100%">
                      <Typography variant="caption" color="text.secondary">
                        Address
                      </Typography>
                      {isEditing ? (
                        <TextField
                          fullWidth
                          multiline
                          size="small"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                        />
                      ) : (
                        <Typography variant="body1">
                          {formData.address || "Not Provided"}
                        </Typography>
                      )}
                    </Box>
                  </InfoItem>
                </CardContent>
              </Card>
            </Grid>

            {/* --- Right Column: Guardian & Academic Info --- */}
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {/* Guardian Info Box */}
                <Card variant="outlined" sx={{ borderRadius: 2 }}>
                  <CardContent>
                    <SectionTitle>
                      <FamilyIcon color="secondary" /> Guardian / Parents
                    </SectionTitle>
                    <Divider sx={{ mb: 2 }} />

                    {/* Father Name */}
                    <InfoItem>
                      <Typography
                        fontWeight="bold"
                        minWidth={100}
                        color="text.secondary"
                      >
                        Father's Name:
                      </Typography>
                      {isEditing ? (
                        <TextField
                          fullWidth
                          size="small"
                          name="fatherName"
                          value={formData.fatherName}
                          onChange={handleChange}
                        />
                      ) : (
                        <Typography fontWeight="500">
                          {formData.fatherName || "Not Added"}
                        </Typography>
                      )}
                    </InfoItem>

                    {/* Mother Name */}
                    <InfoItem>
                      <Typography
                        fontWeight="bold"
                        minWidth={100}
                        color="text.secondary"
                      >
                        Mother's Name:
                      </Typography>
                      {isEditing ? (
                        <TextField
                          fullWidth
                          size="small"
                          name="motherName"
                          value={formData.motherName}
                          onChange={handleChange}
                        />
                      ) : (
                        <Typography fontWeight="500">
                          {formData.motherName || "Not Added"}
                        </Typography>
                      )}
                    </InfoItem>

                    {/* Emergency Contact */}
                    <InfoItem>
                      <Typography
                        fontWeight="bold"
                        minWidth={100}
                        color="error.main"
                      >
                        Emergency:
                      </Typography>
                      {isEditing ? (
                        <TextField
                          fullWidth
                          size="small"
                          name="guardianPhone"
                          value={formData.guardianPhone}
                          onChange={handleChange}
                        />
                      ) : (
                        <Typography fontWeight="500">
                          {formData.guardianPhone || "Not Added"}
                        </Typography>
                      )}
                    </InfoItem>
                  </CardContent>
                </Card>

                {/* Academic/School Stats */}
                <Card
                  variant="outlined"
                  sx={{ borderRadius: 2, bgcolor: "#f9fafb" }}
                >
                  <CardContent>
                    <SectionTitle>
                      <SchoolIcon color="success" /> Academic Status
                    </SectionTitle>
                    <Divider sx={{ mb: 2 }} />

                    <Grid container spacing={2} textAlign="center">
                      <Grid item xs={4}>
                        <Typography
                          variant="h5"
                          fontWeight="bold"
                          color="primary"
                        >
                          {attendance}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Attendance
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography
                          variant="h5"
                          fontWeight="bold"
                          color="secondary"
                        >
                          {grade}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Overall Grade
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Box
                          sx={{
                            display: "inline-block",
                            px: 2,
                            py: 0.5,
                            bgcolor: "#e8f5e9",
                            borderRadius: 1,
                          }}
                        >
                          <Typography
                            variant="h6"
                            fontWeight="bold"
                            color="success.main"
                          >
                            {feesStatus}
                          </Typography>
                        </Box>
                        <Box mt={0.5}>
                          <Typography variant="caption" color="text.secondary">
                            Fees Status
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>

          {/* --- Action Buttons --- */}
          <Box
            sx={{ display: "flex", justifyContent: "center", mt: 5, gap: 2 }}
          >
            {!isEditing ? (
              <Button
                variant="contained"
                size="large"
                startIcon={<EditIcon />}
                onClick={() => setIsEditing(true)}
                sx={{ px: 4, borderRadius: "20px" }}
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
                  sx={{ px: 3, borderRadius: "20px" }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={
                    loader ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      <SaveIcon />
                    )
                  }
                  onClick={submitHandler}
                  disabled={loader}
                  sx={{ px: 4, borderRadius: "20px" }}
                >
                  {loader ? "Saving..." : "Save Changes"}
                </Button>
              </>
            )}
          </Box>
        </Box>
      </StyledPaper>
    </Container>
  );
};

export default StudentProfile;

// --- STYLED COMPONENTS ---

const StyledPaper = styled(Paper)`
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  background: #fff;
  margin-bottom: 20px;
`;

const HeaderBackground = styled(Box)`
  height: 160px;
  background: linear-gradient(135deg, #7b1fa2 0%, #512da8 100%);
  position: relative;
  display: flex;
  justify-content: left;
`;

const ProfileAvatar = styled(Avatar)`
  width: 140px;
  height: 140px;
  border: 5px solid white;
  font-size: 3.5rem;
  background-color: #ff9800;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  object-fit: cover;
  cursor: ${(props) => (props.isEditing ? "pointer" : "default")};
  transition: all 0.3s ease;
  margin-left: 20px;

  &:hover {
    filter: ${(props) => (props.isEditing ? "brightness(0.8)" : "none")};
  }
`;

const SectionTitle = styled(Typography)`
  font-size: 1.1rem;
  font-weight: 600;
  color: #34495e;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
`;

const InfoItem = styled(Box)`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;

  & svg {
    color: #757575;
  }
`;

const LocationOnIconStyled = styled(LocationIcon)`
  color: #757575;
`;
