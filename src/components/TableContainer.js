import refreshIcon from "../resources/icons/refresh_1.png";

import React from "react";

const TableContainer = ({
  id,
  title,
  showHeaderButton,
  headerButtonAction,
  renderTable,
}) => {
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
      <div className="table-container-body">{renderTable()}</div>
    </div>
  );
};

export default TableContainer;
