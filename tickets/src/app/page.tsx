import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

// Regular React component
const Home: React.FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const token = localStorage.getItem('accessToken');

    try {
      await axios.post('https://your-django-api-url/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Clear the access token from local storage
      localStorage.removeItem('accessToken');

      // Redirect to the login page
      window.location.href = '/login';
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <button onClick={handleLogout} className="btn btn-primary">Logout</button>
      </div>
    </main>
  );
};

export default Home;
