import React, { useState, FormEvent } from 'react';
import { useNavigation } from 'next/navigation';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

interface FormData {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/login/', formData);
      localStorage.setItem('authToken', response.data.token);
      navigation.navigate('/home');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div className="row justify-content-center">
        <div className="col-md-100 mx-auto">
          <strong><h2 className="text-center mb-3">Kit Escola Digital</h2></strong>
          <div className="text-center">
            <img src="/alpoente.png" className="d-block mx-auto mb-4" />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-1 text-center ">
              <label className="form-label ">Nome:</label>
              <input type="text" className="form-control" name="username" value={formData.username} onChange={handleChange} />
            </div>
            <div className="mb-3 text-center">
              <label className="form-label">Palavra-Passe:</label>
              <div className="input-group">
                <input type={showPassword ? "text" : "password"} className="form-control" name="password" value={formData.password} onChange={handleChange} />
                <div className="input-group-append">
                  <button type="button" className={`btn ${showPassword ? "btn" : "btn"}`} onClick={toggleShowPassword}>
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </button>
                </div>
              </div>
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
