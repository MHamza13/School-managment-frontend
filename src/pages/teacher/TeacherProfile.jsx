import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateTeacher, getTeacherDetails } from "../../redux/teacherRelated/teacherHandle";

import {
  Typography,
  Avatar,
  Grid,
  Paper,
  Box,
  Container,
  Button,
  Chip,
  TextField,
  CircularProgress,
  IconButton,
  Badge
} from "@mui/material";
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  School as SchoolIcon,
  Class as ClassIcon,
  Book as SubjectIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  CameraAlt as CameraIcon
} from "@mui/icons-material";
import styled from "@emotion/styled";
import { BASE_URL } from "../../utils/Urls";

const TeacherProfile = () => {
  const dispatch = useDispatch();
  
  // Apne Backend ka URL yahan set karein

  const { currentUser } = useSelector((state) => state.user);
  const { teacherDetails, loading } = useSelector((state) => state.teacher);

  const [isEditing, setIsEditing] = useState(false);
  const [loader, setLoader] = useState(false);
  
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    qualification: "",
    bio: "",
  });

  useEffect(() => {
    if (currentUser?._id) {
      dispatch(getTeacherDetails(currentUser._id));
    }
  }, [dispatch, currentUser]);

  const displayData = teacherDetails && teacherDetails._id ? teacherDetails : currentUser;

  useEffect(() => {
    if (displayData) {
      setFormData({
        name: displayData.name || "",
        email: displayData.email || "",
        phone: displayData.phone || "",
        address: displayData.address || "",
        qualification: displayData.qualification || "",
        bio: displayData.bio || "",
      });

      // *** IMAGE URL LOGIC ***
      if (displayData.teacherImage) {
        // Agar image link 'http' se shuru nahi hota, to backend URL lagayein
        if (!displayData.teacherImage.startsWith("http")) {
            // Windows path backslashes (\) ko forward slashes (/) mein badlein
            const cleanPath = displayData.teacherImage.replace(/\\/g, "/");
            setPreviewImage(`${BASE_URL}/${cleanPath}`);
        } else {
            setPreviewImage(displayData.teacherImage);
        }
      } else {
          setPreviewImage(""); // No image
      }
    }
  }, [displayData]);

  const teachSclass = displayData?.teachSclass || { sclassName: "Not Assigned" };
  const teachSubject = displayData?.teachSubject || { subName: "Not Assigned" };
  const teachSchool = displayData?.school || { schoolName: "Unknown School" };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      // Nayi select ki gayi image ka preview turant dikhayein
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
    setFormData({
        name: displayData.name || "",
        email: displayData.email || "",
        phone: displayData.phone || "",
        address: displayData.address || "",
        qualification: displayData.qualification || "",
        bio: displayData.bio || "",
    });
    
    // Cancel karne par wapis purani image set karein (Server URL wali)
    if (displayData.teacherImage) {
        const cleanPath = displayData.teacherImage.replace(/\\/g, "/");
        setPreviewImage(displayData.teacherImage.startsWith("http") 
            ? displayData.teacherImage 
            : `${BASE_URL}/${cleanPath}`);
    } else {
        setPreviewImage("");
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoader(true);

    const updateData = new FormData();
    updateData.append("name", formData.name);
    updateData.append("phone", formData.phone);
    updateData.append("address", formData.address);
    updateData.append("qualification", formData.qualification);
    updateData.append("bio", formData.bio);
    
    if (selectedImage) {
        updateData.append("teacherImage", selectedImage);
    }

    await dispatch(updateTeacher(currentUser._id, updateData));
    await dispatch(getTeacherDetails(currentUser._id));

    setLoader(false);
    setIsEditing(false);
  };

  return (
    <Container sx={{ padding: "0 !important", maxWidth: "100% !important" , mt: 0, mb: 0 }}>
      <StyledPaper elevation={3}>
        
        <input 
            type="file" 
            ref={fileInputRef} 
            style={{ display: "none" }} 
            onChange={handleImageChange}
            accept="image/*"
        />

        <HeaderBackground>
          <Box sx={{ position: "absolute", bottom: -50 }}>
            <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                    isEditing ? (
                        <IconButton 
                            onClick={handleAvatarClick}
                            sx={{ bgcolor: "#fff", boxShadow: 2, '&:hover': { bgcolor: "#f0f0f0" } }}
                        >
                            <CameraIcon color="primary" />
                        </IconButton>
                    ) : null
                }
            >
                {/* Avatar Source Logic */}
                <ProfileAvatar
                  alt={formData.name}
                  src={previewImage || "/default-avatar.png"} 
                  isEditing={isEditing}
                  onClick={handleAvatarClick}
                >
                  {/* Agar koi image nahi hai to naam ka pehla akshar dikhayein */}
                  {!previewImage && formData.name?.charAt(0).toUpperCase()}
                </ProfileAvatar>
            </Badge>
          </Box>
        </HeaderBackground>

        <Box sx={{ pt: 7, pb: 4, px: 4 }}>
          
          <Box sx={{ textAlign: "left", mb: 4 }}>
            {isEditing ? (
                <TextField 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    variant="standard"
                    inputProps={{ style: { textAlign: "center", fontSize: "1.5rem", fontWeight: "bold" } }}
                    fullWidth
                    sx={{ maxWidth: 300 }}
                />
            ) : (
                <Typography variant="h4" fontWeight="bold" color="primary.main">
                  {formData.name}
                </Typography>
            )}

            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              Senior Teacher at {teachSchool.schoolName}
            </Typography>
            <Chip
              label={`ID: ${displayData?._id?.slice(-6).toUpperCase()}`}
              sx={{ mt: 1 }}
              variant="outlined"
            />
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <SectionBox>
                <Typography variant="h6" gutterBottom sx={{ borderBottom: "2px solid #1976d2", display: "inline-block", mb: 2 }}>
                  Personal Information
                </Typography>
                
                <InfoRow>
                  <EmailIcon color="action" />
                  <Typography variant="body1">{formData.email}</Typography>
                </InfoRow>

                <InfoRow>
                  <PhoneIcon color="action" />
                  {isEditing ? (
                      <TextField 
                        fullWidth size="small" name="phone" 
                        value={formData.phone} onChange={handleChange} 
                        placeholder="Enter Phone"
                      />
                  ) : (
                      <Typography variant="body1">{formData.phone || "Not Provided"}</Typography>
                  )}
                </InfoRow>

                <InfoRow>
                  <LocationIcon color="action" />
                  {isEditing ? (
                      <TextField 
                        fullWidth size="small" name="address" 
                        value={formData.address} onChange={handleChange} 
                        placeholder="Enter Address"
                      />
                  ) : (
                      <Typography variant="body1">{formData.address || "Not Provided"}</Typography>
                  )}
                </InfoRow>

                <Box mt={2} p={2} bgcolor="#f0f7ff" borderRadius="8px">
                  <Typography variant="subtitle2" color="primary">Qualification</Typography>
                  {isEditing ? (
                      <TextField 
                        fullWidth size="small" name="qualification" variant="standard"
                        value={formData.qualification} onChange={handleChange} 
                        placeholder="e.g. M.Sc, B.Ed"
                      />
                  ) : (
                      <Typography variant="body1">{formData.qualification || "No Info Added"}</Typography>
                  )}
                </Box>
              </SectionBox>
            </Grid>

            <Grid item xs={12} md={6}>
              <SectionBox>
                <Typography variant="h6" gutterBottom sx={{ borderBottom: "2px solid #1976d2", display: "inline-block", mb: 2 }}>
                  Academic Details
                </Typography>

                <InfoRow>
                  <ClassIcon color="primary" />
                  <Box>
                    <Typography variant="caption" color="text.secondary">Class Teacher</Typography>
                    <Typography variant="h6">{teachSclass.sclassName}</Typography>
                  </Box>
                </InfoRow>

                <InfoRow>
                  <SubjectIcon color="primary" />
                  <Box>
                    <Typography variant="caption" color="text.secondary">Main Subject</Typography>
                    <Typography variant="h6">{teachSubject.subName}</Typography>
                  </Box>
                </InfoRow>
              </SectionBox>
            </Grid>

            <Grid item xs={12}>
              <Paper variant="outlined" sx={{ p: 3, bgcolor: "#fafafa", borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom color="primary">About Me</Typography>
                {isEditing ? (
                    <TextField 
                        fullWidth multiline rows={4} name="bio"
                        value={formData.bio} onChange={handleChange}
                        placeholder="Write something about yourself..."
                        sx={{ bgcolor: "white" }}
                    />
                ) : (
                    <Typography variant="body1" color="text.secondary" sx={{ fontStyle: "italic", lineHeight: 1.6 }}>
                      "{formData.bio || "No bio added yet."}"
                    </Typography>
                )}
              </Paper>
            </Grid>
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 5, gap: 2 }}>
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
                        startIcon={loader ? <CircularProgress size={20} color="inherit"/> : <SaveIcon />} 
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

export default TeacherProfile;

// --- STYLED COMPONENTS ---
const StyledPaper = styled(Paper)`
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin-top: 20px;
`;

const HeaderBackground = styled(Box)`
  height: 150px;
  background: linear-gradient(135deg, #7b1fa2 0%, #512da8 100%);
  position: relative;
  display: flex;
  justify-content: left;
`;

const ProfileAvatar = styled(Avatar)`
  width: 130px; 
  height: 130px;
  border: 5px solid white; 
  font-size: 3.5rem; 
  background-color: #ff5722;
  box-shadow: 0px 4px 10px rgba(0,0,0,0.2);
  cursor: ${props => props.isEditing ? 'pointer' : 'default'};
  transition: all 0.3s ease;
  object-fit: cover; 
  margin-left: 20px;
  
  &:hover {
    filter: ${props => props.isEditing ? 'brightness(0.8)' : 'none'};
  }
`;

const SectionBox = styled(Box)`
  display: flex; 
  flex-direction: column; 
  gap: 18px;
`;

const InfoRow = styled(Box)`
  display: flex; 
  align-items: center; 
  gap: 18px; 
  padding: 6px 0;
  
  & svg {
    font-size: 28px;
    opacity: 0.7;
  }
`;