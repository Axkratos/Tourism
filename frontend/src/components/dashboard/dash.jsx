import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Widget = () => {
  const defaultProfileImage = 'https://placehold.co/100x100';
  const defaultBackgroundImage = 'https://placehold.co/600x300';

  const [profile, setProfile] = useState({
    email: '',
    name: '',
    location: '',
    profileImage: '',
    backgroundImage: '',
    quote: '',
    languages: '',
    activities: '',
  });

  const [editMode, setEditMode] = useState(false);
  const { userId } = useParams(); // Assuming userId is passed as a URL parameter

  // Dummy reviews data
  const reviews = [
    { id: 1, text: 'Great experience!', author: 'John Doe' },
    { id: 2, text: 'Awesome service!', author: 'Jane Smith' },
    { id: 3, text: 'Very professional.', author: 'Alice Johnson' },
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const email = localStorage.getItem('email'); // Get email from localStorage
        const response = await axios.get(`http://localhost:3000/api/profile/profile/${email}`);
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`http://localhost:3000/api/profile/profile/${profile.email}`, profile);
        alert('Profile updated successfully!');
      } else {
        await axios.post('http://localhost:3000/api/profile/profile', profile);
        alert('Initial profile information submitted successfully!');
      }
      setEditMode(false); // Reset edit mode after submission
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="bg-gray-50 dark:bg-zinc-800 rounded-lg shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <img
                src={profile.backgroundImage || defaultBackgroundImage}
                alt="Profile background"
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 left-4 flex items-center">
                <img
                  src={profile.profileImage || defaultProfileImage}
                  alt="Profile picture"
                  className="w-24 h-24 rounded-full border-4 border-white"
                />
                <div className="ml-4 text-white">
                  <h2 className="text-xl font-bold">{profile.name}</h2>
                  {profile.location && <p>{profile.location}</p>}
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="p-4">
                {profile.quote && (
                  <div className="mb-4">
                    <label className="block text-zinc-600 dark:text-zinc-300">Quote</label>
                    <textarea
                      name="quote"
                      value={profile.quote}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      readOnly={!editMode} // Disable input in view mode
                    />
                  </div>
                )}
                {profile.languages && (
                  <div className="mb-4">
                    <label className="block text-zinc-600 dark:text-zinc-300">Languages</label>
                    <input
                      type="text"
                      name="languages"
                      value={profile.languages}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      readOnly={!editMode} // Disable input in view mode
                    />
                  </div>
                )}
                {profile.activities && (
                  <div className="mb-4">
                    <label className="block text-zinc-600 dark:text-zinc-300">Activities</label>
                    <input
                      type="text"
                      name="activities"
                      value={profile.activities}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      readOnly={!editMode} // Disable input in view mode
                    />
                  </div>
                )}
              </div>
              <div className="p-4 flex justify-between">
                {editMode ? (
                  <button
                    type="submit"
                    className="py-2 px-4 bg-blue-400 hover:bg-blue-700 text-white rounded-lg"
                  >
                    Update Profile
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setEditMode(true)}
                    className="py-2 px-4 bg-green-400 hover:bg-green-700 text-white rounded-lg"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="bg-deepPurple-50 md:col-span-1 bg-white dark:bg-zinc-700 p-4 border border-zinc-200 dark:border-zinc-600">
            <div className="flex items-center mb-4">
              <div className="text-lg text-gray-700 dark:text-gray-300">Reviews</div>
            </div>
            <div className="p-4">
              {reviews.length > 0 ? (
                <ul>
                  {reviews.map((review) => (
                    <li key={review.id} className="mb-4">
                      <p className="text-lg text-gray-700 dark:text-gray-300">"{review.text}"</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">- {review.author}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-zinc-600 dark:text-zinc-300">No reviews yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Widget;
