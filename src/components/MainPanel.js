import { motion } from "framer-motion";
import PredictTab from "./predict/PreidctTab";
import StandingsTab from "./standings/StandingsTab";

const MainPanel = ({ database, seasons, selectedSeason }) => {
  if (seasons.length === 0) {
    return <></>;
  }
  return (
    <motion.div className="tab" layout>
      {selectedSeason && (
        <div className="tables-container">
          {selectedSeason.isPredictionActive ? (
            <PredictTab database={database} season={selectedSeason} />
          ) : (
            <StandingsTab database={database} season={selectedSeason} />
          )}
        </div>
      )}
    </motion.div>
  );
};

export default MainPanel;
