import React, { useState } from "react";
import { motion } from "framer-motion";
import rightArrowIcon from "../../resources/icons/right-arrow.png";
import SeasonSelectorButton from "./SeasonSelectorButton";

const Sidebar = ({ seasons, selectedSeason, setSelectedSeason }) => {
  const [open, setOpen] = useState(false);

  const onClick = () => {
    setOpen(!open);
  };

  const getLastYearWithPredictions = () => {
    const seasonsWithPredictions = seasons
      .filter((season) => season.hasPredictions)
      .sort((s1, s2) => s1.year - s2.year);
    return seasonsWithPredictions.length > 0
      ? seasonsWithPredictions[0].year
      : 0;
  };

  const renderButtons = () => {
    const lastYearWithPredictions = getLastYearWithPredictions();
    return seasons.map((season) => (
      <SeasonSelectorButton
        season={season}
        isSelected={season === selectedSeason}
        setSelectedSeason={
          setSelectedSeason /* (season) => setSelectedSeason(season) */
        }
        lastYearWithPredictions={lastYearWithPredictions}
      />
    ));
  };

  return (
    <motion.div
      id="sidebar"
      className={open ? `sidebar sidebar-open` : `sidebar sidebar-closed`}
      layout
    >
      {open && (
        <motion.div id="season-selector" className="season-selector" layout>
          {renderButtons()}
        </motion.div>
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
