import React from "react";
import { CircularProgress, Button as MuiButton } from "@mui/material";

export const Button = ({
  label,
  type,
  sx,
  inputProps,
  color,
  disabled,
  component,
  isLoading,
  ...muiProps
}) => {
  return (
    <>
      <MuiButton
        sx={sx}
        {...muiProps}
        type={type}
        color={color}
        disabled={isLoading || disabled}
        component={component}
      >
        {isLoading && (
          <CircularProgress size={"15px"} sx={{ mr: 1, color: "white" }} />
        )}{" "}
        {label}
      </MuiButton>
    </>
  );
};

MuiButton.defaultProps = {
  variant: "contained",
};
