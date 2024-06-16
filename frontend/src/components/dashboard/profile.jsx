import React, { useState } from 'react';
import toast from 'react-hot-toast';

import useProfile from './useProfile';

const ProfileForm = () => {
  const { loading, profile } = useProfile(); // Destructure loading state and profile function from useProfile hook
  const [formData, setFormData] = useState({
    profileImg: '',
    backgroundImg: '',
    name: '',
    location: '',
    quotes: '',
    aboutMe: '',
    content: '', // Change from contentLanguages to content
    languages: '', // Separate field for languages
    activities: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await profile({
        profileImg: formData.profileImg,
        backgroundImg: formData.backgroundImg,
        name: formData.name,
        location: formData.location,
        quotes: formData.quotes,
        aboutMe: formData.aboutMe,
        content: formData.content, // Adjust to content
        languages: formData.languages, // Adjust to languages
        activities: formData.activities,
      });

      // Using toast notification for success
      toast.success('Profile created successfully');

      // Optionally, clear the form fields after successful submission
      setFormData({
        profileImg: '',
        backgroundImg: '',
        name: '',
        location: '',
        quotes: '',
        aboutMe: '',
        content: '', // Clear content field
        languages: '', // Clear languages field
        activities: '',
      });
    } catch (error) {
      console.error('Error creating profile:', error);
      toast.error('Error creating profile. Please try again.'); // Using toast notification for error
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the first file selected by the user
    setFormData({ ...formData, [e.target.name]: file });
  };

  return (
    <div className="dashboard-container">
      <div className="main-content">
        <h1>Add Profile</h1>

        <form className="add-profile-form mt-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="profileImg" className="label">
              Profile Image
            </label>
            <input
              type="file"
              accept="image/*" // Specify accepted file types
              id="profileImg"
              name="profileImg"
              onChange={handleImageChange}
              required
            />
          </div>

          <div>
            <label htmlFor="backgroundImg" className="label">
              Background Image
            </label>
            <input
              type="file"
              accept="image/*" // Specify accepted file types
              id="backgroundImg"
              name="backgroundImg"
              onChange={handleImageChange}
              required
            />
          </div>

          <div>
            <label htmlFor="name" className="label">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="input"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="location" className="label">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              className="input"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="quotes" className="label">
              Quotes
            </label>
            <input
              type="text"
              id="quotes"
              name="quotes"
              className="input"
              value={formData.quotes}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="aboutMe" className="label">
              About Me
            </label>
            <textarea
              id="aboutMe"
              name="aboutMe"
              className="input"
              value={formData.aboutMe}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="content" className="label"> {/* Updated label */}
              Content
            </label>
            <input
              type="text"
              id="content"
              name="content"
              className="input"
              value={formData.content}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="languages" className="label"> {/* New label for languages */}
              Languages
            </label>
            <input
              type="text"
              id="languages"
              name="languages"
              className="input"
              value={formData.languages}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="activities" className="label">
              Activities
            </label>
            <textarea
              id="activities"
              name="activities"
              className="input"
              value={formData.activities}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn-create-profile" disabled={loading}>
            {loading ? 'Creating Profile...' : 'Create Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
