import React from "react";
import TableContainer from "../TableContainer";
import PredictionTable from "./PredictionTable";
import Loader from "../Loader";
import { motion } from "framer-motion";

const PredictionTableContainer = ({ name, points, predictions, loading }) => {
  const id = `${name}-predictions`;

  const renderHeaderPoints = () => {
    return points > 0 ? (
      <motion.div
        className="table-container-head-points"
        initial={{ opacity: 0, scale: 0 }}
        transition={{ duration: 0.25, delay: 0.25 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <h2>{points > 0 ? points : ""}</h2>
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
          <PredictionTable id={id} predictions={predictions} />
        )
      }
    />
  );
};
export default PredictionTableContainer;
