import * as React from "react";
import { useState, useRef, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Download,
    ExternalLink,
    X,
    Maximize2,
    Loader2,
    Copy,
    Check,
    Search,
    Plus,
    Minus,
    RotateCcw,
    ChevronLeft,
    ChevronRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Document, Page, pdfjs } from 'react-pdf';

// Component Styles for PDF Layers
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set worker using Vite's native URL resolution for maximum compatibility
// Set worker using a version-synced CDN URL to avoid local caching and version mismatch issues
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface CVPreviewModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    cvUrl: string;
}

export function CVPreviewModal({ isOpen, onOpenChange, cvUrl }: CVPreviewModalProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [showFallback, setShowFallback] = useState(false);
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [scale, setScale] = useState(1.0);
    const [searchText, setSearchText] = useState("");
    const [isCopied, setIsCopied] = useState(false);
    const { toast } = useToast();

    // Fallback timer if PDF takes too long to load
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isOpen && isLoading) {
            timer = setTimeout(() => {
                if (isLoading) setShowFallback(true);
            }, 8000); // 8 seconds timeout
        }
        return () => clearTimeout(timer);
    }, [isOpen, isLoading]);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
        setIsLoading(false);
    }

    function onDocumentLoadError(error: Error) {
        console.error("PDF Load Error:", error);
        setLoadError(error.message);
        setIsLoading(false);
        toast({
            title: "Hydration Failed",
            description: "The interactive engine encountered an error. Falling back to direct view.",
            variant: "destructive"
        });
    }

    const zoomIn = () => setScale(prev => Math.min(prev + 0.2, 3.0));
    const zoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.5));
    const resetZoom = () => setScale(1.0);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(window.location.origin + cvUrl);
            setIsCopied(true);
            toast({
                title: "Link Copied",
                description: "The CV link has been copied to your clipboard.",
            });
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy!", err);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-6xl w-[98vw] h-[95vh] bg-neutral-950 border-neutral-800 p-0 overflow-hidden flex flex-col shadow-2xl gap-0">
                <DialogHeader className="p-4 border-b border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4 bg-neutral-900/80 backdrop-blur-xl sticky top-0 z-50">
                    <div className="flex flex-col flex-shrink-0">
                        <DialogTitle className="text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent leading-none">
                            Interactive CV Preview
                        </DialogTitle>
                        <DialogDescription className="text-neutral-500 text-[10px] font-mono mt-2 hidden xs:block">
                            Engine: PDF.js • Mode: Interactive
                        </DialogDescription>
                    </div>

                    {/* Pro Controls: Search & Zoom */}
                    <div className="flex flex-wrap items-center justify-center gap-3 bg-neutral-950/50 p-2 rounded-2xl border border-neutral-800/50">
                        <div className="flex items-center gap-1 bg-black/40 rounded-xl px-2 border border-neutral-800">
                            <Search className="w-4 h-4 text-neutral-500 ml-1" />
                            <Input
                                placeholder="Search text..."
                                className="w-32 md:w-48 bg-transparent border-none focus-visible:ring-0 text-xs h-8 text-neutral-300 placeholder:text-neutral-600"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center gap-1 bg-black/40 rounded-xl p-1 border border-neutral-800">
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-neutral-400 hover:text-white" onClick={zoomOut}>
                                <Minus className="w-4 h-4" />
                            </Button>
                            <span className="text-[10px] font-mono w-12 text-center text-neutral-400">
                                {Math.round(scale * 100)}%
                            </span>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-neutral-400 hover:text-white" onClick={zoomIn}>
                                <Plus className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-neutral-400 hover:text-orange-500" onClick={resetZoom} title="Reset">
                                <RotateCcw className="w-4 h-4" />
                            </Button>
                        </div>

                        {numPages && numPages > 1 && (
                            <div className="flex items-center gap-2 bg-black/40 rounded-xl p-1 border border-neutral-800">
                                <Button variant="ghost" size="icon" className="h-7 w-7 text-neutral-400" disabled={pageNumber <= 1} onClick={() => setPageNumber(prev => prev - 1)}>
                                    <ChevronLeft className="w-4 h-4" />
                                </Button>
                                <span className="text-[10px] font-mono text-neutral-400">
                                    {pageNumber} / {numPages}
                                </span>
                                <Button variant="ghost" size="icon" className="h-7 w-7 text-neutral-400" disabled={pageNumber >= (numPages || 1)} onClick={() => setPageNumber(prev => prev + 1)}>
                                    <ChevronRight className="w-4 h-4" />
                                </Button>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-neutral-400 hover:text-white hover:bg-neutral-800 h-9 w-9"
                            onClick={copyToClipboard}
                            title="Copy Link"
                        >
                            {isCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                        </Button>

                        <a
                            href={cvUrl}
                            download
                            className="flex items-center gap-2 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-lg shadow-orange-500/10 h-9"
                        >
                            <Download className="h-4 w-4" />
                            <span className="hidden sm:inline">Download</span>
                        </a>

                        <div className="w-px h-6 bg-neutral-800 mx-1 hidden xs:block" />

                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-neutral-400 hover:text-white hover:bg-neutral-800 h-9 w-9"
                            onClick={() => onOpenChange(false)}
                            title="Close"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </DialogHeader>

                <div className="flex-1 bg-neutral-900 overflow-auto relative custom-scrollbar flex justify-center p-4 md:p-8">
                    {isLoading && !loadError && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-950 z-10 gap-6 p-8 text-center">
                            <Loader2 className="h-10 w-10 text-orange-500 animate-spin" />
                            <div className="space-y-2">
                                <p className="text-neutral-400 text-xs font-mono animate-pulse uppercase tracking-[0.3em]">Hydrating Document Tree...</p>
                                {showFallback && (
                                    <div className="mt-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                                        <p className="text-neutral-600 text-[10px] max-w-xs mx-auto mb-4">
                                            The interactive engine is taking longer than expected. You can try the direct view instead.
                                        </p>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="border-neutral-800 text-neutral-400 hover:text-white"
                                            onClick={() => window.open(cvUrl, "_blank")}
                                        >
                                            <ExternalLink className="w-3 h-3 mr-2" />
                                            Open Direct View
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {(loadError || (showFallback && !isLoading)) && !numPages && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-950 z-20 gap-4 p-8 text-center">
                            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-2">
                                <X className="w-8 h-8 text-red-500" />
                            </div>
                            <h3 className="text-lg font-bold text-white">Interactive Engine Offline</h3>
                            <p className="text-neutral-500 text-sm max-w-sm">
                                We couldn't start the advanced PDF viewer. Use the direct view or download the file.
                            </p>
                            <div className="flex gap-3 mt-4">
                                <Button
                                    className="bg-neutral-800 hover:bg-neutral-700 text-white"
                                    onClick={() => {
                                        setLoadError(null);
                                        setShowFallback(false);
                                        setIsLoading(true);
                                    }}
                                >
                                    <RotateCcw className="w-4 h-4 mr-2" />
                                    Retry
                                </Button>
                                <Button
                                    variant="outline"
                                    className="border-neutral-800 text-neutral-400 hover:text-white"
                                    onClick={() => window.open(cvUrl, "_blank")}
                                >
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    Open Direct
                                </Button>
                            </div>
                        </div>
                    )}

                    <div className="shadow-2xl shadow-black/50 transition-transform duration-300" style={{ transformOrigin: 'center top' }}>
                        <Document
                            file={cvUrl}
                            onLoadSuccess={onDocumentLoadSuccess}
                            onLoadError={onDocumentLoadError}
                            onSourceError={(error) => console.error("PDF Source Error:", error)}
                            loading={null}
                            className="flex flex-col gap-4"
                        >
                            <Page
                                pageNumber={pageNumber}
                                scale={scale}
                                loading={null}
                                customTextRenderer={({ str }) => {
                                    if (!searchText) return str;
                                    const escapedSearch = searchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                                    return str.replace(
                                        new RegExp(`(${escapedSearch})`, 'gi'),
                                        '<mark style="background-color: #f97316; color: white; border-bottom: 2px solid #fb923c; border-radius: 2px; padding: 0 2px;">$1</mark>'
                                    );
                                }}
                                className="bg-neutral-800 rounded-sm overflow-hidden"
                            />
                        </Document>
                    </div>

                    {!isLoading && (
                        <div className="absolute top-4 right-4 flex items-center justify-center pointer-events-none z-20">
                            <div className="bg-orange-500/10 backdrop-blur-md border border-orange-500/20 px-4 py-1.5 rounded-full">
                                <p className="text-orange-400 text-[10px] font-mono uppercase tracking-[0.2em] animate-pulse">
                                    Virtual Sandbox Active
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
