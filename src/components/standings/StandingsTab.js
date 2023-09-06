import React, { useState } from "react";
import PredictionTableContainer from "./PredictionTableContainer";
import ActualTableContainer from "./ActualTableContainer";
import { motion } from "framer-motion";

const StandingsTab = ({ database }) => {
  const [actualTable, setActualTable] = useState([]);

  return (
    <motion.div
      className="standings-tab"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.8 }}
    >
      {/* <TableContainer id="previous" title="2022/23" data={PREVIOUS_POSITIONS} /> */}
      <PredictionTableContainer
        id="zsolti"
        name="Zsolti"
        actualTable={actualTable}
        database={database}
      />
      <PredictionTableContainer
        id="marci"
        name="Marci"
        actualTable={actualTable}
        database={database}
      />
      <ActualTableContainer
        actualTable={actualTable}
        setActualTable={setActualTable}
        database={database}
      />
    </motion.div>
  );
};

export default StandingsTab;
