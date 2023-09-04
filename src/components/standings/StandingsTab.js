import React, { useEffect, useState } from "react";
import TableContainer from "../TableContainer";
import { get, ref, set, child } from "firebase/database";
import PredictionTable from "./PredictionTable";
import ActualTalbe from "./ActualTable";
import { getTeam } from "../../resources/teams";
import { getTable } from "../../agent";
import { getCurrentDate } from "../utils";

const StandingsTab = ({ database }) => {
  const [actualTable, setActualTable] = useState([]);
  const [actualTableUpdated, setActualTableUpdated] = useState();
  const [zsoltiPredictions, setZsoltiPredictions] = useState([]);
  const [marciPredictions, setMarciPredictions] = useState([]);

  const checkIfDateIsValid = () => {
    if (!actualTableUpdated) {
      return true;
    }
    console.log("actualTableUpdated:" + JSON.stringify(actualTableUpdated));
    const [year, month, day] = actualTableUpdated.split("-");
    let updatedDate = new Date(+year, month - 1, day);
    updatedDate.setHours(0, 0, 0, 0);
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    console.log(
      "Updated date:" +
        JSON.stringify(updatedDate) +
        ", currentDate: " +
        JSON.stringify(currentDate)
    );
    return updatedDate < currentDate;
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

  const loadPredictions = (name, setPredictions) => {
    const dbRef = ref(database);
    get(child(dbRef, `predictions/${name}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          /* console.log(
                "getting predictions from db: name:" +
                  name +
                  ", data:" +
                  JSON.stringify(data.predictions)
              ); */
          setPredictions(data.predictions);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const loadActualTable = () => {
    const dbRef = ref(database);
    get(child(dbRef, `actualTable`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setCurrentTable(data.standings, setActualTable);
          setActualTableUpdated(data.updated);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
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

  const refreshActualTable = async () => {
    const table = await getTable();
    saveActualTable(table);
    loadActualTable();
  };

  useEffect(() => {
    console.log("database: " + JSON.stringify(database));
    /* refreshActualTable(setActualTable, setActualTableUpdated); */
    /* saveActualTable(DUMMY_TABLE_API_RESPONSE.league); */

    loadActualTable();
    loadPredictions("zsolti", setZsoltiPredictions);
    loadPredictions("marci", setMarciPredictions);
  }, []);

  /* const savePredictions = () => {
    const zsoltiPredictions = { name: "zsolti", predictions: ZSOLTI_PREDICTIONS };
    const marciPredictions = { name: "marci", predictions: MARCI_PREDICTIONS };
    set(ref(database, "predictions/zsolti"), zsoltiPredictions);
    set(ref(database, "predictions/marci"), marciPredictions);
  }; */

  return (
    <div className="standings-tab">
      {/* <TableContainer id="previous" title="2022/23" data={PREVIOUS_POSITIONS} /> */}
      <TableContainer
        id="zsolti"
        title="Zsolti"
        table={
          <PredictionTable
            id="zsolti"
            predictions={zsoltiPredictions}
            actualTable={actualTable}
          />
        }
      />
      <TableContainer
        id="marci"
        title="Marci"
        table={
          <PredictionTable
            id="marci"
            predictions={marciPredictions}
            actualTable={actualTable}
          />
        }
      />
      <TableContainer
        id="actual-table"
        title="2023/24"
        showHeaderButton={checkIfDateIsValid(actualTableUpdated)}
        headerButtonAction={() => refreshActualTable(setActualTable)}
        table={<ActualTalbe id="actual" data={actualTable} />}
      />
    </div>
  );
};

export default StandingsTab;
