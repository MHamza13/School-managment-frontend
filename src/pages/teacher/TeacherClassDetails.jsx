import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getClassStudents } from "../../redux/sclassRelated/sclassHandle";
import {
  Paper,
  Box,
  Typography,
  ButtonGroup,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { BlackButton, BlueButton } from "../../components/buttonStyles";
import TableTemplate from "../../components/TableTemplate";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

const TeacherClassDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { sclassStudents, loading, error, getresponse } = useSelector(
    (state) => state.sclass
  );

  const { currentUser } = useSelector((state) => state.user);
  const classID = currentUser.teachSclass?._id;
  const subjectID = currentUser.teachSubject?._id;

  useEffect(() => {
    dispatch(getClassStudents(classID));
  }, [dispatch, classID]);

  if (error) {
    console.log(error);
  }

  const studentColumns = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "rollNum", label: "Roll Number", minWidth: 100 },
  ];

  const studentRows = sclassStudents.map((student) => ({
    name: student.name,
    rollNum: student.rollNum,
    id: student._id,
  }));

  const StudentsButtonHaver = ({ row }) => {
    const options = ["Take Attendance", "Provide Marks"];
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [menuAnchor, setMenuAnchor] = useState(null);
    const open = Boolean(menuAnchor);

    const handleClick = () => {
      if (selectedIndex === 0) {
        navigate(`/Teacher/class/student/attendance/${row.id}/${subjectID}`);
      } else if (selectedIndex === 1) {
        navigate(`/Teacher/class/student/marks/${row.id}/${subjectID}`);
      }
    };

    const handleMenuOpen = (event) => {
      setMenuAnchor(event.currentTarget);
    };

    const handleMenuClose = () => {
      setMenuAnchor(null);
    };

    const handleMenuItemClick = (index) => {
      setSelectedIndex(index);
      setMenuAnchor(null);

      if (index === 0) {
        navigate(`/Teacher/class/student/attendance/${row.id}/${subjectID}`);
      } else if (index === 1) {
        navigate(`/Teacher/class/student/marks/${row.id}/${subjectID}`);
      }
    };

    return (
      <>
        <BlueButton
          variant="contained"
          onClick={() => navigate("/Teacher/class/student/" + row.id)}
        >
          View
        </BlueButton>

        <ButtonGroup variant="contained">
          <Button onClick={handleClick}>{options[selectedIndex]}</Button>
          <BlackButton onClick={handleMenuOpen}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </BlackButton>
        </ButtonGroup>

        <Menu anchorEl={menuAnchor} open={open} onClose={handleMenuClose}>
          {options.map((option, index) => (
            <MenuItem
              key={option}
              selected={index === selectedIndex}
              onClick={() => handleMenuItemClick(index)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Typography variant="h4" align="center" gutterBottom>
            Class Details
          </Typography>
          {getresponse ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "16px",
              }}
            >
              No Students Found
            </Box>
          ) : (
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <Typography variant="h5" gutterBottom>
                Students List:
              </Typography>

              {Array.isArray(sclassStudents) && sclassStudents.length > 0 && (
                <TableTemplate
                  buttonHaver={StudentsButtonHaver}
                  columns={studentColumns}
                  rows={studentRows}
                />
              )}
            </Paper>
          )}
        </>
      )}
    </>
  );
};

export default TeacherClassDetails;
