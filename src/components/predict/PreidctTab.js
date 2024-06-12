import React from "react";
import PreviousTableContainer from "./PreviousTableContainer";
import PlayersContainer from "./PlayersContainer";

const PredictTab = ({ season, database }) => {
  return (
    <div className="tab">
      <PreviousTableContainer database={database} season={season} />
      <PlayersContainer database={database} season={season} />
    </div>
  );
};

export default PredictTab;
