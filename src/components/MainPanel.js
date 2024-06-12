import PredictTab from "./predict/PreidctTab";
import StandingsTab from "./standings/StandingsTab";

const MainPanel = ({ database, seasons, selectedSeason }) => {
  if (seasons.length === 0) {
    return <></>;
  }
  return (
    <div className="main-panel">
      {selectedSeason.isPredictionActive ? (
        <PredictTab database={database} season={selectedSeason} />
      ) : (
        <StandingsTab database={database} season={selectedSeason} />
      )}
    </div>
  );
};

export default MainPanel;
