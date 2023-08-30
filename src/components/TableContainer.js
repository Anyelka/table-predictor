import Table from "./Table";
import upArrow from "../resources/icons/up-arrow.png";
import upArrowDouble from "../resources/icons/up-arrow-double.png";
import downArrow from "../resources/icons/down-arrow.png";
import downArrowDouble from "../resources/icons/down-arrow-double.png";

import React, { useMemo } from "react";

const getArrowIcon = (position) => {
  if (position > 0 && position <= 5) {
    return (
      <img src={upArrow} className="arrow" width={20} height={20} alt="" />
    );
  }
  if (position > 5) {
    return (
      <img
        src={upArrowDouble}
        className="arrow"
        width={20}
        height={20}
        alt=""
      />
    );
  }
  if (position < 0 && position >= -5) {
    return (
      <img src={downArrow} className="arrow" width={20} height={20} alt="" />
    );
  }
  if (position < -5) {
    return (
      <img
        src={downArrowDouble}
        className="arrow"
        width={20}
        height={20}
        alt=""
      />
    );
  }
};

const getPositionPrefix = (position) => {
  return position === 0 ? "" : getArrowIcon(position);
};

const TableContainer = ({ id, title, data }) => {
  const columns = useMemo(
    () => [
      {
        Header: "",
        accessor: "position",
      },
      {
        Header: "",
        accessor: "name",
      },
      {
        Header: "",
        accessor: "played",
        Cell: (row) =>
          row.value !== undefined && (
            <div style={{ textAlign: "left", marginRight: "20px" }}>
              {row.value}
            </div>
          ),
      },
      {
        Header: "",
        accessor: "change",
        Cell: (row) =>
          row.value !== undefined &&
          row.value !== 0 && (
            <div style={{ textAlign: "center", marginRight: "20px" }}>
              {getPositionPrefix(row.value)}
              {Math.abs(row.value)}
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
    <div id={`${id}-table-container`} className="table-container">
      <div className="table-container-head">
        <h1>{title}</h1>
      </div>
      <div className="table-container-body">
        <Table
          id={`${id}-table`}
          className="table"
          columns={columns}
          data={data}
        />
      </div>
    </div>
  );
};

export default TableContainer;
