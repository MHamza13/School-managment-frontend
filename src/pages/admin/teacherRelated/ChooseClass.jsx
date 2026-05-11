import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button } from "@mui/material";
import { getAllSclasses } from "../../../redux/sclassRelated/sclassHandle";
import { useNavigate } from "react-router-dom";
import TableTemplate from "../../../components/TableTemplate";

const ChooseClass = ({ situation }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { sclassesList, loading, error, getresponse } = useSelector(
    (state) => state.sclass
  );
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllSclasses(currentUser._id, "Sclass"));
  }, [currentUser._id, dispatch]);

  if (error) {
    console.log(error);
  }

  const navigateHandler = (classID) => {
    if (situation === "Teacher") {
      navigate("/Admin/teachers/choosesubject/" + classID);
    } else if (situation === "Subject") {
      navigate("/Admin/addsubject/" + classID);
    }
  };

  const sclassColumns = [{ id: "name", label: "Class Name", minWidth: 170 }];

  const sclassRows =
    sclassesList &&
    sclassesList.length > 0 &&
    sclassesList.map((sclass) => {
      return {
        name: sclass.sclassName,
        id: sclass._id,
      };
    });

  // Choose Button
  const SclassButtonHaver = ({ row }) => {
    return (
      <Button
        variant="contained"
        onClick={() => navigateHandler(row.id)}
        sx={{
          backgroundColor: "#7b1fa2",
          "&:hover": { backgroundColor: "#6a1b9a" },
          textTransform: "none",
          fontWeight: 600,
        }}
      >
        Choose
      </Button>
    );
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {getresponse ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "16px",
              }}
            >
              {/* Add Class Button */}
              <Button
                variant="contained"
                onClick={() => navigate("/Admin/addclass")}
                sx={{
                  backgroundColor: "#7b1fa2",
                  "&:hover": { backgroundColor: "#6a1b9a" },
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                Add Class
              </Button>
            </Box>
          ) : (
            <>
              {Array.isArray(sclassesList) && sclassesList.length > 0 && (
                <TableTemplate
                  buttonHaver={SclassButtonHaver}
                  columns={sclassColumns}
                  rows={sclassRows}
                  heading="Choose a class"
                />
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default ChooseClass;
