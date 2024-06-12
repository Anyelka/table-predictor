import React, { useState } from "react";
import ActualTableContainer from "./ActualTableContainer";
import { motion } from "framer-motion";
import PredictionsContainer from "./PredictionsContainer";

const StandingsTab = ({ season, database }) => {
  const [actualTable, setActualTable] = useState([]);

  return (
    <motion.div className="tab">
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
