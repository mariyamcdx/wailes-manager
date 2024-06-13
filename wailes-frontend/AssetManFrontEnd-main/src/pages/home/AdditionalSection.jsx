import React, { useState, useEffect } from "react";
import { Typography, Button, Grid, TextField, IconButton, MenuItem } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import EditSection from "./EditSection";
import { CommonBox } from "./assetManagementSteps/CommonBox";
import AddSection from "./AddSection";


const AdditionalSection = ({ onClose,mode , }) => {
  const [isResizing, setIsResizing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(300);
  const [width, setWidth] = useState(300);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing) return;
      let newWidth = startWidth - (e.clientX - startX);
      const halfScreenWidth = window.innerWidth / 2;
      if (newWidth > halfScreenWidth) {
        newWidth = halfScreenWidth;
      }
      setWidth(newWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, startWidth, startX]);

  const handleMouseDown = (e) => {
    setIsResizing(true);
    setStartX(e.clientX);
    setStartWidth(width);
  };

  
  
  return (
    <div
      style={{
        marginTop: "-17vh",
        border: "1px solid #DADCE0",
        borderRadius: "12px",
        padding: "1rem",
        marginBottom: "1rem",
        boxShadow: "0 1px 3px rgba(60, 64, 67, 0.3), 0 4px 8px rgba(60, 64, 67, 0.15)",
        transition: "box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out",
        overflowY: "auto",
        maxHeight: "80vh",
        '&:hover': {
          boxShadow: "0 4px 6px rgba(60, 64, 67, 0.15), 0 8px 16px rgba(60, 64, 67, 0.15)",
          transform: "translateY(-2px)",
        },
        '&:active': {
          boxShadow: "0 1px 3px rgba(60, 64, 67, 0.3), 0 4px 8px rgba(60, 64, 67, 0.15)",
          transform: "translateY(0)",
        },
        '&:focus': {
          outline: "none",
          boxShadow: "0 0 0 3px #DADCE0",
        },
        width: `${width}px`,
        userSelect: "none",
        minWidth: '300px',
        padding: '1rem'
      }}
    >
      <Grid container justifyContent="space-between" alignItems="center">
        <Typography variant="h6">{mode === "edit" ? "Edit Section" : "Add Section"}</Typography>
        <IconButton disableRipple onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Grid>
      <div
        style={{
          height: "63vh",
          width: "100%",
        }}
        onMouseDown={handleMouseDown}
      >
       
{/* {
  showEditPage&&(
    <EditSection/>
  )
} */}
 {mode === "edit" && <EditSection />}
 { mode === "add" && <AddSection/> }

      </div>
    </div>
  );
};

export default AdditionalSection;
