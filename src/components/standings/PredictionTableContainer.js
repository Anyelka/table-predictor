import React, { useEffect, useState } from "react";
import TableContainer from "./TableContainer";
import PredictionTable from "./PredictionTable";
import Loader from "../Loader";
import { motion } from "framer-motion";

const PredictionTableContainer = ({
  name,
  scores,
  predictions,
  setPredictions,
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (predictions[0].logo && predictions[0].points && predictions[0].change) {
      setLoading(false);
    }
  }, [predictions]);

  const id = `${name}-predictions`;

  const renderHeaderPoints = () => {
    return scores && scores.points > 0 ? (
      <motion.div
        className="table-container-head-points-container"
        initial={{ opacity: 0, scale: 0 }}
        transition={{ duration: 0.25, delay: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <h2
          className={`table-container-head-points-text ${
            scores.isWinner ? "table-container-head-points-winner" : ""
          }`}
        >
          {scores.points}
        </h2>
      </motion.div>
    ) : (
      <></>
    );
  };

  return (
    <TableContainer
      id={id}
      title={name}
      header={renderHeaderPoints()}
      table={
        loading ? (
          <Loader />
        ) : (
          <PredictionTable
            id={id}
            predictions={predictions}
            setPredictions={setPredictions}
          />
        )
      }
    />
  );
};
export default PredictionTableContainer;
