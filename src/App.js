import "./App.css";
import Table from "./Table";
import React, { useMemo, useState, useEffect } from "react";
import {
  MARCI_GUESSES,
  prevSeasonPositions as PREVIOUS_POSITIONS,
  ZSOLTI_GUESSES,
} from "./guesses";

function App() {
  const columns = useMemo(
    () => [
      {
        Header: "Position",
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

  useEffect(() => {
    setPreviousPositions(PREVIOUS_POSITIONS);
    setZsolti(ZSOLTI_GUESSES);
    setMarci(MARCI_GUESSES);
    setCurrentPositions();
    (async () => {})();
  }, []);

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
      {/* <Table i="actual-table" columns={columns} data={currentPositions} /> */}
    </div>
  );
}

export default App;
