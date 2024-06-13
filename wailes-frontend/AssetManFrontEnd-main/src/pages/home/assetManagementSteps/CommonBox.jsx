import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Progressor } from "../../../common/Progressor";
import {
  CustomToolbar,
  DataGridComponent,
} from "../../../common/DataGridComponent";
import AddEditToolBar from "../../../common/AddEditToolBar";
import BottomLeftSection from "../BottomLeftSection";
import EditSection from "../EditSection";
import MoreVertIcon from '@mui/icons-material/MoreVert';

export const CommonBox = ({
  columns,
  rows,
  onClickAdd,
  onClickEdit,
  onClickDelete,
  isLoading,
  editId,
  isCalWorking,
  Gridcolumns,
  onRowClick,
  urWrite,
  urModify,
  urDelete,
  sidebar,
  sortingField,
  setShowAdditionalSection,
  setMode
}) => {
  const [bottomLeftSectionVisible, setBottomLeftSectionVisible] = useState(false);
  const [bottomSectionHeight, setBottomSectionHeight] = useState(100);


  const commonBoxRef = useRef(null);

  const handleEditClick = () => {
    setMode("edit");
    
    setShowAdditionalSection(true);
  };

  const handleAddClick = () => {
    setMode("add");
    setShowAdditionalSection(true);
  };

  const handleToggleBottomLeftSection = () => {
    setBottomLeftSectionVisible(!bottomLeftSectionVisible);
  };

  useEffect(() => {
    const handleResize = () => {
      if (commonBoxRef.current) {
        const maxHeight = window.innerHeight * 0.6;
        const newHeight = bottomLeftSectionVisible 
          ? window.innerHeight - bottomSectionHeight - 200
          : maxHeight;
        commonBoxRef.current.style.height = `${newHeight}px`;
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [bottomSectionHeight, bottomLeftSectionVisible]);

  return (
    <Box sx={{ width: "100%" }}>
      {isLoading && <Progressor />}
      <Box sx={{ paddingY: "1rem", overflow: "hidden" }}>
        <Box
          ref={commonBoxRef}
          sx={{
            width: "100%",
            overflow: "hidden",
            maxHeight: "60vh",
          }}
        >
          <DataGridComponent
            columns={isCalWorking ? Gridcolumns : columns}
            rows={rows}
            sx={{ width: "100%" }}
            sortingField={sortingField}
            components={{
              Toolbar: (props) => {
                return (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      padding: '0px',
                    }}
                  >
                    <CustomToolbar {...props} />
                    <AddEditToolBar
                      onClickDelete={onClickDelete}
                      editId={editId}
                      urWrite={urWrite}
                      urModify={urModify}
                      urDelete={urDelete}
                      onClickEdit={handleEditClick}
                      onClickAdd={handleAddClick}                      
                      sidebar={sidebar}
                    />
                    <Button disableRipple startIcon={<MoreVertIcon />}  style={{backgroundColor:'transparent',color:'gray',boxShadow:'none',marginLeft:'-1.7vw', }}  onClick={handleToggleBottomLeftSection}>
                     </Button>
                  </div>
                );
              },
            }}
            onRowClick={onRowClick}
          />
        </Box>
      </Box>
      {bottomLeftSectionVisible && (
        <BottomLeftSection setBottomSectionHeight={setBottomSectionHeight} />
      )}
    </Box>
  );
};
