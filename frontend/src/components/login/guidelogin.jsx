import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log('Response Data:', data);

      if (response.ok) {
        localStorage.setItem('accessToken', data.token);
        localStorage.setItem('userId', data._id);
        localStorage.setItem('role', data.role);
        navigate('/');
      } else {
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Error logging in. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-4xl font-bold text-center text-pink-800 dark:text-white mb-8">
        Welcome to Our Website!
      </h2>
      <div className="flex flex-wrap items-center">
        <div className="w-full md:w-1/2">
          <h3 className="text-2xl text-pink-800 dark:text-white font-bold">
            Stay connected with us!
          </h3>
          <p className="text-pink-600 dark:text-gray-400 mt-4">
          Login as guide...
          </p>
        </div>
        <div className="w-full md:w-1/2 mt-8 md:mt-0">
          <form
            onSubmit={handleLogin}
            className="bg-white dark:bg-gray-900 rounded shadow-md px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <label
                className="block text-pink-700 dark:text-gray-200 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="shadow appearance-none border border-pink-500 dark:border-gray-700 rounded w-full py-2 px-3 text-pink-700 dark:text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-pink-700 dark:text-gray-200 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border border-pink-500 dark:border-gray-700 rounded w-full py-2 px-3 text-pink-700 dark:text-gray-200 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <div className="flex items-center justify-between">
              <button
                className={`bg-pink-500 hover:bg-pink-700 dark:bg-pink-700 dark:hover:bg-pink-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                type="submit"
                disabled={loading}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
             
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
