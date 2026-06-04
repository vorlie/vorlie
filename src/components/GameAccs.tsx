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
    accounts: [{ name: "Hoof or Paw", tag: "uwu", region: "EUW" }],
  },
  {
    gameTitle: "Dead by Daylight",
    accounts: [{ name: "vorlieFUepi6", tag: "eaad", platform: "Epic Games" }],
  },
  {
    gameTitle: "Xbox",
    accounts: [{ name: "Mispiry"}],
  },
  {
    gameTitle: "Wargaming (WoT, WoTB)",
    accounts: [{ name: "__Evernight__", region: "EU" }],
  },
];

const GameAccs: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-xl font-bold text-m3-on-surface tracking-tight">
          My gaming usernames
        </h2>
        <p className="text-sm text-m3-on-surface-variant leading-relaxed">
          These are my main gaming handles - feel free to add me or drop a
          message if you want to queue up.
        </p>
      </div>

      <div className="grid gap-3 grid-cols-1 lg:grid-cols-2">
        {GameAccsData.map((group) => (
          <div
            key={group.gameTitle}
            className="rounded-none border border-m3-outline/10 bg-m3-surface-container p-3 sm:p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] border-t-white/20 border-l-white/20 border-b-black/40 border-r-black/40"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-m3-on-surface tracking-tight leading-snug">
                {group.gameTitle}
              </h3>
            </div>
            <ul className="mt-4 space-y-2">
              {group.accounts.map((acc, index) => (
                <li
                  key={`${group.gameTitle}-${index}`}
                  className="rounded-none"
                >
                  <div className="flex flex-wrap items-center gap-2 text-m3-on-surface">
                    <span className="font-semibold">{acc.name}</span>
                    {acc.tag && (
                      <span className="rounded-none bg-m3-primary/10 px-2 py-0.5 text-xs font-bold text-m3-primary inline-block">
                        #{acc.tag}
                      </span>
                    )}
                    {acc.region && (
                      <span className="text-xs text-m3-on-surface-variant">
                        {acc.region}
                      </span>
                    )}
                    {acc.platform && (
                      <span className="rounded-none bg-m3-surface-variant/70 px-2 py-0.5 text-xs text-m3-on-surface inline-block">
                        {acc.platform}
                      </span>
                    )}
                  </div>
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
