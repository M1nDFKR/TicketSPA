import React, { useEffect, useState } from 'react';
import { getTickets, Ticket } from '../src/services/apiService';

const TicketList: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const data = await getTickets();
      setTickets(data);
    };

    fetchTickets();
  }, []);

  return (
    <div>
      {tickets.map((ticket) => (
        <div key={ticket.id}>
          <h2>{ticket.title}</h2>
          <p>{ticket.body}</p>
        </div>
      ))}
    </div>
  );
};

export default TicketList;