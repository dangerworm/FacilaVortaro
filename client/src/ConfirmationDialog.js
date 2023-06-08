import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
  DialogTitle,
} from "@mui/material";

const ConfirmationDialog = ({
  open = true,
  title,
  contentText1,
  contentText2 = "",
  cancelButtonText = "Cancel",
  confirmButtonText = "Confirm",
  onClose,
  onConfirm,
  disableActions = false,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <p>{contentText1}</p>
          {contentText2 && <p>{contentText2}</p>}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Grid container direction="row" justifyContent="space-between">
          <Grid item>
            <Button
              onClick={onClose}
              color={"warning"}
              disabled={disableActions}
            >
              {cancelButtonText}
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={onConfirm}
              color={"error"}
              disabled={disableActions}
            >
              {confirmButtonText}
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
