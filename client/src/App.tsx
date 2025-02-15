import { AppLoader, Footer, Navbar, Routes, ServerError } from 'components'
import { useLoadData } from 'hooks'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'

function App() {
  const { error, loading, loadData } = useLoadData()

  useEffect(() => {
    loadData()
  }, [])

  if (error) return <ServerError />
  if (loading) return <AppLoader />

  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-800 dark:bg-neutral-800 dark:text-white transition-colors">
      <Toaster position="top-center" />
      <Navbar />
      <Routes />
      <Footer />
    </div>
  )
}

export default App
