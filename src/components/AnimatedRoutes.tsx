import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Terms from "@/pages/Terms";
import NotFound from "@/pages/NotFound";

const pageTransition = {
  type: "spring",
  stiffness: 260,
  damping: 25,
};

const pageVariants = {
  initial: { opacity: 0, y: 30, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1, transition: pageTransition },
  exit: { opacity: 0, y: -20, scale: 0.99, transition: { duration: 0.25, ease: "easeInOut" } },
};

const AnimatedPage = ({ children }: { children: React.ReactNode }) => (
  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="min-h-screen">
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AnimatedPage><Index /></AnimatedPage>} />
        <Route path="/about" element={<AnimatedPage><About /></AnimatedPage>} />
        <Route path="/terms" element={<AnimatedPage><Terms /></AnimatedPage>} />
        {/* Redirect old routes */}
        <Route path="/contact" element={<AnimatedPage><Index /></AnimatedPage>} />
        <Route path="/demo" element={<AnimatedPage><Index /></AnimatedPage>} />
        <Route path="/how-it-works" element={<AnimatedPage><Index /></AnimatedPage>} />
        <Route path="*" element={<AnimatedPage><NotFound /></AnimatedPage>} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
