import React from "react";
import { getDatabase } from "firebase/database";
import { initializeApp } from "firebase/app";
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
  return (
    <div
      style={{
        window: "100vw",
        opacity: 1,
        /*         backgroundImage: `url("./resources/background/Mudryk-Chelsea.webp")`,
         */
        backgroundImage: `url(${"https://resources.premierleague.com/photos/2023/10/02/e0bd34d6-b76c-49b5-9d7a-97474b29bab4/Mudryk-Chelsea.jpg?width=1400&height=800"})`,
        backgroundSize: "cover",
      }}
    >
      <StandingsTab database={database}></StandingsTab>;
    </div>
  );
}

export default App;
