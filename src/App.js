import React, { useEffect, useState } from "react";
import TableContainer from "./components/TableContainer";
import { getTeam } from "./resources/teams";
import { get, getDatabase, ref, set, child } from "firebase/database";
import { initializeApp } from "firebase/app";
import { getTable } from "./agent";

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

const getChange = (guess, team) => {
  const actualRank = team.position;
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
    const team = actualTable.find(
      (team) => getTeam(team.name) === getTeam(guess.name)
    );
    const change = getChange(guess, team);
    const points = getPoints(change);
    const logo = team.logo;
    return { ...guess, points, change, logo };
  });
  return <TableContainer id={id} title={title} data={data} />;
};

/* const savePredictions = () => {
  const zsoltiPredictions = { name: "zsolti", predictions: ZSOLTI_PREDICTIONS };
  const marciPredictions = { name: "marci", predictions: MARCI_PREDICTIONS };
  set(ref(database, "predictions/zsolti"), zsoltiPredictions);
  set(ref(database, "predictions/marci"), marciPredictions);
}; */

const saveActualTable = (leagueStangings) => {
  const standings = leagueStangings.standings[0];
  const date = new Date().getDate();
  set(ref(database, "actualTable"), {
    standings,
    season: leagueStangings.season,
    updated: date,
  });
};

const loadPredictions = (name, setPredictions) => {
  const dbRef = ref(database);
  get(child(dbRef, `predictions/${name}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        /* console.log(
          "getting predictions from db: name:" +
            name +
            ", data:" +
            JSON.stringify(data.predictions)
        ); */
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
  const dbRef = ref(database);
  get(child(dbRef, `actualTable`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log("data:" + JSON.stringify(data));
        setCurrentTable(data.standings, setActualTable);
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

const setCurrentTable = (data, setActualTable) => {
  const currentTable = data.map((entry) => {
    const team = entry.team;
    const teamName = getTeam(team.name);
    return {
      position: entry.rank,
      logo: team.logo,
      name: teamName.basic,
      played: entry.all.played,
      points: entry.points,
    };
  });
  setActualTable(currentTable);
};

const refreshActualTable = async (setActualTable) => {
  const table = await getTable();
  saveActualTable(table);
  loadActualTable(setActualTable);
};

function App() {
  const [actualTable, setActualTable] = useState([]);
  const [zsoltiPredictions, setZsoltiPredictions] = useState([]);
  const [marciPredictions, setMarciPredictions] = useState([]);

  useEffect(() => {
    (async () => {
      const table = await getTable();
      setActualTable(table.standings[0]);
    })();

    /* saveActualTable(DUMMY_TABLE_API_RESPONSE.league); */

    loadActualTable(setActualTable);
    loadPredictions("zsolti", setZsoltiPredictions);
    loadPredictions("marci", setMarciPredictions);
  }, []);

  return (
    <div className="tables-box">
      {/* <TableContainer id="previous" title="2022/23" data={PREVIOUS_POSITIONS} /> */}
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
      <TableContainer
        id="actual-table"
        title="2023/24"
        data={actualTable}
        headerButtonAction={() => refreshActualTable(setActualTable)}
      />
    </div>
  );
}

export default App;
