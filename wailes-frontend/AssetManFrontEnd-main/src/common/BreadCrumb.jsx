import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
import FolderIcon from "@mui/icons-material/Folder";
import { useAuthContext } from "../context/AuthContextProvider";
import { Box } from "@mui/material";

export default function BreadCrumb() {
  const { selectedMenuItem } = useAuthContext();
  return (
    <div role="presentation">
      <Box
        sx={{
          marginY: "0.3rem",
          marginX: "0.3rem",
          
        }}
      >
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            sx={{
              display: "flex",
              alignItems: "center",
              textTransform: "capitalize",
            }}
            color="inherit"
            href="/home"
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            {selectedMenuItem && selectedMenuItem.menu_group}
          </Link>
          <Link
            underline="hover"
            sx={{ display: "flex", alignItems: "center" }}
            color="inherit"
          >
            <FolderIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            {selectedMenuItem && selectedMenuItem.menu_e_name}
          </Link>
        </Breadcrumbs>
      </Box>
    </div>
  );
}
