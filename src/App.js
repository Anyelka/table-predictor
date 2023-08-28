import React, { useEffect } from "react";
import { MARCI_GUESSES, PREVIOUS_POSITIONS, ZSOLTI_GUESSES } from "./guesses";
import { DUMMY_API_RESPONSE } from "./resources/dummyData";
import TableContainer from "./components/TableContainer";
import { all } from "axios";
import { getTeam } from "./resources/teams";

const currentPositions = DUMMY_API_RESPONSE.league.standings[0];

function App() {
  useEffect(() => {
    /* (async () => {
      const table = await getTable();
      setCurrentPositions(table.standings[0]);
    })(); */
  }, []);

  const currentTable = currentPositions.map((entry) => {
    const teamName = getTeam(entry.team.name);
    return {
      position: entry.rank,
      name: teamName.basic,
      played: entry.all.played, //not used yet
      points: entry.points,
    };
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
