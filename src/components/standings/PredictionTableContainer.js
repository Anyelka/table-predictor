import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Loader from "../Loader";
import PredictionTable from "./PredictionTable";
import TableContainer from "./TableContainer";

const PredictionTableContainer = ({
  name,
  scores,
  predictions,
  setPredictions,
  animationKey,
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (
      predictions[0].logo &&
      predictions[0].points &&
      typeof predictions[0].change === "number"
    ) {
      console.log(name + " not loading");
      setLoading(false);
    }
  }, [predictions, name]);

  const id = `${name}-predictions`;

  const renderHeaderPoints = () => {
    return scores && scores.points > 0 ? (
      <motion.div
        key={animationKey}
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
      animationKey={animationKey}
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
