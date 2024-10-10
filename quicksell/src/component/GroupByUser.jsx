import React from 'react';
import StatusCard from './StatusCard';
import { priorityIconMap } from "../iconmap";
import './../index.css'; 

const GroupByUser = ({ data ,ordering }) => {
    if (!data || !data.tickets) {
        return <div>No tickets available</div>; 
    }
    const sortTickets = (tickets) => {
        if (ordering === "Title") {
            return tickets.sort((a, b) => a.title.localeCompare(b.title));
        } else if (ordering === "Priority") {
            return tickets.sort((a, b) => b.priority - a.priority); 
        }
        return tickets; 
    };

    const sortedTickets = sortTickets(data.tickets);
    
    const groupedTickets = sortedTickets.reduce((acc, ticket) => {
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
                const user = data.users.find(user => user.id === userId); 
                const ticketCount = groupedTickets[userId].length; 

                return (
                    <div key={userId} className="ticket-column">
                        <div className="ticket-header">
                            <div className="left-content">
                                <span className="user-icon" style={{ backgroundColor: getRandomColor()}}>
                                    {userId.split(' ').map(name => name[0]).join('').toUpperCase().slice(0, 2)}
                                </span>
                                <span className="user-title">{user.name}</span> 
                                <span className="ticket-count">{ticketCount}</span> 
                            </div>
                            <div className="right-content">
                                <PlusIcon className="add-icon" /> 
                                <ThIcon className="circle-icon" /> 
                            </div>
                        </div>
                        {groupedTickets[userId].map((ticket) => (
                            <StatusCard key={ticket.id} ticket={ticket} users={data.users}  />
                        ))}
                    </div>
                );
            })}
        </div>
    );
}

export default GroupByUser;
