import React, { useState } from 'react';

const Widget = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    profileImage: null,
    backgroundImage: null,
    quote: '',
    aboutMeTitle: '',
    aboutMeContent: '',
    languages: '',
    activities: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setFormData({ ...formData, [name]: files[0] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem('email');
    if (!email) {
      console.log('Email is not valid');
      return;
    }

    setLoading(true);
    try {
      const formDataToSend = new FormData();

      // Append email as a hidden field
      formDataToSend.append('email', email);

      // Append other form data fields
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null && formData[key] !== undefined) {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Log formData to see what's being sent
      for (let [key, value] of formDataToSend.entries()) {
        console.log(`${key}:`, value);
      }

      const res = await fetch('http://localhost:3000/api/profile/profile', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      setSuccessMessage('Profile updated successfully!');
      setFormData({
        name: '',
        location: '',
        profileImage: null,
        backgroundImage: null,
        quote: '',
        aboutMeTitle: '',
        aboutMeContent: '',
        languages: '',
        activities: '',
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrors({ api: 'Failed to update profile' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl mb-6 text-center font-semibold">Update Profile</h2>

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

        <ImageUpload
          label="Profile Image"
          image={formData.profileImage}
          name="profileImage"
          onChange={handleImageChange}
          className="w-24 h-24 rounded-full mb-4"
        />

        <ImageUpload
          label="Background Image"
          image={formData.backgroundImage}
          name="backgroundImage"
          onChange={handleImageChange}
          className="w-full h-32 object-cover mb-4 rounded-lg"
        />

        <InputField label="Name" name="name" value={formData.name} onChange={handleInputChange} />
        <InputField label="Location" name="location" value={formData.location} onChange={handleInputChange} />
        <InputField label="Quote" name="quote" value={formData.quote} onChange={handleInputChange} />
        <InputField label="About Me Title" name="aboutMeTitle" value={formData.aboutMeTitle} onChange={handleInputChange} />
        <TextAreaField label="About Me Content" name="aboutMeContent" value={formData.aboutMeContent} onChange={handleInputChange} />
        <InputField label="Languages" name="languages" value={formData.languages} onChange={handleInputChange} />
        <InputField label="Activities" name="activities" value={formData.activities} onChange={handleInputChange} />

        <div className="text-center">
          <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none" disabled={loading}>
            {loading ? 'Uploading...' : 'Upload Profile'}
          </button>
        </div>
      </form>
    </div>
  );
};

const ImageUpload = ({ label, image, name, onChange, className }) => (
  <div className="flex flex-col items-center mb-6">
    {image && <img src={URL.createObjectURL(image)} alt={label} className={className} />}
    <label className="block text-gray-600 mb-2">{label}</label>
    <input type="file" name={name} onChange={onChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" accept="image/*" />
  </div>
);

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

export default Widget;
