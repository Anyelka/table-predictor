import React, { useCallback, useEffect, useState } from "react";
import { child, get, getDatabase, ref /* set */ } from "firebase/database";
import { initializeApp } from "firebase/app";
import StandingsTab from "./components/standings/StandingsTab";
import Sidebar from "./components/Sidebar";
/* import {
  MARCI_PREDICTIONS_2022,
  ZSOLTI_PREDICTIONS_2022,
} from "./resources/predictions/predictions"; */
import { isCurrentSeason } from "./utils";

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

const mapSeasons = (rawSeasons) => {
  let seasons = rawSeasons.map((year) => ({
    year,
    isCurrent: isCurrentSeason(year),
  }));
  seasons.sort((a, b) => b.year - a.year);
  return seasons;
};

function App() {
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(0);

  /*   const savePredictions2022 = () => {
    const zsoltiPredictions = {
      name: "zsolti",
      predictions: ZSOLTI_PREDICTIONS_2022,
    };
    const marciPredictions = {
      name: "marci",
      predictions: MARCI_PREDICTIONS_2022,
    };
    set(ref(database, "predictions/2022/"), {
      zsolti: zsoltiPredictions,
      marci: marciPredictions,
    });
  };
  */

  /* const saveSeasons = () => {
    set(ref(database, "seasons"), ["2024", "2022"]);
  }; */

  const loadSeasons = useCallback(() => {
    const dbRef = ref(database);
    get(child(dbRef, `seasons`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const seasons = mapSeasons(data);
          setSeasons(seasons);
          const currentSeason = seasons.find((season) => season.isCurrent);
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
    /* savePredictions2022(); */
    /* saveSeasons(); */
    loadSeasons();
  }, [loadSeasons]);

  return (
    <div
      className="background"
      style={{
        opacity: 1,
        backgroundImage: `url(${"https://img.chelseafc.com/image/upload/f_auto,c_fill,g_faces,w_1440,h_856,q_90/editorial/match-reports/2023-24/Burnley%20away/Sterling_celeb_Burnley_A_GettyImages-1712206536.jpg"})`,
        /* backgroundImage: `url(${"https://i.ebayimg.com/images/g/iJwAAOSwNCRhp7VN/s-l1600.jpg"})`, */

        backgroundSize: "cover",
      }}
    >
      <div className="app">
        <Sidebar
          seasons={seasons}
          selectedSeason={selectedSeason}
          setSelectedSeason={setSelectedSeason}
        />
        {seasons.length > 0 ? (
          <StandingsTab database={database} season={selectedSeason} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default App;
