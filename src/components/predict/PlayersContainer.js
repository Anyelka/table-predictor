import { child, get, ref } from "firebase/database";
import { Reorder, motion, useAnimation } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { uppercaseInitials } from "../../utils";
import rightArrowIcon from "../../resources/icons/right-arrow-thick.png";
import rightArrowDoubleIcon from "../../resources/icons/right-arrow-double.png";
import Predictor from "./Predictor";

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

const playerLoginButtonVariants = {
  initial: {},
  animateHover: { backgroundColor: "#00ff88" },
};

const playerLoginButtonImageVariants = {
  initial: {},
  animateHover: {
    filter:
      "invert(8%) sepia(51%) saturate(3677%) hue-rotate(280deg) brightness(103%) contrast(114%)",
  },
};

const PlayersContainer = ({ database, season }) => {
  const [predictions, setPredictions] = useState([]);
  const [players, setPlayers] = useState([]);
  const [playerOpen, setPlayerOpen] = useState({ player: null, open: null });
  const [password, setPassword] = useState("");

  const passwordInputControls = useAnimation();

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
    setPassword("");
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

  /* const hasPredictions = (player) => {
    return predictions[player.name] && predictions[player.name].length > 0;
  }; */

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    passwordInputControls.start({
      border: "0px",
      color: "#00ff88",
    });
  };

  const handleLoginButton = (event, player) => {
    event.preventDefault();
    if (password === player.password) {
      openPredictor(player);
    } else {
      animateInvalidPassword(player);
    }
  };

  const animateInvalidPassword = (player) => {
    passwordInputControls.start({
      border: "1px solid red",
      color: "red",
      x: [0, 5, 0, -5, 0, 5, 0, -5, 0, 5, 0, -5, 0],
      transition: {
        duration: 0.5,
      },
    });
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

  const loadPlayerPredictions = useCallback(
    async (player) => {
      const playerPredictions = await fetchPlayerPredictions(player);
      setPredictions(playerPredictions);
    },
    [fetchPlayerPredictions]
  );

  /* const loadPredictions = useCallback(async () => {
    players.forEach(async (player) => {
      const playerPredictions = await fetchPlayerPredictions(player);
      setPredictions({ ...predictions, [player.name]: playerPredictions });
    });
  }, [predictions, players, fetchPlayerPredictions]); */

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

  const renderLoginForm = (player) => {
    return (
      <motion.form
        onSubmit={(event) => handleLoginButton(event, player)}
        class="player-login-form"
      >
        <motion.input
          class="player-password-input"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          initial={{
            border: "none",
            color: "#00ff88",
            backgroundColor: "#37003c",
          }}
          animate={passwordInputControls}
        />
        <motion.button
          class="player-login-button"
          variants={playerLoginButtonVariants}
          whileHover="animateHover"
          type="submit"
        >
          <motion.img
            src={rightArrowDoubleIcon}
            alt=""
            class="player-login-button-image"
            variants={playerLoginButtonImageVariants}
          />
        </motion.button>
      </motion.form>
    );
  };

  const renderPredictor = (player) => {
    return (
      <Predictor
        player={player}
        database={database}
        predictions={predictions}
        setPredictions={setPredictions}
      />
    );
  };

  const renderPlayer = (player) => {
    const isPlayerOpen = isOpen(player);

    const isOtherPlayerOpen = playerOpen.player && !isPlayerOpen;
    return (
      !isOtherPlayerOpen && (
        <>
          {renderPlayerName(player)}
          {isLoginOpen(player) && renderLoginForm(player)}
          {isPredictorOpen(player) && renderPredictor(player)}
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
        /* style={{ transform: "none" }} */
        layout
      >
        {players.map((player) => renderPlayer(player))}
      </motion.div>
    )
  );
};

export default PlayersContainer;
