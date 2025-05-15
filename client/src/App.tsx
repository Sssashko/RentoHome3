import ScrollToTop from './components/shared/ScroolToTop';
import { AppLoader, Footer, Navbar, Routes, ServerError } from 'components';     // layout components and error/loading screens
import { useLoadData } from 'hooks';              // custom hook to load initial app data
import { useEffect } from 'react';               // React effect hook
import { Toaster } from 'react-hot-toast';       // toast notifications

function App() {
  const { error, loading, loadData } = useLoadData();

  useEffect(() => {
    loadData();             // fetch initial data once
  }, []);

  if (error) return <ServerError />; // show error page on failure
  if (loading) return <AppLoader />; // show loader until ready

  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-800 dark:bg-neutral-800 dark:text-white transition-colors">
      <Toaster position="top-center" />  {/* toast notifications */}
      <Navbar />                         {/* site header */}
      <ScrollToTop />                    {/* reset scroll on route change */}
      <Routes />                         {/* route-based pages */}
      <Footer />                         {/* site footer */}
    </div>
  );
}

export default App;
