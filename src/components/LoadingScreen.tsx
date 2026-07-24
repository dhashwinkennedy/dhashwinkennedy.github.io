import { motion } from "motion/react";

export default function LoadingScreen() {
  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      <div className="loading-orb loading-orb--one" />
      <div className="loading-orb loading-orb--two" />
      <motion.div
        className="loading-mark"
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        DK
      </motion.div>
      <div className="loading-copy">
        <p>R Dhashwin Kennedy</p>
        <span>Preparing your experience</span>
      </div>
      <div className="loading-progress" aria-hidden="true">
        <motion.span
          animate={{ width: ["8%", "76%", "92%"] }}
          transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        />
      </div>
    </motion.div>
  );
}
