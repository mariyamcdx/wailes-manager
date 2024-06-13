import React, { useState, useEffect } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Box,
  Typography,
} from '@mui/material';
import { CommonBox } from './assetManagementSteps/CommonBox';
import axios from 'axios';
import './DBView.css';
import AdditionalSection from './AdditionalSection';
import ColumnToggleSection from './ColumnToggleSection';
import columnConfig from '../columnConfig.json';
import SettingsIcon from '@mui/icons-material/Settings';
import defaultColumnConfig from "../defaultColumnConfig.json"
const DBView = () => {
  const [schema, setSchema] = useState(localStorage.getItem('schema') || '');
  const [table, setTable] = useState(localStorage.getItem('table') || '');
  const [showData, setShowData] = useState(localStorage.getItem('showData') === 'true');
  const [tableData, setTableData] = useState(JSON.parse(localStorage.getItem('tableData')) || []);
  const [columns, setColumns] = useState(
    JSON.parse(localStorage.getItem('columns')) || columnConfig
  );
  const [schemas, setSchemas] = useState([]);
  const [tables, setTables] = useState([]);
  const [showAdditionalSection, setShowAdditionalSection] = useState(false);
  const [mode, setMode] = useState(null);
  const [showColumnToggleSection, setShowColumnToggleSection] = useState(false);
  const [columnToggleSectionWidth, setColumnToggleSectionWidth] = useState(150); // Initial width
  const dataGridHeight = showColumnToggleSection ? '70vh' : '70vh';

  useEffect(() => {
    axios.get('http://localhost:8080/schemas').then((response) => {
      const filteredSchemas = response.data.filter(
        (schema) =>
          schema !== 'pg_toast' &&
          schema !== 'pg_catalog' &&
          schema !== 'information_schema' &&
          schema !== 'public' &&
          schema !== 'target_schema'
      );
      setSchemas(filteredSchemas);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('schema', schema);
  }, [schema]);

  useEffect(() => {
    if (schema) {
      axios.get(`http://localhost:8080/schemas/${schema}/tables`).then((response) => {
        setTables(response.data);
      });
    }
  }, [schema]);

  useEffect(() => {
    localStorage.setItem('table', table);
  }, [table]);

  useEffect(() => {
    localStorage.setItem('tableData', JSON.stringify(tableData));
  }, [tableData]);

  useEffect(() => {
    localStorage.setItem('columns', JSON.stringify(columns));
  }, [columns]);

  useEffect(() => {
    localStorage.setItem('showData', showData);
  }, [showData]);

  useEffect(() => {
    if (schema && table && showData) {
      fetchTableData();
    }
  }, [schema, table, showData]);

  const generateDefaultColumnConfig = (tableData) => {
    if (!tableData || tableData.length === 0) {
      return [];
    }
  
    const firstRow = tableData[0];
    const defaultColumnConfig = Object.keys(firstRow).map((key) => ({
      field: key,
      headerName: key,
      width: 150,
      enabled: true,
    }));
  
    return defaultColumnConfig;
  };

  const outlookButtonStyle = {
    backgroundColor: "#3788d8",
    color: 'white',
    marginRight: '1rem',
    boxShadow: 'none',
    textTransform: 'none',
    borderRadius:'4px 0px 0px 4px',
    padding: "5px 10px",
    transition: 'transform 0.1s ease-in-out, background-color 0.1s ease-in-out',
    margin: "0px 5px 5px",
    fontSize:"13px",
    fontWeight:'400',
    '&:hover': {
      backgroundColor: '#005A9E',
      boxShadow: 'none',
      transform: 'translateY(-2px)',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#004578',
      transform: 'translateY(0)',
    },
    '&:focus': {
      outline: 'none',
    },
  };

  const outlookSideSectionBoxStyle = {
   
  color: "#202124",
  border: "1px solid #DADCE0",
  borderRadius: "12px",
  padding: "0.5rem",
  marginBottom: "1rem",
  boxShadow: "0 1px 3px rgba(60, 64, 67, 0.3), 0 4px 8px rgba(60, 64, 67, 0.15)",
  transition: "box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out",
  overflowY: "auto",
  maxHeight: "80vh",
  '&:hover': {
    boxShadow: "0 4px 6px rgba(60, 64, 67, 0.15), 0 8px 16px rgba(60, 64, 67, 0.15)",
    transform: "translateY(-2px)",
  },
  '&:active': {
    boxShadow: "0 1px 3px rgba(60, 64, 67, 0.3), 0 4px 8px rgba(60, 64, 67, 0.15)",
    transform: "translateY(0)",
  },
  '&:focus': {
    outline: "none",
    boxShadow: "0 0 0 3px #DADCE0",
  },
  };

  const fetchTableData = () => {
    let idCounter = 1;
    axios
      .get(`http://localhost:8080/schemas/${schema}/tables/${table}/data`)
      .then((response) => {
        const data = response.data.map((row) => ({ id: idCounter++, ...row }));
        const defaultColumnConfig = generateDefaultColumnConfig(data);
      setColumns(defaultColumnConfig);
      setShowData(true);
        setTableData(data);
        const cols = Object.keys(data[0] || {}).map((key) => {
          const columnConfigItem = columns.find((column) => column.field === key);
          return {
            field: key,
            headerName: key,
            width: 150,
            enabled: columnConfigItem ? columnConfigItem.enabled : true,
          };
        });
        setColumns(cols);
        setShowData(true);
      })
      .catch((error) => {
        console.error('Error fetching table data:', error);
      });
  };

  const handleRestoreDefault = () => {
    const defaultColumnConfig = generateDefaultColumnConfig(tableData);
      axios
      .post(
        'http://localhost:8080/schemas/updateDefaultColumnConfig',
        JSON.stringify(defaultColumnConfig, null, 2),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        console.log('Default column configuration updated successfully:', response);
        setColumns(defaultColumnConfig);
      })
      .catch((error) => {
        console.error('Failed to update default column configuration:', error);
      });
  };

  const handleSchemaChange = (event) => {
    const newSchema = event.target.value;
    setSchema(newSchema);
    setTable('');
    setTableData([]);
    setColumns([]);
    setShowData(false);
  };

  const handleTableChange = (event) => {
    const selectedTable = event.target.value;
    setTable(selectedTable);
    setShowData(false);
  };

  const handleShowDataClick = () => {
    if (schema && table) {
      fetchTableData();
    } else {
      alert('Please select a schema and table.');
    }
  };

  const handleSaveColumns = () => {
    const customColumnConfig = columns.map(({ enabled, field, headerName, width }) => ({
      enabled,
      field,
      headerName,
      width,
    }));
  
    axios
      .post(
        'http://localhost:8080/schemas/updateColumnConfig',
        JSON.stringify(customColumnConfig, null, 2),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        console.log('Column configuration updated successfully:', response);
      })
      .catch((error) => {
        console.error('Failed to update column configuration:', error);
      });
   
    setShowColumnToggleSection(false);
  };

  const handleEditClick = () => {
    setMode('edit');
    setShowAdditionalSection(true);
  };

  const handleAddClick = () => {
    setMode('add');
    setShowAdditionalSection(true);
    
  };

  const handleCloseAdditionalSection = () => {
    setShowAdditionalSection(false);
  };

  const toggleColumnVisibility = (columnField) => {
    const updatedColumns = columns.map((column) =>
      column.field === columnField ? { ...column, enabled: !column.enabled } : column
    );
    setColumns(updatedColumns);
  };

  const handleMouseDown = (e) => {
    const startX = e.clientX;
    const startWidth = columnToggleSectionWidth;

    const handleMouseMove = (e) => {
      const newWidth = startWidth + (e.clientX - startX);
      setColumnToggleSectionWidth(newWidth);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', userSelect: 'none' }}>
      <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <FormControl style={{ width: '15vw' }} margin="normal">
          <InputLabel>Schema</InputLabel>
          <Select value={schema} onChange={handleSchemaChange}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {schemas.map((schema) => (
              <MenuItem key={schema} value={schema}>
                {schema}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl style={{ width: '15vw' }} margin="normal">
          <InputLabel>Table</InputLabel>
          <Select value={table} onChange={handleTableChange} disabled={!schema}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {tables.map((table) => (
              <MenuItem key={table} value={table}>
                {table}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <div>
        <Button
          variant="contained"
          onClick={handleShowDataClick}
          disabled={!table}
          sx={outlookButtonStyle}
        >
          Show Data
        </Button>
        <Button
          variant="contained"
          onClick={() => setShowColumnToggleSection(!showColumnToggleSection)}
          sx={outlookButtonStyle}
        >
          {showColumnToggleSection ? 'Grid View' : 'Grid View'}
        </Button>
        <Button
  variant="contained"
  onClick= {handleRestoreDefault}
  sx={outlookButtonStyle}
>
  Restore Default
</Button>
      </div>
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Box sx={{ flex: 1 }}>
          {showData && tableData.length > 0 && (
            <CommonBox
              columns={columns.filter((column) => column.enabled)}
              rows={tableData}
              isLoading={false}
              label="Data"
              isCalWorking={false}
              Gridcolumns={columns.filter((column) => column.enabled)}
              onRowClick={() => {}}
              sortingField={null}
              getRowId={(row) => row.id}
              height={dataGridHeight}
              setShowAdditionalSection={setShowAdditionalSection}
              setMode={setMode}
            />
          )}
          {showData && tableData.length === 0 && (
            <Typography variant="h6" style={{ marginTop: '2rem' }}>
              No data available for the selected table
            </Typography>
          )}
        </Box>
        {showColumnToggleSection && (
          <Box style={outlookSideSectionBoxStyle} sx={{ display: 'flex', flexDirection: 'column', maxHeight: '80vh', overflowY: 'auto', }}>
            <ColumnToggleSection
              columns={columns}
              onToggleColumn={toggleColumnVisibility}
              onSave={handleSaveColumns}
              sx={{ width: columnToggleSectionWidth, padding: '1rem', display: 'flex', flexDirection: 'column', maxHeight: '80vh', overflowY: 'auto' }}
            />
            <div
              style={{ width: '5px', cursor: 'ew-resize', backgroundColor: '#ccc' }}
              onMouseDown={handleMouseDown}
            />
          </Box>
        )}
        {showAdditionalSection && (
          <AdditionalSection
            onClose={handleCloseAdditionalSection}
            mode={mode}
           
          />
        )}
      </Box>
    </Box>
  );
};

export default DBView;