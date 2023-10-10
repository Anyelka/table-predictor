import React from "react";
import { motion } from "framer-motion";

const getTitle = (title) => {
  return title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();
};

const TableContainer = ({ id, title, header, table }) => {
  return (
    <div
      id={`${id}-table-container`}
      className="table-container"
      /* initial={{ x: -1500 }}
      transition={{ duration: 0.5 }}
      animate={{ x: 0 }} */
    >
      <div className="table-container-head">
        <div
          className="table-container-head-title"
          /* initial={{ x: -300 }}
          transition={{ duration: 0.25 }}
          animate={{ x: 0 }} */
        >
          <h1>{getTitle(title)}</h1>
        </div>
        {header}
      </div>
      <div className="table-container-body">{table}</div>
    </div>
  );
};

export default TableContainer;
