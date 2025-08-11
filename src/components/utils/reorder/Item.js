import { Reorder, useMotionValue } from "framer-motion";
import * as React from "react";
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
    if (index <= 5) {
      return "#ffffff";
    }
    if (index <= 6 || index <= 7) {
      return "#000000";
    }
    return "";
  };

  const backgroundColor = () => {
    if (index === 1) {
      return background("#fbff00");
    }
    if (index <= 5) {
      return background("#102de6");
    }
    if (index <= 6) {
      return background("#ff6900");
    }
    if (index <= 7) {
      return background("#00be14");
    }
    if (index >= 18) {
      return background("#a3001e");
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
        color: fontColor(),
        background: backgroundColor(),
      }}
      whileDrag={{ scale: 1.1 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.5 } }}
      as="tr"
      className="reorder-table-row"
      layout
    >
      <td>{index}</td>
      <td>
        <img src={logo} alt="" className="logo"></img>
      </td>
      <td>{item}</td>
    </Reorder.Item>
  );
};
