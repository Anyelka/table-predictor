import { child, get, ref } from "firebase/database";
import { useCallback, useEffect, useState } from "react";
import { convertToTable, formatYearToSeason } from "../../utils";
import ActualTable from "../standings/ActualTable";
import TableContainer from "../standings/TableContainer";

const PreviousTableContainer = ({ database, season }) => {
  const [table, setTable] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTable = useCallback(() => {
    const dbRef = ref(database);
    get(child(dbRef, `actualTable/${season.year - 1}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const table = convertToTable(data);
          setTable(table);
        } else {
          console.error("No data available");
        }
      })
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [season, database]);

  useEffect(() => {
    loadTable();
  }, [loadTable]);

  return (
    <TableContainer
      id="previous-table"
      title={formatYearToSeason(season.year - 1)}
      table={<ActualTable id="previous" data={table} />}
      style={{ flex: "0.5" }}
    />
  );
};

export default PreviousTableContainer;
