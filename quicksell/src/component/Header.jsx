import React, { useState } from 'react';
import './../style/Header.css';
import { ReactComponent as DownIcon } from "./../icons_FEtask/down.svg"
import { ReactComponent as DisplayIcon } from "./../icons_FEtask/Display.svg"

const Header = ({ setGrouping, setOrdering }) => {
    const [isBoxVisible, setIsBoxVisible] = useState(false);

    const toggleBoxVisibility = () => {
        setIsBoxVisible(!isBoxVisible);
    };

    return (
        <div className='header'>
            <div className='header-container'>
                <div className='icon-box'>
                    <DisplayIcon />
                </div>
                <div className='display-text'>Display</div>
                <div className='icon-box' onClick={toggleBoxVisibility}>
                    <DownIcon />
                </div>
            </div>

            {isBoxVisible && (
                <div className='dropdown-box'>
                    <div className='grouping'>
                        <label>Grouping</label>
                        <select onChange={(e) => {
                            const value = e.target.value;
                            localStorage.setItem("grouping", value);
                            setGrouping(value);
                        }} value={localStorage.getItem("grouping")}>
                            <option>Status</option>
                            <option>User</option>
                            <option>Priority</option>
                        </select>
                    </div>
                    <div className='ordering'>
                        <label>Ordering</label>
                        <select onChange={(e) => {
                            const value = e.target.value;
                            localStorage.setItem("ordering", value);
                            setOrdering(value);
                        }} value={localStorage.getItem("ordering")}>
                            <option>Priority</option>
                            <option>Title</option>
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;
