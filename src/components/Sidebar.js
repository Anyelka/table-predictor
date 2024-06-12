import React, { useState } from "react";
import { motion } from "framer-motion";
import rightArrowIcon from "../resources/icons/right-arrow.png";
import { formatYearToSeasonShort } from "../utils";

const Sidebar = ({ seasons, selectedSeason, setSelectedSeason }) => {
  const [open, setOpen] = useState(false);

  const onClick = () => {
    setOpen(!open);
  };

  const getLastYearWithPredictions = () => {
    const seasonsWithPredictions = seasons
      .filter((season) => season.hasPredictions)
      .sort((s1, s2) => s1.year - s2.year);
    return seasonsWithPredictions[0].year;
  };

  const renderButton = (season, lastYearWithPredictions) => {
    if (season.year < lastYearWithPredictions) {
      return <></>;
    }
    return (
      <motion.button
        id="season-selector-button button"
        className={
          season === selectedSeason
            ? `season-selector-button season-selector-button-selected`
            : `season-selector-button`
        }
        disabled={!season.isPredictionActive && !season.hasPredictions}
        onClick={() => setSelectedSeason(season)}
        whileHover={
          season.isPredictionActive || season.hasPredictions
            ? { scale: 1.2 }
            : {}
        }
      >
        {season.isPredictionActive ? "+" : formatYearToSeasonShort(season.year)}
      </motion.button>
    );
  };

  const renderButtons = () => {
    const lastYearWithPredictions = getLastYearWithPredictions();
    return seasons.map((season) =>
      renderButton(season, lastYearWithPredictions)
    );
  };

  return (
    <motion.div
      id="sidebar"
      className={open ? `sidebar sidebar-open` : `sidebar sidebar-closed`}
      layout
    >
      {open && (
        <div id="season-selector" className="season-selector">
          {renderButtons()}
        </div>
      )}
      <motion.button
        className="open-sidebar-button"
        onClick={onClick}
        initial={{ rotate: 0 }}
        animate={{ rotate: open ? 180 : 0 }}
        layout
      >
        <img
          src={rightArrowIcon}
          alt=""
          className="open-sidebar-button-image"
        />
      </motion.button>
    </motion.div>
  );
};

export default Sidebar;
