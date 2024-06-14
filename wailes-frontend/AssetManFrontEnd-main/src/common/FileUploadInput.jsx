import React from "react";
import { useFormContext } from "react-hook-form";
import { Chip, FormLabel, Grid, InputLabel, Typography } from "@mui/material";
import { Button } from "./Button";

export const FileUploadInput = ({
  label,
  required,
  name,
  classes,
  handleFileUpload,
  documentSizeError,
  selectFile,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <Grid container sx={{ margin: "4px" }}>
        <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
          <InputLabel className={classes?.label} sx={{ fontSize: "0.9rem" }}>
            {label}
            {required && <span style={{ color: "red", margin: "5px" }}>*</span>}
          </InputLabel>
        </Grid>
        {selectFile?.length !== 0 && selectFile && (
          <Chip
            label={selectFile.name}
            sx={{
              color: "black",
              marginY: 0.5,
              marginRight: 1,
              "& .MuiChip-deleteIcon": {
                color: "lightGrey",
                ml: 0.2,
              },
            }}
          />
        )}
        <Grid item xs={12} sm={12} md={12} sx={{ alignItems: "center" }}>
          <input
            style={{ display: "none" }}
            id="contained-button-file"
            type="file"
            {...register(name, {
              required,
            })}
            accept="image/png,image/jpg, image/jpeg,.doc, .docx,.pdf,.xlsx, .xls, .csv"
            onChange={handleFileUpload}
          />
          <FormLabel htmlFor="contained-button-file">
            <Button
              component="span"
              sx={{
                mt: 1,
              }}
              fullWidth
              label="Upload"
            ></Button>
          </FormLabel>
        </Grid>
        {documentSizeError && (
          <Typography variant="inherit" color="error">
            Selected image is too large. Please select an image under 10 MB
          </Typography>
        )}
        {selectFile.length === 0 && (
          <Typography
            variant="inherit"
            sx={{ fontSize: "0.9rem", color: "#d32f2f" }}
          >
            {name in errors && `Please select ${label} `}
          </Typography>
        )}
      </Grid>
    </>
  );
};
