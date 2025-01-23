import React, { useState, useEffect } from 'react';
import DeviceList from './components/DeviceList';
import DeviceModal from './components/DeviceModal';
import GlobalHeader from './components/GlobalHeader';
import TableActions from './components/TableActions';
import DevicesHeader from './components/DevicesHeader';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';
import './styles.css'


const App = () => {
    const [devices, setDevices] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCreateMode, setIsCreateMode] = useState(false);
    const [filteredDevices, setFilteredDevices] = useState(devices);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    useEffect(() => {
        // Fetch devices from the API when the component mounts
        fetch('http://localhost:3001/api/devices')
            .then(response => response.json())
            .then(data => setDevices(data))
            .catch(error => console.error('Error fetching devices:', error));
    }, []);

    const handleAddDevice = () => {
        setSelectedDevice(null); // Clear selected device
        setIsCreateMode(true); // Set mode to create
        setIsModalOpen(true);
    };

    const handleEditDevice = (device) => {
        setSelectedDevice(device);
        setIsCreateMode(false); // Set mode to edit
        setIsModalOpen(true);
    };

    const handleDeleteDevice = (device) => {
        setSelectedDevice(device);
        setIsDeleteModalOpen(true); // Open delete confirmation modal 
    };

    const confirmDeleteDevice = () => {
        // API call to delete the device 
        fetch(`http://localhost:3001/devices/${selectedDevice.id}`, { method: 'DELETE' })
            .then(response => response.json())
            .then((deleteCount) => {
                if (deleteCount > 0) {
                    setDevices(devices.filter(d => d.id !== selectedDevice.id));
                    setFilteredDevices(filteredDevices.filter(d => d.id !== selectedDevice.id));
                    setIsDeleteModalOpen(false);
                    setSelectedDevice(null);
                } else {
                    console.error('Error deleting device: No rows deleted');
                }
            })
            .catch(error => console.error('Error deleting device:', error));
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedDevice(null); // Reset the selected device when closing the modal
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedDevice(null); // Reset the selected device when closing the modal 
    };

    const handleSubmit = (updatedDevice) => {
        console.log('updateddevice', updatedDevice, JSON.stringify(updatedDevice));
        if (updatedDevice.id) {
            // API call to update the device
            fetch(`http://localhost:3001/devices/${updatedDevice.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedDevice),
            })
                .then(response => response.json())
                .then((updatedCount) => {
                    if (updatedCount > 0) {
                        console.log('Device updated:', updatedDevice); // Debugging log 
                        setDevices(devices.map(d => d.id === updatedDevice.id ? updatedDevice : d));
                        setFilteredDevices(filteredDevices.map(d => d.id === updatedDevice.id ? updatedDevice : d));
                    } else {
                        console.error('Error updating device: No rows updated');
                    }
                })
                .catch(error => console.error('Error updating device:', error));
        } else {
            // API call to add a new device
            fetch('http://localhost:3001/api/devices', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedDevice),
            })
                .then(response => response.json())
                .then((data) => {
                    setDevices([...devices, data]);
                    setFilteredDevices([...filteredDevices, updatedDevice]);
                })
                .catch(error => console.error('Error adding device:', error));
        }
        closeModal();
    };

    const handleFilter = (filtered) => {
        setFilteredDevices(filtered);
    };

    // const handleRefresh = () => {
    //     fetch('http://localhost:3001/api/devices')
    //         .then(response => response.json())
    //         .then(data => {
    //             setDevices(data);
    //             setFilteredDevices(data);
    //         })
    //         .catch(error => console.error('Error refreshing devices:', error));
    // };

    return (
        <div>
            <GlobalHeader />
            <DevicesHeader onAddDevice={handleAddDevice} />
            <TableActions
                devices={devices}
                onFilter={handleFilter}
            />
            <DeviceList
                devices={filteredDevices}
                onEditDevice={handleEditDevice}
                onDeleteDevice={handleDeleteDevice}
            />
            {isModalOpen && (
                <DeviceModal
                    isOpen={isModalOpen}
                    closeModal={closeModal}
                    device={selectedDevice || {}}
                    onSubmit={handleSubmit}
                />
            )}
            {isDeleteModalOpen && (
                <DeleteConfirmationModal
                    isOpen={isDeleteModalOpen}
                    closeModal={closeDeleteModal}
                    device={selectedDevice}
                    onConfirm={confirmDeleteDevice}
                />
            )}
        </div>
    );
};

export default App;

