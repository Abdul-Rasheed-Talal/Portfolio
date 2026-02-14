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
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export function ModeProvider({ children }: { children: React.ReactNode }) {
    const [mode, setModeState] = useState<Mode | null>(null);
    const [isFirstVisit, setIsFirstVisit] = useState(true);
    const [isMatrixEnabled, setIsMatrixEnabled] = useState(false);
    const [isCVModalOpen, setIsCVModalOpen] = useState(false);
    const [activeDevSidebar, setActiveDevSidebar] = useState('explorer');
    const { toast } = useToast();

    useEffect(() => {
        // Check localStorage on mount
        const savedMode = localStorage.getItem('portfolio-mode') as Mode | null;
        const isMobileMatch = window.matchMedia("(max-width: 768px)").matches;

        if (savedMode) {
            setModeState(savedMode);
            setIsFirstVisit(false);
            document.documentElement.setAttribute('data-mode', savedMode);
        } else if (isMobileMatch) {
            // Default to normal mode on mobile to skip the choice gate
            setModeState('normal');
            setIsFirstVisit(false);
            document.documentElement.setAttribute('data-mode', 'normal');
            // We don't save to localStorage yet to allow desktop switch later if they use dev tools
        }
    }, []);

    const setMode = (newMode: Mode) => {
        setModeState(newMode);
        localStorage.setItem('portfolio-mode', newMode);
        document.documentElement.setAttribute('data-mode', newMode);
        setIsFirstVisit(false);
    };

    const toggleMode = () => {
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
    }, [mode]);

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
            openDiagnostics
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
