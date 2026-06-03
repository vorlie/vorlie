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

      <div className="grid gap-3">
        {GameAccsData.map((group) => (
          <div
            key={group.gameTitle}
            className="rounded-[28px] border border-m3-outline/10 bg-m3-surface-container p-4 shadow-sm"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-m3-on-surface">
                {group.gameTitle}
              </h3>
              <span className="rounded-full bg-m3-primary/10 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-m3-primary">
                active
              </span>
            </div>
            <ul className="mt-4 space-y-2">
              {group.accounts.map((acc, index) => (
                <li
                  key={`${group.gameTitle}-${index}`}
                  className="rounded-2xl bg-m3-on-surface/5 px-4 py-3"
                >
                  <div className="flex flex-wrap items-center gap-2 text-m3-on-surface">
                    <span className="font-semibold">{acc.name}</span>
                    {acc.tag && (
                      <span className="rounded-full bg-m3-primary/10 px-2 py-0.5 text-xs font-bold text-m3-primary">
                        #{acc.tag}
                      </span>
                    )}
                    {acc.region && (
                      <span className="text-xs text-m3-on-surface-variant">
                        {acc.region}
                      </span>
                    )}
                    {acc.platform && (
                      <span className="rounded-full bg-m3-surface-variant/70 px-2 py-0.5 text-xs text-m3-on-surface">
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
