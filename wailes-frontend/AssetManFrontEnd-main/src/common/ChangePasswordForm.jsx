import React from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  InputLabel,
} from "@mui/material";
import { medium } from "../constants/global";
import { PaperComponent } from "./PaperComponent";

const ChangePasswordForm = ({ open, onClose, methods }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = (data) => {
    methods.setValue("password", data?.confirmPassword);
    onClose();
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll="paper"
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle
        sx={{ backgroundColor: "#1976d2", color: "white" }}
        style={{ cursor: "move" }}
        id="draggable-dialog-title"
      >
        Change Password
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          sx={{
            maxHeight: "350px",
            overflowY: "visible !important",
          }}
        >
          <Grid container sx={{ margin: "4px" }}>
            <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
              <InputLabel sx={{ fontSize: "0.9rem" }}>New Password</InputLabel>
            </Grid>
            <Grid item xs={12} sx={{ alignItems: "center" }}>
              <TextField
                {...register("newPassword", {
                  required: "New password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                  pattern:
                    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/i,
                })}
                type="password"
                margin="normal"
                size={"small"}
                width={medium}
                required={true}
                error={!!errors.newPassword}
                helperText={errors.newPassword?.message}
                errorMessage={"New password is required"}
                InputProps={{
                  style: {
                    borderRadius: "15px",
                    fontSize: "0.9rem",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
              <InputLabel sx={{ fontSize: "0.9rem" }}>
                Confirm New Password
              </InputLabel>
            </Grid>
            <Grid item xs={12} sx={{ alignItems: "center" }}>
              <TextField
                {...register("confirmPassword", {
                  required: "Please confirm your new password",
                  validate: (value) =>
                    value === getValues("newPassword") ||
                    "Passwords do not match",
                  pattern:
                    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/i,
                })}
                type="password"
                margin="normal"
                size={"small"}
                width={medium}
                required={true}
                isPassword={"isPassword"}
                InputProps={{
                  style: {
                    borderRadius: "15px",
                    fontSize: "0.9rem",
                  },
                }}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Change Password
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ChangePasswordForm;
