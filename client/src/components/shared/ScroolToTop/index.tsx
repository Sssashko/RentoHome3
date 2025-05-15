import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: React.FC = () => {
  // Grab the current URL path from React Router
  const { pathname } = useLocation();

  useEffect(() => {
    // Whenever the path changes, scroll window back to top-left
    // 'instant' jumps immediately; change to 'smooth' for animation
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]); // Re-run effect on each navigation

  // No UI output needed
  return null;
};

export default ScrollToTop;
