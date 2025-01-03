import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Import axios
import { useNavigate } from 'react-router-dom';
const ProfileForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',  // Added email field
    location: '',
    quote: '',
    aboutMeTitle: '',
    aboutMeContent: '',
    languages: '',
    activities: '',
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
const navigate = useNavigate();
  // Use useEffect to get the email from localStorage when the component mounts
  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setFormData((prevData) => ({
        ...prevData,
        email: storedEmail,
      }));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData);

    try {
      // Send POST request with the form data to the server
      const response = await axios.post('http://localhost:3000/api/profile/profile', formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      setSuccessMessage('Profile created successfully!');
      setFormData({
        name: '',
        email: '',  // Reset email field after submission
        location: '',
        quote: '',
        aboutMeTitle: '',
        aboutMeContent: '',
        languages: '',
        activities: '',
      });
      navigate(`/dash/${formData.email}`);  // Redirect to the dashboard
    } catch (error) {
      console.error('Error submitting profile data:', error);
      setErrors({ api: error.response?.data?.message || 'Error submitting profile data' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl mb-6 text-center font-semibold">Create Profile</h2>

        {successMessage && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
            <p className="font-bold">Success</p>
            <p>{successMessage}</p>
          </div>
        )}

        {errors.api && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
            <p className="font-bold">Error</p>
            <p>{errors.api}</p>
          </div>
        )}

        <InputField label="Name" name="name" value={formData.name} onChange={handleInputChange} />
        <InputField label="Email" name="email" value={formData.email} onChange={handleInputChange} /> {/* Email input, set from localStorage */}
        <InputField label="Location" name="location" value={formData.location} onChange={handleInputChange} />
        <InputField label="Quote" name="quote" value={formData.quote} onChange={handleInputChange} />
        <InputField label="About Me Title" name="aboutMeTitle" value={formData.aboutMeTitle} onChange={handleInputChange} />
        <TextAreaField label="About Me Content" name="aboutMeContent" value={formData.aboutMeContent} onChange={handleInputChange} />
        <InputField label="Languages (comma separated)" name="languages" value={formData.languages} onChange={handleInputChange} />
        <InputField label="Activities (comma separated)" name="activities" value={formData.activities} onChange={handleInputChange} />

        <div className="text-center">
          <button
            type="submit"
            className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Create Profile'}
          </button>
        </div>
      </form>
    </div>
  );
};

const InputField = ({ label, name, value, onChange }) => (
  <div className="mb-4">
    <label className="block text-gray-600 mb-2">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-md"
      required
    />
  </div>
);

const TextAreaField = ({ label, name, value, onChange }) => (
  <div className="mb-4">
    <label className="block text-gray-600 mb-2">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-md"
      required
    />
  </div>
);

export default ProfileForm;
