package com.wailes1.wailes1.repository;

import java.util.List;
import java.util.Map;

public interface CustomTableRepository {
    List<String> findAllTablesInSchema(String schema);
    List<Map<String, Object>> findTableData(String schema, String table);
}
