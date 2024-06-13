import { TextField } from '@material-ui/core';
import { Button, Container, Grid, MenuItem, Typography } from '@mui/material';
import React, { useState } from 'react'

const AddSection = () => {
    const [formData, setFormData] = useState({ tag: "", model: "", description: "", assetId: "", assetType: "" });
    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem("additionalData", JSON.stringify(formData));
        console.log("Form submitted and data saved to local storage:", formData);
      };
    
      const assetTypes = [
        { id: "type1", name: "Type 1" },
        { id: "type2", name: "Type 2" },
        { id: "type3", name: "Type 3" }
      ];
    
      const anotherTableData = [
        { id: "A1", name: "A1" },
        { id: "A2", name: "A2" },
        { id: "A3", name: "A3" }
      ];
    
      const combinedAssetTypes = assetTypes.map(asset => anotherTableData.map(data => ({
        id: `${asset.id}-${data.id}`,
        name: `${asset.name} \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 ${data.name}`
      }))).flat();
    
  return (
    <div>
       <form onSubmit={handleSubmit}>
          <Grid marginTop={'1vh'} container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Tag"
                name="tag"
                value={formData.tag}
                onChange={handleFormChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Model"
                name="model"
                value={formData.model}
                onChange={handleFormChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleFormChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Asset ID"
                name="assetId"
                value={formData.assetId}
                onChange={handleFormChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Asset Type"
                name="assetType"
                value={formData.assetType}
                onChange={handleFormChange}
                variant="outlined"
              >
                {combinedAssetTypes.map(option => (
                  <MenuItem  key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Add
              </Button>
            </Grid>
          </Grid>
        </form>
    </div>
  )
}

export default AddSection
