package com.wailes1.wailes1.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.wailes1.wailes1.services.SchemaService;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/schemas")
public class SchemaController {

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

}
