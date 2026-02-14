import * as React from 'react';
import { useState, useEffect } from 'react';
import { useMode } from '@/context/ModeContext';
import {
    Box,
    Search,
    GitBranch,
    Cpu,
    Grid,
    Settings,
    X,
    Minus,
    Square,
    ChevronRight,
    ChevronDown,
    Terminal,
    Activity,
    Layers,
    Code,
    Zap
} from 'lucide-react';
import { Button } from "@/components/ui/button";

// Import components
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Education } from "@/components/Education";
import { Contact } from "@/components/Contact";
import { DevProjectsView } from "@/components/developer/DevProjectsView";
import { Terminal as TerminalComponent } from "@/components/developer/Terminal";
import { MatrixOverlay } from "@/components/developer/MatrixOverlay";

// Define the file structure
type FileNode = {
    name: string;
    type: 'file' | 'folder';
    language?: string;
    component?: React.ReactNode;
    children?: FileNode[];
};

const FILE_TREE: FileNode[] = [
    {
        name: 'src',
        type: 'folder',
        children: [
            {
                name: 'assets',
                type: 'folder',
                children: []
            },
            {
                name: 'pages',
                type: 'folder',
                children: [
                    { name: 'Dashboard.tsx', type: 'file', language: 'tsx', component: <Hero /> },
                    { name: 'Profile.tsx', type: 'file', language: 'tsx', component: <About /> },
                    { name: 'TechStack.json', type: 'file', language: 'json', component: <Skills /> },
                    { name: 'Repositories.tsx', type: 'file', language: 'tsx', component: <DevProjectsView /> }, // Using new view
                    { name: 'Education.config', type: 'file', language: 'config', component: <Education /> },
                    { name: 'Connect.ts', type: 'file', language: 'ts', component: <Contact /> },
                ]
            }
        ]
    },
    { name: 'system.config.js', type: 'file', language: 'js', component: <div className="p-8 text-[#666]">System Config Loaded...</div> },
];

interface DeveloperLayoutProps {
    children: React.ReactNode;
}

export function FuturisticDeveloperLayout({ children }: DeveloperLayoutProps) {
    const { mode, toggleMode, isMatrixEnabled, setIsMatrixEnabled, activeDevSidebar, setActiveDevSidebar } = useMode();
    const [activeFile, setActiveFile] = useState<FileNode | null>(null);
    const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['src', 'pages']));
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isTerminalOpen, setIsTerminalOpen] = useState(true);
    const [terminalHeight, setTerminalHeight] = useState(300);
    const [isResizing, setIsResizing] = useState(false);

    const [fontSize, setFontSize] = useState(14);
    const [devTheme, setDevTheme] = useState<'void' | 'solarized'>('void');
    const [showMinimap, setShowMinimap] = useState(true);

    // Apply font size style
    const contentStyle = {
        fontSize: `${fontSize}px`,
        lineHeight: '1.6',
    };

    // Apply theme classes (simplified for now, mostly handled via inline styles but structure is ready)
    const isSolarized = devTheme === 'solarized';
    const bgColor = isSolarized ? '#002b36' : '#050505';
    const textColor = isSolarized ? '#839496' : '#e0e0e0';
    const accentColor = isSolarized ? '#b58900' : '#00ff9d';
    const sidebarColor = isSolarized ? '#073642' : '#0a0a0a';
    const borderColor = isSolarized ? '#586e75' : '#222';


    // Sidebar Inputs
    const [searchQuery, setSearchQuery] = useState('');

    // Resize logic
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isResizing) return;
            const newHeight = window.innerHeight - e.clientY - 24; // 24 is status bar height
            if (newHeight > 100 && newHeight < window.innerHeight * 0.7) {
                setTerminalHeight(newHeight);
            }
        };

        const handleMouseUp = () => setIsResizing(false);

        if (isResizing) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing]);

    // On mount, set default file
    useEffect(() => {
        if (mode === 'developer' && !activeFile) {
            const defaultFile = FILE_TREE[0].children![1].children![0]; // Dashboard.tsx
            setActiveFile(defaultFile);
        }
    }, [mode]);

    const handleFileClick = (file: FileNode) => {
        if (file.type === 'folder') {
            const newExpanded = new Set(expandedFolders);
            if (newExpanded.has(file.name)) newExpanded.delete(file.name);
            else newExpanded.add(file.name);
            setExpandedFolders(newExpanded);
            return;
        }
        setActiveFile(file);
    };

    const renderTree = (nodes: FileNode[], depth = 0) => {
        return nodes.map(node => {
            // Filter logic for search
            if (searchQuery && node.type === 'file' && !node.name.toLowerCase().includes(searchQuery.toLowerCase())) return null;

            return (
                <div key={node.name}>
                    <div
                        className={`flex items-center py-1.5 px-4 cursor-pointer hover:bg-opacity-80 transition-all duration-200 group
                        ${activeFile?.name === node.name ? `text-[${accentColor}] bg-[${accentColor}]/5 border-l-2` : `text-[${isSolarized ? '#93a1a1' : '#888'}] border-l-2 border-transparent`}
                    `}
                        style={{
                            paddingLeft: `${depth * 12 + 20}px`,
                            borderColor: activeFile?.name === node.name ? accentColor : 'transparent'
                        }}
                        onClick={() => handleFileClick(node)}
                    >
                        <span className="mr-2 opacity-70 group-hover:opacity-100 transition-colors" style={{ color: activeFile?.name === node.name ? accentColor : undefined }}>
                            {node.type === 'folder' && (
                                expandedFolders.has(node.name) ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />
                            )}
                            {node.type === 'file' && <Code className="w-3 h-3" />}
                        </span>
                        <span className="text-sm tracking-wide font-mono">{node.name}</span>
                    </div>
                    {node.type === 'folder' && (expandedFolders.has(node.name) || searchQuery) && node.children && (
                        <div>{renderTree(node.children, depth + 1)}</div>
                    )}
                </div>
            );
        });
    };

    if (mode !== 'developer') return <>{children}</>;

    return (
        <div className="h-screen w-screen flex flex-col font-sans overflow-hidden transition-colors duration-300"
            style={{ backgroundColor: bgColor, color: textColor }}>

            {/* Futuristic Top Bar */}
            <div className="h-14 border-b flex items-center justify-between px-4 z-50 transition-colors duration-300"
                style={{ backgroundColor: sidebarColor, borderColor: borderColor }}>
                <div className="flex items-center gap-4 w-1/4">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 bg-[#ff5f57] rounded-full shadow-[0_0_8px_rgba(255,95,87,0.4)]"></div>
                        <div className="w-3 h-3 bg-[#febc2e] rounded-full shadow-[0_0_8px_rgba(254,188,46,0.4)]"></div>
                        <div className="w-3 h-3 bg-[#28c840] rounded-full shadow-[0_0_8px_rgba(40,200,64,0.4)]"></div>
                    </div>
                    <div className="h-4 w-[1px] bg-[#333] mx-2"></div>
                    <span className="font-mono text-xs text-[#666] uppercase tracking-widest hidden md:inline-block">Dev_Env_v.2.4.0</span>
                </div>

                {/* Center Search Bar */}
                <div className="flex-1 max-w-xl mx-4 relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-[#555] group-focus-within:text-[#00ff9d] transition-colors" style={{ color: searchQuery ? accentColor : '#555' }} />
                    </div>
                    <input
                        type="text"
                        className="w-full text-sm rounded-full py-1.5 pl-10 pr-4 focus:outline-none focus:ring-1 transition-all placeholder:text-[#444]"
                        style={{
                            backgroundColor: isSolarized ? '#002b36' : '#111',
                            borderColor: borderColor,
                            color: textColor,
                            caretColor: accentColor
                        }}
                        placeholder="Search files, symbols, or run commands..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-[10px] text-[#444] border border-[#333] rounded px-1.5 py-0.5">Ctrl+P</span>
                    </div>
                </div>

                <div className="flex items-center gap-4 w-1/4 justify-end">
                    <Button
                        variant="ghost"
                        className="h-8 px-3 text-xs font-mono text-[#666] hover:bg-opacity-10 border border-transparent transition-all"
                        style={{ '--hover-color': accentColor } as React.CSSProperties}
                        onClick={() => toggleMode()}
                    >
                        [ EXIT ENV ]
                    </Button>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden relative">

                {/* Floating Navigation Strip (Left) */}
                <div className="w-14 border-r flex flex-col items-center py-6 gap-6 z-40 transition-colors duration-300"
                    style={{ backgroundColor: isSolarized ? '#002b36' : '#080808', borderColor: borderColor }}>
                    <div onClick={() => setActiveDevSidebar('explorer')} className={`p-3 rounded-xl cursor-pointer transition-all duration-300 ${activeDevSidebar === 'explorer' ? 'shadow-md' : 'opacity-60 hover:opacity-100'}`} style={{ backgroundColor: activeDevSidebar === 'explorer' ? accentColor : 'transparent', color: activeDevSidebar === 'explorer' ? (isSolarized ? 'white' : 'black') : textColor }}>
                        <Box className="w-5 h-5" />
                    </div>
                    <div onClick={() => setActiveDevSidebar('git')} className={`p-3 rounded-xl cursor-pointer transition-all duration-300 ${activeDevSidebar === 'git' ? 'shadow-md' : 'opacity-60 hover:opacity-100'}`} style={{ backgroundColor: activeDevSidebar === 'git' ? accentColor : 'transparent', color: activeDevSidebar === 'git' ? (isSolarized ? 'white' : 'black') : textColor }}>
                        <GitBranch className="w-5 h-5" />
                    </div>
                    <div onClick={() => setActiveDevSidebar('debug')} className={`p-3 rounded-xl cursor-pointer transition-all duration-300 ${activeDevSidebar === 'debug' ? 'shadow-md' : 'opacity-60 hover:opacity-100'}`} style={{ backgroundColor: activeDevSidebar === 'debug' ? accentColor : 'transparent', color: activeDevSidebar === 'debug' ? (isSolarized ? 'white' : 'black') : textColor }}>
                        <Cpu className="w-5 h-5" />
                    </div>
                    <div onClick={() => setIsTerminalOpen(!isTerminalOpen)} className={`p-3 rounded-xl cursor-pointer transition-all duration-300 ${isTerminalOpen ? 'shadow-md opacity-100' : 'opacity-60 hover:opacity-100'}`} style={{ backgroundColor: isTerminalOpen ? `${accentColor}20` : 'transparent', color: isTerminalOpen ? accentColor : textColor, border: isTerminalOpen ? `1px solid ${accentColor}40` : '1px solid transparent' }}>
                        <Terminal className="w-5 h-5" />
                    </div>
                    <div
                        onClick={() => setIsSettingsOpen(true)}
                        className="mt-auto p-3 hover:text-opacity-100 cursor-pointer transition-colors opacity-60"
                        style={{ color: textColor }}
                    >
                        <Settings className="w-5 h-5" />
                    </div>
                </div>

                {/* Sidebar Content Panel */}
                <div className={`w-72 border-r flex flex-col transition-all duration-500 ease-out z-30 ${activeDevSidebar ? 'translate-x-0' : '-translate-x-72'}`}
                    style={{ backgroundColor: sidebarColor, borderColor: borderColor }}>
                    <div className="h-12 border-b flex items-center px-6" style={{ borderColor: borderColor }}>
                        <span className="font-bold text-sm tracking-wider uppercase opacity-80" style={{ color: textColor }}>
                            {activeDevSidebar === 'explorer' && 'Project Files'}
                            {activeDevSidebar === 'git' && 'Source Control'}
                            {activeDevSidebar === 'debug' && 'System Diagnostics'}
                        </span>
                    </div>

                    <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
                        {/* Explorer Content */}
                        {activeDevSidebar === 'explorer' && renderTree(FILE_TREE)}

                        {/* Git Content */}
                        {activeDevSidebar === 'git' && (
                            <div className="px-4">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-xs text-[#888]">Changes</span>
                                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>3</span>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 p-2 hover:bg-[#111] rounded cursor-pointer text-xs font-mono group" style={{ color: textColor }}>
                                        <span style={{ color: accentColor }}>M</span>
                                        <span>src/components/Hero.tsx</span>
                                        <span className="ml-auto opacity-0 group-hover:opacity-100 text-[#555]">+12 -4</span>
                                    </div>
                                    <div className="flex items-center gap-2 p-2 hover:bg-[#111] rounded cursor-pointer text-xs font-mono group" style={{ color: textColor }}>
                                        <span style={{ color: accentColor }}>M</span>
                                        <span>src/index.css</span>
                                        <span className="ml-auto opacity-0 group-hover:opacity-100 text-[#555]">+56 -2</span>
                                    </div>
                                    <div className="flex items-center gap-2 p-2 hover:bg-[#111] rounded cursor-pointer text-xs font-mono group" style={{ color: textColor }}>
                                        <span className="text-yellow-500">?</span>
                                        <span>src/components/developer/New.ts</span>
                                        <span className="ml-auto opacity-0 group-hover:opacity-100 text-[#555]">Untracked</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Debug Content */}
                        {activeDevSidebar === 'debug' && (
                            <div className="px-4 space-y-6">
                                <div>
                                    <div className="text-xs text-[#555] mb-2 uppercase tracking-wide flex justify-between">
                                        <span>Performance</span>
                                        <span style={{ color: accentColor }}>Online</span>
                                    </div>
                                    <div className="p-3 rounded border font-mono text-[10px] space-y-1 text-[#888]" style={{ backgroundColor: isSolarized ? '#002b36' : '#111', borderColor: borderColor }}>
                                        <div className="flex justify-between"><span>V8 Heap</span><span className="text-[#ccc]">42 MB</span></div>
                                        <div className="flex justify-between"><span>Rendering</span><span className="text-[#ccc]">16.7ms</span></div>
                                        <div className="flex justify-between"><span>Listeners</span><span className="text-[#ccc]">124</span></div>
                                    </div>
                                </div>

                                <div>
                                    <div className="text-xs text-[#555] mb-2 uppercase tracking-wide flex justify-between">
                                        <span>Activity Graph</span>
                                        <span className="text-[10px] lowercase" style={{ color: accentColor }}>last 12 months</span>
                                    </div>
                                    <div className="p-2 rounded border border-[#222] bg-black/40 overflow-hidden">
                                        <div className="grid grid-cols-12 gap-1 px-1">
                                            {Array.from({ length: 48 }).map((_, i) => (
                                                <div
                                                    key={i}
                                                    className={`w-3 h-3 rounded-sm transition-colors duration-500`}
                                                    style={{
                                                        backgroundColor: Math.random() > 0.7 ? (Math.random() > 0.5 ? accentColor : `${accentColor}60`) : '#111',
                                                        opacity: Math.random() > 0.3 ? 1 : 0.3
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="text-xs text-[#555] mb-2 uppercase tracking-wide">System Logs</div>
                                    <div className="p-2 rounded border border-[#222] bg-black font-mono text-[9px] h-32 overflow-hidden relative">
                                        <div className="space-y-1 opacity-60 animate-in fade-in slide-in-from-bottom-2 duration-1000">
                                            <div className="flex gap-2 text-blue-400"><span>[INFO]</span> <span className="text-[#888]">Initializing UI components...</span></div>
                                            <div className="flex gap-2 text-green-400"><span>[SUCCESS]</span> <span className="text-[#888]">Portfolio mode active</span></div>
                                            <div className="flex gap-2 text-blue-400"><span>[INFO]</span> <span className="text-[#888]">Fetching projects from DB...</span></div>
                                            <div className="flex gap-2 text-yellow-400"><span>[WARN]</span> <span className="text-[#888]">High latency detected in Tokyo-1</span></div>
                                            <div className="flex gap-2 text-blue-400"><span>[INFO]</span> <span className="text-[#888]">Compressing assets (72%)...</span></div>
                                            <div className="flex gap-2 text-emerald-400"><span>[READY]</span> <span className="text-[#888]">Developer tools online</span></div>
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black pointer-events-none" />
                                    </div>
                                </div>

                                <div>
                                    <div className="text-xs text-[#555] mb-2 uppercase tracking-wide">Call Stack</div>
                                    <div className="space-y-1">
                                        <div className="text-xs text-[#ccc] font-mono truncate">Development Layout (main)</div>
                                        <div className="text-xs text-[#666] font-mono truncate pl-4">at renderTree (FuturisticDeveloperLayout.tsx:98)</div>
                                        <div className="text-xs text-[#666] font-mono truncate pl-4">at App.render (&lt;anonymous&gt;:1:1)</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 relative overflow-hidden flex flex-col" style={{ backgroundColor: bgColor }}>
                    {/* Decoration Grid */}
                    <div className="absolute inset-0 pointer-events-none opacity-10"
                        style={{
                            backgroundImage: `radial-gradient(${borderColor} 1px, transparent 1px)`,
                            backgroundSize: '20px 20px'
                        }}
                    ></div>

                    {/* Content Container */}
                    <div className="flex-1 overflow-auto custom-scrollbar relative z-10 p-6 md:p-0" style={contentStyle}>
                        {activeFile ? (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                {activeFile.component}
                            </div>
                        ) : (
                            <div className="h-full flex items-center justify-center flex-col" style={{ color: '#333' }}>
                                <Activity className="w-16 h-16 mb-4 animate-pulse" />
                                <div className="text-sm font-mono tracking-widest">SYSTEM IDLE</div>
                            </div>
                        )}
                    </div>

                    {/* Terminal Component with Resize Handle */}
                    {isTerminalOpen && (
                        <div
                            className="border-t relative z-20 transition-all duration-75"
                            style={{
                                borderColor: borderColor,
                                height: `${terminalHeight}px`
                            }}
                        >
                            {/* Resize Handle */}
                            <div
                                className="absolute -top-1 left-0 right-0 h-2 cursor-ns-resize hover:bg-emerald-500/20 z-30 transition-colors"
                                onMouseDown={() => setIsResizing(true)}
                            />
                            <TerminalComponent onClose={() => setIsTerminalOpen(false)} />
                        </div>
                    )}

                    {/* Mock Minimap */}
                    {showMinimap && (
                        <div className="absolute right-4 top-4 w-24 h-64 border rounded opacity-50 pointer-events-none hidden lg:block" style={{ borderColor: borderColor, backgroundColor: sidebarColor }}>
                            <div className="w-full h-2 bg-current opacity-20 mt-2 mb-1 mx-auto" style={{ width: '80%' }}></div>
                            <div className="w-full h-2 bg-current opacity-20 mb-1 mx-auto" style={{ width: '60%' }}></div>
                            <div className="w-full h-2 bg-current opacity-20 mb-4 mx-auto" style={{ width: '70%' }}></div>
                            <div className="w-full h-8 bg-current opacity-10 mb-2"></div>
                            <div className="w-full h-2 bg-current opacity-20 mb-1 mx-auto" style={{ width: '50%' }}></div>
                        </div>
                    )}
                </div>

                {/* Settings Modal */}
                {isSettingsOpen && (
                    <div className="absolute inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                        <div className="w-96 border rounded-lg shadow-[0_0_30px_rgba(0,0,0,0.8)] overflow-hidden" style={{ backgroundColor: sidebarColor, borderColor: borderColor }}>
                            <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: borderColor, backgroundColor: isSolarized ? '#073642' : '#0f0f0f' }}>
                                <span className="text-sm font-bold" style={{ color: textColor }}>Environment Settings</span>
                                <button onClick={() => setIsSettingsOpen(false)} className="text-[#666] hover:text-white transition-colors">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="p-4 space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs text-[#888] uppercase tracking-wider font-mono">Theme</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <button
                                            onClick={() => setDevTheme('void')}
                                            className={`px-3 py-2 rounded border text-xs font-mono transition-all ${devTheme === 'void' ? 'bg-[#00ff9d]/10 border-[#00ff9d] text-[#00ff9d]' : 'bg-[#111] border-[#333] text-[#666]'}`}
                                        >Void Safe</button>
                                        <button
                                            onClick={() => setDevTheme('solarized')}
                                            className={`px-3 py-2 rounded border text-xs font-mono transition-all ${devTheme === 'solarized' ? 'bg-[#b58900]/10 border-[#b58900] text-[#b58900]' : 'bg-[#111] border-[#333] text-[#666]'}`}
                                        >Solarized</button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs text-[#888] uppercase tracking-wider font-mono">Font Size</label>
                                    <div className="flex items-center bg-[#111] rounded border border-[#333] p-1">
                                        <button onClick={() => setFontSize(Math.max(10, fontSize - 1))} className="flex-1 py-1 hover:bg-[#222] rounded text-xs text-[#ccc]">-</button>
                                        <span className="flex-1 text-center text-xs font-mono" style={{ color: accentColor }}>{fontSize}px</span>
                                        <button onClick={() => setFontSize(Math.min(24, fontSize + 1))} className="flex-1 py-1 hover:bg-[#222] rounded text-xs text-[#ccc]">+</button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between p-2 rounded hover:bg-[#111] cursor-pointer" onClick={() => setShowMinimap(!showMinimap)}>
                                        <span className="text-sm text-[#ccc]">Show Minimap</span>
                                        <div className={`w-8 h-4 rounded-full relative transition-colors ${showMinimap ? 'bg-[#00ff9d]' : 'bg-[#333]'}`}>
                                            <div className={`absolute top-0.5 w-3 h-3 bg-black rounded-full transition-all ${showMinimap ? 'right-0.5' : 'left-0.5'}`}></div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between p-2 rounded hover:bg-[#111] cursor-pointer" onClick={() => setIsMatrixEnabled(!isMatrixEnabled)}>
                                        <span className="text-sm text-[#ccc]">Matrix Mode</span>
                                        <div className={`w-8 h-4 rounded-full relative transition-colors ${isMatrixEnabled ? 'bg-[#00ff9d]' : 'bg-[#333]'}`}>
                                            <div className={`absolute top-0.5 w-3 h-3 bg-black rounded-full transition-all ${isMatrixEnabled ? 'right-0.5' : 'left-0.5'}`}></div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between p-2 rounded hover:bg-[#111]">
                                        <span className="text-sm text-[#ccc]">Telemetry</span>
                                        <div className="w-8 h-4 bg-[#333] rounded-full relative"><div className="absolute left-0.5 top-0.5 w-3 h-3 bg-[#666] rounded-full"></div></div>
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 py-3 border-t text-center" style={{ borderColor: borderColor, backgroundColor: isSolarized ? '#073642' : '#0f0f0f' }}>
                                <span className="text-[10px] text-[#444] font-mono">v2.4.0 (Stable)</span>
                            </div>
                        </div>
                    </div>
                )}

            </div>

            {/* Minimal Status Bar */}
            <div className="h-6 border-t flex items-center justify-between px-4 text-[10px] font-mono text-[#666] select-none"
                style={{ backgroundColor: sidebarColor, borderColor: borderColor }}>
                <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1" style={{ color: accentColor }}><GitBranch className="w-3 h-3" /> main</span>
                    <button
                        onClick={() => setIsTerminalOpen(!isTerminalOpen)}
                        className={`flex items-center gap-1 hover:text-white transition-colors cursor-pointer ${isTerminalOpen ? 'text-emerald-500' : 'text-[#666]'}`}
                    >
                        <Terminal className="w-3 h-3" />
                        {isTerminalOpen ? 'Terminal Active' : 'Open Terminal'}
                    </button>
                    <button
                        onClick={() => setIsMatrixEnabled(!isMatrixEnabled)}
                        className={`flex items-center gap-1 hover:text-white transition-colors cursor-pointer ${isMatrixEnabled ? 'text-[#00ff9d]' : 'text-[#666]'}`}
                    >
                        <Zap className={`w-3 h-3 ${isMatrixEnabled ? 'animate-pulse' : ''}`} />
                        Matrix: {isMatrixEnabled ? 'ON' : 'OFF'}
                    </button>
                    <button
                        onClick={() => setActiveDevSidebar(activeDevSidebar === 'debug' ? 'explorer' : 'debug')}
                        className={`flex items-center gap-1 hover:text-white transition-colors cursor-pointer ${activeDevSidebar === 'debug' ? 'text-blue-400' : 'text-[#666]'}`}
                    >
                        <Cpu className="w-3 h-3" />
                        Diagnostics
                    </button>
                </div>
                <div className="flex items-center gap-4">
                    <span>Ln 42, Col 12</span>
                    <span>UTF-8</span>
                </div>
            </div>
        </div>
    );
}
