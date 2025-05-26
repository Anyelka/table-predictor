import { initializeApp } from "firebase/app";
import { child, get, getDatabase, ref, set } from "firebase/database";
import React, { useCallback, useEffect, useState } from "react";
import { getSeasons } from "./agent";
import MainPanel from "./components/MainPanel";
import Sidebar from "./components/sidebar/Sidebar";
import { isCurrentSeason, isSeasonUnderway } from "./utils";
/* import {
  MARCI_PREDICTIONS_2021,
  MARCI_PREDICTIONS_2023,
  ZSOLTI_PREDICTIONS_2021,
  ZSOLTI_PREDICTIONS_2023,
} from "./resources/predictions/predictions"; */

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

const isPredictionActive = (year) => {
  // TODO: choose based on season start, end & current date - maybe from 2 months before season start until season start
  // HAS TO BE == INSTEAD OF === !
  // eslint-disable-next-line eqeqeq
  return year == 2025;
};

const mapSeasons = (rawSeasons, seasonsWithPredictions) => {
  let seasons = Object.keys(rawSeasons).map((year) => ({
    year,
    start: rawSeasons[year].start,
    end: rawSeasons[year].end,
    hasPredictions: seasonsWithPredictions.some((season) => year === season),
    isCurrent: isCurrentSeason(year),
    isUnderway: isSeasonUnderway(rawSeasons[year].start, rawSeasons[year].end),
    isPredictionActive: isPredictionActive(year),
  }));
  seasons.sort((a, b) => b.year - a.year);
  return seasons;
};

function App() {
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(0);

  /* const savePredictions = () => {
    const predictions2023 = {
      zsolti: ZSOLTI_PREDICTIONS_2023,
      marci: MARCI_PREDICTIONS_2023,
    };
    const predictions2021 = {
      zsolti: ZSOLTI_PREDICTIONS_2021,
      marci: MARCI_PREDICTIONS_2021,
    };
    set(ref(database, "predictions/2023"), predictions2023);
    set(ref(database, "predictions/2021"), predictions2021);
  }; */

  const loadSeasons = useCallback(() => {
    const dbRef = ref(database);

    let seasonsWithPredictions = [];
    get(child(dbRef, `predictions`)).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        seasonsWithPredictions = Object.keys(data);
      } else {
        console.log("No data available");
      }
    });

    get(child(dbRef, `seasons`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const seasons = mapSeasons(data, seasonsWithPredictions);
          setSeasons(seasons);
          const currentSeason = seasons.find((season) => season.isCurrent);
          setSelectedSeason(currentSeason);
          //TODO: delete
          /* setSelectedSeason(seasons[0]); */
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const fetchAndSaveSeasons = useCallback(async () => {
    const seasons = await getSeasons();
    let seasonsToSave = {};
    seasons.forEach((season) => {
      seasonsToSave = {
        ...seasonsToSave,
        [season.year]: { start: season.start, end: season.end },
      };
    });
    set(ref(database, `seasons`), seasonsToSave);
  }, []);

  useEffect(() => {
    // Load the predictions from hardcoded js file:
    /* savePredictions(); */
    // Load the seasons from FOOTBALL API call:
    /* fetchAndSaveSeasons(); */

    loadSeasons();
  }, [loadSeasons, fetchAndSaveSeasons]);

  return (
    <div
      className="background"
      style={{
        height: "100vh",
        opacity: 1,
        backgroundImage: `url(${"https://resources.premierleague.com/photos/2024/05/20/50c79208-8de1-43bf-887c-fb4f209f9373/Man-City-cele.jpg?width=1400&height=800"})`,
        backgroundSize: "cover",
      }}
    >
      <div className="app">
        <Sidebar
          seasons={seasons}
          selectedSeason={selectedSeason}
          setSelectedSeason={setSelectedSeason}
        />
        <MainPanel
          database={database}
          seasons={seasons}
          selectedSeason={selectedSeason}
        />
      </div>
    </div>
  );
}

export default App;
