import React, { useEffect } from "react";
import { MARCI_GUESSES, PREVIOUS_POSITIONS, ZSOLTI_GUESSES } from "./guesses";
import { getTable } from "./agent";
import { DUMMY_API_RESPONSE } from "./resources/dummyData";
import TableContainer from "./components/TableContainer";

const currentPositions = DUMMY_API_RESPONSE.league.standings[0];

function App() {
  useEffect(() => {
    /* (async () => {
      const table = await getTable();
      setCurrentPositions(table.standings[0]);
    })(); */
  }, []);

  const currentTable = currentPositions.map((entry) => {
    return { position: entry.rank, name: entry.team.name };
  });

  return (
    <div className="tables-box">
      <TableContainer
        id="previous"
        title="2022/23"
        initialData={PREVIOUS_POSITIONS}
      />
      <TableContainer id="zsolti" title="Zsolti" initialData={ZSOLTI_GUESSES} />
      <TableContainer id="marci" title="Marci" initialData={MARCI_GUESSES} />
      <TableContainer
        id="actual-table"
        title="2023/24"
        initialData={currentTable}
      />
    </div>
  );
}

export default App;
