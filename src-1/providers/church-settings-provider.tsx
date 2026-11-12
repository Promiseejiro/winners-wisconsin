"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface ChurchSettings {
  churchName: string;
  logo: string;
  pastorImage: string;
  pastorName: string;
  pastorTitle: string;
  pastorBiography: string;
  address: string;
  email: string;
  phones: string[];
  facebook: string;
  instagram: string;
  youtube: string;
  showPastorAppointmentButton: boolean;
  aboutImage: string;
}

const defaultSettings: ChurchSettings = {
  churchName: "Winners Chapel International Milwaukee Wisconsin",
  logo: "/assets/images/logo.png",
  pastorImage: "",
  pastorName: "Resident Pastor",
  pastorTitle: "Resident Pastor",
  pastorBiography:
    "Welcome to Winners Chapel International Milwaukee Wisconsin.",
  address: "8159 W Brown Deer Rd, Milwaukee, WI 53223, United States",
  email: "winnerschapelwisconsin@gmail.com",
  phones: ["414-368-7753", "708-769-7141", "414-255-4387"],
  facebook: "",
  instagram: "",
  youtube: "",
  showPastorAppointmentButton: false,
  aboutImage: "",
};

interface ChurchSettingsContextValue {
  settings: ChurchSettings;
  loading: boolean;
  refresh: () => Promise<void>;
}

const ChurchSettingsContext = createContext<ChurchSettingsContextValue>({
  settings: defaultSettings,
  loading: true,
  refresh: async () => undefined,
});

function getApiBase(): string {
  const configured = (
    process.env.NEXT_PUBLIC_SERVER_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:3000/api/v1"
  ).replace(/\/+$/, "");

  return configured.endsWith("/api/v1") ? configured : `${configured}/api/v1`;
}

export function ChurchSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<ChurchSettings>(defaultSettings);

  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const base = getApiBase();

      const [settingsResponse, homeResponse] = await Promise.all([
        fetch(`${base}/content/public/page?slug=site-settings`, {
          cache: "no-store",
        }),
        fetch(`${base}/content/public/page?slug=home`, { cache: "no-store" }),
      ]);

      if (!settingsResponse.ok) {
        throw new Error("Unable to load church settings.");
      }

      const settingsResult = await settingsResponse.json();

      const incoming = settingsResult?.data || {};

      let homePastor: any = {};

      if (homeResponse.ok) {
        const homeResult = await homeResponse.json();
        homePastor = homeResult?.data?.pastor || {};
      }

      const merged: ChurchSettings = {
        ...defaultSettings,
        ...incoming,

        // Homepage CMS pastor fields take priority.
        pastorName:
          homePastor.name || incoming.pastorName || defaultSettings.pastorName,

        pastorTitle:
          homePastor.label ||
          incoming.pastorTitle ||
          defaultSettings.pastorTitle,

        pastorBiography:
          homePastor.description ||
          incoming.pastorBiography ||
          defaultSettings.pastorBiography,

        pastorImage: homePastor.image || incoming.pastorImage || "",

        phones: Array.isArray(incoming.phones)
          ? incoming.phones.filter(
              (phone: unknown) => typeof phone === "string",
            )
          : defaultSettings.phones,
      };

      setSettings(merged);
    } catch (error) {
      console.error("Unable to load church settings:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const contextValue = useMemo(
    () => ({
      settings,
      loading,
      refresh,
    }),
    [settings, loading, refresh],
  );

  return (
    <ChurchSettingsContext.Provider value={contextValue}>
      {children}
    </ChurchSettingsContext.Provider>
  );
}

export function useChurchSettings() {
  return useContext(ChurchSettingsContext);
}
