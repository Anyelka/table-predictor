import ReorderGroup from "../utils/reorder/ReorderGroup";

const Predictor = ({ predictions, setPredictions }) => {
  const initialValues = predictions.map((prediction) => prediction.name);
  const logos = {};
  predictions.forEach((prediction) => {
    logos[prediction.name] = prediction.logo;
  });
  return (
    <ReorderGroup
      initialValues={initialValues}
      logos={logos}
      setPredictions={setPredictions}
    />
  );
};

export default Predictor;
