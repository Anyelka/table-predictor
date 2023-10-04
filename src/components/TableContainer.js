import React from "react";
import { motion } from "framer-motion";

const TableContainer = ({ id, title, header, table }) => {
  return (
    <motion.div
      id={`${id}-table-container`}
      className="table-container"
      initial={{ x: -1500 }}
      transition={{ duration: 0.5 }}
      animate={{ x: 0 }}
    >
      <div className="table-container-head">
        <motion.div
          className="table-container-head-title"
          initial={{ x: -300 }}
          transition={{ duration: 0.25 }}
          animate={{ x: 0 }}
        >
          <h1>{title}</h1>
        </motion.div>
        {header}
      </div>
      <div className="table-container-body">{table}</div>
    </motion.div>
  );
};

export default TableContainer;
