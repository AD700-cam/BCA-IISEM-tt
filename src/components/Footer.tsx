import { motion } from 'framer-motion';

export function Footer() {
    return (
        <footer className="mt-auto py-8">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col items-center justify-center gap-2"
            >
                <div className="h-px w-12 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
                <p className="text-gray-500 text-xs sm:text-sm font-medium tracking-wide">
                    made by <span className="text-blue-400/80 font-bold">devAD0</span> for Section D
                </p>
            </motion.div>
        </footer>
    );
}
