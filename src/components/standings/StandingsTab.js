import React, { useState } from "react";
import ActualTableContainer from "./ActualTableContainer";
import { motion } from "framer-motion";
import PredictionsContainer from "./PredictionsContainer";

const StandingsTab = ({ database }) => {
  const [actualTable, setActualTable] = useState([]);

  return (
    <motion.div
      className="standings-tab"
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      animate={{ opacity: 0.8 }}
    >
      {/* <TableContainer id="previous" title="2022/23" data={PREVIOUS_POSITIONS} /> */}
      <PredictionsContainer actualTable={actualTable} database={database} />
      <ActualTableContainer
        actualTable={actualTable}
        setActualTable={setActualTable}
        database={database}
      />
    </motion.div>
  );
};

export default StandingsTab;
