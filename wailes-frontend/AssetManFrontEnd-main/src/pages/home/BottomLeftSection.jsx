import React, { useState, useEffect, useRef } from "react";
import { Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const BottomLeftSection = ({ setBottomSectionHeight }) => {
  const sampleData = [
    { id: 1, name: "John Doe", age: 30 },
    { id: 2, name: "Jane Smith", age: 25 },
    { id: 3, name: "Alice Johnson", age: 35 },
    { id: 4, name: "Bob Brown", age: 40 },
    { id: 5, name: "Eve Wilson", age: 45 },
  ];

  const columns = sampleData.length > 0
    ? Object.keys(sampleData[0]).map((key) => ({
        field: key,
        headerName: key,
        width: 95,
      }))
    : [];

  const [isResizing, setIsResizing] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startHeight, setStartHeight] = useState(100);
  const [height, setHeight] = useState(100);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing) return;
      const newHeight = Math.max(100, startHeight - (e.clientY - startY));
      setHeight(newHeight);
      setBottomSectionHeight(newHeight);
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
  }, [isResizing, startHeight, startY, setBottomSectionHeight]);

  const handleMouseDown = (e) => {
    setIsResizing(true);
    setStartY(e.clientY);
    setStartHeight(height);
  };

  return (
    <div
      ref={containerRef}
      style={{
        border: "1px solid #ccc",
        padding: "2px",
        cursor: "row-resize",
        height: `${height}px`,
        maxHeight: "51vh",
        width: "100%",
        userSelect: "none",
        overflow: "hidden",
      }}
    >
      
      <div
        style={{
          height: "100%",
          width: "100%",
        }}
        onMouseDown={handleMouseDown}
      >
        <Typography variant="h6">Bottom Section</Typography>
        <DataGrid
          rows={sampleData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick
        />
      </div>
    </div>
  );
};

export default BottomLeftSection;
