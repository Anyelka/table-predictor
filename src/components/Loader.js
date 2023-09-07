/* import FadeLoader from "react-spinners/FadeLoader"; */
import MoonLoader from "react-spinners/MoonLoader";

import React from "react";

const NEON_GREEN = "#00ff88";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

/* const renderFadeLoader = (size = 5) => {
  const height = size * 16;
  const width = size * 2;
  const radius = size;
  const margin = size * 16;
  return (
    <FadeLoader
      loading={true}
      color={NEON_GREEN}
      height={height}
      width={width}
      radius={radius}
      margin={margin}
      speedMultiplier={3}
      cssOverride={override}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
}; */

const renderMoonLoader = (size = 100) => {
  return (
    <MoonLoader
      loading={true}
      color={NEON_GREEN}
      size={size}
      speedMultiplier={1.2}
      cssOverride={override}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

const Loader = ({ size }) => {
  /* return renderFadeLoader(size); */
  return renderMoonLoader(size);
};

export default Loader;
