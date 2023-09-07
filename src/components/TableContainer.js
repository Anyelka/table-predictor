import React from "react";

const TableContainer = ({ id, title, header, table }) => {
  return (
    <div id={`${id}-table-container`} className="table-container">
      <div className="table-container-head">
        <div className="table-container-head-title">
          <h1>{title}</h1>
        </div>
        {header}
      </div>
      <div className="table-container-body">{table}</div>
    </div>
  );
};

export default TableContainer;
