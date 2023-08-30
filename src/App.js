import React, { useEffect, useState } from "react";
import {
  MARCI_PREDICTIONS,
  PREVIOUS_POSITIONS,
  ZSOLTI_PREDICTIONS,
} from "./constants/predictions";
import { DUMMY_API_RESPONSE } from "./resources/dummyData";
import TableContainer from "./components/TableContainer";
import { getTeam } from "./resources/teams";
import { get, getDatabase, ref, set, child } from "firebase/database";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  // Your web app's Firebase configuration
  apiKey: "AIzaSyAscQjTt9Hx0n8J6I8_tljMzCXjfWLRUP4",
  authDomain: "table-predictor.firebaseapp.com",
  projectId: "table-predictor",
  storageBucket: "table-predictor.appspot.com",
  messagingSenderId: "913305455937",
  appId: "1:913305455937:web:cf26d07a28367f7711e5c0",
  databaseURL:
    "https://table-predictor-default-rtdb.europe-west1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

const savePredictions = () => {
  const zsoltiPredictions = { name: "zsolti", predictions: ZSOLTI_PREDICTIONS };
  const marciPredictions = { name: "marci", predictions: MARCI_PREDICTIONS };
  set(ref(database, "predictions/zsolti"), zsoltiPredictions);
  set(ref(database, "predictions/marci"), marciPredictions);
};

const getChange = (guess, actualTable) => {
  const actualRank = actualTable.find(
    (team) => getTeam(team.name) === getTeam(guess.name)
  ).position;
  return guess.position - actualRank;
};

const getPoints = (change) => {
  return Math.round(1000 * (1 - Math.abs(change) / 20));
};

const PredictionsTable = ({ id, title, predictions, actualTable }) => {
  if (!predictions) {
    return null;
  }
  const data = predictions.map((guess) => {
    const change = getChange(guess, actualTable);
    const points = getPoints(change);
    return { ...guess, points, change };
  });
  return <TableContainer id={id} title={title} data={data} />;
};

const loadPredictions = (name, setPredictions) => {
  const dbRef = ref(getDatabase());
  get(child(dbRef, `predictions/${name}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log(
          "getting predictions from db: name:" +
            name +
            ", data:" +
            JSON.stringify(data.predictions)
        );
        setPredictions(data.predictions);
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

const loadActualTable = (setActualTable) => {
  const currentPositions = DUMMY_API_RESPONSE.league.standings[0];
  const currentTable = currentPositions.map((entry) => {
    const teamName = getTeam(entry.team.name);
    return {
      position: entry.rank,
      name: teamName.basic,
      played: entry.all.played,
      points: entry.points,
    };
  });
  setActualTable(currentTable);
};

function App() {
  const [zsoltiPredictions, setZsoltiPredictions] = useState([]);
  const [marciPredictions, setMarciPredictions] = useState([]);
  const [actualTable, setActualTable] = useState([]);

  useEffect(() => {
    /* (async () => {
      const table = await getTable();
      setCurrentPositions(table.standings[0]);
    })(); */
    loadPredictions("zsolti", setZsoltiPredictions);
    loadPredictions("marci", setMarciPredictions);
    loadActualTable(setActualTable);
  }, []);

  return (
    <div className="tables-box">
      <TableContainer id="previous" title="2022/23" data={PREVIOUS_POSITIONS} />
      <PredictionsTable
        id="zsolti"
        title="Zsolti"
        predictions={zsoltiPredictions}
        actualTable={actualTable}
      />
      <PredictionsTable
        id="marci"
        title="Marci"
        predictions={marciPredictions}
        actualTable={actualTable}
      />
      <TableContainer id="actual-table" title="2023/24" data={actualTable} />
    </div>
  );
}

export default App;
