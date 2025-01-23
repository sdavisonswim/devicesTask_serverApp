import React, { useEffect, useState } from 'react';
import ReusableDropdown from './ReusableDropdown';
import '../styles/DeviceModal.css';

const DeviceModal = ({ isOpen, closeModal, device = {}, onSubmit }) => {
    const deviceTypes = ['Windows', 'Mac', 'Linux'];
    const deviceOptions = deviceTypes.map(type => `${type} workstation`);
    const [deviceId, setDeviceId] = useState(device.id || '');
    const [systemName, setSystemName] = useState(device.system_name || '');
    const [deviceType, setDeviceType] = useState(device.type || '');
    const [hddCapacity, setHddCapacity] = useState(device.hdd_capacity || '');

    useEffect(() => {
        console.log('device', device);
        setSystemName(device.system_name || '');
        setDeviceType(device.type ? `${capitalizeFirstLetter(device.type)} workstation` : '');
        setHddCapacity(device.hdd_capacity || '');
    }, [device]);

    const handleSystemNameChange = (e) => {
        // Convert to uppercase and replace spaces with hyphens
        let value = e.target.value.toUpperCase().replace(/\s+/g, '-');
        setSystemName(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const strippedDeviceType = deviceType.replace(' workstation', '').toUpperCase();
        const updatedDevice = {
            'id': deviceId,
            'system_name': systemName,
            'type': strippedDeviceType,
            'hdd_capacity': hddCapacity
        };
        onSubmit(updatedDevice);
        closeModal();
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    return (
        <div className={`modal ${isOpen ? 'modal-open' : 'modal-close'}`}>
            <div className="modal-content">
                <img src="/icons/action_icons/close.svg" alt="Close" className="close-button" onClick={closeModal} />
                <div className="modal-title">{device.system_name ? 'Edit Device' : 'Add Device'}</div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="systemName">System Name *</label>
                        <input
                            type="text"
                            id="systemName"
                            name="systemName"
                            value={systemName}
                            onChange={handleSystemNameChange}
                            className="system-name-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="deviceType">Device Type *</label>
                        <ReusableDropdown
                            options={deviceOptions}
                            placeholder="Select type"
                            value={deviceType}
                            onChange={setDeviceType}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="hddCapacity">HDD Capacity (GB) *</label>
                        <input
                            type="number"
                            id="hddCapacity"
                            name="hddCapacity"
                            value={hddCapacity}
                            onChange={(e) => setHddCapacity(e.target.value)}
                        />
                    </div>
                    <div className="form-buttons">
                        <button className="modal-cancel" type="button" onClick={closeModal}>Cancel</button>
                        <button className="modal-submit" type="submit">{device.system_name ? 'Save Changes' : 'Submit'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DeviceModal;
