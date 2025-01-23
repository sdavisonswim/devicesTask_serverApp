import React, { useState, useEffect } from 'react';
import '../styles/ReusableDropdown.css';

const ReusableDropdown = ({ options, placeholder, value, onChange, className }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(value || "");

    useEffect(() => {
        console.log('setselectedoption', value);
        setSelectedOption(value || "");
    }, [value]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    // const formatOption = (option) => {
    //     return option + " workstation";
    // };

    const handleOptionClick = (option) => {
        console.log('option', option, option, option.toUpperCase());
        setSelectedOption(option);
        setIsOpen(false);
        onChange(option);
    };

    return (
        <div className={`reusable-dropdown ${className}`}>
            <div className="dropdown-header" onClick={toggleDropdown}>
                <span className={selectedOption ? "" : "placeholder"}>{selectedOption || placeholder}</span>
                <img src="/icons/action_icons/down-arrow.svg" alt="Dropdown icon" className={`dropdown-icon ${isOpen ? 'open' : ''}`} />
            </div>
            {isOpen && (
                <div className="dropdown-list">
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className="dropdown-item"
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReusableDropdown;
