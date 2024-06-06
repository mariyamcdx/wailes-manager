package com.wailes1.wailes1.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class CustomTableRepositoryImpl implements CustomTableRepository {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public CustomTableRepositoryImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<String> findAllTablesInSchema(String schema) {
        String sql = "SELECT table_name FROM information_schema.tables WHERE table_schema = ?";
        return jdbcTemplate.queryForList(sql, new Object[]{schema}, String.class);
    }

    @Override
    public List<Map<String, Object>> findTableData(String schema, String table) {
        String sql = String.format("SELECT * FROM %s.%s", schema, table);
        return jdbcTemplate.queryForList(sql);
    }
}
