import React, { useState } from 'react';
import '../styles/DeviceHeader.css';

const DevicesHeader = ({ onAddDevice }) => {

    return (
        <header className='devices-header'>
            <div className='header-content'>
                <div>Devices</div>
                <button onClick={onAddDevice} className='add-device-button'>
                    <img src='/icons/action_icons/add.svg' alt='Add Device Icon' className='add-device-icon' /> Add Device
                </button>
            </div>
        </header>
    );
};

export default DevicesHeader;
