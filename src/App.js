import React, { useCallback, useEffect, useState } from "react";
import { child, get, getDatabase, ref, set } from "firebase/database";
import { initializeApp } from "firebase/app";
import StandingsTab from "./components/standings/StandingsTab";
import Sidebar from "./components/Sidebar";
import {
  MARCI_PREDICTIONS_2024,
  ZSOLTI_PREDICTIONS_2024,
} from "./resources/predictions/predictions";

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

const isCurrentSeason = (year) => {
  let currentDate = new Date();
  let maxDate = new Date(year, 5, 15);
  let minDate = new Date(year - 1, 5, 15);
  return currentDate >= minDate && currentDate < maxDate;
};

function App() {
  const [predictions, setPredictions] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(0);

  const getSeasons = (predictions) => {
    return Object.keys(predictions).map((year) => ({
      year,
      isCurrent: isCurrentSeason(year),
    }));
  };

  const savePredictions2024 = () => {
    const zsoltiPredictions = {
      name: "zsolti",
      predictions: ZSOLTI_PREDICTIONS_2024,
    };
    const marciPredictions = {
      name: "marci",
      predictions: MARCI_PREDICTIONS_2024,
    };
    set(ref(database, "predictions/2024/"), {
      zsolti: zsoltiPredictions,
      marci: marciPredictions,
    });
  };

  const loadPredictions = useCallback(() => {
    const dbRef = ref(database);
    get(child(dbRef, `predictions`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setPredictions(data);
          const currentSeason = getSeasons(data).find(
            (season) => season.isCurrent
          );
          setSelectedSeason(currentSeason);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    loadPredictions();
  }, []);

  return (
    <div
      className="background"
      style={{
        opacity: 1,
        backgroundImage: `url(${"https://resources.premierleague.com/photos/2023/10/02/e0bd34d6-b76c-49b5-9d7a-97474b29bab4/Mudryk-Chelsea.jpg?width=1400&height=800"})`,
        backgroundSize: "cover",
      }}
    >
      <div className="app">
        <Sidebar seasons={getSeasons(predictions)} />
        {Object.keys(predictions).length > 0 ? (
          <StandingsTab
            database={database}
            predictions={predictions[selectedSeason.year]}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default App;
