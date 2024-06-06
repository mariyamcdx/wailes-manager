import React from "react";
import { Button, Tooltip } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useTheme } from "@mui/material/styles";
import AddIcon from '@mui/icons-material/Add';

export default function AddEditToolBar(props) {
  const {
    onClickAdd,
    onClickEdit,
    onClickDelete,
    onClickProperties,
    propId,
    editId,
    plantId = 0,
    checkList,
    plant,
    urWrite,
    urModify,
    urDelete,
    isAsset,
    urAdmin,
  } = props;

  const theme = useTheme();

  const buttonStyle = {
    minWidth: 0,
    minHeight: 0,
    width: 'auto',
    height: 'auto',
    fontSize: "1px",
   
    backgroundColor: 'transparent',
    color: 'rgba(0,0,0,0.3)',
    border: "none",
    boxShadow: "none",
    textTransform: 'capitalize',
    '&:hover': {
      color: theme.palette.primary.main,
      backgroundColor: 'transparent',
      boxShadow: 'none'
    },
    '& .MuiButton-startIcon': {
      margin: '0 8px 0 0',
    },
    '& .MuiButton-endIcon': {
      margin: 0,
    },
  };

  const access = {
    canDelete: urAdmin || urDelete,
    canModify: urAdmin || urModify,
    canWrite: urAdmin || urWrite,
  };

  return (
    <div
      style={{
        margin:'0px',
        padding:'0px',
        border:'none'
       
      }}
    >
      {!checkList && (
        <>
          <Tooltip title={"Add"}>
            <span style={{marginLeft:'-0.8vw'}}>
              <Button
                style={{ backgroundColor:'transparent', }}
                startIcon={<i class="fa-solid fa-plus fa-xs" style={{fontSize:'17px'}}></i>}
                onClick={onClickAdd}
                disabled={isAsset ? !plantId || !access.canWrite : !access.canWrite}
              />
            </span>
          </Tooltip>
          <Tooltip title={"Edit"}>
           <span style={{marginLeft:'-1.8vw'}}>
              <Button
                style={{ backgroundColor:'transparent',}}
                startIcon={<i class="fa-solid fa-pen-to-square fa-xs"  style={{fontSize:'17px'}}></i>}
                onClick={onClickEdit}
                disabled={!editId || !access.canModify}
              />
            </span>
          </Tooltip>
        </>
      )}
      {!plant && (
        <Tooltip title={"Delete"}>
          <span style={{marginLeft:'-1.8vw'}}>
            <Button
              style={{ backgroundColor:'transparent', }}
              startIcon={<i class="fa-solid fa-trash fa-xs"  style={{fontSize:'17px'}}></i>}
              onClick={onClickDelete}
              disabled={!editId || !access.canDelete}
            />
          </span>
        </Tooltip>
      )}
      {(!checkList || !plant) && (
        <Tooltip title={"Properties"}>
         <span style={{marginLeft:'-1.8vw'}}>
            <Button sx={buttonStyle}
              style={{ backgroundColor:'transparent',}}
              startIcon={<i class="fa-solid fa-toolbox fa-xs"  style={{fontSize:'17px'}}></i>}
              onClick={onClickProperties}
              // disabled={!propId}
            />
          </span>
        </Tooltip>
      )}
    </div>
  );
}
