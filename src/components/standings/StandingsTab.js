import React, { useState } from "react";
import ActualTableContainer from "./ActualTableContainer";
import { motion } from "framer-motion";
import PredictionsContainer from "./PredictionsContainer";

const StandingsTab = ({ database, predictions }) => {
  const [actualTable, setActualTable] = useState([]);

  return (
    <motion.div className="standings-tab">
      {/* <TableContainer id="previous" title="2022/23" data={PREVIOUS_POSITIONS} /> */}
      <PredictionsContainer
        actualTable={actualTable}
        rawPredictions={predictions}
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
