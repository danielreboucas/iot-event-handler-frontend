import React, { useEffect, useState } from 'react';
import { getAlarmEvents, getEvents } from '../services/eventService';
import type { EventWithDevice } from '../types/Event';

const EventDashboard: React.FC = () => {
  const [events, setEvents] = useState<EventWithDevice[]>([]);
  const [alarmEvents, setAlarmEvents] = useState<EventWithDevice[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'alarms'>('all');

  useEffect(() => {
    loadEvents();
    loadAlarmEvents();
    
    const interval = setInterval(() => {
      loadEvents();
      loadAlarmEvents();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const loadEvents = async () => {
    setError(null);
    const data = await getEvents();
    setEvents(data);
  };

  const loadAlarmEvents = async () => {
    const data = await getAlarmEvents();
    setAlarmEvents(data);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };

  const getEventTypeColor = (isAlarm: boolean) => {
    if (isAlarm) {
      return 'bg-red-100 text-red-800 border-red-200';
    }
    return 'bg-blue-100 text-blue-800 border-blue-200';
  };

  const displayEvents = filter === 'alarms' ? alarmEvents : events;


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard de Eventos</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'all'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Todos os Eventos
          </button>
          <button
            onClick={() => setFilter('alarms')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'alarms'
                ? 'bg-red-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Alarmes ({alarmEvents.length})
          </button>
        </div>
      </div>

      {alarmEvents.length > 0 && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 rounded-lg">
          <div className="flex items-center">
            <div className="ml-3">
              <p className="text-sm text-red-700">
                <strong>Atenção!</strong> Há {alarmEvents.length} alarme(s) ativo(s) que precisam de atenção.
              </p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
          <button
            onClick={() => setError(null)}
            className="ml-2 text-red-500 hover:text-red-700 cursor-pointer"
          >
            ×
          </button>
        </div>
      )}

      <div className="space-y-4">
        {displayEvents.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">
              {filter === 'alarms' ? 'Nenhum alarme ativo' : 'Nenhum evento encontrado'}
            </div>
          </div>
        ) : (
          displayEvents.map((event) => (
            <div
              key={event.uuid}
              className={`p-4 rounded-lg border-2 ${
                event.isAlarm
                  ? 'bg-red-50 border-red-200 shadow-lg'
                  : 'bg-white border-gray-200 shadow'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full border ${getEventTypeColor(
                        event.isAlarm
                      )}`}
                    >
                      {event.isAlarm ? 'ALARME' : 'EVENTO'}
                    </span>
                    <div className="flex items-center space-x-1">
                      <span className="text-xs text-gray-500 capitalize">
                        {event.isAlarm ? 'Crítico' : 'Normal'}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    Evento do dispositivo {event.deviceName || 'Desconhecido'}
                  </h3>
                  
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>Dispositivo: <span className="font-medium">{event.deviceName || 'Desconhecido'}</span></div>
                    {event.temperature && (
                      <div>Temperatura: <span className="font-medium">{event.temperature}°C</span></div>
                    )}
                    {event.humidity && (
                      <div>Umidade: <span className="font-medium">{event.humidity}%</span></div>
                    )}
                    <div>Data/Hora: <span className="font-medium">{formatDate(event.timestamp)}</span></div>
                    <div>UUID do Evento: <span className="font-mono text-xs">{event.uuid}</span></div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EventDashboard;
