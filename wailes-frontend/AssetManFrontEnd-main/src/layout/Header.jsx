import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Box,
  FormControl,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import MIcon from "../assets/svgs/MIcon";
import { ListGroupPrefix, PlantPrefix } from "../constants/global";
import { useCommonData } from "../context/CommonDataProvider";
import { useAuthContext } from "../context/AuthContextProvider";
import useFetchApi from "../hooks/useFetchApi";
import { useState, useEffect, useCallback, useRef } from "react";
import useMutationApi from "../hooks/useMutationApi";
import { AccountPopover } from "../common/AccountPopover";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";



const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: `linear-gradient(120deg, white 70%, ${theme.palette.primary.main} 30%)`,
  borderBottom: `4px solid ${theme.palette.primary.main}`,
  boxShadow:'none',
  height:'40px'
}));

export default function Header() {
  const anchorRef = useRef(null);
  const navigate = useNavigate();
  const commonData = useCommonData();
  const tenantId = commonData?.userData?.tenant_id;
  const { refetchUser } = useAuthContext();
  const { data: plantDataList } = useFetchApi({
    endpoint: `${PlantPrefix}/tenant/${tenantId}/${PlantPrefix}`,
    retrieveOnMount: Boolean(tenantId),
    Menu_id: 10,
  });

  const [plantMasterData, setPlantMasterData] = useState(plantDataList);
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    if (plantDataList) {
      setPlantMasterData(plantDataList);
    }
    setValue(commonData.userData?.lastLoginPlantID);
  }, [plantDataList, commonData.userData]);

  const { mutateAsync: updateUser } = useMutationApi({
    endpoint: `${ListGroupPrefix}/update-user`,
    method: "put",
    Menu_id: 29,
  });

  const handleLogout = () => {
    localStorage.clear();
    window.location.pathname = "/login";
  };

 

  const getInitials = (firstName, lastName) => {
    return firstName && lastName ? `${firstName[0]}${lastName[0]}`.toUpperCase() : "";
  };

  const getFullName = (firstName, lastName) => {
    const fullName = firstName + " " + lastName;
    return fullName.length > 20 ? fullName.substring(0, 17) + "..." : fullName;
  };

  return (
    <>
      <StyledAppBar position="absolute" >
        <Toolbar variant="dense" sx={{ justifyContent: "space-between" }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => {
              navigate("/home");
            }}
          >
            <MIcon style={{ height: "5vh", width: "5vw",marginLeft:'-2vw',marginBottom:'1vw' }} />
          </IconButton>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <FormControl
              sx={{
                m: 1,
                minWidth: 120,
                maxWidth: 120,
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "pre",
              }}
              size="small"
            >
             
            </FormControl>
            <Tooltip
              title={`${commonData?.userData?.firstName} ${commonData?.userData?.lastName}`}
            >
              <Typography
                variant="body1"
                component="div"
                sx={{ lineHeight: "2.6" ,mb:'0.6vh'}}
              >
                {getFullName(
                  commonData?.userData?.firstName,
                  commonData?.userData?.lastName
                )}
              </Typography>
            </Tooltip>
            <Avatar
              onClick={handleOpen}
              ref={anchorRef}
              sx={{
                cursor: "pointer",
                height: 25,
                width: 25,
                mb:1,
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                bgcolor: "#ffffff",
                color: `primary.main`,
              }}
            >
              {getInitials(commonData?.userData?.firstName, commonData?.userData?.lastName)}
            </Avatar>
          </Box>
        </Toolbar>
      </StyledAppBar>
      <AccountPopover
        anchorEl={anchorRef.current}
        open={open}
        onClose={handleClose}
        userName={
          commonData?.userData?.firstName + " " + commonData?.userData?.lastName
        }
        email={commonData?.userData?.email_id}
        handleLogout={handleLogout}
      />
    </>
  );
}
