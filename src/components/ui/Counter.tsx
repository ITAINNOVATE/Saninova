"use client";

import React, { useEffect, useState, useRef } from "react";
import { useInView, useMotionValue, useSpring, animate } from "framer-motion";

interface AnimatedCounterProps {
  value: string | number;
}

export const Counter: React.FC<AnimatedCounterProps> = ({ value }) => {
  const ref = useRef(null);
  const [displayValue, setDisplayValue] = useState(0);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Parse number safely
  const numericVal = parseFloat(String(value).replace(/[^\d.]/g, ""));
  const target = isNaN(numericVal) ? 0 : numericVal;

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, target, {
        duration: 1.5,
        ease: "easeOut",
        onUpdate(value) {
          setDisplayValue(Math.floor(value));
        }
      });
      return () => controls.stop();
    }
  }, [isInView, target]);

  return <span ref={ref} className="tabular-nums inline-block select-none">{displayValue.toLocaleString()}</span>;
};

export default Counter;
