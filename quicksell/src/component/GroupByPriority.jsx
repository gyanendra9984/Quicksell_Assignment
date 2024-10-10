import React from 'react';
import StatusCard from './StatusCard';
import { priorityIconMap } from "../iconmap";
import './../index.css';

const GroupByPriority = ({ data, ordering }) => {
    if (!data || !data.tickets) {
        return <div>No tickets available</div>;
    }

    const Priorities = ["No priority", "Low", "Medium", "High", "Urgent"];
    const priorityMap = { 0: [], 1: [], 2: [], 3: [], 4: [] };

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
        priorityMap[ticket.priority].push(ticket);
    }
    const PlusIcon = priorityIconMap["Plus"];
    const ThIcon = priorityIconMap["3dot"];


    return (
        <div className="ticket-board">
            {Object.keys(priorityMap).map((priority) => {
                const ticketCount = priorityMap[priority].length;

                const PriorityIcon = priorityIconMap[priority];

                return (
                    <div key={priority} className="ticket-column">
                        <div className="ticket-header">
                            <div className="left-content">
                                {PriorityIcon && <PriorityIcon className="priority-icon" />}
                                <span className="priority-title">{Priorities[priority]}</span>
                                <span className="ticket-count">{ticketCount}</span>
                            </div>
                            <div className="right-content">
                                <PlusIcon className="add-icon" />
                                <ThIcon className="circle-icon" />
                            </div>
                        </div>
                        {priorityMap[priority].map((ticket) => (
                            <StatusCard key={ticket.id} ticket={ticket} users={data.users} />
                        ))}
                    </div>
                );
            })}
        </div>
    );
};

export default GroupByPriority;
