import React from 'react';
import StatusCard from './StatusCard';
import { priorityIconMap } from "../iconmap";
import './../style/GroupByPriority.css'; // Ensure this file exists and the styles are linked

const GroupByPriority = ({ data },{ordering}) => {
    if (!data || !data.tickets) {
        return <div>No tickets available</div>; // Provide a fallback UI if no data is available
    }

    const Priorities = ["No priority", "Low", "Medium", "High", "Urgent"];
    const priorityMap = { "No priority": [], "Low": [], "Medium": [], "High": [], "Urgent": [] };

    const sortTickets = (tickets) => {
        if (ordering === "Title") {
            return tickets.sort((a, b) => a.title.localeCompare(b.title));
        } else if (ordering === "Priority") {
            return tickets.sort((a, b) => b.priority - a.priority); // Higher priority comes first
        } 
        return tickets; // Default, no sorting
    };

    // Group tickets by priority after sorting
    const sortedTickets = sortTickets(data.tickets);
    for (const ticket of sortedTickets) {
        priorityMap[Priorities[ticket.priority]].push(ticket);
    }
    // for (const ticket of data.tickets) {
    //     priorityMap[Priorities[ticket.priority]].push(ticket);
    // }
    const PlusIcon = priorityIconMap["Plus"];
    const ThIcon = priorityIconMap["3dot"];


    return (
        <div className="ticket-board">
            {Object.keys(priorityMap).map((priority) => {
                const ticketCount = priorityMap[priority].length; // Count of tickets in the current priority group

                // Get the appropriate icon for the priority
                const PriorityIcon = priorityIconMap[priority];

                return (
                    <div key={priority} className="ticket-column">
                        <div className="ticket-header">
                            <div className="left-content">
                                {PriorityIcon && <PriorityIcon className="priority-icon" />} {/* Priority icon */}
                                <span className="priority-title">{Priorities[priority]}</span> {/* Priority label */}
                                <span className="ticket-count">{ticketCount}</span> {/* Count of tickets */}
                            </div>
                            <div className="right-content">
                                <PlusIcon className="add-icon" /> {/* Plus icon */}
                                <ThIcon className="circle-icon" /> {/* Three-dot icon */}
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
