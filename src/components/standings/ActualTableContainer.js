import React, { useEffect, useState } from "react";
import { getTable } from "../../agent";
import TableContainer from "../TableContainer";
import { getCurrentDate } from "../utils";
import ActualTable from "./ActualTable";
import { get, ref, set, child } from "firebase/database";
import { getTeam } from "../../resources/teams";
import Loader from "../Loader";

const ActualTableContainer = ({ actualTable, setActualTable, database }) => {
  const [loading, setLoading] = useState(true);
  const [actualTableUpdated, setActualTableUpdated] = useState();

  const checkIfDateIsValid = () => {
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

  const setCurrentTable = (data) => {
    const currentTable = data.map((entry) => {
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
    setActualTable(currentTable);
  };

  const saveActualTable = (leagueStangings) => {
    const standings = leagueStangings.standings[0];
    const date = getCurrentDate();
    console.log("current Date: " + JSON.stringify(date));
    set(ref(database, "actualTable"), {
      standings,
      season: leagueStangings.season,
      updated: date,
    });
  };

  const loadActualTable = () => {
    const dbRef = ref(database);
    get(child(dbRef, `actualTable`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setCurrentTable(data.standings);
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
  };

  const refreshActualTable = async () => {
    const table = await getTable();
    saveActualTable(table);
    loadActualTable();
  };

  useEffect(() => {
    /* refreshActualTable(setActualTable, setActualTableUpdated); */
    /* saveActualTable(DUMMY_TABLE_API_RESPONSE.league); */

    loadActualTable();
  }, []);

  return (
    <TableContainer
      id="actual-table"
      title="2023/24"
      showHeaderButton={checkIfDateIsValid()}
      headerButtonAction={refreshActualTable}
      table={
        loading ? <Loader /> : <ActualTable id="actual" data={actualTable} />
      }
    />
  );
};

export default ActualTableContainer;
