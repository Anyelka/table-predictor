import { motion } from "framer-motion";
import React from "react";
import { uppercaseInitials } from "../../utils";

const TableContainer = ({ id, title, header, table, animationKey }) => {
  return (
    <motion.div
      id={`${id}-table-container`}
      className="table-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      key={animationKey}
    >
      <div className="table-container-head">
        <div
          className="table-container-head-title"
          /* initial={{ x: -300 }}
          transition={{ duration: 0.25 }}
          animate={{ x: 0 }} */
        >
          <h1 className="table-header-text">{uppercaseInitials(title)}</h1>
        </div>
        {header}
      </div>
      <div className="table-container-body">{table}</div>
    </motion.div>
  );
};

export default TableContainer;
