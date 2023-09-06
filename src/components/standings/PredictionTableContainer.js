import React, { useEffect, useState } from "react";
import TableContainer from "../TableContainer";
import PredictionTable from "./PredictionTable";
import { get, ref, /* set, */ child } from "firebase/database";

const PredictionTableContainer = ({ id, name, actualTable, database }) => {
  const [predictions, setPredictions] = useState([]);

  /* const savePredictions = () => {
    const zsoltiPredictions = { name: "zsolti", predictions: ZSOLTI_PREDICTIONS };
    const marciPredictions = { name: "marci", predictions: MARCI_PREDICTIONS };
    set(ref(database, "predictions/zsolti"), zsoltiPredictions);
    set(ref(database, "predictions/marci"), marciPredictions);
  }; */

  const loadPredictions = () => {
    const dbRef = ref(database);
    get(child(dbRef, `predictions/${id}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setPredictions(data.predictions);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    /* savePredictions(); */
    loadPredictions();
  }, []);

  return (
    <TableContainer
      id={id}
      title={name}
      table={
        <PredictionTable
          id={id}
          predictions={predictions}
          actualTable={actualTable}
        />
      }
    />
  );
};
export default PredictionTableContainer;
