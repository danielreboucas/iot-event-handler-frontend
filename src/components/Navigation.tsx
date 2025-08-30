import React from 'react';

interface NavigationProps {
  currentView: 'devices' | 'events';
  onViewChange: (view: 'devices' | 'events') => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, onViewChange }) => {
  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-white">IoT Event Handler</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onViewChange('devices')}
              className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                currentView === 'devices'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              Dispositivos
            </button>
            <button
              onClick={() => onViewChange('events')}
              className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                currentView === 'events'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              Eventos
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
