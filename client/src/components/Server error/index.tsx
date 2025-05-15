import offlineServer from 'assets/offline-server.png' // Image shown when server is down

// Component displayed when the app can't reach the server
const ServerError = () => (
  <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-800">
    {/* Illustration of offline server */}
    <img src={offlineServer} className="h-52 w-52" alt="Server Offline" />

    {/* Main error message */}
    <h1 className="mt-10 text-4xl font-semibold text-white">
      Rentohome is temporarily offline :(
    </h1>
  </div>
)

export default ServerError
