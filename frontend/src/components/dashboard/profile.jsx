import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const Widget = () => {
  const [profile, setProfile] = useState(null);
  const [reviews, setReviews] = useState([]);
  const { email } = useParams(); // Get email from route parameters

  // Function to fetch profile data from the API based on email parameter
  const fetchProfileData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/profile/profile/${email}`);
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  // Function to add a new review
  const addReview = () => {
    // Dummy review for testing
    const newReview = {
      id: reviews.length + 1,
      text: 'Amazing experience with Anupama!',
      author: 'John Doe',
    };

    // Update reviews state
    setReviews([...reviews, newReview]);
  };

  // useEffect to fetch profile data and save email to local storage when component mounts
  useEffect(() => {
    fetchProfileData();
    if (email) {
      localStorage.setItem('visitedUserEmail', email);
    }
  }, [email]); // Dependency on email ensures it re-fetches when email parameter changes

  // Render loading message while profile data is being fetched
  if (!profile) {
    return <p>Loading...</p>;
  }

  return (
    <div className="h-5xl w-screen mx-auto p-4">
      <div className="bg-zinc-100 dark:bg-zinc-800 rounded-lg shadow-lg overflow-hidden">
        {/* Main content */}
        <div className="grid md:grid-cols-3 gap-4">
          {/* Left column */}
          <div className="md:col-span-2">
            {/* Profile header */}
            <div className="relative">
              <img src={profile.backgroundImage} alt="Profile background" className="w-full h-48 object-cover" />
              <div className="absolute top-4 left-4 flex items-center">
                <img src={profile.profileImage} alt="Profile picture" className="w-24 h-24 rounded-full border-4 border-white" />
                <div className="ml-4 text-white">
                  <h2 className="text-xl font-bold">{profile.name}</h2>
                  <p>{profile.location}</p>
                </div>
              </div>
            </div>

            {/* Profile description */}
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">Profile Description</h3>
              <blockquote className="italic text-zinc-600 dark:text-zinc-300">{profile.quote}</blockquote>
            </div>

            {/* About Me, Languages, and Activities sections */}
            <div className="p-4">
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">About Me</h3>
                <p className="text-zinc-600 dark:text-zinc-300">{profile.aboutMeContent}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Languages</h3>
                <p className="text-zinc-600 dark:text-zinc-300">{profile.languages.join(', ')}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Services Offered</h3>
                <p className="text-zinc-600 dark:text-zinc-300">{profile.activities.join(', ')}</p>
              </div>
            </div>

            {/* Reviews section */}
            <div className="p-4 bg-white dark:bg-zinc-700 border-t border-zinc-200 dark:border-zinc-600">
              <div className="flex items-center mb-4">
                <h3 className="text-lg font-semibold">Reviews</h3>
              </div>

              {/* List of reviews */}
              <div>
                <ul>
                  {reviews.map((review) => (
                    <li key={review.id} className="mb-4">
                      <p className="text-lg text-gray-700 dark:text-gray-300">"{review.text}"</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">- {review.author}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Add review form (example) */}
              <div className="mt-4">
                <textarea
                  placeholder="Write your review here..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white mt-2"
                />
                <button
                  onClick={addReview}
                  className="py-2 px-4 mt-4 bg-red-400 text-white rounded-lg hover:bg-red-600 focus:outline-2 focus:outline-dashed focus:ring-red-900 focus:border-red-900"
                >
                  Add Review
                </button>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="md:col-span-1 bg-white dark:bg-zinc-700 p-4 border border-zinc-200 dark:border-zinc-600">
            <div className="flex items-center mb-4">
              <div className="text-lg text-gray-700 dark:text-gray-300">
                Create a Trip
              </div>
            </div>
            <Link to={'/form'}>
              <button
                className="bg-red-400 hover:bg-red-600 text-white w-full py-2 rounded-lg mb-4"
              >
                CREATE A TRIP
              </button>
            </Link>

            <div className="mt-4">
              <h4 className="font-semibold">More info</h4>
              <a href="#" className="text-blue-500 hover:text-blue-700">About TrekSathi</a>
              <a href="#" className="text-blue-500 hover:text-blue-700 ml-2">Booking Advice</a>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold">Need assistance?</h4>
              <p className="text-zinc-600 dark:text-zinc-300">Contact our <a href="#" className="text-blue-500 hover:text-blue-700">Customer Support</a> if you need any assistance managing your bookings.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Widget;
