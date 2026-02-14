import * as React from "react";
import { useState, useEffect } from "react";
import { X, MessageSquare, Send, Star, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbwkpcsN6mih7UX8CMhHeoyq22p4laAXwpg-ZsdjgpXDSQjGSkDHfv7sOivD0or5H3bc/exec";

export function FeedbackPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();
    const [hasSubmitted, setHasSubmitted] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('feedback_submitted') === 'true';
        }
        return false;
    });

    const [lastClosedAt, setLastClosedAt] = useState(() => {
        if (typeof window !== 'undefined') {
            return parseInt(localStorage.getItem('feedback_last_closed') || '0');
        }
        return 0;
    });

    // Auto-show logic: 40 seconds delay OR 80% scroll with 5-min cooldown
    useEffect(() => {
        if (hasSubmitted || isOpen) return;

        const checkCooldown = () => {
            if (lastClosedAt === 0) return true; // First time ever
            const now = Date.now();
            const cooldownMs = 5 * 60 * 1000; // 5 minutes
            return (now - lastClosedAt) > cooldownMs;
        };

        // 1. Time-on-site trigger (40 seconds)
        const timer = setTimeout(() => {
            if (!hasSubmitted && !isOpen && checkCooldown()) {
                setIsOpen(true);
            }
        }, 40000);

        // 2. Scroll percentage trigger (80%)
        const handleScroll = (e?: any) => {
            if (hasSubmitted || isOpen || !checkCooldown()) return;

            // Detect the actual scrollable element
            // In normal mode it's documentElement, in dev mode it might be a specific container
            const target = e?.target === document ? document.documentElement : (e?.target || document.documentElement);
            const scrollHeight = target.scrollHeight - target.clientHeight;
            const currentScroll = target.scrollTop || window.scrollY;

            if (scrollHeight <= 0) return;

            const scrolled = (currentScroll / scrollHeight) * 100;

            if (scrolled >= 80) {
                setIsOpen(true);
            }
        };

        // Capture: true is essential to catch scroll events from any nested container
        window.addEventListener('scroll', handleScroll, { passive: true, capture: true });

        return () => {
            clearTimeout(timer);
            window.removeEventListener('scroll', handleScroll, { capture: true });
        };
    }, [hasSubmitted, isOpen, lastClosedAt]);

    const handleDismiss = () => {
        const now = Date.now();
        setLastClosedAt(now);
        localStorage.setItem('feedback_last_closed', now.toString());
        setIsOpen(false);
    };

    const handleSubmissionSuccess = () => {
        setHasSubmitted(true);
        localStorage.setItem('feedback_submitted', 'true');
        setIsOpen(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0) {
            toast({
                title: "Rating required",
                description: "Please select a star rating to submit.",
                variant: "destructive",
            });
            return;
        }

        setIsSubmitting(true);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name', "Anonymous Visitor");
            formDataToSend.append('email', "no-reply@feedback.com");
            formDataToSend.append('subject', `Site Feedback - ${rating} Stars`);
            formDataToSend.append('message', `Rating: ${rating}/5\n\nFeedback: ${message}`);
            formDataToSend.append('timestamp', new Date().toISOString());

            await fetch(GOOGLE_SHEET_URL, {
                method: 'POST',
                body: formDataToSend,
            });

            toast({
                title: "Thank you!",
                description: "Your feedback helps me improve.",
                variant: "default",
                className: "bg-green-600 text-white border-none"
            });

            setIsOpen(false);
            handleSubmissionSuccess();
            setMessage("");
            setRating(0);
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to send feedback. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        handleDismiss();
    };

    const togglePopup = () => {
        if (isOpen) {
            handleDismiss();
        } else {
            setIsOpen(true);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-[100] flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9, transformOrigin: 'bottom right' }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="bg-neutral-900/95 backdrop-blur-md border border-neutral-800 rounded-2xl shadow-2xl shadow-orange-500/10 w-[min(calc(100vw-2rem),20rem)] overflow-hidden mb-4"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border-b border-neutral-800 p-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 bg-orange-500/20 rounded-lg">
                                    <MessageSquare className="w-4 h-4 text-orange-500" />
                                </div>
                                <span className="font-bold text-white text-sm">Feedback</span>
                            </div>
                            <button
                                onClick={handleClose}
                                className="text-neutral-500 hover:text-white transition-colors p-1"
                                aria-label="Close feedback"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Body */}
                        <form onSubmit={handleSubmit} className="p-4 space-y-4">
                            <p className="text-sm text-neutral-400">
                                How would you rate your experience?
                            </p>

                            {/* Star Rating */}
                            <div className="flex justify-center gap-2 py-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        className={`transition-all duration-200 hover:scale-125 ${rating >= star ? 'text-yellow-400 fill-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]' : 'text-neutral-700'}`}
                                    >
                                        <Star className="w-7 h-7" />
                                    </button>
                                ))}
                            </div>

                            {/* Textarea */}
                            <Textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Any suggestions or bugs?"
                                className="bg-neutral-950/50 border-neutral-800 text-sm min-h-[100px] text-white resize-none focus:ring-orange-500/50 transition-all"
                            />

                            {/* Submit */}
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 font-bold transition-all h-11 rounded-xl shadow-lg shadow-orange-500/20"
                            >
                                {isSubmitting ? (
                                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                ) : (
                                    <Send className="w-4 h-4 mr-2" />
                                )}
                                Send Feedback
                            </Button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Trigger Bubble */}
            <motion.button
                onClick={togglePopup}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                    p-4 rounded-full shadow-2xl transition-all duration-300
                    ${isOpen
                        ? 'bg-neutral-800 text-neutral-400 rotate-90'
                        : 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-orange-500/20 hover:shadow-orange-500/40'
                    }
                `}
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
            </motion.button>
        </div>
    );
}
