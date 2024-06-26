import React from "react";
import PreviousTableContainer from "./PreviousTableContainer";
import PlayersContainer from "./PlayersContainer";

const PredictTab = ({ season, database }) => {
  return (
    <>
      <PreviousTableContainer database={database} season={season} />
      <PlayersContainer database={database} season={season} />
    </>
  );
};

export default PredictTab;
