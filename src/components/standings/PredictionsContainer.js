import { child, get, ref } from "firebase/database";
import React, { useCallback, useEffect, useState } from "react";
import { getTeam } from "../../resources/teams";
import PredictionTableContainer from "./PredictionTableContainer";

const getChange = (guess, team) => {
  const actualRank = team.position;
  return guess.position - actualRank;
};

const getPoints = (change) => {
  return Math.round(1000 * (1 - Math.abs(change) / 20));
};

const isHighestPoints = (playerPoints, pointsMap) => {
  const highestPoints = Object.values(pointsMap)
    .sort((a, b) => a - b)
    .reverse()[0];
  return playerPoints === highestPoints;
};

const PredictionsContainer = ({ season, actualTable, database }) => {
  const [scores, setScores] = useState([]);
  const [predictions, setPredictions] = useState([]);

  const [animationKey, setAnimationKey] = useState(0);

  const restartAnimation = () => {
    setAnimationKey((prev) => prev + 1);
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
    get(child(dbRef, `predictions/${season.year}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const mappedPredictions = Object.keys(data).reduce(
            (mappedData, name) => {
              mappedData[name] = data[name].map((guess) => mapTeam(guess));
              return mappedData;
            },
            {}
          );

          setPredictions(mappedPredictions);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [database, setPredictions, mapTeam, season]);

  useEffect(() => {
    loadPredictions();
  }, [loadPredictions]);

  useEffect(() => {
    if (predictions && Object.keys(predictions).length > 0) {
      let pointsMap = Object.keys(predictions).reduce((points, name) => {
        points[name] = predictions[name].reduce(
          (sum, prediction) => sum + prediction.points,
          0
        );
        return points;
      }, {});
      if (Object.values(pointsMap).some((points) => !isNaN(points))) {
        const scores = Object.keys(pointsMap).reduce((scores, name) => {
          const points = pointsMap[name];
          scores[name] = {
            points,
            isWinner: isHighestPoints(points, pointsMap),
          };
          return scores;
        }, {});
        setScores(scores);
        restartAnimation();
      }
    }
  }, [predictions]);

  return (
    <>
      {Object.keys(predictions).map((name) => (
        <PredictionTableContainer
          name={name}
          scores={scores[name]}
          predictions={predictions[name]}
          setPredictions={setPredictions}
          animationKey={animationKey}
        />
      ))}
    </>
  );
};

export default PredictionsContainer;
