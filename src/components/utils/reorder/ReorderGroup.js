/* import "./styles.css"; */
import * as React from "react";
import { useState } from "react";
import { Reorder } from "framer-motion";
import { Item } from "./Item";

export default function ReorderGroup({ initialValues, logos, setPredictions }) {
  const [items, setItems] = useState(initialValues);
  const [updateTimer, setUpdateTimer] = useState(null);

  const handleReorder = (newOrder) => {
    setItems(newOrder);

    if (updateTimer) {
      clearTimeout(updateTimer);
    }

    const newUpdateTimer = setTimeout(() => {
      console.log("Saving new predictions to database:", newOrder);
      setPredictions(newOrder);
    }, 5000);

    setUpdateTimer(newUpdateTimer);
  };

  return (
    <Reorder.Group
      axis="y"
      onReorder={handleReorder}
      values={items}
      as="table"
      className="table"
      layout
    >
      {items.map((item, index) => (
        <Item key={item} item={item} index={index + 1} logo={logos[item]} />
      ))}
    </Reorder.Group>
  );
}
