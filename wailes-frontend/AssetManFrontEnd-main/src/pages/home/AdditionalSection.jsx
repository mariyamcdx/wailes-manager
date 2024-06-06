import React, { useState, useEffect } from "react";
import { Typography, Button, Grid, TextField, IconButton, MenuItem } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const AdditionalSection = ({ onClose }) => {
  const [formData, setFormData] = useState({ tag: "", model: "", description: "", assetId: "", assetType: "" });
  const [isResizing, setIsResizing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(300);
  const [width, setWidth] = useState(300);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing) return;
      let newWidth = startWidth - (e.clientX - startX);
      const halfScreenWidth = window.innerWidth / 2;
      if (newWidth > halfScreenWidth) {
        newWidth = halfScreenWidth;
      }
      setWidth(newWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, startWidth, startX]);

  const handleMouseDown = (e) => {
    setIsResizing(true);
    setStartX(e.clientX);
    setStartWidth(width);
  };

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
    <div
      style={{
        marginTop: "-17vh",
        border: "1px solid #ccc",
       
        width: `${width}px`,
        userSelect: "none",
        minWidth: '300px',
        padding: '1rem'
      }}
    >
      <Grid container justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Top Right Section</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Grid>
      <div
        style={{
          height: "63vh",
          width: "100%",
        }}
        onMouseDown={handleMouseDown}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
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
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
};

export default AdditionalSection;
