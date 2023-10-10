import React, { useState } from "react";
import ActualTableContainer from "./ActualTableContainer";
import { motion } from "framer-motion";
import PredictionsContainer from "./PredictionsContainer";

const StandingsTab = ({ season, database }) => {
  const [actualTable, setActualTable] = useState([]);

  return (
    <motion.div className="standings-tab">
      {/* <TableContainer id="previous" title="2022/23" data={PREVIOUS_POSITIONS} /> */}
      <PredictionsContainer
        season={season}
        actualTable={actualTable}
        database={database}
      />
      <ActualTableContainer
        season={season}
        actualTable={actualTable}
        setActualTable={setActualTable}
        database={database}
      />
    </motion.div>
  );
};

export default StandingsTab;
