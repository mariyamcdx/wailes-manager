import React from "react";
import { useFormContext } from "react-hook-form";
import {
  Grid,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";

export const TextInput = ({
  label,
  muiProps,
  InputProps,
  required,
  type,
  name,
  classes,
  disable,
  login,
  maxLength,
  rows,
  multiline,
  size,
  width,
  defaultValue,
  pattern,
  errorMessage,
  section,
  validate,
}) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();
  // Define the list of numeric fields
  const numericFields = [
    "empCostPerUnit",
    "empFinalCost",
    "curExchRate",
    "mtrlBaseCost",
    "mtrlFinalCost",
    "mtrlTax",
    "mtrlFactor",
    "mtrlWeight",
    "mtrlVolume",
    "mtrlSize1",
    "mtrlSize2",
    "mtrlSize3",
    "mtrlSize4",
    "serBaseCost",
    "serQtyFactor",
    "serAddCostFactor",
    "serFinalCost",
  ];

  const isGreaterThanZero = (value) => {
    const numericValue = parseFloat(value);
    return !isNaN(numericValue) && numericValue < 0;
  };

  const hasGreaterThanZeroValue = numericFields.some((fieldName) => {
    const fieldValue = watch(fieldName);
    return isGreaterThanZero(fieldValue);
  });
  return (
    <>
      <Grid container sx={{ margin: "4px" }}>
        {!login && (
          <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
            <InputLabel className={classes?.label} sx={{ fontSize: "0.9rem" }}>
              {label}
              {required && (
                <span style={{ color: "red", margin: "5px" }}>*</span>
              )}
            </InputLabel>
          </Grid>
        )}
        {login && (
          <InputLabel className={classes?.labelEmail}>
            {label}
            {required && <span style={{ color: "red", margin: "5px" }}>*</span>}
          </InputLabel>
        )}

        <Grid item xs={12} sx={{ alignItems: "center" }}>
          <TextField
            className={classes?.root}
            disabled={disable}
            fullWidth
            {...muiProps}
            variant="outlined"
            name={name}
            type={type}
            size={size || "small"}
            defaultValue={defaultValue}
            autoComplete="off"
            color={name in errors ? "error" : null}
            {...register(name, { required, pattern, section, validate })}
            inputProps={{
              maxLength,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">{InputProps}</InputAdornment>
              ),
              style: {
                borderRadius: "15px",
                fontSize: "0.9rem",
              },
              inputProps: { step: "any" },
            }}
            multiline={multiline}
            rows={rows}
            sx={{ width: { width } }}
          />
          <Typography
            variant="inherit"
            sx={{ fontSize: "0.9rem", color: "#d32f2f" }}
          >
            {hasGreaterThanZeroValue && isGreaterThanZero(watch(name))
              ? `${label} must be greater than 0`
              : name in errors &&
                (errorMessage ? errorMessage : `Please Enter  ${label}`)}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

TextField.defaultProps = {
  variant: "outlined",
};
