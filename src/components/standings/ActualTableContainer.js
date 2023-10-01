import React, { useCallback, useEffect, useState } from "react";
import { getTable } from "../../agent";
import TableContainer from "../TableContainer";
import { getCurrentDate /* ,shuffleNRows */ } from "../utils";
import ActualTable from "./ActualTable";
import { get, ref, set, child } from "firebase/database";
import { getTeam } from "../../resources/teams";
import Loader from "../Loader";
import refreshIcon from "../../resources/icons/refresh_1.png";
import { motion, useAnimation } from "framer-motion";
/* import { DUMMY_TABLE_API_RESPONSE } from "../../resources/dummyData"; */

const ActualTableContainer = ({ actualTable, setActualTable, database }) => {
  const [loading, setLoading] = useState(true);
  const [actualTableUpdated, setActualTableUpdated] = useState();
  const [dateValid, setDateValid] = useState(false);

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

  const convertToTable = (data) => {
    return data.standings.map((entry) => {
      const team = entry.team;
      const teamName = getTeam(team.name);
      return {
        position: entry.rank,
        logo: team.logo,
        name: teamName.basic,
        played: entry.all.played,
        points: entry.points,
      };
    });
  };

  const saveActualTable = (leagueStangings, updated) => {
    const standings = leagueStangings.standings[0];
    const tableToSave = {
      standings,
      season: leagueStangings.season,
      updated,
    };
    set(ref(database, "actualTable"), tableToSave);
  };

  const loadActualTable = useCallback(() => {
    const dbRef = ref(database);
    get(child(dbRef, `actualTable`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const currentTable = convertToTable(data);
          setActualTable(currentTable);
          setActualTableUpdated(data.updated);
        } else {
          console.log("No data available");
        }
      })
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [database, setActualTable, setActualTableUpdated]);

  const refreshActualTable = async () => {
    headerButtonControls.start({
      rotate: 360,
      transition: {
        duration: 0.5,
        ease: "linear",
      },
    });
    const table = await getTable();
    const currentDate = getCurrentDate();
    saveActualTable(table, currentDate);
    loadActualTable();
    setDateValid(false);
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

  const renderHeaderButton = () => {
    return (
      <motion.div
        className="table-container-head-button"
        whileHover={{ scale: 1.2 }}
        animate={headerButtonControls}
      >
        <button
          className="button"
          onClick={refreshActualTable}
          disabled={!dateValid}
        >
          <img src={refreshIcon} alt="" className="button-image" />
        </button>
      </motion.div>
    );
  };

  useEffect(() => {
    /* refreshActualTable(setActualTable, setActualTableUpdated); */
    /* saveActualTable(DUMMY_TABLE_API_RESPONSE.league, "2023-08-17"); */

    loadActualTable();
  }, [loadActualTable]);

  useEffect(() => {
    setDateValid(isDateValid(actualTableUpdated));
  }, [actualTableUpdated]);

  useEffect(() => {
    headerButtonControls.start({ opacity: dateValid ? 1 : 0 });
  }, [dateValid, headerButtonControls]);

  return (
    <TableContainer
      id="actual-table"
      title="2023/24"
      header={renderHeaderButton()}
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
