import { PREVIOUS_POSITIONS } from "../guesses";
import Table from "./Table";

import React, { useMemo, useState, useEffect } from "react";

const TableContainer = ({ id, title, initialData }) => {
  const [data, setData] = useState(initialData);

  const columns = useMemo(
    () => [
      {
        Header: "",
        accessor: "position",
      },
      {
        Header: "",
        accessor: "name",
      },
    ],
    []
  );

  return (
    <div id={`${id}-table-container`} className="table-container">
      <div className="table-container-head">
        <h1>{title}</h1>
      </div>
      <div className="table-container-body">
        <Table
          id={`${id}-table`}
          className="table"
          columns={columns}
          data={data}
        />
      </div>
    </div>
  );
};

export default TableContainer;
