package com.wailes1.wailes1.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.wailes1.wailes1.services.SchemaService;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/schemas")
public class SchemaController {
    private static final String COLUMN_CONFIG_FILE_PATH = "C:/Users/mariy/OneDrive/Desktop/Wailes-manager/wailes-frontend/AssetManFrontEnd-main/src/pages/columnConfig.json";
    private static final String DEFAULT_COLUMN_CONFIG_FILE_PATH = "C:/Users/mariy/OneDrive/Desktop/Wailes-manager/wailes-frontend/AssetManFrontEnd-main/src/pages/defaultColumnConfig.json";
    @Autowired
    private SchemaService schemaService;

    @GetMapping
    public List<String> getAllSchemas() {
        return schemaService.getAllSchemas();
    }

    @GetMapping("/{schema}/tables")
    public List<String> getAllTablesInSchema(@PathVariable String schema) {
        return schemaService.getAllTablesInSchema(schema);
    }

    @GetMapping("/{schema}/tables/{table}/data")
    public List<Map<String, Object>> getTableData(@PathVariable String schema, @PathVariable String table) {
        return schemaService.getTableData(schema, table);
    }

    @PostMapping("/updateColumnConfig")
    public ResponseEntity<String> updateColumnConfig(@RequestBody String columnConfig) {
        try {
            Path columnConfigPath = Paths.get(COLUMN_CONFIG_FILE_PATH);
            Files.write(columnConfigPath, columnConfig.getBytes());
            return ResponseEntity.ok("Column configuration updated successfully");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update column configuration");
        }
    }
    @PostMapping("/updateDefaultColumnConfig")
    public ResponseEntity<String> updateDefaultColumnConfig(@RequestBody String defaultColumnConfig) {
        try {
            Path defaultColumnConfigPath = Paths.get(DEFAULT_COLUMN_CONFIG_FILE_PATH);
            Files.write(defaultColumnConfigPath, defaultColumnConfig.getBytes());
            return ResponseEntity.ok("Default column configuration updated successfully");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update default column configuration");
        }
    }
}
