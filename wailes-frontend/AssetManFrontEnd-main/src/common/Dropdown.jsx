import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Grid, InputLabel, MenuItem, Typography } from "@mui/material";
import { Select } from "@mui/material";

export const Dropdown = ({
  label,
  value,
  onChange,
  variant,
  name,
  required,
  options,
  width,
  size,
  classes,
  ...props
}) => {
  const {
    control,
    formState: { errors },
    getValues,
    setValue,
    register,
  } = useFormContext();

  if (getValues(name) === undefined) setValue(name, "");
  return (
    <>
      <Grid container sx={{ margin: "4px" }}>
        <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
          <InputLabel
            className={classes?.labelPassword}
            sx={{ fontSize: "0.9rem" }}
          >
            {label}
            {required && <span style={{ color: "red", margin: "5px" }}>*</span>}
          </InputLabel>
        </Grid>
        <Grid item xs={12} sx={{ alignItems: "center" }}>
          <Controller
            control={control}
            name={name}
            rules={{ required }}
            render={({ field }) => {
              return (
                <>
                  <Select
                    className={classes?.root}
                    id="demo-simple-select-outlined"
                    displayEmpty
                    onChange={(v) => {
                      if (v) {
                        field.onChange(v);
                      } else {
                        field.onChange(null);
                      }
                    }}
                    defaultValue={value || ""}
                    name={name}
                    size="small"
                    value={field.value ? field.value : " "}
                    color={name in errors ? "error" : null}
                    {...register(name)}
                    sx={{
                      borderRadius: "15px",
                      width: { width },
                      fontSize: "0.9rem",
                    }}
                  >
                    <MenuItem value={""}>Select a value</MenuItem>
                    {options?.map((o) => (
                      <MenuItem key={o.id || o.listId} value={o.id || o.listId}>
                        {o.label}
                      </MenuItem>
                    ))}
                  </Select>
                </>
              );
            }}
          />

          <Typography
            variant="inherit"
            sx={{ fontSize: "0.9rem", color: "#d32f2f" }}
          >
            {name in errors && `${label} is required`}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};
