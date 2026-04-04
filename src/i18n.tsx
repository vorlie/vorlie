/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Language = "en" | "pl";
export const supportedLanguages: Language[] = ["en", "pl"];
const localStorageKey = "vorlie_language";

const translations = {
  en: {
    languageName: "English",
    selectLanguage: "Language",
    forSale: {
      title: "For Sale",
      subtitle:
        "Private sale listings for personal items with simple buying instructions and contact details.",
      intro:
        "A very simple listing page for things I no longer need. No cart, no checkout, just item details, photos, condition, and how to contact me.",
      whatThisPageTitle: "What this page is for",
      whatThisPageText:
        "Personal items I want to sell locally or via trusted shipping. This is not a business storefront - just occasional private sales of my own belongings.",
      keyPointsHeading: "Key points",
      keyPoints: [
        "Simple item listings with photos and condition.",
        "No shop system, no cart, no automated checkout.",
        "Buyer pays shipping; I ship after payment.",
        "Local pickup or delivery may be available.",
      ],
      paymentTitle: "Payment",
      paymentItems: [
        "Bank transfer is the main option - include the item ID in the transfer title.",
        "Using cash? Local buyers can pay in person at pickup.",
      ],
      shippingTitle: "Shipping & pickup",
      shippingItems: [
        "Primary shipping method: InPost Paczkomaty.",
        "Buyer covers shipping costs.",
        "I ship only after payment has been received.",
        "Local pickup / delivery may be offered if requested.",
      ],
      packagingTitle: "Packaging",
      packagingText:
        "I keep a small stock of packaging to fit standard InPost locker sizes, mostly sizes A and B. I reuse boxes and packing materials when possible, and I use padded envelopes for smaller items.",
      trafficTitle: "Traffic and reach",
      trafficText:
        "This page won’t get organic traffic on its own. I plan to share listings in local groups or link to this page from platforms like OLX and Facebook Marketplace.",
      listingsTitle: "Listings",
      conditionLabel: "Condition:",
      noListingsHeading: "No active listings yet.",
      noListingsBody:
        "Check back soon or reach out if you’re looking for something specific.",
      contactTitle: "Contact",
      contactText:
        "If you want to buy something, send me a message through the usual channels listed on the homepage. Include the item ID from the listing so I know which item you're asking about. I’ll confirm availability, provide the final shipping cost, and ship after payment is received.",
      shippingLabel: "Shipping:",
      photosMissing: "Photos not added yet",
      contactEmailLabel: "Email",
      contactInstructions:
        "Send a message with the item ID. I will confirm availability and provide payment and shipping details.",
      contactExample: "Example: FS-001 – asking about availability",
      copyEmail: "Copy email",
      contactAboutItem: "Contact about this item",
      legalNote:
        "This is a private sale of personal items, not a registered business. Items are sold as used, without warranty or guarantee unless stated otherwise. Returns are not accepted unless agreed individually.",
    },
  },
  pl: {
    languageName: "Polski",
    selectLanguage: "Język",
    forSale: {
      title: "Na sprzedaż",
      subtitle:
        "Prywatne ogłoszenia rzeczy osobistych z prostymi instrukcjami zakupu i danymi kontaktowymi.",
      intro:
        "Bardzo prosta strona z rzeczami, których już nie potrzebuję. Brak koszyka, brak realizacji płatności - tylko opis przedmiotu, zdjęcia, stan i kontakt.",
      whatThisPageTitle: "Do czego służy ta strona",
      whatThisPageText:
        "Osobiste przedmioty, które chcę sprzedać lokalnie lub wysłać przez zaufane metody dostawy. To nie jest sklep ani działalność — tylko okazjonalna sprzedaż moich prywatnych rzeczy.",
      keyPointsHeading: "Najważniejsze",
      keyPoints: [
        "Proste ogłoszenia z opisem stanu i zdjęciami.",
        "Brak systemu sklepowego, koszyka i automatycznej realizacji.",
        "Kupujący płaci za wysyłkę; wysyłam po otrzymaniu płatności.",
        "Odbiór osobisty lub dostawa mogą być dostępne.",
      ],
      paymentTitle: "Płatność",
      paymentItems: [
        "Przelew bankowy jest główną opcją - wpisz ID przedmiotu w tytule przelewu.",
        "Płacisz gotówką? Lokalni kupujący mogą zapłacić osobiście przy odbiorze.",
      ],
      shippingTitle: "Wysyłka i odbiór",
      shippingItems: [
        "Główna metoda wysyłki: InPost Paczkomaty.",
        "Kupujący pokrywa koszty wysyłki.",
        "Wysyłam dopiero po otrzymaniu płatności.",
        "Odbiór osobisty lub dostawa mogą być dostępne na życzenie.",
      ],
      packagingTitle: "Pakowanie",
      packagingText:
        "Mam niewielki zapas opakowań pasujących do standardowych schowków InPost, głównie rozmiary A i B. W miarę możliwości ponownie wykorzystuję pudełka i wypełnienie oraz używam kopert bąbelkowych do mniejszych przedmiotów.",
      trafficTitle: "Ruch i zasięg",
      trafficText:
        "Ta strona nie będzie miała ruchu organicznego sama z siebie. Planuję udostępniać ogłoszenia w lokalnych grupach lub linkować z OLX i Facebook Marketplace.",
      listingsTitle: "Ogłoszenia",
      conditionLabel: "Stan:",
      noListingsHeading: "Brak aktywnych ogłoszeń.",
      noListingsBody:
        "Sprawdź ponownie wkrótce lub skontaktuj się, jeśli szukasz czegoś konkretnego.",
      contactTitle: "Kontakt",
      contactText:
        "Jeśli chcesz coś kupić, wyślij mi wiadomość z ID przedmiotu, żebym wiedział, którego ogłoszenia dotyczy. Potwierdzę dostępność, podam dane do płatności oraz szacunkowy koszt wysyłki. Przedmioty wysyłam po otrzymaniu płatności.",
      shippingLabel: "Wysyłka:",
      photosMissing: "Zdjęcia nie zostały jeszcze dodane",
      contactEmailLabel: "Email",
      contactInstructions:
        "Wyślij wiadomość z ID przedmiotu. Potwierdzę dostępność oraz podam szczegóły płatności i wysyłki.",
      contactExample: "Przykład: FS-001 – zapytanie o dostępność",
      copyEmail: "Skopiuj email",
      contactAboutItem: "Skontaktuj się w sprawie tego przedmiotu",
      legalNote:
        "To prywatna sprzedaż osobistych przedmiotów, a nie zarejestrowana działalność gospodarcza. Przedmioty są sprzedawane jako używane, bez gwarancji ani rękojmi, chyba że zaznaczono inaczej. Zwroty nie są przyjmowane, chyba że zostanie to indywidualnie ustalone.",
    },
  },
} as const;

const getValue = (obj: unknown, path: string) => {
  return path.split(".").reduce((acc, part) => {
    if (acc && typeof acc === "object") {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj);
};

interface TranslationContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: <T = string>(path: string, fallback?: T) => T;
}

const LanguageContext = createContext<TranslationContextValue | undefined>(
  undefined,
);

const resolveInitialLanguage = (): Language => {
  if (typeof window === "undefined") {
    return "en";
  }

  try {
    const stored = window.localStorage.getItem(
      localStorageKey,
    ) as Language | null;
    if (stored && supportedLanguages.includes(stored)) {
      return stored;
    }
  } catch {
    // ignore localStorage errors
  }

  const browserLang = window.navigator.language;
  return browserLang.startsWith("pl") ? "pl" : "en";
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(
    resolveInitialLanguage,
  );

  useEffect(() => {
    try {
      window.localStorage.setItem(localStorageKey, language);
    } catch {
      // ignore write errors
    }
  }, [language]);

  const setLanguage = (next: Language) => {
    setLanguageState(next);
  };

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: <T = string,>(path: string, fallback?: T) => {
        const result = getValue(translations[language], path);
        return (
          result === undefined ? (fallback ?? (path as unknown)) : result
        ) as T;
      },
    }),
    [language],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useTranslation must be used within LanguageProvider");
  }
  return context;
}

export function useTranslationValue<T>(path: string, fallback?: T) {
  const { t } = useTranslation();
  return t<T>(path, fallback);
}

export function getSupportedLanguages() {
  return supportedLanguages;
}

export function getLanguageLabel(language: Language) {
  return translations[language].languageName;
}

export function getTranslations() {
  return translations;
}
