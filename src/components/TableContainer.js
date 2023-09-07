import React from "react";
import { motion } from "framer-motion";

const TableContainer = ({ id, title, header, table }) => {
  return (
    <div id={`${id}-table-container`} className="table-container">
      <div className="table-container-head">
        <motion.div className="table-container-head-title" layout>
          <h1>{title}</h1>
        </motion.div>
        {header}
      </div>
      <div className="table-container-body">{table}</div>
    </div>
  );
};

export default TableContainer;
