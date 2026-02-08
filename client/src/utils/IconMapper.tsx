import {
    Code2, Wrench, Database, Rocket, BookOpen, LayoutTemplate, Smartphone, Server, Cloud,
    Terminal, Globe, Cpu, Layers, Box, GitBranch, Monitor, HardDrive, Wifi, Command,
    Hash, FileJson, Coffee, Chrome, Figma, Github, Linkedin, Mail, Brain, LineChart
} from "lucide-react";
import {
    FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJs, FaPython, FaJava, FaDocker,
    FaAws, FaGitAlt, FaLinux, FaSass, FaBootstrap, FaWordpress, FaPhp
} from "react-icons/fa";
import {
    SiTypescript, SiMongodb, SiPostgresql, SiMysql, SiFirebase, SiTailwindcss,
    SiNextdotjs, SiVite, SiRedux, SiGraphql, SiExpress, SiNestjs, SiPrisma,
    SiDrizzle, SiSupabase, SiNetlify, SiVercel, SiCplusplus, SiPostman
} from "react-icons/si";
import { Bot } from "lucide-react";

export const IconMapper = ({ name, className }: { name: string; className?: string }) => {
    const normalizedName = name.toLowerCase().replace(/\s+/g, '');

    const iconMap: { [key: string]: any } = {
        // Lucide Defaults
        "code": Code2,
        "tools": Wrench,
        "database": Database,
        "rocket": Rocket,
        "book": BookOpen,
        "layout": LayoutTemplate,
        "mobile": Smartphone,
        "server": Server,
        "cloud": Cloud,
        "terminal": Terminal,

        // Specific Tech (FontAwesome / SimpleIcons)
        "react": FaReact,
        "reactjs": FaReact,
        "node": FaNodeJs,
        "nodejs": FaNodeJs,
        "html": FaHtml5,
        "html5": FaHtml5,
        "css": FaCss3Alt,
        "css3": FaCss3Alt,
        "javascript": FaJs,
        "js": FaJs,
        "typescript": SiTypescript,
        "ts": SiTypescript,
        "python": FaPython,
        "java": FaJava,
        "c++": SiCplusplus,
        "cpp": SiCplusplus,
        "c#": SiCplusplus, // Fallback as SiCsharp might be missing in this version
        "csharp": SiCplusplus,
        "php": FaPhp,

        // Frameworks & Libs
        "next": SiNextdotjs,
        "nextjs": SiNextdotjs,
        "vite": SiVite,
        "tailwind": SiTailwindcss,
        "tailwindcss": SiTailwindcss,
        "bootstrap": FaBootstrap,
        "sass": FaSass,
        "redux": SiRedux,
        "express": SiExpress,
        "nest": SiNestjs,
        "django": FaPython, // Fallback

        // Databases
        "mongo": SiMongodb,
        "mongodb": SiMongodb,
        "postgres": SiPostgresql,
        "postgresql": SiPostgresql,
        "mysql": SiMysql,
        "firebase": SiFirebase,
        "supabase": SiSupabase,
        "prisma": SiPrisma,
        "drizzle": SiDrizzle,

        // Tools
        "git": FaGitAlt,
        "github": Github,
        "docker": FaDocker,
        "aws": FaAws,
        "linux": FaLinux,
        "netlify": SiNetlify,
        "vercel": SiVercel,
        "figma": Figma,
        "wordpress": FaWordpress,
        "postman": SiPostman, // Ensure import
        "mysqlworkbench": SiMysql, // Use MySQL icon for workbench
        "aitools": Bot,
        "ai": Brain,
        "ml": Brain,
        "aiml": Brain,
        "datascience": LineChart,
        "restapi": Globe,
        "devops": Rocket,
        "systemdesign": Layers,
    };

    const IconComponent = iconMap[normalizedName] || Code2; // Default to Code2 if not found

    return <IconComponent className={className} />;
};
