import React from "react";
import { Reorder, motion } from "framer-motion";

const ActualTable = ({ id, data, onReorder }) => {
  return (
    <Reorder.Group
      as="table"
      id={id}
      className="table"
      values={data}
      onReorder={onReorder}
    >
      <tbody>
        {data.map((team, index) => {
          return (
            <Reorder.Item
              as="tr"
              key={team.name}
              value={team}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.25, delay: index * 0.025 }}
              animate={{ opacity: 1 }}

              /* {...row.getRowProps()} */
            >
              <td>{team.position}</td>
              {team.logo !== undefined && (
                <motion.td transition={{ duration: 0.25 }} layout>
                  <img src={team.logo} alt="" className="logo"></img>
                </motion.td>
              )}
              <td>{team.name}</td>
              <td>
                {team.played !== undefined && (
                  <div style={{ textAlign: "left", marginRight: "20px" }}>
                    {team.played}
                  </div>
                )}
              </td>
              <td>
                <div style={{ textAlign: "right" }}>{team.points}</div>
              </td>
            </Reorder.Item>
          );
        })}
      </tbody>
    </Reorder.Group>
  );
};
export default ActualTable;
