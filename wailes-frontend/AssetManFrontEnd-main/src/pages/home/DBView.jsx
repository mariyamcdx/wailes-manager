import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Box,
  Typography
} from "@mui/material";
import { CommonBox } from "./assetManagementSteps/CommonBox";
import axios from "axios";
import './DBView.css';
import AdditionalSection from "./AdditionalSection";

const DBView = () => {
  const [schema, setSchema] = useState(localStorage.getItem("schema") || "");
  const [table, setTable] = useState(localStorage.getItem("table") || "");
  const [showData, setShowData] = useState(
    localStorage.getItem("showData") === "true"
  );
  const [tableData, setTableData] = useState(
    JSON.parse(localStorage.getItem("tableData")) || []
  );
  const [columns, setColumns] = useState(
    JSON.parse(localStorage.getItem("columns")) || []
  );
  const [schemas, setSchemas] = useState([]);
  const [tables, setTables] = useState([]);
  const [showSection, setShowSection] = useState(false); // State for additional section visibility
  const [showBottomSection, setShowBottomSection] = useState(false); // State for bottom section visibility
  const dataGridHeight = showBottomSection ? '50vh' : '70vh';


  useEffect(() => {
    axios.get("http://host.docker.internal:8080/schemas").then((response) => {
      const filteredSchemas = response.data.filter(schema => schema !== 'pg_toast' && schema !== 'pg_catalog'  && schema !== 'information_schema'  && schema !== 'public' && schema !== 'target_schema');
      setSchemas(filteredSchemas);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("schema", schema);
  }, [schema]);

  useEffect(() => {
    if (schema) {
      axios.get(`http://host.docker.internal:8080/schemas/${schema}/tables`).then((response) => {
        setTables(response.data);
      });
    }
  }, [schema]);

  useEffect(() => {
    localStorage.setItem("table", table);
  }, [table]);

  useEffect(() => {
    localStorage.setItem("tableData", JSON.stringify(tableData));
  }, [tableData]);
  
  useEffect(() => {
    localStorage.setItem("columns", JSON.stringify(columns));
  }, [columns]);

  useEffect(() => {
    localStorage.setItem("showData", showData);
  }, [showData]);

  useEffect(() => {
    if (schema && table && showData) {
      let idCounter = 1; 
      axios
        .get(`http://host.docker.internal:8080/schemas/${schema}/tables/${table}/data`)
        .then((response) => {
          const data = response.data.map((row) => ({ id: idCounter++, ...row })); 
          setTableData(data);
          const cols = Object.keys(data[0] || {}).map((key) => ({
            field: key,
            headerName: key,
            width: 'auto',
          }));
          setColumns(cols);
          setShowData(true);
        })
        .catch((error) => {
          console.error("Error fetching table data:", error);
        });
    }
  }, [schema, table, showData]);

  const handleSchemaChange = (event) => {
    const newSchema = event.target.value;
    setSchema(newSchema);
    setTable("");
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
      let idCounter = 1; 
      axios
        .get(`http://host.docker.internal:8080/schemas/${schema}/tables/${table}/data`)
        .then((response) => {
          const data = response.data.map((row) => ({ id: idCounter++, ...row })); 
          setTableData(data);
          const cols = Object.keys(data[0] || {}).map((key) => ({
            field: key,
            headerName: key,
            width: 150,
          }));
          setColumns(cols);
          setShowData(true);
        })
        .catch((error) => {
          console.error("Error fetching table data:", error);
        });
    } else {
      alert("Please select a schema and table.");
    }
  };

  const handleCloseAdditionalSection = () => {
    setShowAdditionalSection(false);
  };
  const [showAdditionalSection, setShowAdditionalSection] = useState(false);

  const sectionStyle = {
    display: showSection ? 'block' : 'none',
    border: '1px solid #ccc',
    padding: '10px',
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


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', userSelect: "none" }}>
    <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <FormControl style={{ width: "15vw" }} margin="normal">
        <InputLabel>Schema</InputLabel>
        <Select value={schema} onChange={handleSchemaChange}>
          <MenuItem value=""><em>None</em></MenuItem>
          {schemas.map((schema) => (
            <MenuItem key={schema} value={schema}>
              {schema}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl style={{ width: "15vw" }} margin="normal">
        <InputLabel>Table</InputLabel>
       
        <Select value={table} onChange={handleTableChange} disabled={!schema}>
  <MenuItem value=""><em>None</em></MenuItem>
  {tables.map((table) => (
    <MenuItem key={table} value={table}>
      {table}
    </MenuItem>
  ))}
</Select>
</FormControl>
    </Box>
    <div sx={{ display: 'flex', }}>
      <Button
        variant="contained"
        sx={outlookButtonStyle}
        onClick={handleShowDataClick}
        disabled={!table}
      >
        Show Data
      </Button>
      <Button
        sx={outlookButtonStyle}
        variant="contained"
        onClick={() => setShowAdditionalSection(true)}
      >
        Additional Section
      </Button>
    
    </div>
    <Box sx={{ display: 'flex', gap: '1rem',  }}>
      <Box sx={{ flex: 1 }}>
        {showData && tableData.length > 0 && (
          <CommonBox
            columns={columns}
            rows={tableData}
            isLoading={false}
            label="Data"
            isCalWorking={false}
            Gridcolumns={columns}
            onRowClick={() => {}}
            sortingField={null}
            getRowId={(row) => row.rec_id}
            // height={800}
            height={dataGridHeight}
            // bottomSectionHeight={bottomSectionHeight}
          />
        )}
        {showData && tableData.length === 0 && (
          <Typography variant="h6" style={{ marginTop: "2rem" }}>
            No data available for the selected table
          </Typography>
        )}
      </Box>
      {showAdditionalSection && (
        <AdditionalSection onClose={handleCloseAdditionalSection} style={sectionStyle} />
      )}  
    </Box>
   
  </Box>
  
  );
};

export default DBView;
