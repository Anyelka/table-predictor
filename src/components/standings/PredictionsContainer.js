import React, { useState, useEffect, useCallback } from "react";
import PredictionTableContainer from "./PredictionTableContainer";
import { getTeam } from "../../resources/teams";

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

const PredictionsContainer = ({ rawPredictions, actualTable }) => {
  const [scores, setScores] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);

  const mapTeam = useCallback(
    (guess) => {
      const team = actualTable.find(
        (team) => getTeam(team.name) === getTeam(guess.name)
      );
      if (!team) {
        return guess;
      }
      const change = getChange(guess, team);
      const points = getPoints(change);
      const logo = team.logo;
      return { ...guess, points, change, logo };
    },
    [actualTable]
  );

  const mapPredictions = useCallback(
    (rawPredictions) => {
      return Object.keys(rawPredictions).reduce((mappedData, name) => {
        mappedData[name] = rawPredictions[name].predictions.map((guess) =>
          mapTeam(guess)
        );
        return mappedData;
      }, {});
    },
    [mapTeam]
  );

  useEffect(() => {
    setPredictions(mapPredictions(rawPredictions));
  }, [rawPredictions, mapPredictions]);

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
      }
      setLoading(false);
    }
  }, [predictions]);

  return (
    <>
      {Object.keys(predictions).map((name) => (
        <PredictionTableContainer
          name={name}
          scores={scores[name]}
          predictions={predictions[name]}
          loading={loading}
        />
      ))}
    </>
  );
};

export default PredictionsContainer;
