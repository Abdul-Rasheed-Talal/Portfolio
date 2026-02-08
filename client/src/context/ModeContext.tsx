import React, { createContext, useContext, useEffect, useState } from 'react';
import { useToast } from "@/hooks/use-toast";

type Mode = 'developer' | 'normal';

interface ModeContextType {
    mode: Mode | null;
    setMode: (mode: Mode) => void;
    toggleMode: () => void;
    isFirstVisit: boolean;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export function ModeProvider({ children }: { children: React.ReactNode }) {
    const [mode, setModeState] = useState<Mode | null>(null);
    const [isFirstVisit, setIsFirstVisit] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        // Check localStorage on mount
        const savedMode = localStorage.getItem('portfolio-mode') as Mode | null;
        if (savedMode) {
            setModeState(savedMode);
            setIsFirstVisit(false);
            document.documentElement.setAttribute('data-mode', savedMode);
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
        <ModeContext.Provider value={{ mode, setMode, toggleMode, isFirstVisit }}>
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
