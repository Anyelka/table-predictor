import { child, get, ref, set } from "firebase/database";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { getTable } from "../../agent";
import rightArrowIcon from "../../resources/icons/right-arrow-thick.png";
import { getCurrentDate, uppercaseInitials } from "../../utils";
import LoginForm from "./LoginForm";
import Predictor from "./Predictor";

const playerButtonVariants = {
  initial: { scale: 1, color: "#ff2882" },
  animateHover: { scale: 1.1 },
  animateOpen: { scale: 1.1, color: "#37003c", x: 40 },
};

const playerButtonArrowVariants = {
  initial: { scale: 0 },
  animateHover: { scale: 1 },
  animateOpen: {
    scale: 1.05,
    rotateY: 180,
    x: "-15vh",
    filter:
      "invert(8%) sepia(51%) saturate(3677%) hue-rotate(280deg) brightness(103%) contrast(114%)",
  },
};

const playersContainerVariants = {
  initial: { opacity: 0 },
  playerList: {
    opacity: 1,
    background: "#37003c",
    boxShadow: "inset -5px 8px 10px #7f3985",
  },
  playerOpen: {
    opacity: 1,
    background: "#ff2882",
    boxShadow: "inset -10px 10px 10px #e0005e",
  },
};

const PlayersContainer = ({ database, season }) => {
  const [predictions, setPredictions] = useState([]);
  const [players, setPlayers] = useState([]);
  const [playerOpen, setPlayerOpen] = useState({ player: null, open: null });
  const [showToastMessage, setShowToastMessage] = useState(false);

  const openLogin = (player) => {
    setPlayerOpen({ player, open: "login" });
    // To test with quickly opening the predictor:
    /* openPredictor(player); */
  };

  const openPredictor = async (player) => {
    await loadPlayerPredictions(player);
    setPlayerOpen({ player, open: "predictor" });
  };

  const closePlayer = () => {
    setPlayerOpen({ player: null, open: null });
  };

  const toggleLogin = (player) => {
    isOpen(player) ? closePlayer() : openLogin(player);
  };

  const isOpen = (player) => {
    return playerOpen.player === player;
  };

  const isLoginOpen = (player) => {
    return isOpen(player) && playerOpen.open === "login";
  };

  const isPredictorOpen = (player) => {
    return (
      isOpen(player) && playerOpen.open === "predictor" && hasPredictions()
    );
  };

  const hasPredictions = () => {
    return predictions && predictions.length > 0;
  };

  const loadPlayers = useCallback(() => {
    const dbRef = ref(database);
    get(child(dbRef, `players`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setPlayers(Object.values(data));
        } else {
          console.error("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [database]);

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
  }, [saveActualTable, season]);

  const getTableOrElse = useCallback(
    async (otherFunction) => {
      const dbRef = ref(database);
      const snapshot = await get(child(dbRef, `actualTable/${season.year}`));
      if (snapshot.exists()) {
        const data = snapshot.val();
        const teams = data.standings.map((place) => {
          return {
            position: place.rank,
            name: place.team.name,
            logo: place.team.logo,
          };
        });
        return teams;
      } else {
        otherFunction();
      }
    },
    [database, season.year]
  );

  const fetchActualTable = useCallback(
    async (player) => {
      return getTableOrElse(() => {
        refreshTable();
        return getTableOrElse(() =>
          console.error(
            "No data available for predictions of player: " + player.name
          )
        );
      });
    },
    [getTableOrElse, refreshTable]
  );

  const fetchPlayerPredictions = useCallback(
    async (player) => {
      const dbRef = ref(database);
      const snapshot = await get(
        child(dbRef, `predictions/${season.year}/${player.name}`)
      );
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return fetchActualTable(player);
      }
    },
    [database, season.year, fetchActualTable]
  );

  const savePlayerPredictions = useCallback(
    async (predictions, player) => {
      const dbRef = ref(database);
      set(
        child(dbRef, `predictions/${season.year}/${player.name}`),
        predictions
      );
    },
    [database, season.year]
  );

  const loadPlayerPredictions = useCallback(
    async (player) => {
      const playerPredictions = await fetchPlayerPredictions(player);
      setPredictions(playerPredictions);
    },
    [fetchPlayerPredictions]
  );

  /* const loadCurrentActualTable = async () => {
    const table = await getTable(season.year);
    const currentDate = getCurrentDate();
    saveActualTable(table, currentDate);
  }; */

  const handleSavePredictions = (newTeamOrder, player) => {
    const newPredictions = newTeamOrder
      .map((team) => predictions.find((prediction) => prediction.name === team))
      .map((team, index) => ({
        name: team.name,
        position: index + 1,
        logo: team.logo,
      }));
    setPredictions(newPredictions);
    savePlayerPredictions(newPredictions, player);

    setShowToastMessage(true);
    setTimeout(() => setShowToastMessage(false), 2000);
  };

  useEffect(() => {
    loadPlayers();
    /* loadPredictions(); */
  }, [loadPlayers]);

  const renderPlayerName = (player) => {
    return (
      <motion.button
        id={`${player.name}-player-button`}
        className="player-button"
        initial="initial"
        whileHover="animateHover"
        animate={isOpen(player) ? "animateOpen" : "initial"}
        variants={playerButtonVariants}
        onClick={() => toggleLogin(player)}
        layout
      >
        {uppercaseInitials(player.name)}
        <motion.img
          src={rightArrowIcon}
          variants={playerButtonArrowVariants}
          alt=""
          className="open-player-button-image"
        />
      </motion.button>
    );
  };

  const renderPlayer = (player) => {
    const isPlayerOpen = isOpen(player);

    const isOtherPlayerOpen = playerOpen.player && !isPlayerOpen;
    return (
      !isOtherPlayerOpen && (
        <div key={player.name}>
          {renderPlayerName(player)}
          {isLoginOpen(player) && (
            <LoginForm player={player} openPredictor={openPredictor} />
          )}
          {isPredictorOpen(player) && (
            <Predictor
              predictions={predictions}
              setPredictions={(newTeamOrder) =>
                handleSavePredictions(newTeamOrder, player)
              }
            />
          )}
        </div>
      )
    );
  };

  return (
    players &&
    players.length > 0 && (
      <div className="players-container-container">
        <motion.div
          className="players-container"
          initial="initial"
          animate={playerOpen.player ? "playerOpen" : "playerList"}
          variants={playersContainerVariants}
          layout
        >
          {players.map((player) => renderPlayer(player))}

          <AnimatePresence>
            {showToastMessage && (
              <motion.div
                className="toast-message"
                initial={{ x: 300 }}
                animate={{ x: 0 }}
                exit={{ x: 300 }}
              >
                Predictions Saved
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    )
  );
};

export default PlayersContainer;
