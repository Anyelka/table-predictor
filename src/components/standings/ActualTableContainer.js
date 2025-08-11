import { child, get, ref, set } from "firebase/database";
import { motion, useAnimation } from "framer-motion";
import React, { useCallback, useEffect, useState } from "react";
import { getTable } from "../../agent";
import refreshIcon from "../../resources/icons/refresh_1.png";
import {
  convertToTable,
  formatYearToSeason,
  getCurrentDate /* ,shuffleNRows */,
} from "../../utils";
import Loader from "../Loader";
import ActualTable from "./ActualTable";
import TableContainer from "./TableContainer";
/* import { DUMMY_TABLE_API_RESPONSE } from "../../resources/dummyData"; */

const ActualTableContainer = ({
  season,
  actualTable,
  setActualTable,
  database,
}) => {
  const [loading, setLoading] = useState(true);
  const [actualTableUpdated, setActualTableUpdated] = useState();
  const [dateValid, setDateValid] = useState(false);

  const [animationKey, setAnimationKey] = useState(0);

  const restartAnimation = () => {
    setAnimationKey((prev) => prev + 1);
  };

  const headerButtonControls = useAnimation();

  const isDateValid = (actualDate) => {
    if (!actualDate) {
      return false;
    }
    const [year, month, day] = actualDate.split("-");
    let updatedDate = new Date(+year, month - 1, day);
    updatedDate.setHours(0, 0, 0, 0);
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    return updatedDate < currentDate;
  };

  const saveActualTable = useCallback(
    (leagueStangings, updated) => {
      const standings = leagueStangings.standings[0];
      const tableToSave = {
        standings,
        season,
        updated,
      };
      set(ref(database, `actualTable/${season.year}`), tableToSave);
    },
    [season, database]
  );

  const refreshTable = useCallback(async () => {
    const table = await getTable(season.year);
    const currentDate = getCurrentDate();
    saveActualTable(table, currentDate);
    /* setActualTableUpdated(); */
    restartAnimation();
  }, [saveActualTable, season]);

  const loadActualTable = useCallback(() => {
    const dbRef = ref(database);
    get(child(dbRef, `actualTable/${season.year}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const currentTable = convertToTable(data);
          setActualTable(currentTable);
          setActualTableUpdated(data.updated);
        } else {
          console.error("No data available");
          /* refreshTable(); */
        }
      })
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [season, database, setActualTable, setActualTableUpdated]);

  const refreshActualTable = async () => {
    headerButtonControls.start({
      rotate: 360,
      transition: {
        duration: 0.5,
        ease: "linear",
      },
    });
    refreshTable();
    setDateValid(false);
    restartAnimation();
  };

  /* const renderShuffleButton = () => {
    return (
      <div className="table-container-head-button">
        <button
          className="button"
          onClick={() => {
            const shuffledTable = shuffleNRows(actualTable, 2);
            setActualTable(shuffledTable);
          }}
        >
          <img src={refreshIcon} alt="" className="button-image" />
        </button>
      </div>
    );
  }; */

  const toggleHeaderButtonVisibility = useCallback(() => {
    headerButtonControls.start({
      opacity: dateValid && season.isCurrent && season.isUnderway ? 1 : 0,
    });
  }, [season, dateValid, headerButtonControls]);

  const renderHeaderButton = () => {
    return (
      <motion.div
        className="table-container-head-button"
        whileHover={{ scale: 1.2 }}
        initial={{ opacity: 1 }}
        animate={headerButtonControls}
      >
        <button
          className="refresh-button"
          onClick={refreshActualTable}
          disabled={!dateValid}
        >
          <img
            src={refreshIcon}
            alt=""
            className="refresh-button-image"
            style={!dateValid ? { cursor: "default" } : {}}
          />
        </button>
      </motion.div>
    );
  };

  useEffect(() => {
    /* refreshTable(); */
    loadActualTable();
    restartAnimation();
  }, [season, loadActualTable]);

  useEffect(() => {
    setDateValid(isDateValid(actualTableUpdated));
  }, [actualTableUpdated]);

  useEffect(() => {
    toggleHeaderButtonVisibility();
  }, [toggleHeaderButtonVisibility, dateValid]);

  return (
    <TableContainer
      id="actual-table"
      title={formatYearToSeason(season.year)}
      header={renderHeaderButton()}
      animationKey={animationKey}
      table={
        loading ? (
          <Loader />
        ) : (
          <ActualTable
            id="actual"
            data={actualTable}
            onReorder={setActualTable}
          />
        )
      }
    />
  );
};

export default ActualTableContainer;
