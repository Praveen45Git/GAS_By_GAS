import React from 'react';
import theme from '../theme'
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
 
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
   
    // Simulate API call delay
    setTimeout(() => {
      navigate('/home');
    }, 2000); // 2-second delay
  };

  

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div
        className="card p-4"
        style={{
          width: '100%',
          maxWidth: '400px',
          backgroundColor: theme.colors.cardBg,
          borderRadius: '12px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 className="text-center mb-4" style={{ color: theme.colors.textColor }}>
          Sign In
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label" style={{ color: theme.colors.textColor }}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter your email"
              style={{
                backgroundColor: theme.colors.inputBg,
                border: 'none',
                color: '#fff',
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label" style={{ color: theme.colors.textColor }}>
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter your password"
              style={{
                backgroundColor: theme.colors.inputBg,
                border: 'none',
                color: '#fff',
              }}
            />
          </div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <input type="checkbox" id="rememberMe" className="form-check-input" />
              <label htmlFor="rememberMe" className="form-check-label ms-2" style={{ color: theme.colors.textColor }}>
                Remember me
              </label>
            </div>
            <a href="#" style={{ color: theme.colors.textColor, textDecoration: 'none' }}>
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="btn w-100"
            style={{
              backgroundColor: theme.colors.buttonBg,
              color: '#fff',
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
