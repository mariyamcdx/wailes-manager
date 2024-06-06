import React from "react";
import { DataGrid ,GridToolbar } from "@mui/x-data-grid";
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import AddEditToolBar from "./AddEditToolBar";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import '../App.css';
import { TextFormat } from "@mui/icons-material";

export function CustomToolbar() {
  
  const buttonStyle = {
    
    minWidth: 0,
    minHeight: 0,
   
   
    
    backgroundColor: 'transparent',
    color:'rgba(0,0,0,0.3)' ,
    border: "none",
    boxShadow: "none",
    TextFormat:'capitalize',
    '&:hover': {
      color:"primary.main",
      
      backgroundColor: 'transparent',
      boxShadow:'none'
    },
   
  }
  return (
    <Box sx={{ ".MuiButton-startIcon": { display: "flex", mx: 0 }, marginBottom: '0.1px'}}>
      <GridToolbarContainer>
        <Tooltip title='Columns'>
        <GridToolbarColumnsButton sx={buttonStyle} startIcon={<i className="fas fa-columns fa-xxl" style={{fontSize:'17px'}}></i>}></GridToolbarColumnsButton>
        </Tooltip>
        <Tooltip >
        <GridToolbarFilterButton sx={buttonStyle} startIcon={<i className="fas fa-filter fa-xxl" style={{fontSize:'17px'}}></i>}></GridToolbarFilterButton>
        </Tooltip>
        <Tooltip title='Density'>
        <GridToolbarDensitySelector sx={buttonStyle} startIcon={<i className="fas fa-th-list fa-xxl" style={{fontSize:'17px'}}></i>}></GridToolbarDensitySelector>
        </Tooltip>
        <Tooltip title='Export'>
        <GridToolbarExport sx={buttonStyle} startIcon={<i className="fas fa-download fa-xs" style={{fontSize:'17px'}}></i>}></GridToolbarExport>
        </Tooltip>
      </GridToolbarContainer>
    </Box>
  );
}


export const DataGridComponent = ({
  columns,
  rows,
  sx,
  sortingField,
  onCellDoubleClick,
  onRowClick,
  ...rest  
}) => {
  const theme = useTheme();
  const fadedGrayColor = alpha(theme.palette.grey[500], 0.15);
    return (
    <DataGrid
    sx={{
      ...sx,
      "& .MuiDataGrid-row": {
        maxHeight: "26.5px !important",
        minHeight: "26.5px !important",
        height: "26.5px !important",
        fontSize:'13.5px',
        "&:hover": {
          backgroundColor: fadedGrayColor,
        }
        
      },
      "& .MuiDataGrid-cell": {
        maxHeight: "26.5px !important",
        minHeight: "26.5px !important",
        height: "26.5px !important",
        lineHeight: "26.5px !important",
        
      },
      '& .MuiDataGrid-columnHeaders': {
        backgroundColor: fadedGrayColor,        
       
      },
      "& .MuiDataGrid-columnHeaderTitle": {
       fontVariant:'all-small-caps', fontSize:'17px'
      },
      '@media (max-width: 600px)': {
        "& .MuiDataGrid-columnHeaderTitle": {
          fontSize: '12px',

        },
        "& .MuiDataGrid-cell": {
          fontSize: '10px',
        },
      },
    }}
    

      columns={columns.map(column => ({
        ...column,flex:column.flex||1,
      })) }
      density="compact"
      rows={rows}
      headerHeight={40} 
      components={{
       
        Toolbar: rest.components.Toolbar
          ? rest.components.Toolbar
          : (props) => (
              <div >
                <CustomToolbar {...props}/>
               <AddEditToolBar />
              </div>
            ),
      }}
      localeText={{
        toolbarColumns: "",
        toolbarFilters: "",
        toolbarDensity: "",
        toolbarExport: "",
      }}
      onCellDoubleClick={onCellDoubleClick}
      onRowClick={onRowClick}
      initialState={{
        ...rows?.initialState,
        pagination: { paginationModel: { pageSize: 5 } },
        sorting: {
          sortModel: [{ field: sortingField, sort: "asc" }],
        },
      }}
      pageSizeOptions={[5, 10, 25]}
    />
  );
};
