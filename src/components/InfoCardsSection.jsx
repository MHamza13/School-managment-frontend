import { Grid, Paper, Typography, Box, Tooltip } from "@mui/material";
import CountUp from "react-countup";
import CustomPieChart from "./CustomPieChart";

const InfoCardsSection = ({ cardData, fadeIn, isStudent = false }) => {
  return (
    <Grid container spacing={3}>
      {cardData.map((card, index) => (
        <Grid item xs={12} sm={6} md={3} lg={3} key={index}>
          {isStudent && card.chartData ? (
            <Paper
              sx={{
                p: 2.5,
                borderRadius: 3,
                background:
                  "linear-gradient(to bottom right, #ffffff, #f1f8ff)",
                boxShadow: "0 6px 16px rgba(0, 0, 0, 0.1)",
                animation: `${fadeIn} 0.5s ease ${index * 0.2}s`,
                transition: "transform 0.3s ease",
                textAlign: "center",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 12px 30px rgba(0, 0, 0, 0.15)",
                },
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{ color: "#455a64", fontWeight: 600, mb: 0.5 }}
              >
                {card.title}
              </Typography>
              {card.isEmpty ? (
                <Typography variant="h6">No Attendance Found</Typography>
              ) : (
                <Box
                  sx={{
                    height: 200,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CustomPieChart data={card.chartData} />
                </Box>
              )}
            </Paper>
          ) : (
            <Tooltip
              title={card.tooltip || ""}
              arrow
              disableHoverListener={!card.tooltip}
            >
              <Paper
                sx={{
                  p: 2.5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderRadius: 3,
                  background:
                    "linear-gradient(to bottom right, #ffffff, #f1f8ff)",
                  boxShadow: "0 6px 16px rgba(0, 0, 0, 0.1)",
                  animation: `${fadeIn} 0.5s ease ${index * 0.2}s`,
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 12px 30px rgba(0, 0, 0, 0.15)",
                  },
                }}
              >
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "#455a64", fontWeight: 600, mb: 0.5 }}
                  >
                    {card.title}
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      color: card.icon?.props?.sx?.color || "#000",
                    }}
                  >
                    {card.prefix || ""}
                    <CountUp
                      end={card.value}
                      duration={card.duration || 2}
                      delay={card.delay || 0}
                    />
                  </Typography>
                </Box>
                <Box>{card.icon}</Box>
              </Paper>
            </Tooltip>
          )}
        </Grid>
      ))}
    </Grid>
  );
};

export default InfoCardsSection;
