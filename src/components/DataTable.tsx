import React, { useState, useMemo } from "react";
import { Loader2 } from "lucide-react"; // npm install lucide-react

interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

function DataTable<T>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) {
  const [selected, setSelected] = useState<T[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T;
    direction: "asc" | "desc";
  } | null>(null);

  // 🔀 Sorting logic
  const sortedData = useMemo(() => {
    if (!sortConfig) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  // 🔄 Toggle sorting
  function toggleSort(key: keyof T) {
    setSortConfig((prev) =>
      prev && prev.key === key
        ? { key, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { key, direction: "asc" }
    );
  }

  // ✅ Row selection
  function toggleSelect(row: T) {
    let newSelected;
    if (selected.includes(row)) {
      newSelected = selected.filter((r) => r !== row);
    } else {
      newSelected = [...selected, row];
    }
    setSelected(newSelected);
    onRowSelect?.(newSelected);
  }

  // 📊 UI
  if (loading)
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
        <span className="ml-2 text-gray-600">Loading data...</span>
      </div>
    );

  if (!loading && data.length === 0)
    return (
      <div className="text-center text-gray-500 py-10">
        No data available 📭
      </div>
    );

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        {/* Header */}
        <thead className="bg-gray-50">
          <tr>
            {selectable && <th className="p-3"></th>}
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className={`px-4 py-3 text-left text-sm font-semibold text-gray-700 ${
                  col.sortable ? "cursor-pointer hover:text-blue-600" : ""
                }`}
                onClick={() => col.sortable && toggleSort(col.dataIndex)}
                aria-sort={
                  sortConfig?.key === col.dataIndex
                    ? sortConfig.direction === "asc"
                      ? "ascending"
                      : "descending"
                    : "none"
                }
              >
                {col.title}
                {col.sortable &&
                  sortConfig?.key === col.dataIndex &&
                  (sortConfig.direction === "asc" ? " ↑" : " ↓")}
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody className="divide-y divide-gray-200 bg-white">
          {sortedData.map((row, i) => (
            <tr
              key={i}
              className="hover:bg-gray-50 transition-colors duration-150"
            >
              {selectable && (
                <td className="px-3 py-2">
                  <input
                    type="checkbox"
                    checked={selected.includes(row)}
                    onChange={() => toggleSelect(row)}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                </td>
              )}
              {columns.map((col) => (
                <td
                  key={col.key}
                  className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap"
                >
                  {String(row[col.dataIndex])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
