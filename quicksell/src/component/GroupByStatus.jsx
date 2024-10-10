import React from 'react';
import StatusCard from './StatusCard';
import { priorityIconMap } from "../iconmap";

import './../index.css'; 

const GroupByStatus = ({ data , ordering}) => {
    if (!data || !data.tickets) {
        return <div>No tickets available</div>; 
    }

    const statusMap = { "Backlog": [], "Todo": [], "In progress": [], "Done": [], "Cancel": [] };
    const sortTickets = (tickets) => {
        if (ordering === "Title") {
            return tickets.sort((a, b) => a.title.localeCompare(b.title));
        } else if (ordering === "Priority") {
            return tickets.sort((a, b) => b.priority - a.priority);
        }
        return tickets; 
    };

    const sortedTickets = sortTickets(data.tickets);
    for (const ticket of sortedTickets) {
        statusMap[ticket.status].push(ticket);
    }

    const PlusIcon = priorityIconMap["Plus"];
    const ThIcon = priorityIconMap["3dot"];
    return (
        <div className="ticket-board">
            {Object.keys(statusMap).map((status) => {
                const ticketCount = statusMap[status].length; 

                const StatusIcon = priorityIconMap[status];

                return (
                    <div key={status} className="ticket-column">
                        <div className="ticket-header">
                            <div className="left-content">
                                {StatusIcon && <StatusIcon className="status-icon" />} 
                                <span className="status-title">{status}</span> 
                                <span className="ticket-count">{ticketCount}</span> 
                            </div>
                            <div className="right-content">
                                <PlusIcon className="add-icon" /> 
                                <ThIcon className="circle-icon" /> 
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

