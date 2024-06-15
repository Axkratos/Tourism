import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Widget = () => {
  const defaultProfileImage = 'https://placehold.co/100x100';
  const defaultBackgroundImage = 'https://placehold.co/600x300';

  // State for profile fields
  const [profile, setProfile] = useState({
    name: '',
    location: '',
    profileImage: '',
    backgroundImage: '',
    aboutMeContent: '',
    exploreContent: '',
    languages: '',
    phoneNumber: '',
  });

  // State for reviews
  const [reviews, setReviews] = useState([]);

  // Fetch profile data from API on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/user/:id');
        setProfile((prevProfile) => ({
          ...prevProfile,
          name: response.data.name,
          location: response.data.location,
        }));
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  // Simulate fetching reviews from an API
  useEffect(() => {
    const fetchReviews = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const dummyReviews = [
        { id: 1, text: 'Great service!', author: 'Jane Doe' },
        { id: 2, text: 'Very satisfied.', author: 'Bob Smith' },
        { id: 3, text: 'Amazing experience!', author: 'John Doe' },
      ];
      setReviews(dummyReviews);
    };

    fetchReviews();
  }, []);

  // Handle form submission for initial profile submission
  const handleSubmitInitial = async (e) => {
    e.preventDefault();
    try {
      // Replace with actual API endpoint for submitting initial profile data
      await axios.post('http://localhost:3000/api/user/submit', profile);
      alert('Initial profile information submitted successfully!');
    } catch (error) {
      console.error('Error submitting initial profile information:', error);
    }
  };

  // Handle form submission for updating profile
  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    try {
      // Replace with actual API endpoint for updating profile data
      await axios.put('http://localhost:3000/api/user/update', profile);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="bg-gray-50 dark:bg-zinc-800 rounded-lg shadow-lg overflow-hidden">
        {/* Main content */}
        <div className="grid md:grid-cols-3 gap-4">
          {/* Left column */}
          <div className="md:col-span-2">
            {/* Profile header */}
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
                  <p>{profile.location}</p>
                </div>
              </div>
            </div>

            {/* Profile description */}
            <form>
              <div className="p-4">
                <div className="mb-4">
                  <label className="block text-zinc-600 dark:text-zinc-300">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={profile.location}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-zinc-600 dark:text-zinc-300">Phone Number</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={profile.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-zinc-600 dark:text-zinc-300">About Me</label>
                  <textarea
                    name="aboutMeContent"
                    value={profile.aboutMeContent}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-zinc-600 dark:text-zinc-300">Places that I can visit you</label>
                  <textarea
                    name="exploreContent"
                    value={profile.exploreContent}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-zinc-600 dark:text-zinc-300">Languages</label>
                  <input
                    type="text"
                    name="languages"
                    value={profile.languages}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              {/* Submit buttons */}
              <div className="p-4 flex justify-between">
                <button
                  type="submit"
                  onClick={handleSubmitInitial}
                  className="py-2 px-4 bg-blue-400 hover:bg-blue-700 text-white rounded-lg"
                >
                  Submit Initial Info
                </button>
                <button
                  type="submit"
                  onClick={handleSubmitUpdate}
                  className="py-2 px-4 bg-red-400 hover:bg-red-700 text-white rounded-lg"
                >
                  Update Profile
                </button>
              </div>
            </form>
          </div>

          {/* Right column */}
          <div className="bg-deepPurple-50 md:col-span-1 bg-white dark:bg-zinc-700 p-4 border border-zinc-200 dark:border-zinc-600">
            <div className="flex items-center mb-4">
              <div className="text-lg text-gray-700 dark:text-gray-300">Reviews</div>
            </div>

            {/* List of reviews */}
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
