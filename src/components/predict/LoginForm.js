import { motion, useAnimation } from "framer-motion";
import { useState } from "react";
import rightArrowDoubleIcon from "../../resources/icons/right-arrow-double.png";

const loginButtonVariants = {
  initial: {},
  animateHover: { backgroundColor: "#00ff88" },
};

const loginButtonImageVariants = {
  initial: {},
  animateHover: {
    filter:
      "invert(8%) sepia(51%) saturate(3677%) hue-rotate(280deg) brightness(103%) contrast(114%)",
  },
};

const invalidPasswordInputVariant = {
  border: "1px solid red",
  color: "red",
  x: [0, 5, 0, -5, 0, 5, 0, -5, 0, 5, 0, -5, 0],
  transition: {
    duration: 0.5,
  },
};

const defaultPasswordInputVariant = {
  border: "0px",
  color: "#00ff88",
};

const LoginForm = ({ player, openPredictor }) => {
  const [password, setPassword] = useState("");

  const passwordInputControls = useAnimation();

  const handleLoginButton = (event, player) => {
    event.preventDefault();
    if (password === player.password) {
      openPredictor(player);
    } else {
      animateInvalidPassword(player);
    }
  };

  const animateInvalidPassword = (player) => {
    passwordInputControls.start(invalidPasswordInputVariant);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    passwordInputControls.start(defaultPasswordInputVariant);
  };

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
        variants={loginButtonVariants}
        whileHover="animateHover"
        type="submit"
      >
        <motion.img
          src={rightArrowDoubleIcon}
          alt=""
          class="player-login-button-image"
          variants={loginButtonImageVariants}
        />
      </motion.button>
    </motion.form>
  );
};

export default LoginForm;
