import { motion } from "framer-motion";
import React from "react";
import { uppercaseInitials } from "../../utils";

const TableContainer = ({ id, title, header, table, animationKey, style }) => {
  return (
    <motion.div
      id={`${id}-table-container`}
      className="table-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      key={animationKey}
      style={style}
    >
      <div className="table-container-head">
        <motion.div
          className="table-container-head-title"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25 }}
        >
          <h1 className="table-header-text">{uppercaseInitials(title)}</h1>
        </motion.div>
        {header}
      </div>
      <div className="table-container-body">{table}</div>
    </motion.div>
  );
};

export default TableContainer;
