import React, { useState } from "react";
import PredictionTableContainer from "./PredictionTableContainer";
import ActualTableContainer from "./ActualTableContainer";

const StandingsTab = ({ database }) => {
  const [actualTable, setActualTable] = useState([]);

  return (
    <div className="standings-tab">
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
    </div>
  );
};

export default StandingsTab;
