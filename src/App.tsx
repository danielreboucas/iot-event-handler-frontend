import { useState } from 'react'
import './App.css'
import DeviceManagement from './components/DeviceManagement'
import EventDashboard from './components/EventDashboard'
import Navigation from './components/Navigation'

function App() {
  const [currentView, setCurrentView] = useState<'devices' | 'events'>('devices')

  return (
    <div className="min-h-screen min-w-screen bg-gray-50">
      <Navigation currentView={currentView} onViewChange={setCurrentView} />
      <main>
        {currentView === 'devices' ? <DeviceManagement /> : <EventDashboard />}
      </main>
    </div>
  )
}

export default App
