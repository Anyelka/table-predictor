import axios from "axios";

const PREMIER_LEAGUE_ID = "39";

const options = {
  method: "GET",
  url: "https://api-football-v1.p.rapidapi.com/v3/standings",
  params: {
    season: "2023",
    league: PREMIER_LEAGUE_ID,
  },
  headers: {
    "X-RapidAPI-Key": "9b97d008b7mshb2e0c1057fb5f1bp1f7da7jsn3f673ee8aebf",
    "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
  },
};

export const getTable = async () => {
  let result;
  try {
    result = await axios.request(options);
    console.log(result.data);
  } catch (error) {
    console.error(error);
  }
  return mapResponse(result);
};

const mapResponse = (result) => {
  console.log("result: " + JSON.stringify(result.data.response[0].league));
  return result.data.response[0].league;
};
