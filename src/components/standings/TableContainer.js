import React from "react";
import { uppercaseInitials } from "../../utils";

const TableContainer = ({ id, title, header, table }) => {
  return (
    <div id={`${id}-table-container`} className="table-container">
      <div className="table-container-head">
        <div
          className="table-container-head-title"
          /* initial={{ x: -300 }}
          transition={{ duration: 0.25 }}
          animate={{ x: 0 }} */
        >
          <h1>{uppercaseInitials(title)}</h1>
        </div>
        {header}
      </div>
      <div className="table-container-body">{table}</div>
    </div>
  );
};

export default TableContainer;
