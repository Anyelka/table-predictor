import { motion } from "framer-motion";
import { getNextYearShort, getYearShort } from "../../utils";

const buttonVariants = {
  initial: {
    opacity: 0,
    x: -60,
  },
  visible: {
    opacity: 1,
    x: 0,
    background: "linear-gradient(90deg, #F0F0F0, #C0C0C0",
  },
  selected: {
    opacity: 1,
    x: 0,
    background: "linear-gradient(90deg, #00ff88, #05f0ff)",
  },
  predictionActive: {
    opacity: 1,
    x: 0,
    background: "linear-gradient(137.27deg, #fbff00, 19.85%, #d4c300 113.26%)",
  },
  hover: { scale: 1.2, x: 0 },
  disabled: { opacity: 1, x: 0 },
};

const Icon = ({ season }) => {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div
        style={{
          position: "absolute",
          top: "25%",
          left: "10%",
        }}
      >
        {getYearShort(season.year)}
      </div>
      <div
        style={{
          position: "absolute",
          top: "53%",
          left: "45%",
          transform: "translate(-50%, -50%) scale(1)",
        }}
      >
        /
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          right: "20%",
        }}
      >
        {getNextYearShort(season.year)}
      </div>
      {season.isPredictionActive && (
        <div
          style={{
            position: "absolute",
            top: "10%",
            right: "5%",
            fontSize: "1.25vh",
            color: "#a08c6e",
            backgroundColor: "",
            rotate: "15deg",
          }}
        >
          NEW
        </div>
      )}
    </div>
  );
};

const getVariant = (isSelected, isPredictionActive, disabled) => {
  if (isSelected) {
    return "selected";
  }
  if (isPredictionActive) {
    return "predictionActive";
  }
  if (disabled) {
    return "disabled";
  }
  return "visible";
};

const SeasonSelectorButton = ({
  season,
  isSelected,
  setSelectedSeason,
  lastYearWithPredictions,
}) => {
  const disabled = !season.isPredictionActive && !season.hasPredictions;
  if (season.year < lastYearWithPredictions) {
    return <></>;
  }
  return (
    <motion.button
      id="season-selector-button"
      className="season-selector-button"
      disabled={disabled}
      onClick={() => setSelectedSeason(season)}
      whileHover={!disabled && "hover"}
      initial="initial"
      animate={getVariant(isSelected, season.isPredictionActive, disabled)}
      variants={buttonVariants}
      layout
    >
      <Icon season={season} />
    </motion.button>
  );
};

export default SeasonSelectorButton;
