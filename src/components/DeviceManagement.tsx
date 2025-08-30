import React, { useEffect, useState } from 'react';
import { createDevice, deleteDevice, getDevices, updateDevice } from '../services/deviceService';
import type { Device } from '../types/Device';
import ConfirmationDialog from './ConfirmationDialog';
import DeviceForm from './DeviceForm';
import DeviceList from './DeviceList';

const DeviceManagement: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deviceToDelete, setDeviceToDelete] = useState<Device | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDevices();
  }, []);

  const loadDevices = async () => {
    setLoading(true);
    setError(null);
    const data = await getDevices();
    setDevices(data);
    setLoading(false);
  };

  const handleCreateDevice = async (deviceData: { name: string; location: string }) => {
    setError(null);
    const newDevice = await createDevice(deviceData);
    setDevices(prev => [...prev, newDevice]);
    setIsFormOpen(false);
  };

  const handleUpdateDevice = async (uuid: string, deviceData: { name: string; location: string }) => {
    setError(null);
    const updatedDevice = await updateDevice(uuid, deviceData);
    setDevices(prev => prev.map(device => 
      device.uuid === uuid ? updatedDevice : device
    ));
    setSelectedDevice(null);
    setIsFormOpen(false);
  };

  const handleDeleteDevice = (uuid: string) => {
    const device = devices.find(d => d.uuid === uuid);
    if (device) {
      setDeviceToDelete(device);
      setDeleteDialogOpen(true);
    }
  };

  const confirmDeleteDevice = async () => {
    if (!deviceToDelete) return;

    setError(null);
    await deleteDevice(deviceToDelete.uuid!);
    setDevices(prev => prev.filter(device => device.uuid !== deviceToDelete.uuid));
    setDeleteDialogOpen(false);
    setDeviceToDelete(null);
  };

  const cancelDeleteDevice = () => {
    setDeleteDialogOpen(false);
    setDeviceToDelete(null);
  };

  const handleEditDevice = (device: Device) => {
    setSelectedDevice(device);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setSelectedDevice(null);
    setIsFormOpen(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Gerenciamento de Dispositivos</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Novo Dispositivo
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
          <button
            onClick={() => setError(null)}
            className="ml-2 text-red-500 hover:text-red-700"
          >
            ×
          </button>
        </div>
      )}

      <DeviceList
        devices={devices}
        onEdit={handleEditDevice}
        onDelete={handleDeleteDevice}
      />

      {isFormOpen && (
        <DeviceForm
          device={selectedDevice}
          onSubmit={selectedDevice ? 
            (data: { name: string; location: string }) => handleUpdateDevice(selectedDevice.uuid, data) : 
            handleCreateDevice
          }
          onCancel={handleCloseForm}
        />
      )}

      <ConfirmationDialog
        isOpen={deleteDialogOpen}
        title="Confirmar Exclusão"
        message="Você tem certeza que deseja deletar esse dispositivo?"
        confirmText="Confirmar"
        cancelText="Cancelar"
        onConfirm={confirmDeleteDevice}
        onCancel={cancelDeleteDevice}
      />
    </div>
  );
};

export default DeviceManagement;
