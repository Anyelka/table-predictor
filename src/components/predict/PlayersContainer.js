import { child, get, ref, set } from "firebase/database";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { uppercaseInitials } from "../../utils";
import rightArrowIcon from "../../resources/icons/right-arrow-thick.png";
import Predictor from "./Predictor";
import LoginForm from "./LoginForm";
import debounce from "lodash.debounce";

const playerButtonVariants = {
  initial: { scale: 1, color: "#ff2882" },
  animateHover: { scale: 1.2 },
  animateOpen: { scale: 1.2, color: "#37003c", x: 20 },
};

const playerButtonArrowVariants = {
  initial: { scale: 0 },
  animateHover: { scale: 1 },
  animateOpen: {
    scale: 1.2,
    rotateY: 180,
    x: "-140px",
    filter:
      "invert(8%) sepia(51%) saturate(3677%) hue-rotate(280deg) brightness(103%) contrast(114%)",
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

  const fetchPlayerPredictions = useCallback(
    async (player) => {
      const dbRef = ref(database);
      const snapshot = await get(
        child(dbRef, `predictions/${season.year}/${player.name}`)
      );
      if (snapshot.exists()) {
        const data = snapshot.val();
        return data;
      } else {
        const snapshot2 = await get(
          child(dbRef, `actualTable/${season.year - 1}`)
        );
        if (snapshot2.exists()) {
          const data = snapshot2.val();
          const teams = data.standings.map((place) => {
            return {
              position: place.rank,
              name: place.team.name,
              logo: place.team.logo,
            };
          });
          return teams;
        } else {
          console.error(
            "No data available for predictions of player: " + player.name
          );
        }
      }
    },
    [database, season.year]
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

  const handleSavePredictions = (newTeamOrder, player) => {
    const newPredictions = newTeamOrder.map((team) =>
      predictions.find((prediction) => prediction.name === team)
    );
    setPredictions(newPredictions);
    savePlayerPredictions(newPredictions, player);

    setShowToastMessage(true);
    scheduleHideToastMessage();
  };

  const scheduleHideToastMessage = debounce(
    () => setShowToastMessage(false),
    5000
  );

  useEffect(() => {
    loadPlayers();
    /* loadPredictions(); */
  }, [loadPlayers]);

  const renderPlayerName = (player) => {
    return (
      <motion.button
        id={`${player.name}-player-button`}
        class="player-button"
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
        <>
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
        </>
      )
    );
  };

  return (
    players &&
    players.length > 0 && (
      <motion.div
        className={`players-container`}
        animate={
          playerOpen.player
            ? { background: "#ff2882" }
            : { background: "#37003c" }
        }
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
    )
  );
};

export default PlayersContainer;
