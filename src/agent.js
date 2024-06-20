import axios from "axios";

const PREMIER_LEAGUE_ID = "39";

const getStandingsOptions = (season) => {
  return {
    method: "GET",
    url: "https://api-football-v1.p.rapidapi.com/v3/standings",
    params: {
      season: parseInt(season).toString(),
      league: PREMIER_LEAGUE_ID,
    },
    headers: {
      "X-RapidAPI-Key": "9b97d008b7mshb2e0c1057fb5f1bp1f7da7jsn3f673ee8aebf",
      "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
    },
  };
};

const getSeasonsOptions = () => {
  return {
    method: "GET",
    url: "https://api-football-v1.p.rapidapi.com/v3/leagues",
    params: {
      id: PREMIER_LEAGUE_ID,
    },
    headers: {
      "X-RapidAPI-Key": "9b97d008b7mshb2e0c1057fb5f1bp1f7da7jsn3f673ee8aebf",
      "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
    },
  };
};

export const getSeasons = async () => {
  let result;
  try {
    result = await axios.request(getSeasonsOptions());
  } catch (error) {
    console.error(error);
  }
  return mapSeasonsResponse(result);
};

export const getTable = async (season) => {
  let result;
  try {
    result = await axios.request(getStandingsOptions(season));
  } catch (error) {
    console.error(error);
  }
  return mapStandingsResponse(result);
};

const mapSeasonsResponse = (result) => {
  return result.data.response[0].seasons;
};

const mapStandingsResponse = (result) => {
  return result.data.response[0].league;
};
