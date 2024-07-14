import React, { useMemo } from "react";
import { useTable, useFilters } from "react-table";

const CustomerTable = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        Header: "Customer Name",
        accessor: "name",
        Filter: ColumnFilter,
      },
      {
        Header: "Total Transaction Amount",
        accessor: (row) =>
          row.transactions.reduce((sum, t) => sum + t.amount, 0),
        Filter: ColumnFilter,
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useFilters);

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>
                {column.render("Header")}
                <div>{column.canFilter ? column.render("Filter") : null}</div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <input
      value={filterValue || ""}
      onChange={(e) => setFilter(e.target.value)}
      placeholder={`Filter ${column.Header}`}
    />
  );
};

export default CustomerTable;
