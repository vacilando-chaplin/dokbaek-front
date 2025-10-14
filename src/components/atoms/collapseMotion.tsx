import { motion, MotionProps, Transition } from "framer-motion";
import { ReactNode } from "react";

interface CollapseMotionProps extends MotionProps {
  children: ReactNode;
  transition?: Transition;
  className?: string;
}

const CollapseMotion = ({
  children,
  transition = { duration: 0.1, ease: "easeInOut" },
  className = "",
  ...props
}: CollapseMotionProps) => {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={transition}
      className={`overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default CollapseMotion;
