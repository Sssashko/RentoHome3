import React, { useState, useEffect } from 'react';

interface FadeInProps {
  children: React.ReactNode;
  duration?: number;
}

const FadeIn: React.FC<FadeInProps> = ({ children, duration = 800 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div
      style={{
        transition: `opacity ${duration}ms ease-in-out`,
        opacity: visible ? 1 : 0,
      }}
    >
      {children}
    </div>
  );
};

export default FadeIn;
