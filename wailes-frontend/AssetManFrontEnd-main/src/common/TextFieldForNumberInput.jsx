import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  Grid,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";

export const TextFieldForNumberInput = ({
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
    control,
    register,
    watch,
    formState: { errors },
  } = useFormContext();
  const isGreaterThanZero = (value) => {
    const numericValue = parseFloat(value);
    return value && (isNaN(numericValue) || numericValue <= 0)
      ? `${label} must be greater than 0`
      : true;
  };
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
          <Controller
            control={control}
            name={name}
            rules={{ required, validate: isGreaterThanZero }} //optional
            render={({ field }) => {
              return (
                <>
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
                    {...register(name)}
                    value={
                      parseFloat(field.value)
                        ? parseFloat(field.value)
                        : defaultValue
                    }
                    inputProps={{
                      maxLength,
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          {InputProps}
                        </InputAdornment>
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
                </>
              );
            }}
          />
          <Typography
            variant="inherit"
            sx={{ fontSize: "0.9rem", color: "#d32f2f" }}
          >
            {/* {isGreaterThanZero(watch(name))
              ? `${label} must be greater than 0`
              : null} */}
            {/* {name in errors &&
              (errorMessage ? errorMessage : `Please Enter ${label}`)}{" "} */}
            {errors[name] && errors[name].message}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

TextField.defaultProps = {
  variant: "outlined",
};
