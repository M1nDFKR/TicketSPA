import axios, { AxiosResponse } from 'axios';

const API_URL = 'http://localhost:8000/api'; // replace with your Django API URL

export interface Ticket {
  id: number;
  title: string;
  description: string;
  // add other fields as necessary
}

export const getTickets = async (): Promise<Ticket[]> => {
  try {
    const response: AxiosResponse<Ticket[]> = await axios.get(`${API_URL}/tickets/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tickets', error);
    throw error;
  }
};

export const createTicket = async (ticket: Ticket): Promise<Ticket> => {
  const response: AxiosResponse<Ticket> = await axios.post(`${API_URL}/tickets/`, ticket);
  return response.data;
};

// Add more functions for other operations (update, delete) as needed
