import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type DeveloperModeContextType = {
  isDeveloperMode: boolean;
  toggleDeveloperMode: () => void;
  isMobile: boolean;
  showMobilePrompt: boolean;
  dismissMobilePrompt: (enableDevMode?: boolean) => void;
};

const DeveloperModeContext = createContext<DeveloperModeContextType | undefined>(undefined);

const MOBILE_BREAKPOINT = 768;
const STORAGE_KEY = "portfolio-developer-mode";
const MOBILE_PROMPT_DISMISSED_KEY = "portfolio-mobile-prompt-dismissed";

export function DeveloperModeProvider({ children }: { children: ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);
  const [showMobilePrompt, setShowMobilePrompt] = useState(false);
  const [isDeveloperMode, setIsDeveloperMode] = useState(() => {
    // Check localStorage first
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) {
      return saved === "true";
    }
    // Default: true for desktop, false for mobile (detected on mount)
    return true;
  });

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile(mobile);

      // On first load, check if mobile and need to show prompt
      const promptDismissed = localStorage.getItem(MOBILE_PROMPT_DISMISSED_KEY);
      const savedMode = localStorage.getItem(STORAGE_KEY);

      if (mobile && !promptDismissed && savedMode === null) {
        // First time mobile visitor
        setIsDeveloperMode(false);
        setShowMobilePrompt(true);
      } else if (!mobile && savedMode === null) {
        // First time desktop visitor - enable dev mode
        setIsDeveloperMode(true);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    // Apply dev-mode class to document
    const root = document.documentElement;
    if (isDeveloperMode) {
      root.classList.add("dev-mode");
    } else {
      root.classList.remove("dev-mode");
    }
    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, String(isDeveloperMode));
  }, [isDeveloperMode]);

  const toggleDeveloperMode = () => {
    setIsDeveloperMode((prev) => !prev);
  };

  const dismissMobilePrompt = (enableDevMode = false) => {
    setShowMobilePrompt(false);
    localStorage.setItem(MOBILE_PROMPT_DISMISSED_KEY, "true");
    if (enableDevMode) {
      setIsDeveloperMode(true);
    }
  };

  return (
    <DeveloperModeContext.Provider
      value={{
        isDeveloperMode,
        toggleDeveloperMode,
        isMobile,
        showMobilePrompt,
        dismissMobilePrompt,
      }}
    >
      {children}
    </DeveloperModeContext.Provider>
  );
}

export function useDeveloperMode() {
  const context = useContext(DeveloperModeContext);
  if (context === undefined) {
    throw new Error("useDeveloperMode must be used within a DeveloperModeProvider");
  }
  return context;
}
