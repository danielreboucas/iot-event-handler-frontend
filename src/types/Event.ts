export interface Event {
  uuid: string; 
  deviceUuid: string; 
  temperature?: string; 
  humidity?: string; 
  timestamp: string; 
  isAlarm: boolean; 
}


export interface EventWithDevice extends Event {
  deviceName?: string; 
}
