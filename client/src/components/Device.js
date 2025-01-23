import React from 'react';
import '../styles/Device.css';

function Device({ device }) {
    const getIcon = (type) => {
        switch (type) {
            case 'WINDOWS':
                return '/icons/OS_icons/windows.svg';
            case 'MAC':
                return '/icons/OS_icons/iOS.svg';
            case 'LINUX':
                return '/icons/OS_icons/linux.svg';
            default:
                return null;
        };
    };

    const deviceTypeDisplay = (type) => {
        switch (type) {
            case 'WINDOWS':
                return 'Windows workstation';
            case 'MAC':
                return 'Mac workstation';
            case 'LINUX':
                return 'Linux workstation';
            default:
                return null;
        };
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    return (
        <div className="device-cell">
            <div className="device-cell-row">
                {getIcon(device.type) && <img src={getIcon(device.type)} alt={`${device.type} Icon`} className="device-icon" />}
                <div className="device-name"> {device.system_name}</div>
            </div>
            <div className="device-cell-row device-gap">
                <div className="device-type">{deviceTypeDisplay(device.type)}</div>
                <div className="device-memory">- {device.hdd_capacity} GB</div>
            </div>
        </div>
    );
};

export default Device;
