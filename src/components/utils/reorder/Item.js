import * as React from "react";
import { useMotionValue, Reorder } from "framer-motion";
import { useRaisedShadow } from "./use-raised-shadow";

const background = (color) => {
  return `linear-gradient(to right, transparent 0%, ${color} 15%, ${color} 85%, transparent 100%)`;
};

export const Item = ({ item, index, logo }) => {
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);

  const fontColor = () => {
    if (index === 1) {
      return "#37003c";
    }
    return "";
  };

  const backgroundColor = () => {
    if (index === 1) {
      return background("#fbff00");
    }
    if (index <= 4) {
      return background("#7f3985");
    }
    if (index === 5) {
      return background("#7367ff");
    }
    if (index >= 18) {
      return background("#ba034f");
    }
    return "";
  };

  return (
    <Reorder.Item
      value={item}
      id={item}
      style={{
        boxShadow,
        y,
      }}
      whileDrag={{ scale: 1.1 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.5 } }}
      className="reorder-table-row"
      layout
    >
      <div
        style={{
          color: fontColor(),
          background: backgroundColor(),
        }}
      >
        {index} <img src={logo} alt="" className="logo"></img> {item}
      </div>
    </Reorder.Item>
  );
};
