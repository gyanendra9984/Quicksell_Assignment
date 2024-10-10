import React from 'react';
import StatusCard from './StatusCard';
import { priorityIconMap } from "../iconmap";

import './../style/GroupByUser.css'; // Ensure this file exists and the styles are linked

const GroupByUser = ({ data }) => {
    if (!data || !data.tickets) {
        return <div>No tickets available</div>; // Provide a fallback UI if no data is available
    }
    // Group tickets by userId
    const groupedTickets = data.tickets.reduce((acc, ticket) => {
        acc[ticket.userId] = acc[ticket.userId] || [];
        acc[ticket.userId].push(ticket);
        return acc;
    }, {});

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const PlusIcon = priorityIconMap["Plus"];
    const ThIcon = priorityIconMap["3dot"];

    return (
        <div className="ticket-board">
            {Object.keys(groupedTickets).map((userId) => {
                const user = data.users.find(user => user.id === userId); // Get user info
                const ticketCount = groupedTickets[userId].length; // Count of tickets for the current user

                return (
                    <div key={userId} className="ticket-column">
                        <div className="ticket-header">
                            <div className="left-content">
                                <span className="user-icon" style={{ backgroundColor: getRandomColor() }}>
                                    {userId.split(' ').map(name => name[0]).join('').toUpperCase().slice(0, 2)}
                                </span>
                                <span className="user-title">{user.name}</span> {/* User name */}
                                <span className="ticket-count">{ticketCount}</span> {/* Count of tickets */}
                            </div>
                            <div className="right-content">
                                <PlusIcon className="add-icon" /> {/* Plus icon */}
                                <ThIcon className="circle-icon" /> {/* Three-dot icon */}
                            </div>
                        </div>
                        {groupedTickets[userId].map((ticket) => (
                            <StatusCard key={ticket.id} ticket={ticket} users={data.users} />
                        ))}
                    </div>
                );
            })}
        </div>
    );
}

export default GroupByUser;
