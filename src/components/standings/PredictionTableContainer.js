import React, { useCallback, useEffect, useState } from "react";
import TableContainer from "../TableContainer";
import PredictionTable from "./PredictionTable";
import { get, ref, /* set, */ child } from "firebase/database";
import Loader from "../Loader";
import { getTeam } from "../../resources/teams";

const getChange = (guess, team) => {
  const actualRank = team.position;
  return guess.position - actualRank;
};

const getPoints = (change) => {
  return Math.round(1000 * (1 - Math.abs(change) / 20));
};

const PredictionTableContainer = ({ id, name, actualTable, database }) => {
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true);
  const [predictions, setPredictions] = useState([]);

  /* const savePredictions = () => {
    const zsoltiPredictions = { name: "zsolti", predictions: ZSOLTI_PREDICTIONS };
    const marciPredictions = { name: "marci", predictions: MARCI_PREDICTIONS };
    set(ref(database, "predictions/zsolti"), zsoltiPredictions);
    set(ref(database, "predictions/marci"), marciPredictions);
  }; */

  const renderHeaderPoints = () => {
    return (
      <div className="table-container-head-points">
        <h2>{points}</h2>
      </div>
    );
  };

  const mapTeam = useCallback(
    (guess) => {
      const team = actualTable.find(
        (team) => getTeam(team.name) === getTeam(guess.name)
      );
      if (!team) {
        console.error("Team not found: " + guess.name);
        return guess;
      }
      const change = getChange(guess, team);
      const points = getPoints(change);
      const logo = team.logo;
      return { ...guess, points, change, logo };
    },
    [actualTable]
  );

  const loadPredictions = useCallback(() => {
    const dbRef = ref(database);
    get(child(dbRef, `predictions/${id}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const mappedPredictions = data.predictions.map((guess) =>
            mapTeam(guess)
          );
          setPredictions(mappedPredictions);
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
  }, [id, database, setPredictions, mapTeam]);

  useEffect(() => {
    /* savePredictions(); */
    loadPredictions();
  }, [loadPredictions]);

  useEffect(() => {
    if (predictions && predictions.length > 0) {
      const totalPoints = predictions.reduce(
        (sum, prediction) => sum + prediction.points,
        0
      );
      setPoints(totalPoints);
    }
  }, [predictions]);

  return (
    <TableContainer
      id={id}
      title={name}
      header={renderHeaderPoints()}
      table={
        loading ? (
          <Loader />
        ) : (
          <PredictionTable id={id} predictions={predictions} />
        )
      }
    />
  );
};
export default PredictionTableContainer;
