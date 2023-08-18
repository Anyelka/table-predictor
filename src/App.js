import Table from "./Table";
import React, { useMemo, useState, useEffect } from "react";
import {
  MARCI_GUESSES,
  prevSeasonPositions as PREVIOUS_POSITIONS,
  ZSOLTI_GUESSES,
} from "./guesses";
import { getTable } from "./agent";
import { DUMMY_API_RESPONSE } from "./resources/dummyData";

function App() {
  const columns = useMemo(
    () => [
      {
        Header: "",
        accessor: "position",
      },
      {
        Header: "Team",
        accessor: "name",
      },
    ],
    []
  );

  const [previousPositions, setPreviousPositions] = useState([]);
  const [zsolti, setZsolti] = useState([]);
  const [marci, setMarci] = useState([]);
  const [currentPositions, setCurrentPositions] = useState([]);

  const loadDummyData = () => {
    setCurrentPositions(DUMMY_API_RESPONSE.league.standings[0]);
  };

  useEffect(() => {
    setPreviousPositions(PREVIOUS_POSITIONS);
    setZsolti(ZSOLTI_GUESSES);
    setMarci(MARCI_GUESSES);

    /* (async () => {
      const table = await getTable();
      setCurrentPositions(table.standings[0]);
    })(); */

    loadDummyData();
  }, []);

  const currentTable = currentPositions.map((entry) => {
    return { position: entry.rank, name: entry.team.name };
  });
  console.log("current table: " + JSON.stringify(currentTable));
  return (
    <div className="table-box">
      <Table
        id="previous-table"
        className="table"
        columns={columns}
        data={previousPositions}
      />
      <Table id="zsolti" className="table" columns={columns} data={zsolti} />
      <Table id="marci" className="table" columns={columns} data={marci} />
      <Table i="actual-table" columns={columns} data={currentTable} />
    </div>
  );
}

export default App;
