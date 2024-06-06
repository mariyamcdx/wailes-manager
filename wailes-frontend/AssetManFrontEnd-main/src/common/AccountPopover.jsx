import PropTypes from "prop-types";
import {
  Box,
  Divider,
  ListItemIcon,
  MenuItem,
  MenuList,
  Popover,
  Typography,
} from "@mui/material";
import { Logout } from "@mui/icons-material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useNavigate } from "react-router-dom";

export const AccountPopover = (props) => {
  const navigate = useNavigate();
  const { anchorEl, onClose, open, userName, handleLogout, email } = props;
  const handleClickHelp = () => {
    navigate("/help/help");
  };
  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom",
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2,
          textAlign: "center",
        }}
      >
        <Typography
          variant="overline"
          sx={{ fontWeight: "bold", textTransform: "capitalize" }}
        >
          {userName}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {email}
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: "8px",
          "& > *": {
            borderRadius: 1,
          },
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <MenuItem onClick={handleLogout} sx={{ width: "50%" }}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Sign out
        </MenuItem>
        <MenuItem sx={{ paddingRight: "0px" }} onClick={handleClickHelp}>
          {" "}
          <ListItemIcon>
            <HelpOutlineIcon fontSize="small" />
          </ListItemIcon>
        </MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
};
