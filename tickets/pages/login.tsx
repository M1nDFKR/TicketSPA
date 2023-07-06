import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

interface FormData {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ username: '', password: '' });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://your-django-api-url/login', formData);
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('username', formData.username);
      router.push('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div className="row justify-content-center">
        <div className="col-md-100 mx-auto">
          <h3 className="text-center mb-4">Escola Digital</h3>
          <div className="text-center">
            <img src="/logo.png" alt="Logo" className="d-block mx-auto mb-4" />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-2 text-center ">
              <strong><label className="form-label ">Nome:</label></strong>
              <input type="text" className="form-control" name="username" value={formData.username} onChange={handleChange} />
            </div>
            <div className="mb-3 text-center">
              <strong><label className="form-label">Palavra-Passe:</label></strong>
              <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
