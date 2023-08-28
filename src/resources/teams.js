export const TEAMS = [
  {
    short: "MCI",
    long: "Manchester City",
    basic: "Man City",
  },
  {
    short: "ARS",
    long: "Arsenal",
    basic: "Arsenal",
  },
  {
    short: "MAN",
    long: "Manchester United",
    basic: "Man Utd",
  },
  {
    short: "NEW",
    long: "Newcastle United",
    basic: "Newcastle",
  },
  {
    short: "LIV",
    long: "Liverpool",
    basic: "Liverpool",
  },
  {
    short: "BRI",
    long: "Brighton",
    basic: "Brighton",
  },
  {
    short: "AVL",
    long: "Aston Villa",
    basic: "Aston Villa",
  },
  {
    short: "TOT",
    long: "Tottenham",
    basic: "Tottenham",
  },
  {
    short: "BRE",
    long: "Brentford",
    basic: "Brentford",
  },
  {
    short: "FUL",
    long: "Fulham",
    basic: "Fulham",
  },
  {
    short: "CRY",
    long: "Crystal Palace",
    basic: "Crystal Palace",
  },
  {
    short: "CHE",
    long: "Chelsea",
    basic: "Chelsea",
  },
  {
    short: "WOL",
    long: "Wolves",
    basic: "Wolves",
  },
  {
    short: "WHU",
    long: "West Ham",
    basic: "West Ham",
  },
  {
    short: "BOU",
    long: "Bournemouth",
    basic: "Bournemouth",
  },
  {
    short: "NFO",
    long: "Nottingham Forest",
    basic: "Nottingham",
  },
  {
    short: "EVE",
    long: "Everton",
    basic: "Everton",
  },
  {
    short: "BUR",
    long: "Burnley",
    basic: "Burnley",
  },
  {
    short: "SHE",
    long: "Sheffield United",
    basic: "Sheffield Utd",
  },
  {
    short: "LUT",
    long: "Luton Town",
    basic: "Luton",
  },
];

export const getTeam = (name) => {
  return TEAMS.find(
    (t) => t.short === name || t.long === name || t.basic === name
  );
};
