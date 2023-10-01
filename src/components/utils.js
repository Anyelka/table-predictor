export const getCurrentDate = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
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
  return randomIndexes;
};

export const shuffleNRows = (table, rows) => {
  let shuffledTable = [...table];
  const randomIndexes = getRandomIndexes(rows);
  for (let i = 0; i < rows; i++) {
    const currentIndex = randomIndexes[i];
    const nextIndex = i === rows - 1 ? randomIndexes[0] : randomIndexes[i + 1];
    const nextTeam = table[nextIndex];
    shuffledTable[currentIndex] = { ...nextTeam, position: currentIndex + 1 };
  }
  return shuffledTable;
};
