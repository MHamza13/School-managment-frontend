import { Paper, Typography, Box } from "@mui/material";
import SeeNotice from "./SeeNotice";

const NoticeSection = ({ fadeIn }) => {
  return (
    <Paper
      sx={{
        mt: 5,
        p: 3,
        borderRadius: 3,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        bgcolor: "#fff",
        animation: `${fadeIn} 0.5s ease-in-out 0.6s`,
        borderLeft: "5px solid #7b1fa2",
      }}
    >
      <Typography
        variant="h5"
        sx={{ fontWeight: 600, mb: 2, color: "#1f2d3d" }}
      >
        Recent Notifications
      </Typography>
      <Box
        sx={{
          pr: 1,
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#b39ddb",
            borderRadius: 4,
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#9575cd",
          },
        }}
      >
        <SeeNotice />
        {(!Array.isArray(SeeNotice) || SeeNotice.length === 0) && (
          <Typography
            variant="body2"
            align="center"
            sx={{ color: "#78909c", mt: 2 }}
          >
            No notifications available.
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default NoticeSection;
