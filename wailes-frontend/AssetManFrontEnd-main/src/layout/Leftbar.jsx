import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";

import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuIcon from "@mui/icons-material/Menu";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import StorageIcon from "@mui/icons-material/Storage";
import { useAuthContext } from "../context/AuthContextProvider";
import { menuInitialData } from "../utils/MenuInitialData";
import { MenuRightsDetails } from "../utils/MenuRightsDetails";
import MIcon from "../assets/svgs/MIcon";
import Materials from "../pages/home/Materials";

const iconList = {
  home: <MenuIcon />,
  DBView: <StorageIcon />,
  DataTransfer: <ImportExportIcon />,
  AppConfig: <MiscellaneousServicesIcon />,
  Dashboard: <DashboardIcon />,
  Materials: <MenuIcon/>
};

const Leftbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const ref = useRef(null);
  const { selectedMenuItem, setSelectedMenuItem } = useAuthContext();
  const [selectedListItem, setSelectedListItem] = useState();
  const [showSubmenu, setShowSubmenu] = useState(false);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target) && !event.target.closest("#main-menu")) {
      setShowSubmenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmenuShowState = () => {
    setShowSubmenu((prevState) => !prevState);
  };

  const handleChangeMenuItem = (listItemName) => {
    if (listItemName !== selectedListItem) {
      setSelectedListItem(listItemName);
    }

    if (!showSubmenu) {
      handleSubmenuShowState();
    } else if (selectedListItem === listItemName && showSubmenu) {
      handleSubmenuShowState();
    }
  };

  const handleSubMenuChange = (menuItem) => {
    if (selectedMenuItem?.menu_e_name !== menuItem.menu_e_name) {
      setSelectedMenuItem(menuItem);
    }
    handleSubmenuShowState();
    navigate(menuItem.route);
  };

  const mainSideList = () => {
    const menuGroups = [
      ...new Set(
        menuInitialData.members
          .filter((item) =>
            MenuRightsDetails.some(
              (right) =>
                right.menuGroup === item.menu_group &&
                right.menuName === item.menu_e_name &&
                right.urEnable
            )
          )
          .map((item) => item.menu_group)
      ),
    ];
    return (
      <Box component="div" sx={{ backgroundColor: theme.palette.primary.main }}>
        <List
          sx={{
            alignItems: "center",
            padding: 0,
          }}
        >
          <ListItem
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
            button
            key={"logo"}
          >
            <ListItemIcon sx={{ display: 'flex', justifyContent: 'center' }}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                onClick={() => {
                  navigate("/home");
                }}
              >
                <MIcon style={{ height: "3.9vh", width: "3.9vh",marginLeft:'1vw',marginTop:'-1vw' }} />
              </IconButton>
            </ListItemIcon>
            <Divider />
          </ListItem>
          {menuGroups.map((menuGroup, index) => (
            <ListItem
              sx={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
              button
              key={index}
              onClick={() => handleChangeMenuItem(menuGroup)}
            >
              <ListItemIcon sx={{ color: "white", display: 'flex', justifyContent: 'center' }}>
                {iconList[menuGroup]}
              </ListItemIcon>
            </ListItem>
          ))}
        </List>
      </Box>
    );
  };

  const subSideList = () => {
    const subMenuItems = menuInitialData.members.filter(
      (item) =>
        item.menu_group === selectedListItem &&
        MenuRightsDetails.some(
          (right) =>
            right.menuGroup === item.menu_group &&
            right.menuName === item.menu_e_name &&
            right.urEnable
        )
    );
    return (
      <div ref={ref} style={{backgroundColor:'white'}} >
        <Collapse orientation="horizontal" in={showSubmenu} timeout={200}>
          <Box component="div" sx={{ backgroundColor: "white", margin: '0' }}>
            <Typography
              sx={{
                margin: 0,
                padding: '1vw',
                paddingLeft: '1vw',
                fontWeight: 'bold',
                color: "rgba(0,0,0,0.5)",
                fontSize: '16px',
                textTransform: 'capitalize',
                margin: '0.2vw -4vw 0vw 0vw'
              }}
            >
              {selectedListItem}
              <hr sx={{ color: '2px solid #ECf0F3' }} />
            </Typography>

            <List sx={{ width: '100%',backgroundColor:'white' }}>
      {subMenuItems.map((listItem, index) => (
        <Box key={index} sx={{ width: '100%',margin:'0' }}>
          <ListItem
            sx={{
              
              display: 'flex',
              width: '15vw',
              padding: '8px 16px',
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
                color: theme.palette.primary.main,
                '& .MuiListItemIcon-root': {
                  color: theme.palette.primary.main,
                },
              },
            }}
            button
            onClick={() => handleSubMenuChange(listItem)}
          >
            <ListItemIcon sx={{ color: 'rgba(0,0,0,0.4)',marginLeft:'1vw' }}>
              {iconList[listItem.menu_e_name]}
            </ListItemIcon>
            <ListItemText sx={{ marginLeft: '-1vw' }}
              primary={
                <Typography sx={{ fontSize: '14px', fontWeight: '400' }}>
                  {listItem.menu_e_name}
                </Typography>
              }
            />
          </ListItem>
         
        </Box>
      ))}
    </List>
          </Box>
        </Collapse>
      </div>
    );
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        color: "white",
        height: "110vh",
        backgroundColor: theme.palette.primary.main
      }}
      id="main-menu"
    >
      <Box
        sx={{
          width: "40px",
         padding:'0.3rem',
         
        }}
      >
        {mainSideList()}
      </Box>

      <Box
        sx={{
          minWidth: "14vw",
          width: "fit-content",
          display: !showSubmenu ? "none" : "flex",
          flexDirection: "column",
          alignItems: 'flexStart',
          gap: "0rem",
          height: '100vh',
          position: "absolute",
          zIndex: "40",
          left: "3.37vw",
          backgroundColor: "#ffffff",
          marginTop: '5vh',
          overflowX: "hidden",
          transition: "0.5s",
          color: "rgba(0,0,0,0.5)",
          textTransform:'capitalize',
          boxShadow: '0px 2px 20px 1px rgba(53, 60, 73, 0.2)',
        }}
        ref={ref}
      >
        {subSideList()}
      </Box>
    </Box>
  );
};

export default Leftbar;
