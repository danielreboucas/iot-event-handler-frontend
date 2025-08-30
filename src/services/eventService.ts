import api from '../api';
import type { Event } from '../types/Event';

export const getEvents = async (): Promise<Event[]> => {
  const response = await api.get<Event[]>('/events');
  return response.data;
};

export const getEventsByDevice = async (deviceUuid: string): Promise<Event[]> => {
  const allEvents = await getEvents();
  return allEvents.filter(event => event.deviceUuid === deviceUuid);
};

export const getAlarmEvents = async (): Promise<Event[]> => {
  const allEvents = await getEvents();
  return allEvents.filter(event => event.isAlarm);
};
