import React from "react";
import { Box, CircularProgress } from "@mui/material";

export const Progressor = () => {
  return (
    <Box
      sx={{
        height: "100%",
        minHeight: "100vh",
        zIndex: 999,
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        top: "0",
        left: "50%",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: "50%",
          transform: "translate(-50%,-50%)",
        }}
      />
      <CircularProgress size={60} thickness={5} />
    </Box>
  );
};
