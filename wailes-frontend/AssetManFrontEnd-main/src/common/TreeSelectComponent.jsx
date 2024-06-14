import { TreeItem, TreeView } from "@material-ui/lab";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Button, Grid, Menu, Typography } from "@mui/material";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useMenuContext } from "../context/MenuContextProvider";
import useFetchApi from "../hooks/useFetchApi";
 
const TreeSelectComponent = ({ endpoint, label, required, name }) => {
  const {
    setValue,
    getValues,
 
    formState: { errors, isSubmitted },
  } = useFormContext();
 
  const { rightsArray } = useMenuContext();
 
  const { data } = useFetchApi({
    endpoint: `${endpoint}`,
    retrieveOnMount: rightsArray[0]?.urMenuIdFk ? true : false,
    retry: 0,
    Menu_id: 18,
  });
 
  const handleTreeItemDoubleClick = (event, value) => {
    setValue("mtrlGroup", value);
  };
 
  const [anchorEl, setAnchorEl] = useState(null);
 
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
 
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Grid sx={{ margin: "4px" }}>
      {label && (
        <Typography
          variant="body2"
          mb={0.5}
          sx={{ color: "rgba(0, 0, 0, 0.6)" }}
        >
          {label}
          {required && (
            <Typography component="span" color="error.main">
              &nbsp;*
            </Typography>
          )}
        </Typography>
      )}
      <Button
        component="span"
        sx={{
          width: "50%",
          borderRadius: "14px",
          fontSize: "14px",
          textTransform: "capitalize",
          justifyContent: "left",
          border: "1px solid #c9c9c9",
        }}
        label="Upload"
        variant="outlined"
        onClick={handleClick}
        color="inherit"
      >
        {(getValues("mtrlGroup") &&
          data?.find((t) => t.mtrlgId === getValues("mtrlGroup"))
            .mtrlgDescription) ||
          "Select Group"}
      </Button>
      {isSubmitted && !getValues("mtrlGroup") && (
        <Typography
          variant="inherit"
          sx={{ fontSize: "0.9rem", color: "#d32f2f" }}
        >
          Please Select {label}
        </Typography>
      )}
      <Box>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <Box>
            {data?.length ? (
              data?.map((item) => {
                if (item?.mtrlgParentId === null) {
                  return (
                    <>
                      <Box>
                        <TreeView
                          style={{ width: "200px" }}
                          key={item.mtrlgId}
                          defaultCollapseIcon={<ExpandMoreIcon />}
                          defaultExpandIcon={<ChevronRightIcon />}
                        >
                          <TreeItem
                            nodeId={item.mtrlgId}
                            label={item?.mtrlgDescription}
                          >
                            {data
                              .filter(
                                (child) => child.mtrlgParentId === item.mtrlgId
                              )
                              .map((c) => {
                                return (
                                  <>
                                    <Typography
                                      variant="body2"
                                      style={{
                                        paddingLeft: "30px",
                                        cursor: "pointer",
                                      }}
                                      onClick={(event) => {
                                        event.stopPropagation();
 
                                        handleTreeItemDoubleClick(
                                          event,
                                          c.mtrlgId
                                        );
                                        handleClose();
                                      }}
                                    >
                                      {c.mtrlgDescription}
                                    </Typography>
                                  </>
                                );
                              })}
                          </TreeItem>
                        </TreeView>
                      </Box>
                    </>
                  );
                }
                return null;
              })
            ) : (
              <Box>
                <Typography
                  variant="body2"
                  style={{
                    paddingLeft: "30px",
                    cursor: "pointer",
                    paddingRight: "30px",
                    color: "Red",
                  }}
                >
                  Please add Material Group
                </Typography>
              </Box>
            )}
          </Box>
        </Menu>
      </Box>
    </Grid>
  );
};
 
export default TreeSelectComponent;