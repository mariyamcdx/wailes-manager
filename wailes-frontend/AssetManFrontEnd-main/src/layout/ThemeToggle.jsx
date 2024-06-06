import React from "react";
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({});

const ThemeToggle = ({ children }) => {
  return (
    <>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </>
  );
};

export default ThemeToggle;
