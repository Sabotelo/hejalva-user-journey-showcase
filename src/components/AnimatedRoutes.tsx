import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Index from "@/pages/Index";
import Contact from "@/pages/Contact";
import Dashboard from "@/pages/Dashboard";
import Demo from "@/pages/Demo";
import HowItWorks from "@/pages/HowItWorks";
import NotFound from "@/pages/NotFound";

// Memphis-inspired spring transition
const pageTransition = {
  type: "spring",
  stiffness: 260,
  damping: 25,
};

const pageVariants = {
  initial: {
    opacity: 0,
    y: 30,
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: pageTransition,
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.99,
    transition: {
      duration: 0.25,
      ease: "easeInOut",
    },
  },
};

// Wrapper component for animated pages
const AnimatedPage = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    className="min-h-screen"
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <AnimatedPage>
              <Index />
            </AnimatedPage>
          }
        />
        <Route
          path="/contact"
          element={
            <AnimatedPage>
              <Contact />
            </AnimatedPage>
          }
        />
        <Route
          path="/demo"
          element={
            <AnimatedPage>
              <Demo />
            </AnimatedPage>
          }
        />
        <Route
          path="/how-it-works"
          element={
            <AnimatedPage>
              <HowItWorks />
            </AnimatedPage>
          }
        />
        <Route
          path="/dashboard"
          element={
            <AnimatedPage>
              <Dashboard />
            </AnimatedPage>
          }
        />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route
          path="*"
          element={
            <AnimatedPage>
              <NotFound />
            </AnimatedPage>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
