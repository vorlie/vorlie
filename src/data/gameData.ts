interface GameAccount {
  name: string;
  tag?: string;
  region?: string;
  accLink?: string;
  platform?: string;
}

interface GameGroup {
  gameTitle: string;
  accounts: GameAccount[];
}

export const GameAccsData: GameGroup[] = [
  {
    gameTitle: "League of Legends",
    accounts: [{ name: "Hoof or Paw", tag: "uwu", region: "EUW" }],
  },
  {
    gameTitle: "Dead by Daylight",
    accounts: [{ name: "vorlieFUepi6", tag: "eaad", platform: "Epic Games" }],
  },
  {
    gameTitle: "Wargaming (WoT, WoTB)",
    accounts: [{ name: "__Evernight__", region: "EU" }],
  },
    {
    gameTitle: "Xbox",
    accounts: [{ name: "Mispiry"}],
  },
  {
    gameTitle: "Minecraft",
    accounts: [{ name: "vorlie", platform: "Java" }, { name: "Mispiry", platform: "Bedrock" }],
  },
    {
    gameTitle: "Hytale",
    accounts: [{ name: "vorlie" }],
  },
];
