import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterGuide() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'guide' // Changed role to 'guide'
  });

  const navigate = useNavigate();
  const [error, setError] = useState(null);

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
      const response = await fetch('http://localhost:3000/api/guide/signup', { // Updated API endpoint for guides
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
      console.log(data);
      navigate('/signin'); // Redirect to login page on success
    } catch (error) {
      setError('Error: ' + error.message);
      console.error('Error:', error);
    }
  };

  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          alt="Sample image"
          className="rounded-lg shadow-lg"
        />
      </div>
      <div className="md:w-1/3 max-w-sm bg-white p-6 rounded-lg shadow-lg">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold mb-2">Join Us as a Tourist</h2>
          <p className="mb-4">Explore the world with us! Sign up with</p>
          <div className="flex justify-center space-x-2">
            <button
              type="button"
              className="h-9 w-9 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mx-auto"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
                />
              </svg>
            </button>
            <button
              type="button"
              className="h-9 w-9 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mx-auto"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p className="mx-4 mb-0 text-center font-semibold text-gray-500">Or</p>
        </div>
        {/* Registration Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded-lg"
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
          />
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded-lg"
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded-lg"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded-lg"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <input
            type="hidden"
            name="role"
            value="guide"
          />
          <button
            className="mt-4 bg-red-600 hover:bg-red-700 px-4 py-2 text-white uppercase rounded-lg text-xs tracking-wider shadow-md" // Changed button color to #DC2626
            type="submit"
          >
            Register
          </button>
        </form>
        {/* End Registration Form */}
        {error && <p className="mt-4 text-red-600">{error}</p>} {/* Changed error message color to red */}
        <div className="mt-4 font-semibold text-sm text-gray-500 text-center md:text-left">
          Already have an account?{' '}
          <button
            className="text-green-600 hover:underline hover:underline-offset-4"
            onClick={() => navigate('/signin')}
          >
            Login
          </button>
        </div>
      </div>
    </section>
  );
}

export default RegisterGuide;
