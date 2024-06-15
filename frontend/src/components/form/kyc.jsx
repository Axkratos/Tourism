import React, { useState } from 'react';

const KYCForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    citizenshipNumber: '',
    image: null,
    citizenshipPhoto: null,
    cv: null,
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!formData.citizenshipNumber.trim()) {
      errors.citizenshipNumber = 'Citizenship Number is required';
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('citizenshipNumber', formData.citizenshipNumber);
        formDataToSend.append('image', formData.image);
        formDataToSend.append('citizenshipPhoto', formData.citizenshipPhoto);
        if (formData.cv) {
          formDataToSend.append('cv', formData.cv);
        }

        const response = await fetch('http://localhost:3000/api/kyc/create', {
          method: 'POST',
          body: formDataToSend,
        });

        if (!response.ok) {
          const errorData = await response.json();
          setErrors({ api: errorData.message });
          return;
        }

        const data = await response.json();
        setSuccessMessage('KYC form submitted successfully!');
        setFormData({
          name: '',
          citizenshipNumber: '',
          image: null,
          citizenshipPhoto: null,
          cv: null,
        });
      } catch (error) {
        setErrors({ api: 'An error occurred. Please try again.' });
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">KYC Form</h2>

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

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.name ? 'border-red-500' : ''}`}
          />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="citizenshipNumber" className="block text-sm font-medium text-gray-700">Citizenship Number *</label>
          <input
            type="text"
            id="citizenshipNumber"
            name="citizenshipNumber"
            value={formData.citizenshipNumber}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.citizenshipNumber ? 'border-red-500' : ''}`}
          />
          {errors.citizenshipNumber && <p className="text-xs text-red-500 mt-1">{errors.citizenshipNumber}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image *</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="citizenshipPhoto" className="block text-sm font-medium text-gray-700">Citizenship Photo *</label>
          <input
            type="file"
            id="citizenshipPhoto"
            name="citizenshipPhoto"
            accept="image/*"
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="cv" className="block text-sm font-medium text-gray-700">CV (Optional)</label>
          <input
            type="file"
            id="cv"
            name="cv"
            accept=".pdf,.doc,.docx"
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Submit KYC
          </button>
        </div>
      </form>
    </div>
  );
};

export default KYCForm;
