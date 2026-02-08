import { useDeveloperMode } from "./DeveloperModeContext";
import { Code2, Eye } from "lucide-react";

export function DevModeToggle() {
    const { isDeveloperMode, toggleDeveloperMode, isMobile } = useDeveloperMode();

    return (
        <button
            onClick={toggleDeveloperMode}
            className={`
        fixed bottom-6 right-6 z-50
        w-14 h-14 rounded-full
        flex items-center justify-center
        transition-all duration-300 ease-out
        shadow-lg hover:shadow-xl
        group
        ${isDeveloperMode
                    ? "bg-gradient-to-br from-emerald-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500"
                    : "bg-gradient-to-br from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400"
                }
        ${isMobile ? "w-12 h-12 bottom-4 right-4" : ""}
      `}
            title={isDeveloperMode ? "Switch to Normal Mode" : "Switch to Developer Mode"}
        >
            {/* Icon with flip animation */}
            <div className="relative w-6 h-6">
                <Code2
                    className={`
            absolute inset-0 w-6 h-6 text-white
            transition-all duration-300
            ${isDeveloperMode ? "opacity-100 rotate-0" : "opacity-0 rotate-180"}
          `}
                />
                <Eye
                    className={`
            absolute inset-0 w-6 h-6 text-white
            transition-all duration-300
            ${isDeveloperMode ? "opacity-0 -rotate-180" : "opacity-100 rotate-0"}
          `}
                />
            </div>

            {/* Tooltip */}
            <span
                className={`
          absolute right-full mr-3 px-3 py-2
          bg-neutral-900 text-white text-sm font-medium
          rounded-lg whitespace-nowrap
          opacity-0 group-hover:opacity-100
          transition-opacity duration-200
          pointer-events-none
          ${isMobile ? "hidden" : ""}
        `}
            >
                {isDeveloperMode ? "Exit Dev Mode" : "Enter Dev Mode"}
                <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-neutral-900 rotate-45" />
            </span>

            {/* Pulse ring animation */}
            <span
                className={`
          absolute inset-0 rounded-full
          animate-ping opacity-20
          ${isDeveloperMode ? "bg-emerald-400" : "bg-orange-400"}
        `}
                style={{ animationDuration: "2s" }}
            />
        </button>
    );
}
