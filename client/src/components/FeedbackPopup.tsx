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
    const [hasInteracted, setHasInteracted] = useState(false);

    // Auto-show logic: 10 seconds delay
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!hasInteracted) {
                setIsOpen(true);
            }
        }, 10000); // 10 seconds

        return () => clearTimeout(timer);
    }, [hasInteracted]);

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
            // Map to existing Google Sheet columns: name, email, subject, message, timestamp
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
            setHasInteracted(true);
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
        setIsOpen(false);
        setHasInteracted(true);
    };

    return (
        <div className="fixed bottom-4 right-4 z-[100] flex flex-col items-end pointer-events-none">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl shadow-orange-500/10 w-80 overflow-hidden pointer-events-auto"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-b border-neutral-800 p-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 bg-orange-500/20 rounded-lg">
                                    <MessageSquare className="w-4 h-4 text-orange-500" />
                                </div>
                                <span className="font-bold text-white text-sm">Feedback</span>
                            </div>
                            <button
                                onClick={handleClose}
                                className="text-neutral-500 hover:text-white transition-colors"
                                aria-label="Close feedback"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Body */}
                        <form onSubmit={handleSubmit} className="p-4 space-y-4">
                            <p className="text-sm text-neutral-400">
                                Helping me improve means a lot! How would you rate your experience?
                            </p>

                            {/* Star Rating */}
                            <div className="flex justify-center gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        className={`transition-all duration-200 hover:scale-110 ${rating >= star ? 'text-yellow-400 fill-yellow-400' : 'text-neutral-600'}`}
                                    >
                                        <Star className="w-6 h-6" />
                                    </button>
                                ))}
                            </div>

                            {/* Textarea */}
                            <Textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Any suggestions or bugs?"
                                className="bg-neutral-950 border-neutral-800 text-sm min-h-[80px] text-white resize-none focus:ring-orange-500/50"
                            />

                            {/* Submit */}
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-white text-black hover:bg-neutral-200 font-bold transition-all"
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

            {/* Trigger Button (if closed but want to re-open? Optional based on "indirectly forced") 
          The user said "indirectly forced", so maybe NO trigger button. Once closed, it's gone? 
          Or maybe a small bubble remains. Let's stick to "Once closed, it's gone" for now to check UX.
          Actually, let's add a small bubble just in case they closed it by accident, or if they want to give feedback later.
      */}
            {!isOpen && !hasInteracted && (
                // Hidden state waiting for timer
                null
            )}

            {/* Persistent bubble if closed? User said "close button", implying it goes away.
           "Indirectly forced" -> Show it aggressively.
           Let's just keep the popup logic for now.
       */}
        </div>
    );
}
