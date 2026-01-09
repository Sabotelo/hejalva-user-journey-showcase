import { motion, Variants, HTMLMotionProps, useReducedMotion } from "framer-motion";
import { ReactNode, forwardRef, useMemo } from "react";
import { cn } from "@/lib/utils";

// Memphis-inspired spring config for bouncy, playful animations
// Optimized for 60fps performance
const memphisSpring = {
  type: "spring" as const,
  stiffness: 300,
  damping: 20,
  mass: 0.8, // Lower mass for faster animations
};

const smoothSpring = {
  type: "spring" as const,
  stiffness: 200,
  damping: 25,
  mass: 0.8,
};

// GPU-accelerated transform defaults
const gpuAcceleratedStyle = {
  willChange: "transform, opacity",
  transform: "translateZ(0)",
} as const;

// ============ SCROLL ANIMATIONS ============

interface ScrollAnimationProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  variant?: "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight" | "scale" | "blur" | "bounceUp" | "slideUp";
  once?: boolean;
  amount?: number;
}

const variants: Record<string, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  },
  bounceUp: {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: memphisSpring
    },
  },
  slideUp: {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
  },
};

export const ScrollAnimation = ({
  children,
  className,
  delay = 0,
  duration = 0.6,
  variant = "fadeUp",
  once = true,
  amount = 0.2,
}: ScrollAnimationProps) => {
  const shouldReduceMotion = useReducedMotion();
  
  // Memoize variants to prevent unnecessary recalculations
  const selectedVariant = useMemo(() => variants[variant], [variant]);
  
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn("motion-optimized", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={selectedVariant}
      style={gpuAcceleratedStyle}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

// ============ STAGGER CONTAINERS ============

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
  amount?: number;
}

export const StaggerContainer = ({
  children,
  className,
  staggerDelay = 0.1,
  once = true,
  amount = 0.2,
}: StaggerContainerProps) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({
  children,
  className,
  variant = "fadeUp",
}: {
  children: ReactNode;
  className?: string;
  variant?: "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight" | "scale" | "blur" | "bounceUp";
}) => {
  const selectedVariant = useMemo(() => variants[variant], [variant]);
  
  return (
    <motion.div
      className={cn("motion-optimized", className)}
      variants={selectedVariant}
      style={gpuAcceleratedStyle}
      transition={smoothSpring}
    >
      {children}
    </motion.div>
  );
};

// ============ INTERACTIVE CARDS ============

interface InteractiveCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  hoverEffect?: "lift" | "tilt" | "glow" | "bounce" | "memphis";
}

export const InteractiveCard = forwardRef<HTMLDivElement, InteractiveCardProps>(
  ({ children, className, hoverEffect = "lift", ...props }, ref) => {
    const shouldReduceMotion = useReducedMotion();
    
    const hoverVariants = {
      lift: {
        y: -8,
        boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.3)",
        transition: smoothSpring,
      },
      tilt: {
        rotateX: -5,
        rotateY: 5,
        transition: smoothSpring,
      },
      glow: {
        boxShadow: "0 0 40px rgba(0, 255, 255, 0.3)",
        transition: { duration: 0.3 },
      },
      bounce: {
        y: -12,
        transition: memphisSpring,
      },
      memphis: {
        scale: 1.02,
        y: -5,
        rotate: 0.5,
        transition: memphisSpring,
      },
    };

    const tapVariants = {
      lift: { y: -2, transition: memphisSpring },
      tilt: { scale: 0.98, transition: memphisSpring },
      glow: { scale: 0.98, transition: memphisSpring },
      bounce: { y: 0, scale: 0.98, transition: memphisSpring },
      memphis: { scale: 0.97, rotate: -0.5, transition: memphisSpring },
    };

    // Disable hover effects if user prefers reduced motion
    if (shouldReduceMotion) {
      return (
        <div ref={ref as React.Ref<HTMLDivElement>} className={className}>
          {children}
        </div>
      );
    }

    return (
      <motion.div
        ref={ref}
        className={cn("cursor-pointer motion-optimized", className)}
        style={gpuAcceleratedStyle}
        whileHover={hoverVariants[hoverEffect]}
        whileTap={tapVariants[hoverEffect]}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
InteractiveCard.displayName = "InteractiveCard";

// ============ FLOATING ELEMENTS ============

interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
  delay?: number;
}

export const FloatingElement = ({
  children,
  className,
  amplitude = 10,
  duration = 4,
  delay = 0,
}: FloatingElementProps) => {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-amplitude, amplitude, -amplitude],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  );
};

// ============ PULSE ELEMENTS ============

interface PulseElementProps {
  children: ReactNode;
  className?: string;
  scale?: number;
  duration?: number;
}

export const PulseElement = ({
  children,
  className,
  scale = 1.05,
  duration = 2,
}: PulseElementProps) => {
  return (
    <motion.div
      className={className}
      animate={{
        scale: [1, scale, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
};

// ============ SPINNING ELEMENT ============

interface SpinningElementProps {
  children: ReactNode;
  className?: string;
  duration?: number;
}

export const SpinningElement = ({
  children,
  className,
  duration = 8,
}: SpinningElementProps) => {
  return (
    <motion.div
      className={className}
      animate={{ rotate: 360 }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {children}
    </motion.div>
  );
};

// ============ CLICK RIPPLE ============

interface ClickRippleProps {
  children: ReactNode;
  className?: string;
  color?: string;
}

export const ClickRipple = ({
  children,
  className,
  color = "rgba(0, 255, 255, 0.3)",
}: ClickRippleProps) => {
  return (
    <motion.div
      className={cn("relative overflow-hidden", className)}
      whileTap={{
        scale: 0.98,
      }}
    >
      {children}
      <motion.span
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: color }}
        initial={{ scale: 0, opacity: 0.5 }}
        whileTap={{ scale: 2, opacity: 0 }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
};

// ============ MAGNETIC ELEMENT ============

interface MagneticElementProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export const MagneticElement = ({
  children,
  className,
  strength = 0.3,
}: MagneticElementProps) => {
  return (
    <motion.div
      className={cn("relative", className)}
      whileHover="hover"
    >
      <motion.div
        variants={{
          hover: {
            x: 0,
            y: 0,
          },
        }}
        transition={smoothSpring}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

// ============ TYPEWRITER TEXT ============

interface TypewriterTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

export const TypewriterText = ({
  text,
  className,
  delay = 0,
  speed = 0.05,
}: TypewriterTextProps) => {
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          transition={{ delay: delay + index * speed }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

// ============ REVEAL ON SCROLL ============

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}

export const RevealOnScroll = ({
  children,
  className,
  direction = "up",
}: RevealOnScrollProps) => {
  const directionVariants = {
    up: { y: 80, opacity: 0 },
    down: { y: -80, opacity: 0 },
    left: { x: -80, opacity: 0 },
    right: { x: 80, opacity: 0 },
  };

  return (
    <motion.div
      className={cn("overflow-hidden", className)}
      initial={directionVariants[direction]}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={smoothSpring}
    >
      {children}
    </motion.div>
  );
};

// ============ PARALLAX WRAPPER ============

interface ParallaxWrapperProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

export const ParallaxWrapper = ({
  children,
  className,
  speed = 0.5,
}: ParallaxWrapperProps) => {
  return (
    <motion.div
      className={className}
      style={{
        y: 0,
      }}
      whileInView={{
        y: 0,
      }}
      transition={{
        type: "tween",
        ease: "linear",
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimation;
