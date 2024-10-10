import React from 'react';
import StatusCard from './StatusCard';
import { priorityIconMap } from "../iconmap";

import './../style/GroupByStatus.css'; // Ensure this file exists and the styles are linked

const GroupByStatus = ({ data }) => {
    // Check if data is undefined or data.tickets is not provided
    if (!data || !data.tickets) {
        return <div>No tickets available</div>; // Provide a fallback UI if no data is available
    }

    // Group tickets by status
    const statusMap = { "Backlog": [], "Todo": [], "In progress": [], "Done": [], "Cancel": [] };
    for (const ticket of data.tickets) {
        statusMap[ticket.status].push(ticket);
    }

    const PlusIcon = priorityIconMap["Plus"];
    const ThIcon = priorityIconMap["3dot"];
    return (
        <div className="ticket-board">
            {Object.keys(statusMap).map((status) => {
                const ticketCount = statusMap[status].length; // Count of tickets in the current status

                // Get the appropriate icon for the status
                const StatusIcon = priorityIconMap[status];

                return (
                    <div key={status} className="ticket-column">
                        <div className="ticket-header">
                            <div className="left-content">
                                {/* Check if the status icon exists in the map and render it */}
                                {StatusIcon && <StatusIcon className="status-icon" />} {/* Circle icon */}
                                <span className="status-title">{status}</span> {/* Status title */}
                                <span className="ticket-count">{ticketCount}</span> {/* Count of tickets */}
                            </div>
                            <div className="right-content">
                                <PlusIcon className="add-icon" /> {/* Plus icon */}
                                <ThIcon className="circle-icon" /> {/* Three-dot icon */}
                            </div>
                        </div>
                        {statusMap[status].map((ticket) => (
                            <StatusCard key={ticket.id} ticket={ticket} users={data.users} />
                        ))}
                    </div>
                );
            })}
        </div>
    );
};

export default GroupByStatus;
