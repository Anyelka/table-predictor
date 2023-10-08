import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import rightArrowIcon from "../resources/icons/right-arrow.png";

const Sidebar = ({ seasons }) => {
  const [open, setOpen] = useState(false);

  const onClick = () => {
    setOpen(!open);
  };

  const formatYear = (year) => {
    return (year - 1).toString().slice(2) + "/" + year.toString().slice(2);
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
            >
              {formatYear(season.year)}
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
