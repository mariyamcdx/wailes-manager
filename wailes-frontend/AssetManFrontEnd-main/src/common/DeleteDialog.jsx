import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "./Button";
import { PaperComponent } from "./PaperComponent";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function DeleteDialog({
  open,
  setOpen,
  title,
  handleApprove,
  isLoading,
  onClose,
}) {
  const handleClose =
    onClose ||
    (() => {
      setOpen(false);
    });

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        open={open}
        fullWidth
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle
          sx={{ m: 0, p: 2 }}
          style={{ cursor: "move" }}
          id="draggable-dialog-title"
        >
          {title}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogActions>
          <Button
            autoFocus
            variant="outlined"
            onClick={handleClose}
            label={"No"}
          />
          <Button
            autoFocus
            onClick={handleApprove}
            isLoading={isLoading}
            label={"Yes"}
          />
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
