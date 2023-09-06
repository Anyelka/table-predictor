import Table from "../Table";
import React, { useMemo } from "react";

const ActualTable = ({ id, data }) => {
  const columns = useMemo(
    () => [
      {
        Header: "",
        accessor: "position",
      },
      {
        Header: "",
        accessor: "logo",
        Cell: (row) =>
          row.value !== undefined && (
            <img src={row.value} alt="" className="logo"></img>
          ),
      },
      {
        Header: "",
        accessor: "name",
      },
      {
        Header: "",
        accessor: "played",
        Cell: (row) =>
          row.value !== undefined && (
            <div style={{ textAlign: "left", marginRight: "20px" }}>
              {row.value}
            </div>
          ),
      },
      {
        Header: "",
        accessor: "points",
        Cell: (row) => <div style={{ textAlign: "right" }}>{row.value}</div>,
      },
    ],
    []
  );

  return (
    <Table id={`${id}-table`} className="table" columns={columns} data={data} />
  );
};
export default ActualTable;
