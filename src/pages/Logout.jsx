import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authLogout } from "../redux/userRelated/userSlice";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Slide,
  IconButton,
} from "@mui/material";
import { Logout as LogoutIcon, Close as CloseIcon } from "@mui/icons-material";

// Animation transition ke liye
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Logout = () => {
  const [open, setOpen] = useState(true);
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authLogout());
    setOpen(false);
    navigate("/");
  };

  const handleClose = () => {
    setOpen(false);
    navigate(-1); // Wapis pichle page par
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="logout-dialog-description"
      PaperProps={{
        sx: {
          borderRadius: "16px",
          p: 2,
          maxWidth: "400px",
          width: "100%",
          // Agar z-index ka issue ho toh yahan customize kar sakte hain
          zIndex: 9999,
        },
      }}
    >
      {/* Close Button at top right */}
      <IconButton
        onClick={handleClose}
        sx={{ position: "absolute", right: 12, top: 12, color: "grey.500" }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent sx={{ textAlign: "center", pt: 4 }}>
        <Box
          sx={{
            bgcolor: "error.light",
            color: "error.main",
            width: 60,
            height: 60,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
            opacity: 0.8,
          }}
        >
          <LogoutIcon fontSize="large" />
        </Box>

        <Typography
          variant="h5"
          sx={{ fontWeight: 700, mb: 1, color: "text.primary" }}
        >
          Goodbye, {currentUser?.name || "User"}!
        </Typography>

        <Typography variant="body1" color="text.secondary">
          Are you sure you want to log out? You will need to login again to
          access your account.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", gap: 2, pb: 3, px: 3 }}>
        <Button
          onClick={handleClose}
          variant="outlined"
          fullWidth
          sx={{
            borderRadius: "10px",
            textTransform: "none",
            fontWeight: 600,
            borderColor: "grey.300",
            color: "text.primary",
            py: 1,
          }}
        >
          Stay Logged In
        </Button>
        <Button
          onClick={handleLogout}
          variant="contained"
          color="error"
          fullWidth
          autoFocus
          sx={{
            borderRadius: "10px",
            textTransform: "none",
            fontWeight: 600,
            py: 1,
            boxShadow: "0 4px 12px rgba(211, 47, 47, 0.3)",
          }}
        >
          Yes, Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Logout;
