import React, { useEffect } from "react";
import { MARCI_GUESSES, PREVIOUS_POSITIONS, ZSOLTI_GUESSES } from "./guesses";
import { DUMMY_API_RESPONSE } from "./resources/dummyData";
import TableContainer from "./components/TableContainer";
import { getTeam } from "./resources/teams";

const currentPositions = DUMMY_API_RESPONSE.league.standings[0];

const getChange = (guess, actualTable) => {
  const actualRank = actualTable.find(
    (team) => getTeam(team.name) === getTeam(guess.name)
  ).position;
  return guess.position - actualRank;
};

const getPoints = (change) => {
  return Math.round(1000 * (1 - Math.abs(change) / 20));
};

const GuessTable = ({ id, title, guesses, actualTable }) => {
  const data = guesses.map((guess) => {
    const change = getChange(guess, actualTable);
    const points = getPoints(change);
    return { ...guess, points, change };
  });
  return <TableContainer id={id} title={title} initialData={data} />;
};

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
      played: entry.all.played,
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
      <GuessTable
        id="zsolti"
        title="Zsolti"
        guesses={ZSOLTI_GUESSES}
        actualTable={currentTable}
      />
      <GuessTable
        id="marci"
        title="Marci"
        guesses={MARCI_GUESSES}
        actualTable={currentTable}
      />
      <TableContainer
        id="actual-table"
        title="2023/24"
        initialData={currentTable}
      />
    </div>
  );
}

export default App;
