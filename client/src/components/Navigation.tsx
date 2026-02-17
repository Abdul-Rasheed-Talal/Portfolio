import * as React from "react";
import { useState, useEffect } from "react";
import { useMode } from "@/context/ModeContext";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Download, ChevronDown, Terminal, Eye, FileText } from "lucide-react";
import { CVPreviewModal } from "./CVPreviewModal";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

import heroData from "../content/hero.json";

const navItems = heroData.navItems || [
  { href: "#home", label: "HOME" },
  { href: "#projects", label: "PROJECTS" },
  { href: "#skills", label: "EXPERTISE" },
  { href: "#lab", label: "LAB" },
  { href: "#about", label: "STORY" },
  { href: "#contact", label: "CONNECT" },
];

export function Navigation() {
  const { mode, toggleMode, isCVModalOpen, setIsCVModalOpen } = useMode();
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const cvUrl = heroData.resumeUrl || "/assets/Abdul-Rasheed-internship-CV.pdf";
  const { toast } = useToast();

  // Check for mobile and disable dev mode


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navItems.map(item => item.href.substring(1));
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.substring(1));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleModeToggle = () => {
    if (window.innerWidth < 768) {
      toast({
        title: "Desktop Only Feature",
        description: "Developer Mode is only available on larger screens for the best experience.",
        variant: "destructive",
      });
      return;
    }
    toggleMode();
  };

  // Normal Mode Navigation
  return (
    <React.Fragment>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
        ? "bg-black/80 backdrop-blur-md border-b border-neutral-800"
        : "bg-transparent"
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="font-mono text-xl md:text-2xl font-bold tracking-tighter cursor-pointer group">
                <span className="text-neutral-500 group-hover:text-orange-500 transition-colors">{"<"}</span>
                <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">AR</span>
                <span className="text-neutral-500 group-hover:text-orange-500 transition-colors">{"/>"}</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className={`nav-link text-sm uppercase tracking-wider text-neutral-400 hover:text-orange-400 transition-colors ${activeSection === item.href.substring(1) ? "text-orange-400 font-medium" : ""
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-3 md:space-x-4">
              {/* Dev Mode Toggle */}
              <button
                onClick={handleModeToggle}
                className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-md transition-all duration-300"
                title="Switch to Developer Mode"
              >
                <Terminal className="w-5 h-5" />
              </button>

              {/* CV Options Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg shadow-orange-500/20"
                  >
                    <Download className="h-4 w-4" />
                    <span>Resume</span>
                    <ChevronDown className="h-3 w-3 opacity-50" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-neutral-900 border-neutral-800 text-neutral-200 w-44">
                  <DropdownMenuItem
                    className="hover:bg-neutral-800 focus:bg-neutral-800 cursor-pointer py-2.5"
                    onClick={() => setIsCVModalOpen(true)}
                  >
                    <Eye className="w-4 h-4 text-orange-400" />
                    <span>Preview CV</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-neutral-800 focus:bg-neutral-800 cursor-pointer py-2.5" asChild>
                    <a href={cvUrl} download className="flex items-center gap-2">
                      <Download className="w-4 h-4 text-orange-400" />
                      <span>Download CV</span>
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden rounded-lg bg-neutral-900 border border-neutral-700 hover:border-orange-500"
                  >
                    <Menu className="h-5 w-5 text-white" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-black border-neutral-800">
                  <div className="flex flex-col space-y-4 mt-8">
                    {navItems.map((item) => (
                      <button
                        key={item.href}
                        onClick={() => scrollToSection(item.href)}
                        className="text-left py-2 text-neutral-300 hover:text-orange-400 transition-colors"
                      >
                        {item.label}
                      </button>
                    ))}
                    <button
                      onClick={() => setIsCVModalOpen(true)}
                      className="flex items-center space-x-2 bg-neutral-900 border border-neutral-700 text-white px-4 py-3 rounded-lg font-medium mt-4 justify-center hover:border-orange-500 transition-all"
                    >
                      <Eye className="h-4 w-4 text-orange-400" />
                      <span>Preview Resume</span>
                    </button>
                    <a
                      href={cvUrl}
                      download
                      className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-3 rounded-lg font-medium justify-center"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download Resume</span>
                    </a>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
      <CVPreviewModal
        isOpen={isCVModalOpen}
        onOpenChange={setIsCVModalOpen}
        cvUrl={cvUrl}
      />
    </React.Fragment>
  );
}
