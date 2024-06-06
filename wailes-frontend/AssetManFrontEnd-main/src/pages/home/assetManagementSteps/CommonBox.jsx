import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Progressor } from "../../../common/Progressor";
import {
  CustomToolbar,
  DataGridComponent,
} from "../../../common/DataGridComponent";
import AddEditToolBar from "../../../common/AddEditToolBar";
import BottomLeftSection from "../BottomLeftSection";

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
}) => {
  const [bottomLeftSectionVisible, setBottomLeftSectionVisible] = useState(false);
  const [bottomSectionHeight, setBottomSectionHeight] = useState(100);
  const commonBoxRef = useRef(null);

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
            maxHeight: "58vh",
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
                      onClickAdd={onClickAdd}
                      onClickEdit={onClickEdit}
                      onClickDelete={onClickDelete}
                      editId={editId}
                      urWrite={urWrite}
                      urModify={urModify}
                      urDelete={urDelete}
                      sidebar={sidebar}
                    />
                    <Button style={{backgroundColor:'transparent',color:'gray',boxShadow:'none'}} onClick={handleToggleBottomLeftSection}>
                      Bottom Left Section
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
