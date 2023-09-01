import Table from "./Table";
import upArrow from "../resources/icons/up-arrow.png";
import upArrowDouble from "../resources/icons/up-arrow-double.png";
import downArrow from "../resources/icons/down-arrow.png";
import downArrowDouble from "../resources/icons/down-arrow-double.png";
import refreshIcon from "../resources/icons/refresh_1.png";

import React, { useMemo } from "react";

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

const TableContainer = ({
  id,
  title,
  data,
  showHeaderButton,
  headerButtonAction,
}) => {
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
    <div id={`${id}-table-container`} className="table-container">
      <div className="table-container-head">
        <div className="table-container-head-title">
          <h1>{title}</h1>
        </div>
        {showHeaderButton && headerButtonAction && (
          <div className="table-container-head-button">
            <button className="button" onClick={headerButtonAction}>
              <img src={refreshIcon} alt="" className="button-image" />
            </button>
          </div>
        )}
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
