import Table from "./Table";
import React, { useMemo } from "react";
import upArrow from "../../resources/icons/up-arrow.png";
import upArrowDouble from "../../resources/icons/up-arrow-double.png";
import downArrow from "../../resources/icons/down-arrow.png";
import downArrowDouble from "../../resources/icons/down-arrow-double.png";

const getArrowIcon = (position) => {
  if (position > 0 && position <= 5) {
    return <img src={upArrow} className="arrow" alt="" />;
  }
  if (position > 5) {
    return <img src={upArrowDouble} className="arrow" alt="" />;
  }
  if (position < 0 && position >= -5) {
    return <img src={downArrow} className="arrow" alt="" />;
  }
  if (position < -5) {
    return <img src={downArrowDouble} className="arrow" alt="" />;
  }
};

const getPositionPrefix = (position) => {
  return position === 0 ? "" : getArrowIcon(position);
};

const PredictionTable = ({ id, predictions }) => {
  const columns = useMemo(
    () => [
      {
        Header: "",
        accessor: "position",
      },
      {
        Header: "",
        accessor: "logo",
        Cell: (row) =>
          row.value !== undefined && (
            <img src={row.value} alt="" className="logo"></img>
          ),
      },
      {
        Header: "",
        accessor: "name",
      },
      {
        Header: "",
        accessor: "change",
        Cell: (row) =>
          row.value !== undefined &&
          row.value !== 0 && (
            <div
              style={{
                display: "flex",
                textAlign: "center",
                marginRight: "20px",
              }}
            >
              {getPositionPrefix(row.value)}
              <div>{Math.abs(row.value)}</div>
            </div>
          ),
      },
      {
        Header: "",
        accessor: "points",
        Cell: (row) => <div style={{ textAlign: "right" }}>{row.value}</div>,
      },
    ],
    []
  );

  return (
    <Table
      id={`${id}-table`}
      className="table"
      columns={columns}
      data={predictions}
    />
  );
};

export default PredictionTable;
