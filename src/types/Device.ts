export interface Device {
  uuid: string;
  name: string;
  integrationId?: string;
  location: string;
}

export interface DeviceFormData {
  name: string;
  location: string;
}
