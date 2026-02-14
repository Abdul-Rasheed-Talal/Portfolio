import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { Terminal as TerminalIcon, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TerminalProps {
    onClose?: () => void;
}

export function Terminal({ onClose }: TerminalProps) {
    const [history, setHistory] = useState<string[]>([
        "Welcome to A-R Portfolio Terminal v1.0.0",
        "Type 'help' to see available commands.",
        ""
    ]);
    const [input, setInput] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    const commands: Record<string, () => void> = {
        help: () => setHistory((prev: string[]) => [...prev, "Available commands: help, about, skills, projects, contact, clear, exit"]),
        about: () => setHistory((prev: string[]) => [...prev, "I'm Abdul Rasheed, a Full-stack Developer passionate about building high-performance web applications."]),
        skills: () => setHistory((prev: string[]) => [...prev, "Tech Stack: React, Next.js, TypeScript, Node.js, Tailwind CSS, PostgreSQL, Prisma."]),
        projects: () => setHistory((prev: string[]) => [...prev, "Check out the projects view to see my work! (Commands for specific projects coming soon)"]),
        contact: () => setHistory((prev: string[]) => [...prev, "Email: mabdurrasheedtalal@gmail.com | LinkedIn: /in/abdul-rasheed-talal"]),
        clear: () => setHistory([]),
        exit: () => onClose?.(),
    };

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        const cmd = input.trim().toLowerCase();

        setHistory((prev: string[]) => [...prev, `> ${input}`]);

        if (commands[cmd]) {
            commands[cmd]();
        } else if (cmd !== "") {
            setHistory((prev: string[]) => [...prev, `Command not found: ${cmd}. Type 'help' for assistance.`]);
        }

        setInput("");
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-black/90 border border-neutral-800 rounded-lg overflow-hidden flex flex-col h-full shadow-2xl font-mono text-sm"
        >
            {/* Terminal Header */}
            <div className="bg-neutral-900 px-4 py-2 flex items-center justify-between border-b border-neutral-800">
                <div className="flex items-center gap-2">
                    <TerminalIcon className="w-4 h-4 text-emerald-500" />
                    <span className="text-neutral-400 text-xs">ar-portfolio ~ bash</span>
                </div>
                {onClose && (
                    <button onClick={onClose} className="text-neutral-500 hover:text-white transition-colors">
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* Terminal Body */}
            <div
                ref={scrollRef}
                className="flex-1 p-4 overflow-y-auto custom-scrollbar space-y-1"
            >
                {history.map((line: string, i: number) => (
                    <div key={i} className={line.startsWith(">") ? "text-emerald-400" : "text-neutral-300"}>
                        {line}
                    </div>
                ))}

                <form onSubmit={handleCommand} className="flex items-center gap-2 pt-1">
                    <ChevronRight className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <input
                        autoFocus
                        type="text"
                        value={input}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                        className="bg-transparent border-none outline-none flex-1 text-emerald-400 p-0 focus:ring-0"
                        spellCheck={false}
                    />
                </form>
            </div>
        </motion.div>
    );
}
