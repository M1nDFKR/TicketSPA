import axios, { AxiosResponse, AxiosError } from 'axios';

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
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      console.error('Error fetching tickets', axiosError);

      // The following lines will give you more details about the error
      if (axiosError.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        console.log(axiosError.response.data);
        console.log(axiosError.response.status);
        console.log(axiosError.response.headers);
      } else if (axiosError.request) {
        // The request was made but no response was received
        console.log(axiosError.request);
      } else {
        // Something happened in setting up the request and triggered an error
        console.log('Error', axiosError.message);
      }
    } else {
      // Unknown error type
      console.error('An unknown error occurred', error);
    }

    throw error;
  }
};