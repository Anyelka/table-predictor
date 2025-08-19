import { getTeam } from "./resources/teams";

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

export const formatYearToSeasonShort = (year) => {
  const nextYear = Number(year) + 1;
  return year.toString().slice(2) + "/" + nextYear.toString().slice(2);
};

export const getYearShort = (year) => {
  return year.toString().slice(2);
};

export const getNextYearShort = (year) => {
  const nextYear = Number(year) + 1;
  return nextYear.toString().slice(2);
};

export const formatYearToSeason = (year) => {
  const nextYear = Number(year) + 1;
  return year.toString() + "/" + nextYear.toString().slice(2);
};

export const isCurrentSeason = (year) => {
  let currentDate = new Date();
  let maxDate = new Date(year + 1, 6, 15);
  let minDate = new Date(year, 6, 15);
  return isDateBetween(currentDate, minDate, maxDate);
};

export const isUpcomingSeason = (year) => {
  let currentDate = new Date();
  let minDate = new Date(year, 6, 15);
  let maxDate = new Date(year, 8, 15);
  return isDateBetween(currentDate, minDate, maxDate);
};

export const convertToTable = (data) => {
  return data.standings.map((entry) => {
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
};

export const isSeasonUnderway = (start, end) => {
  let currentDate = new Date();
  return isDateBetween(currentDate, new Date(start), new Date(end));
};

export const uppercaseInitials = (title) => {
  return title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();
};

const isDateBetween = (date, start, end) => {
  return date >= start && date < end;
};
