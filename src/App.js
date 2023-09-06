import React, { useEffect, useState } from "react";
import TableContainer from "./components/TableContainer";
import { getTeam } from "./resources/teams";
import { get, getDatabase, ref, set, child } from "firebase/database";
import { initializeApp } from "firebase/app";
import { getTable } from "./agent";
import PredictionTable from "./components/standings/PredictionTable";
import ActualTable from "./components/standings/ActualTable";
import StandingsTab from "./components/standings/StandingsTab";

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

function App() {
  return <StandingsTab database={database}></StandingsTab>;
}

export default App;
