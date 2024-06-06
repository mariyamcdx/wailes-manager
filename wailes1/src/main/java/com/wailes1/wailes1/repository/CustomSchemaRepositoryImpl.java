package com.wailes1.wailes1.repository;

import com.wailes1.wailes1.repository.CustomSchemaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CustomSchemaRepositoryImpl implements CustomSchemaRepository {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public CustomSchemaRepositoryImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<String> findAllSchemas() {
        String sql = "SELECT schema_name FROM information_schema.schemata";
        return jdbcTemplate.queryForList(sql, String.class);
    }
}
