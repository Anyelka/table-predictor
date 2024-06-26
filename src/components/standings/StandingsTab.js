import React, { useState } from "react";
import ActualTableContainer from "./ActualTableContainer";
import PredictionsContainer from "./PredictionsContainer";

const StandingsTab = ({ season, database }) => {
  const [actualTable, setActualTable] = useState([]);

  return (
    <>
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
    </>
  );
};

export default StandingsTab;
