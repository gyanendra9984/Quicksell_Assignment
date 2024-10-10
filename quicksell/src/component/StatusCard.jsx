import React from 'react';
import './../style/StatusCard.css';
import { priorityIconMap } from './../iconmap'; // Import your priorityIconMap

const StatusCard = ({ ticket, users }) => {
    // Check if users is defined and is an array
    const safeUsers = Array.isArray(users) ? users : [];

    const getUser = (userId) => {
        const user = safeUsers.find(u => u.id === userId);
        return user ? user.name : "Unknown User";
    };

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const ThIcon = priorityIconMap["3dot"] || null; // Handle undefined icons
    const StatusIcon = priorityIconMap[ticket.status] || null; // Handle undefined icons
    // console.log(ticket)
    const grouping = localStorage.getItem("grouping");

    return (
        <div className="ticket-card">
            {/* Display ticket ID */}
            <div className="ticket-id">
                {ticket.id}
            </div>
            {/* Display ticket title */}
            <div className="ticket-title">
                <span>
                    {grouping !== "Status" && StatusIcon && <StatusIcon className="thdot-icon" />}
                </span>
                {ticket.title}
            </div>
            <div className="ticket-footer">
                <div className="left-footer">
                    {/* Three-dot icon before the tag */}
                    {grouping !== "Priority" && ThIcon && <ThIcon className="thdot-icon" />}
                    {/* Display ticket tag */}
                    <span className="ticket-tag">
                        {ticket.tag[0]}
                    </span>
                </div>
                {/* Display user's initials */}
                {grouping !== "User" && <span className="ticket-user" style={{ backgroundColor: getRandomColor() }}>
                    {getUser(ticket.userId).split(' ').map(name => name[0]).join('').toUpperCase().slice(0, 2)}
                </span>}
            </div>
        </div>
    );
};

export default StatusCard;
