import React, { useState } from "react";
import { motion } from "framer-motion";
import rightArrowIcon from "../resources/icons/right-arrow.png";
import { formatYearToSeasonShort } from "../utils";

const Sidebar = ({ seasons, setSelectedSeason }) => {
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
        <div id="page-selector" className="page-selector">
          {seasons.map((season) => (
            <button
              id="page-selector-button button"
              className="page-selector-button"
              onClick={() => setSelectedSeason(season)}
            >
              {formatYearToSeasonShort(season.year)}
            </button>
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
