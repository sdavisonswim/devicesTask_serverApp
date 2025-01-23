import React, { useState } from 'react';
import Device from './Device';
import '../styles/DeviceList.css';

function DeviceList({ devices, onEditDevice, onDeleteDevice }) {
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleRowClick = (device) => {
        setSelectedDevice(device);
        setIsMenuOpen(false);
    };

    const handleIconClick = (event, device) => {
        event.stopPropagation();
        setSelectedDevice(device);
        setIsMenuOpen(!isMenuOpen);
    };

    const handleMenuClick = (event, action) => {
        event.stopPropagation();
        if (action === 'edit') {
            onEditDevice(selectedDevice);
        } else if (action === 'delete') {
            onDeleteDevice(selectedDevice);
        }
        setIsMenuOpen(false);
    };

    return (
        <div className='device-list'>
            <div className='container'>
                <div className='devices-title'>
                    <div>Device</div>
                </div>
                {devices.map((device) => (
                    <div
                        key={device.id}
                        className={`device-row ${selectedDevice === device ? 'active' : ''}`}
                        onClick={() => handleRowClick(device)}
                    >
                        <Device device={device} />
                        {selectedDevice === device && (
                            <div className="icon-container" onClick={(event) => handleIconClick(event, device)}>
                                <img src={'/icons/action_icons/ellipsis.svg'} alt="Options icon" className="options-icon" />
                                {isMenuOpen && (
                                    <div className="dropdown-menu">
                                        <div className="dropdown-item" onClick={(event) => handleMenuClick(event, 'edit')}>Edit</div>
                                        <div className="dropdown-item device-delete" onClick={(event) => handleMenuClick(event, 'delete')}>Delete</div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DeviceList;
