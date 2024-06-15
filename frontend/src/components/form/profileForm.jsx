import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Widget = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    profileImage: '',
    backgroundImage: '',
    quote: '',
    aboutMeTitle: '',
    aboutMeContent: '',
    languages: '',
    activities: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, [name]: reader.result });
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem('email');  // Get email from local storage

    try {
      await axios.post('http://localhost:3000/api/profile/profile', { ...formData, email });
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl mb-6 text-center font-semibold">Update Profile</h2>
        
        <div className="flex flex-col items-center mb-6">
          {formData.profileImage && (
            <img src={formData.profileImage} alt="Profile" className="w-24 h-24 rounded-full mb-4" />
          )}
          <label className="block text-gray-600 mb-2">Profile Image</label>
          <input
            type="file"
            name="profileImage"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            accept="image/*"
          />
        </div>

        <div className="flex flex-col items-center mb-6">
          {formData.backgroundImage && (
            <img src={formData.backgroundImage} alt="Background" className="w-full h-32 object-cover mb-4 rounded-lg" />
          )}
          <label className="block text-gray-600 mb-2">Background Image</label>
          <input
            type="file"
            name="backgroundImage"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            accept="image/*"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Quote</label>
          <input
            type="text"
            name="quote"
            value={formData.quote}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2">About Me Title</label>
          <input
            type="text"
            name="aboutMeTitle"
            value={formData.aboutMeTitle}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2">About Me Content</label>
          <textarea
            name="aboutMeContent"
            value={formData.aboutMeContent}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Languages</label>
          <input
            type="text"
            name="languages"
            value={formData.languages}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Activities</label>
          <input
            type="text"
            name="activities"
            value={formData.activities}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default Widget;
