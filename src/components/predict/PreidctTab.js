import React from "react";
import PreviousTableContainer from "./PreviousTableContainer";
import PlayersContainer from "./PlayersContainer";
import { motion } from "framer-motion";

const PredictTab = ({ season, database }) => {
  return (
    <motion.div className="tab" layout>
      <PreviousTableContainer database={database} season={season} />
      <PlayersContainer database={database} season={season} />
    </motion.div>
  );
};

export default PredictTab;
