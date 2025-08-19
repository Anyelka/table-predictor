import React from "react";
import PlayersContainer from "./PlayersContainer";
import PreviousTableContainer from "./PreviousTableContainer";

const PredictTab = ({ season, database }) => {
  return (
    <>
      <PreviousTableContainer database={database} season={season} />
      <PlayersContainer database={database} season={season} />
    </>
  );
};

export default PredictTab;
