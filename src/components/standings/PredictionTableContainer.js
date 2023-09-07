import React, { useCallback, useEffect, useState } from "react";
import TableContainer from "../TableContainer";
import PredictionTable from "./PredictionTable";
import { get, ref, /* set, */ child } from "firebase/database";
import Loader from "../Loader";

const PredictionTableContainer = ({ id, name, actualTable, database }) => {
  const [loading, setLoading] = useState(true);
  const [predictions, setPredictions] = useState([]);

  /* const savePredictions = () => {
    const zsoltiPredictions = { name: "zsolti", predictions: ZSOLTI_PREDICTIONS };
    const marciPredictions = { name: "marci", predictions: MARCI_PREDICTIONS };
    set(ref(database, "predictions/zsolti"), zsoltiPredictions);
    set(ref(database, "predictions/marci"), marciPredictions);
  }; */

  const loadPredictions = useCallback(() => {
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
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id, database, setPredictions]);

  useEffect(() => {
    /* savePredictions(); */
    loadPredictions();
  }, [loadPredictions]);

  return (
    <TableContainer
      id={id}
      title={name}
      table={
        loading ? (
          <Loader />
        ) : (
          <PredictionTable
            id={id}
            predictions={predictions}
            actualTable={actualTable}
          />
        )
      }
    />
  );
};
export default PredictionTableContainer;
