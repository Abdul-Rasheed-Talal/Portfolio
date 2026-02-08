import { useDeveloperMode } from "./DeveloperModeContext";
import { Monitor, Smartphone, Code2, X } from "lucide-react";
import { useState, useEffect } from "react";

export function MobileDevModePrompt() {
    const { showMobilePrompt, dismissMobilePrompt } = useDeveloperMode();
    const [isVisible, setIsVisible] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        if (showMobilePrompt) {
            // Delay for entrance animation
            const timer = setTimeout(() => setIsVisible(true), 100);
            return () => clearTimeout(timer);
        }
    }, [showMobilePrompt]);

    const handleDismiss = (enableDevMode = false) => {
        setIsExiting(true);
        setTimeout(() => {
            dismissMobilePrompt(enableDevMode);
            setIsVisible(false);
            setIsExiting(false);
        }, 300);
    };

    if (!showMobilePrompt) return null;

    return (
        <div
            className={`
        fixed inset-0 z-[100] flex items-end justify-center p-4
        bg-black/60 backdrop-blur-sm
        transition-opacity duration-300
        ${isVisible && !isExiting ? "opacity-100" : "opacity-0"}
      `}
        >
            <div
                className={`
          w-full max-w-md
          bg-gradient-to-br from-neutral-900 to-neutral-950
          border border-neutral-700
          rounded-2xl p-6
          shadow-2xl
          transition-all duration-300 ease-out
          ${isVisible && !isExiting ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}
        `}
            >
                {/* Close button */}
                <button
                    onClick={() => handleDismiss(false)}
                    className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Icon */}
                <div className="flex justify-center mb-4">
                    <div className="relative">
                        <Monitor className="w-16 h-16 text-emerald-400" />
                        <Code2 className="absolute -bottom-1 -right-1 w-8 h-8 text-cyan-400 bg-neutral-900 rounded-full p-1" />
                    </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white text-center mb-2">
                    Developer Mode Available
                </h3>
                <p className="text-neutral-400 text-center text-sm leading-relaxed mb-6">
                    This portfolio has a special <span className="text-emerald-400 font-medium">Developer Mode</span> designed
                    for a developer's workspace. For the full experience, visit on a laptop or desktop.
                </p>

                {/* Buttons */}
                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => handleDismiss(true)}
                        className="
              w-full py-3 px-4 rounded-xl
              bg-gradient-to-r from-emerald-500/20 to-cyan-500/20
              border border-emerald-500/50
              text-emerald-400 font-medium
              hover:from-emerald-500/30 hover:to-cyan-500/30
              transition-all duration-200
              flex items-center justify-center gap-2
            "
                    >
                        <Smartphone className="w-4 h-4" />
                        Preview Anyway
                    </button>
                    <button
                        onClick={() => handleDismiss(false)}
                        className="
              w-full py-3 px-4 rounded-xl
              bg-gradient-to-r from-orange-500 to-red-500
              text-white font-medium
              hover:from-orange-400 hover:to-red-400
              transition-all duration-200
            "
                    >
                        Continue in Normal Mode
                    </button>
                </div>

                {/* Subtle hint */}
                <p className="text-neutral-600 text-xs text-center mt-4">
                    You can switch modes anytime using the toggle button
                </p>
            </div>
        </div>
    );
}
