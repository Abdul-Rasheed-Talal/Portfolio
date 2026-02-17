import * as React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { useToast } from "@/hooks/use-toast";

type Mode = 'developer' | 'normal';

interface ModeContextType {
    mode: Mode | null;
    setMode: (mode: Mode) => void;
    toggleMode: () => void;
    isFirstVisit: boolean;
    isMatrixEnabled: boolean;
    setIsMatrixEnabled: (enabled: boolean) => void;
    isCVModalOpen: boolean;
    setIsCVModalOpen: (open: boolean) => void;
    activeDevSidebar: string;
    setActiveDevSidebar: (sidebar: string) => void;
    openCVPreview: () => void;
    openDiagnostics: () => void;
    isMobile: boolean;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export function ModeProvider({ children }: { children: React.ReactNode }) {
    const [mode, setModeState] = useState<Mode | null>(null);
    const [isFirstVisit, setIsFirstVisit] = useState(true);
    const [isMatrixEnabled, setIsMatrixEnabled] = useState(false);
    const [isCVModalOpen, setIsCVModalOpen] = useState(false);
    const [activeDevSidebar, setActiveDevSidebar] = useState('explorer');
    const [isMobile, setIsMobile] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        // Check localStorage on mount
        const savedMode = localStorage.getItem('portfolio-mode') as Mode | null;
        const isMobileMatch = window.matchMedia("(max-width: 768px)").matches;
        setIsMobile(isMobileMatch);

        const handleResize = (e: MediaQueryListEvent) => {
            setIsMobile(e.matches);
        };
        const mql = window.matchMedia("(max-width: 768px)");
        mql.addEventListener('change', handleResize);

        if (savedMode) {
            // Only apply saved developer mode if not on mobile
            if (savedMode === 'developer' && isMobileMatch) {
                setModeState('normal');
                document.documentElement.setAttribute('data-mode', 'normal');
            } else {
                setModeState(savedMode);
                document.documentElement.setAttribute('data-mode', savedMode);
            }
            setIsFirstVisit(false);
        } else if (isMobileMatch) {
            setModeState('normal');
            setIsFirstVisit(false);
            document.documentElement.setAttribute('data-mode', 'normal');
        }

        return () => mql.removeEventListener('change', handleResize);
    }, []);

    const setMode = (newMode: Mode) => {
        if (newMode === 'developer' && isMobile) {
            toast({
                title: "Desktop Experience Required",
                description: "Developer Mode is optimized for laptops and desktops. Switch to a larger screen for the full terminal experience.",
                duration: 4000,
            });
            return;
        }

        setModeState(newMode);
        localStorage.setItem('portfolio-mode', newMode);
        document.documentElement.setAttribute('data-mode', newMode);
        setIsFirstVisit(false);
    };

    const toggleMode = () => {
        if (isMobile && mode !== 'developer') {
            toast({
                title: "Desktop Experience Required",
                description: "Developer Mode is best experienced on a desktop. Please switch to a larger screen.",
                duration: 4000,
            });
            return;
        }

        const newMode = mode === 'developer' ? 'normal' : 'developer';
        setMode(newMode);

        toast({
            title: `Switched to ${newMode === 'developer' ? 'Developer' : 'Normal'} Mode`,
            description: newMode === 'developer'
                ? "Welcome back to the terminal."
                : "Viewing standard portfolio interface.",
            duration: 3000,
        });
    };

    const openCVPreview = () => setIsCVModalOpen(true);

    const openDiagnostics = () => {
        if (isMobile) {
            toast({
                title: "Desktop Feature",
                description: "System diagnostics are only available in Developer Mode on desktop devices.",
                duration: 4000,
            });
            return;
        }
        if (mode !== 'developer') {
            setMode('developer');
        }
        setActiveDevSidebar('debug');
    };

    // Keyboard shortcut listener
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.shiftKey && (e.key === 'D' || e.key === 'd')) {
                e.preventDefault();
                toggleMode();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [mode, isMobile]);

    return (
        <ModeContext.Provider value={{
            mode,
            setMode,
            toggleMode,
            isFirstVisit,
            isMatrixEnabled,
            setIsMatrixEnabled,
            isCVModalOpen,
            setIsCVModalOpen,
            activeDevSidebar,
            setActiveDevSidebar,
            openCVPreview,
            openDiagnostics,
            isMobile
        }}>
            {children}
        </ModeContext.Provider>
    );
}

export function useMode() {
    const context = useContext(ModeContext);
    if (context === undefined) {
        throw new Error('useMode must be used within a ModeProvider');
    }
    return context;
}
