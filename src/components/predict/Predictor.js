import { Reorder, motion } from "framer-motion";

const Predictor = ({ player, predictions, setPredictions }) => {
  const renderTable = () => {
    return (
      <Reorder.Group
        id={`${player.name}-predictor-table`}
        as="table"
        className="table"
        values={predictions}
        onReorder={setPredictions}
        layout
      >
        {predictions.map(
          (team, index) => (
            <Reorder.Item
              as="tr"
              key={team.name}
              value={team.name}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.25, delay: 0.5 + index * 0.025 }}
              animate={{ opacity: 1 }}
              className="table-row"
            >
              <td>{team.position}</td>
              {team.logo !== undefined && (
                <td>
                  <img src={team.logo} alt="" className="logo"></img>
                </td>
              )}
              <td>{team.name}</td>
            </Reorder.Item>
          )
          /* return (
            <tr>
              <td>{team.position}</td>
              {team.logo !== undefined && (
                <td>
                  <img src={team.logo} alt="" className="logo"></img>
                </td>
              )}
              <td>{team.name}</td>
            </tr>
          ); */
        )}
      </Reorder.Group>
    );
  };

  return <div id={`${player.name}-predictor-container`}>{renderTable()}</div>;
};

export default Predictor;
