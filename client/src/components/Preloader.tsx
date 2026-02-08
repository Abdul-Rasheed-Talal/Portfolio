import { motion } from 'framer-motion';

export default function Preloader() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                className="flex flex-col items-center gap-4"
            >
                <div className="h-16 w-16 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                <h2 className="text-xl font-bold text-primary animate-pulse">Loading...</h2>
            </motion.div>
        </div>
    );
}
