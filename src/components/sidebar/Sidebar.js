import { motion } from "framer-motion";
import React, { useState } from "react";
import rightArrowIcon from "../../resources/icons/right-arrow.png";
import SeasonSelectorButton from "./SeasonSelectorButton";

const sidebarVariants = {
  closed: { width: 20 },
  open: { width: 80 },
};

const openSidebarButtonVariants = {
  closed: { rotate: 0, x: 0 },
  open: { rotate: 180, x: 60 },
};

const openSidebarButtonImgVariants = {
  initial: { x: 0 },
  onHover: { x: 5 },
};

const Sidebar = ({ seasons, selectedSeason, setSelectedSeason }) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
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
      className="sidebar"
      initial="closed"
      animate={open ? "open" : "closed"}
      variants={sidebarVariants}
      transition={{ type: "spring", duration: 0.5 }}
      layout
    >
      {open && (
        <motion.div id="season-selector" className="season-selector" layout>
          {renderButtons()}
        </motion.div>
      )}
      <motion.button
        className="open-sidebar-button"
        onClick={toggleOpen}
        initial="closed"
        animate={open ? "open" : "closed"}
        variants={openSidebarButtonVariants}
        whileHover="onHover"
        transition={{ type: "spring", duration: 0.5 }}
        layout
      >
        <motion.img
          src={rightArrowIcon}
          alt=""
          className="open-sidebar-button-image"
          variants={openSidebarButtonImgVariants}
        />
      </motion.button>
    </motion.div>
  );
};

export default Sidebar;
