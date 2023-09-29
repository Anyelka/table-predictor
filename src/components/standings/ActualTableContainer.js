import React, { useCallback, useEffect, useState } from "react";
import { getTable } from "../../agent";
import TableContainer from "../TableContainer";
import { getCurrentDate } from "../utils";
import ActualTable from "./ActualTable";
import { get, ref, set, child } from "firebase/database";
import { getTeam } from "../../resources/teams";
import Loader from "../Loader";
import refreshIcon from "../../resources/icons/refresh_1.png";
import { motion } from "framer-motion";

const headerButtonVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    rotate: -360,
    transition: { duration: 0.5 },
  },
};

const ActualTableContainer = ({ actualTable, setActualTable, database }) => {
  const [loading, setLoading] = useState(true);
  const [actualTableUpdated, setActualTableUpdated] = useState();
  const [dateValid, setDateValid] = useState(false);

  const isDateValid = (actualTableUpdated) => {
    if (!actualTableUpdated) {
      return true;
    }
    const [year, month, day] = actualTableUpdated.split("-");
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

  const saveActualTable = (leagueStangings) => {
    const standings = leagueStangings.standings[0];
    const date = getCurrentDate();
    console.log("Actual table loaded at:" + JSON.stringify(date));
    set(ref(database, "actualTable"), {
      standings,
      season: leagueStangings.season,
      updated: date,
    });
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
    const table = await getTable();
    saveActualTable(table);
    loadActualTable();
    setDateValid(false);
  };

  const getRandomIndex = (randomIndexes) => {
    const generatedIndex = Math.floor(Math.random() * (21 - 1) + 0);
    if (randomIndexes.includes(generatedIndex)) {
      return getRandomIndex(randomIndexes);
    } else {
      return generatedIndex;
    }
  };

  const getRandomIndexes = (n) => {
    let randomIndexes = [];
    for (let step = 0; step < n; step++) {
      const randomIndex = getRandomIndex(randomIndexes);
      randomIndexes[step] = randomIndex;
    }
    console.log("random indexes: " + randomIndexes.join(","));
    return randomIndexes;
  };

  const shuffleNRows = (table, rows) => {
    let shuffledTable = [...table];
    const randomIndexes = getRandomIndexes(rows);
    for (let i = 0; i < rows; i++) {
      const currentIndex = randomIndexes[i];
      const nextIndex =
        i === rows - 1 ? randomIndexes[0] : randomIndexes[i + 1];
      shuffledTable[currentIndex] = table[nextIndex];
    }
    return shuffledTable;
  };

  const shuffleTable = () => {
    const shuffledTable = shuffleNRows(actualTable, 5);
    console.log(shuffledTable.map((pos) => pos.position + " - " + pos.name));
    setActualTable(shuffledTable);
  };

  const renderShuffleButton = () => {
    return (
      <div className="table-container-head-button">
        <button className="button" onClick={shuffleTable}>
          <img src={refreshIcon} alt="" className="button-image" />
        </button>
      </div>
    );
  };

  const renderHeaderButton = () => {
    return (
      <motion.div
        className="table-container-head-button"
        variants={headerButtonVariants}
        initial="hidden"
        animate={dateValid ? "show" : "hidden"}
      >
        <button className="button" onClick={refreshActualTable}>
          <img src={refreshIcon} alt="" className="button-image" />
        </button>
      </motion.div>
    );
  };

  useEffect(() => {
    /* refreshActualTable(setActualTable, setActualTableUpdated); */
    /* saveActualTable(DUMMY_TABLE_API_RESPONSE.league); */

    loadActualTable();
    setDateValid(isDateValid(actualTableUpdated));
  }, [loadActualTable, actualTableUpdated]);

  return (
    <TableContainer
      id="actual-table"
      title="2023/24"
      header={renderShuffleButton()}
      table={
        loading ? <Loader /> : <ActualTable id="actual" data={actualTable} />
      }
    />
  );
};

export default ActualTableContainer;
