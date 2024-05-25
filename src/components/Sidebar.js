import React, { useState } from "react";
import { motion } from "framer-motion";
import rightArrowIcon from "../resources/icons/right-arrow.png";
import { formatYearToSeasonShort } from "../utils";

const Sidebar = ({ seasons, selectedSeason, setSelectedSeason }) => {
  const [open, setOpen] = useState(false);

  const onClick = () => {
    setOpen(!open);
  };

  return (
    <motion.div
      id="sidebar"
      className={open ? `sidebar sidebar-open` : `sidebar sidebar-closed`}
      layout
    >
      {open ? (
        <div id="season-selector" className="season-selector">
          {seasons.map((season) => (
            <motion.button
              id="season-selector-button button"
              className={
                season === selectedSeason
                  ? `season-selector-button season-selector-button-selected`
                  : `season-selector-button`
              }
              disabled={!season.hasPredictions}
              onClick={() => setSelectedSeason(season)}
              whileHover={season.hasPredictions ? { scale: 1.2 } : {}}
            >
              {formatYearToSeasonShort(season.year)}
            </motion.button>
          ))}
        </div>
      ) : (
        <></>
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
