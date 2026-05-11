import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { Box, Typography, Paper } from "@mui/material";

// Custom Tooltip using MUI
const CustomTooltipContent = ({ active, payload, dataKey }) => {
  if (active && payload && payload.length) {
    const {
      subject,
      attendancePercentage,
      totalClasses,
      attendedClasses,
      marksObtained,
      subName,
    } = payload[0].payload;

    return (
      <Paper
        elevation={3}
        sx={{
          p: 2,
          borderRadius: 2,
          backgroundColor: "#fff",
        }}
      >
        {dataKey === "attendancePercentage" ? (
          <>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              color="#6a1b9a"
              mb={1}
            >
              {subject}
            </Typography>
            <Typography variant="body2" color="text.primary">
              Attended: {attendedClasses}/{totalClasses}
            </Typography>
            <Typography variant="body2" color="text.primary">
              {attendancePercentage}%
            </Typography>
          </>
        ) : (
          <>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              color="#6a1b9a"
              mb={1}
            >
              {subName?.subName}
            </Typography>
            <Typography variant="body2" color="text.primary">
              Marks: {marksObtained}
            </Typography>
          </>
        )}
      </Paper>
    );
  }

  return null;
};

// Main Chart Component
const CustomBarChart = ({ chartData, dataKey }) => {
  const subjects = chartData.map(
    (data) => data.subject || data.subName?.subName
  );
  const distinctColors = generateDistinctColors(subjects.length);

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        maxWidth: 700,
        mx: "auto",
      }}
    >
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <XAxis
            dataKey={
              dataKey === "marksObtained" ? "subName.subName" : "subject"
            }
            stroke="#6a1b9a"
            tick={{ fontSize: 12 }}
          />
          <YAxis domain={[0, 100]} stroke="#6a1b9a" tick={{ fontSize: 12 }} />
          <Tooltip content={<CustomTooltipContent dataKey={dataKey} />} />
          <Bar dataKey={dataKey}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={distinctColors[index]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

// Generate distinct colors
const generateDistinctColors = (count) => {
  const colors = [];
  const goldenRatio = 0.618033988749895;

  for (let i = 0; i < count; i++) {
    const hue = (i * goldenRatio) % 1;
    const [r, g, b] = hslToRgb(hue, 0.6, 0.6);
    colors.push(`rgb(${r}, ${g}, ${b})`);
  }

  return colors;
};

// HSL to RGB converter
const hslToRgb = (h, s, l) => {
  let r, g, b;
  const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  r = hue2rgb(p, q, h + 1 / 3);
  g = hue2rgb(p, q, h);
  b = hue2rgb(p, q, h - 1 / 3);

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};

export default CustomBarChart;
