import React from "react";
import PreviousTableContainer from "./PreviousTableContainer";
import PlayersContainer from "./PlayersContainer";
import { motion } from "framer-motion";

const PredictTab = ({ season, database }) => {
  return (
    <>
      <PreviousTableContainer database={database} season={season} />
      <PlayersContainer database={database} season={season} />
    </>
  );
};

export default PredictTab;
