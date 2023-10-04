import React from "react";
import { useTable } from "react-table";
import { motion } from "framer-motion";

export default function Table({ id, className, columns, data }) {
  // Use the useTable Hook to send the columns and data to build the table
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
  } = useTable({
    columns,
    data,
  });

  /* 
    Render the UI for your table
    - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
  */
  return (
    <table id={id} className={className} {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, index) => {
          prepareRow(row);
          return (
            <motion.tr
              initial={{ opacity: 0 }}
              transition={{ duration: 0.25, delay: 0.5 + index * 0.025 }}
              animate={{ opacity: 1 }}
              {...row.getRowProps()}
            >
              {row.cells.map((cell) => {
                if (cell.column.id === "logo") {
                  return (
                    <motion.td
                      {...cell.getCellProps()}
                      transition={{ duration: 0.25 }}
                      layout
                    >
                      {cell.render("Cell")}
                    </motion.td>
                  );
                }
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </motion.tr>
          );
        })}
      </tbody>
    </table>
  );
}
