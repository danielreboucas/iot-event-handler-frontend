import api from '../api';
import type { Device, DeviceFormData } from '../types/Device';

export const getDevices = async (): Promise<Device[]> => {
  const response = await api.get<Device[]>('/devices');
  return response.data;
};

export const getDevice = async (uuid: string): Promise<Device> => {
  const response = await api.get<Device>(`/devices/${uuid}`);
  return response.data;
};

export const createDevice = async (deviceData: DeviceFormData): Promise<Device> => {
  const response = await api.post<Device>('/devices', deviceData);
  return response.data;
};

export const updateDevice = async (uuid: string, deviceData: Partial<DeviceFormData>): Promise<Device> => {
  const response = await api.put<Device>(`/devices/${uuid}`, deviceData);
  return response.data;
};

export const deleteDevice = async (uuid: string): Promise<void> => {
  await api.delete(`/devices/${uuid}`);
};

export const deviceService = {
  getDevices,
  getDevice,
  createDevice,
  updateDevice,
  deleteDevice
};
