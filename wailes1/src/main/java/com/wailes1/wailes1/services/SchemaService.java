package com.wailes1.wailes1.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import com.wailes1.wailes1.repository.CustomSchemaRepository;
import com.wailes1.wailes1.repository.CustomTableRepository;

import java.util.List;
import java.util.Map;

@Service
public class SchemaService {

    @Autowired
    private CustomSchemaRepository customSchemaRepository;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public SchemaService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Autowired
    private CustomTableRepository customTableRepository;

    public List<String> getAllSchemas() {
        return customSchemaRepository.findAllSchemas();
    }

    public List<String> getAllTablesInSchema(String schema) {
        return customTableRepository.findAllTablesInSchema(schema);
    }

    public List<String> getTablesForSchema(String schema){
        String sql = "SELECT table_name FROM information_schema.tables WHERE table_schema = ?";
        return jdbcTemplate.queryForList(sql, String.class, schema);
    }

    public List<Map<String, Object>> getTableData(String schema, String table) {
        String sql = String.format("SELECT * FROM %s.%s", schema, table);
        return jdbcTemplate.queryForList(sql);
    }
}
