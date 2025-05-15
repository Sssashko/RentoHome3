// Simple wrapper that fades its children in on mount

import React, { useState, useEffect } from 'react';

interface FadeInProps {
  children: React.ReactNode;
  duration?: number; // how long the fade takes, in milliseconds
}

const FadeIn: React.FC<FadeInProps> = ({ children, duration = 800 }) => {
  // visible controls the CSS opacity
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // on first render, trigger the fade
    // setVisible(true) causes opacity -> 1 over the given duration
    setVisible(true);
  }, []); // empty deps = run once on mount

  return (
    <div
      style={{
        // apply a smooth opacity transition
        transition: `opacity ${duration}ms ease-in-out`,
        // start at 0, then instantly go to 1 when visible flips
        opacity: visible ? 1 : 0,
      }}
    >
      {children}
    </div>
  );
};

export default FadeIn;
