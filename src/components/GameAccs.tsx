import React from "react";

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

const GameAccsData: GameGroup[] = [
  {
    gameTitle: "League of Legends",
    accounts: [
      { name: "Endfield Pixie", tag: "FLUX", region: "EUNE - will transfer to EUW" },
      { name: "iota", tag: "weiii", region: "EUW" },
    ],
  },
  {
    gameTitle: "Valorant",
    accounts: [
      { name: "Endfield Pixie", tag: "FLUX"},
      { name: "iota", tag: "weiii" },
    ],
  },
  {
    gameTitle: "Dead by Daylight",
    accounts: [
      { name: "vorlieFUepi6", tag: "eaad", platform: "Epic Games" },
    ],
  },
];

const GameAccs: React.FC = () => {
  return (
    <div className="">
      <h2 className="text-2xl font-bold text-m3-on-surface tracking-tight">Game Accounts</h2>
      <p className="text-m3-on-surface-variant mb-4">Here are my accounts for various games, if you're interested in playing with me!</p>
      <div className="space-y-6 w-full max-w-md">
        {GameAccsData.map((group) => (
          <div key={group.gameTitle} className="bg-m3-on-secondary/50 backdrop-blur-sm p-4 px-6 rounded-[24px] shadow-lg">
            <h2 className="text-xl font-semibold text-m3-secondary mb-2">
              {group.gameTitle}
            </h2>
            <ul className="space-y-1">
              {group.accounts.map((acc, index) => (
                <li key={`${group.gameTitle}-${index}`} className="text-m3-on-surface">
                  <span className="font-medium">{acc.name}</span>
                  {acc.tag && <span className="text-m3-on-surface-variant ml-1">#{acc.tag}</span>}
                  {acc.region && <span className="text-m3-primary ml-2">({acc.region})</span>}
                  {acc.platform && <span className="text-m3-primary ml-2">[{acc.platform}]</span>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameAccs;
