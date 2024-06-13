import React from 'react';
import { Box, Typography, Switch, FormControlLabel, Button } from '@mui/material';

const ColumnToggleSection = ({ columns, onToggleColumn, onSave, sx }) => {
  return (
    <Box sx={{ ...sx, padding: '1rem', display: 'flex', flexDirection: 'column', maxHeight: '50vh', overflowY: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Grid View
      </Typography>
     
      {columns.map((column) => (
        <FormControlLabel
          key={column.field}
          control={
            <Switch
              checked={column.enabled}
              onChange={() => onToggleColumn(column.field)}
            />
          }
          label={column.headerName}
        />
      ))}
      <Button onClick={onSave} variant="contained" color="primary" sx={{ marginTop: '1rem' }}>
        Save
      </Button>
    </Box>
  );
};

export default ColumnToggleSection;
