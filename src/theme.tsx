/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type ThemeMode = "auto" | "default" | "pride";
export type ResolvedTheme = "default" | "pride";
export type PrideTheme =
  | "bisexual"
  | "genderfluid"
  | "lesbian"
  | "transgender"
  | "nonbinary";

interface ThemeContextValue {
  themeMode: ThemeMode;
  resolvedTheme: ResolvedTheme;
  prideTheme: PrideTheme;
  isSeasonalPrideActive: boolean;
  isPrideCycleActive: boolean;
  setThemeMode: (mode: ThemeMode) => void;
  setPrideTheme: (theme: PrideTheme) => void;
  setPrideCycleActive: (active: boolean) => void;
}

const themeStorageKey = "vorlie_theme_mode";
const prideThemeStorageKey = "vorlie_pride_theme";
const prideCycleStorageKey = "vorlie_pride_cycle";

const prideThemeVars: Record<PrideTheme, Record<string, string>> = {
  bisexual: {
    "--color-m3-surface": "#181018",
    "--color-m3-surface-container": "#271827",
    "--color-m3-surface-variant": "#514151",
    "--color-m3-primary": "#ff8dcb",
    "--color-m3-on-primary": "#4d1138",
    "--color-m3-primary-container": "#6d2452",
    "--color-m3-on-primary-container": "#ffd8ec",
    "--color-m3-secondary": "#caa7ff",
    "--color-m3-on-secondary": "#311650",
    "--color-m3-outline": "#bba4bb",
    "--color-m3-on-surface": "#f0e3ee",
    "--color-m3-on-surface-variant": "#d7c2d4",
    "--pulse-color": "255, 141, 203",
    "--color-pride-blue": "#8bb8ff",
  },
  genderfluid: {
    "--color-m3-surface": "#151116",
    "--color-m3-surface-container": "#251a26",
    "--color-m3-surface-variant": "#514653",
    "--color-m3-primary": "#ff8fd2",
    "--color-m3-on-primary": "#4f113e",
    "--color-m3-primary-container": "#6b2557",
    "--color-m3-on-primary-container": "#ffd7ee",
    "--color-m3-secondary": "#cbb8ff",
    "--color-m3-on-secondary": "#2f2150",
    "--color-m3-outline": "#c2a9bb",
    "--color-m3-on-surface": "#f0e5ee",
    "--color-m3-on-surface-variant": "#d6c5d2",
    "--pulse-color": "255, 143, 210",
    "--color-pride-blue": "#90c7ff",
  },
  lesbian: {
    "--color-m3-surface": "#1a0f0f",
    "--color-m3-surface-container": "#2b1a1a",
    "--color-m3-surface-variant": "#544343",
    "--color-m3-primary": "#ffb4a2",
    "--color-m3-on-primary": "#561e12",
    "--color-m3-primary-container": "#733426",
    "--color-m3-on-primary-container": "#ffdad2",
    "--color-m3-secondary": "#e7bdb2",
    "--color-m3-on-secondary": "#442a22",
    "--color-m3-outline": "#a08c87",
    "--color-m3-on-surface": "#f5deda",
    "--color-m3-on-surface-variant": "#d8c2bc",
    "--pulse-color": "255, 180, 162",
    "--color-pride-blue": "#ffb4a2", // Substituted with a warm accent
  },
  transgender: {
    "--color-m3-surface": "#0f141c",
    "--color-m3-surface-container": "#1e2530",
    "--color-m3-surface-variant": "#43474e",
    "--color-m3-primary": "#a8c7ff",
    "--color-m3-on-primary": "#003062",
    "--color-m3-primary-container": "#1d477a",
    "--color-m3-on-primary-container": "#d6e3ff",
    "--color-m3-secondary": "#ffb2d7",
    "--color-m3-on-secondary": "#571239",
    "--color-m3-outline": "#8d9199",
    "--color-m3-on-surface": "#e2e2e9",
    "--color-m3-on-surface-variant": "#c3c7cf",
    "--pulse-color": "168, 199, 255",
    "--color-pride-blue": "#a8c7ff",
  },
  nonbinary: {
    "--color-m3-surface": "#141218",
    "--color-m3-surface-container": "#232029",
    "--color-m3-surface-variant": "#49454f",
    "--color-m3-primary": "#ffd600", // Yellow accent
    "--color-m3-on-primary": "#362f00",
    "--color-m3-primary-container": "#4e4400",
    "--color-m3-on-primary-container": "#fff176",
    "--color-m3-secondary": "#d0bcff", // Purple accent
    "--color-m3-on-secondary": "#381e72",
    "--color-m3-outline": "#938f99",
    "--color-m3-on-surface": "#e6e1e5",
    "--color-m3-on-surface-variant": "#cac4d0",
    "--pulse-color": "255, 214, 0",
    "--color-pride-blue": "#a8c7ff",
  },
};

const isJune = () => new Date().getMonth() === 5;
const defaultThemeVars: Record<string, string> = {};

const resolveInitialThemeMode = (): ThemeMode => {
  if (typeof window === "undefined") {
    return "auto";
  }

  try {
    const stored = window.localStorage.getItem(
      themeStorageKey,
    ) as ThemeMode | null;
    if (stored === "auto" || stored === "default" || stored === "pride") {
      return stored;
    }
  } catch {
    // ignore localStorage errors
  }

  return "auto";
};

const resolveInitialPrideTheme = (): PrideTheme => {
  if (typeof window === "undefined") {
    return "bisexual";
  }

  try {
    const stored = window.localStorage.getItem(
      prideThemeStorageKey,
    ) as PrideTheme | null;
    if (
      stored === "bisexual" ||
      stored === "genderfluid" ||
      stored === "lesbian" ||
      stored === "transgender" ||
      stored === "nonbinary"
    ) {
      return stored;
    }
  } catch {
    // ignore localStorage errors
  }

  return "bisexual";
};

const resolveInitialPrideCycleActive = (): boolean => {
  if (typeof window === "undefined") {
    return true;
  }

  try {
    const stored = window.localStorage.getItem(prideCycleStorageKey);
    return stored === null ? true : stored === "1";
  } catch {
    return true;
  }
};

export const setDefaultThemeVars = (vars: Record<string, string>) => {
  Object.assign(defaultThemeVars, vars);

  if (document.documentElement.dataset.theme !== "pride") {
    applyDefaultTheme();
  }
};

const applyThemeVars = (vars: Record<string, string>) => {
  const root = document.documentElement;
  Object.entries(vars).forEach(([name, value]) => {
    root.style.setProperty(name, value);
  });
};

const applyPrideTheme = (theme: PrideTheme) => {
  const root = document.documentElement;
  applyThemeVars(prideThemeVars[theme]);
  root.dataset.theme = "pride";
  root.dataset.prideTheme = theme;
};

const applyDefaultTheme = () => {
  const root = document.documentElement;
  applyThemeVars(defaultThemeVars);
  root.dataset.theme = "default";
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(
    resolveInitialThemeMode,
  );
  const [prideTheme, setPrideThemeState] = useState<PrideTheme>(
    resolveInitialPrideTheme,
  );
  const [isPrideCycleActive, setPrideCycleActiveState] = useState<boolean>(
    resolveInitialPrideCycleActive,
  );
  const [isSeasonalPrideActive, setIsSeasonalPrideActive] = useState(isJune);

  useEffect(() => {
    const updateSeasonalState = () => setIsSeasonalPrideActive(isJune());
    updateSeasonalState();
    const interval = window.setInterval(updateSeasonalState, 60 * 60 * 1000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        prideCycleStorageKey,
        isPrideCycleActive ? "1" : "0",
      );
    } catch {
      // ignore localStorage errors
    }
  }, [isPrideCycleActive]);

  const resolvedTheme: ResolvedTheme =
    themeMode === "pride" || (themeMode === "auto" && isSeasonalPrideActive)
      ? "pride"
      : "default";

  useEffect(() => {
    if (!isPrideCycleActive || resolvedTheme !== "pride") {
      return;
    }

    const interval = window.setInterval(() => {
      setPrideThemeState((current) => {
        const themes: PrideTheme[] = [
          "bisexual",
          "genderfluid",
          "lesbian",
          "transgender",
          "nonbinary",
        ];
        const nextIndex = (themes.indexOf(current) + 1) % themes.length;
        return themes[nextIndex];
      });
    }, 9000);

    return () => window.clearInterval(interval);
  }, [isPrideCycleActive, resolvedTheme]);

  useEffect(() => {
    try {
      window.localStorage.setItem(themeStorageKey, themeMode);
    } catch {
      // ignore localStorage errors
    }
  }, [themeMode]);

  useEffect(() => {
    try {
      window.localStorage.setItem(prideThemeStorageKey, prideTheme);
    } catch {
      // ignore localStorage errors
    }
  }, [prideTheme]);

  useEffect(() => {
    if (resolvedTheme === "pride") {
      applyPrideTheme(prideTheme);
      return;
    }

    applyDefaultTheme();
  }, [resolvedTheme, prideTheme]);

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
  };

  const setPrideTheme = (theme: PrideTheme) => {
    setPrideThemeState(theme);
  };

  const setPrideCycleActive = (active: boolean) => {
    setPrideCycleActiveState(active);
  };

  const value = useMemo(
    () => ({
      themeMode,
      resolvedTheme,
      prideTheme,
      isSeasonalPrideActive,
      isPrideCycleActive,
      setThemeMode,
      setPrideTheme,
      setPrideCycleActive,
    }),
    [
      themeMode,
      resolvedTheme,
      prideTheme,
      isSeasonalPrideActive,
      isPrideCycleActive,
    ],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}

export function useApplyResolvedTheme(trigger: unknown) {
  const { resolvedTheme, prideTheme } = useTheme();

  useEffect(() => {
    if (resolvedTheme === "pride") {
      applyPrideTheme(prideTheme);
      return;
    }

    applyDefaultTheme();
  }, [resolvedTheme, prideTheme, trigger]);
}
