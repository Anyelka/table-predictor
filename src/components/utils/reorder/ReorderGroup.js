/* import "./styles.css"; */
import * as React from "react";
import { useState } from "react";
import { Reorder } from "framer-motion";
import { Item } from "./Item";
import debounce from "lodash.debounce";

export default function ReorderGroup({ initialValues, logos, setPredictions }) {
  const [items, setItems] = useState(initialValues);

  const handleReorder = (newOrder) => {
    setItems(newOrder);
    savePrediction(newOrder);
  };

  const savePrediction = debounce((newOrder) => {
    setPredictions(newOrder);
  }, 5000);

  return (
    <Reorder.Group axis="y" onReorder={handleReorder} values={items} layout>
      {items.map((item, index) => (
        <Item key={item} item={item} index={index + 1} logo={logos[item]} />
      ))}
    </Reorder.Group>
  );
}
