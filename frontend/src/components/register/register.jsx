import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterGuide() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'guide'
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data (optional)
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/tourist/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
        credentials: 'include', // Include credentials in the request
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setSuccess('Registration successful');
      navigate('/signin')
      console.log(data);
    } catch (error) {
      setError('Error: ' + error.message);
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-4xl font-bold text-center text-pink-800 dark:text-white mb-8">
        Register as Tourist
      </h2>
      <div className="flex flex-wrap items-center">
        <div className="w-full md:w-1/2 mt-8 md:mt-0">
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-900 rounded shadow-md px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <label
                className="block text-pink-700 dark:text-gray-200 text-sm font-bold mb-2"
                htmlFor="fullName"
              >
                Full Name
              </label>
              <input
                className="shadow appearance-none border border-pink-500 dark:border-gray-700 rounded w-full py-2 px-3 text-pink-700 dark:text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                id="fullName"
                type="text"
                placeholder="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-pink-700 dark:text-gray-200 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                className="shadow appearance-none border border-pink-500 dark:border-gray-700 rounded w-full py-2 px-3 text-pink-700 dark:text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
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
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-pink-700 dark:text-gray-200 text-sm font-bold mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                className="shadow appearance-none border border-pink-500 dark:border-gray-700 rounded w-full py-2 px-3 text-pink-700 dark:text-gray-200 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            {success && <div className="text-green-600 mb-4">{success}</div>}
            <div className="flex items-center justify-between">
              <button
                className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Register
              </button>
            </div>
          </form>
          <div className="mt-4 font-semibold text-sm text-gray-500 text-center">
            Already have an account?{' '}
            <button
              className="text-pink-600 hover:underline"
              onClick={() => navigate('/signin')}
            >
              Login
            </button>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <img
            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            alt="Sample image"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}

export default RegisterGuide;
