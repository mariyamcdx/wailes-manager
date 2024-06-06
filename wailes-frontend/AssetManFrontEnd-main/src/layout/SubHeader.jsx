import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useAuthContext } from "../context/AuthContextProvider";
import {
  ListGroupPrefix,
  PlantPrefix,
  subHeaderHeight,
} from "../constants/global";
import { menuTitleHeight } from "../constants/global";
import useFetchApi from "../hooks/useFetchApi";
import useMutationApi from "../hooks/useMutationApi";
import { useCommonData } from "../context/CommonDataProvider";
import { Progressor } from "../common/Progressor";

const SubHeader = () => {
  useEffect(() => {
    console.log("use effect from app bar");
  }, []);
  const { selectedMenuItem } = useAuthContext();
  const commonData = useCommonData();
  const tenantId = commonData?.userData?.tenant_id;
  const { refetchUser, isUserFetching } = useAuthContext();
  const { data: plantDataList } = useFetchApi({
    endpoint: `${PlantPrefix}/tenant/${tenantId}/${PlantPrefix}`,
    retrieveOnMount: Boolean(tenantId),
  });

  const [plantMasterData, setPlantMasterData] = useState(plantDataList);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (plantDataList) {
      setPlantMasterData(plantDataList);
    }
    setValue(commonData.userData?.lastLoginPlantID);
  }, [plantDataList, commonData.userData]);

  const { mutateAsync: updateUser, isLoading } = useMutationApi({
    endpoint: `${ListGroupPrefix}/update-user`,
    method: "put",
  });

  return (
    <>
      {(isLoading || isUserFetching) && <Progressor />}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: "100vh",
        }}
      >
        <Box>
          <AppBar position="static" sx={{ height: `20vh` }}>
            <Toolbar variant="dense" sx={{ justifyContent: "space-between" }}>
              <Typography variant="h6" component="div">
                Sub Header
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
        <Box
          sx={{
            marginY: "0.3rem",
            height: `${menuTitleHeight}vh`,
          }}
        >
          {selectedMenuItem && (
            <Typography
              sx={{
                marginLeft: "1rem",
                textTransform: "capitalize",
                fontWeight: "bold",
              }}
            >{`${selectedMenuItem.menu_group}   >>   ${selectedMenuItem.menu_e_name}`}</Typography>
          )}
        </Box>
      </Box>
    </>
  );
};

export default SubHeader;
