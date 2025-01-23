import React, { useState, useEffect } from 'react';
import ReusableDropdown from './ReusableDropdown';
import '../styles/TableActions.css';

const TableActions = ({ devices, onFilter, onSort }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterOption, setFilterOption] = useState('Device Type: All');
    const [sortOption, setSortOption] = useState('Sort by: Name (Ascending)');
    const [filteredDevices, setFilteredDevices] = useState(devices);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        applyFilterSortSearch(filterOption, sortOption, e.target.value);
    };

    const deviceTypes = ['All', 'Windows', 'Mac', 'Linux'];
    const filterOptions = deviceTypes.map(type => `Device Type: ${type}`);
    const sortOptions = ['Name (Ascending)', 'Name (Descending)', 'HDD Capacity (Ascending)', 'HDD Capacity (Descending)'].map(option => `Sort by: ${option}`);

    const handleFilterChange = (filter) => {
        setFilterOption(filter);
        applyFilterSortSearch(filter, sortOption);
    };

    const handleSortChange = (sort) => {
        setSortOption(sort);
        applyFilterSortSearch(filterOption, sort);
    };

    const handleRefresh = () => {
        setSearchTerm('');
        setFilterOption('Device Type: All');
        setSortOption('Sort by: Name (Ascending)');
        setFilteredDevices(devices);
    };

    const applyFilterSortSearch = (filter, sort, search) => {
        const type = filter.replace('Device Type: ', '').toUpperCase();
        let filtered = type === 'ALL' ? devices : devices.filter(device => device.type.toUpperCase() === type);
        if (sort.includes('Name')) {
            filtered = filtered.sort((a, b) => sort === 'Sort by: Name (Ascending)' ? a.system_name.localeCompare(b.system_name) : b.system_name.localeCompare(a.system_name));
        } else if (sort.includes('HDD Capacity')) {
            filtered = filtered.sort((a, b) => sort === 'Sort by: HDD Capacity (Ascending)' ? a.hdd_capacity - b.hdd_capacity : b.hdd_capacity - a.hdd_capacity);
        }

        if (search) {
            filtered = filtered.filter(device => device.system_name.toLowerCase().includes(search.toLowerCase()));
        }

        setFilteredDevices([...filtered]);
        onFilter([...filtered]);
    };

    useEffect(() => {
        applyFilterSortSearch(filterOption, sortOption, searchTerm);
    }, [devices, filterOption, sortOption, searchTerm]);

    return (
        <div className="table-actions">
            <div className="left-actions">
                <div className="search-container">
                    <img src={'/icons/action_icons/search.svg'} alt="Search" className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="search-input"
                    />
                </div>
                <ReusableDropdown
                    options={filterOptions}
                    value={filterOption}
                    onChange={handleFilterChange}
                    className="filter-dropdown"
                />
                <ReusableDropdown
                    options={sortOptions}
                    value={sortOption}
                    onChange={handleSortChange}
                    className="sort-dropdown"
                />
            </div>
            <img onClick={handleRefresh} className="refresh-button" src="/icons/action_icons/refresh.svg" alt="Refresh" />
        </div>
    );
};

export default TableActions;
