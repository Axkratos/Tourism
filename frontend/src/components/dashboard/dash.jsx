import React, { useState, useEffect } from 'react';

const Widget = () => {
  // State for editable profile fields
  const [profile, setProfile] = useState({});
  const [reviews, setReviews] = useState([]);
  const [editMode, setEditMode] = useState(false);

  // Simulate fetching reviews from an API
  useEffect(() => {
    const fetchReviews = async () => {
      // Simulating a delay to mimic API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Dummy reviews data
      const dummyReviews = [
        { id: 1, text: 'Great service!', author: 'Jane Doe' },
        { id: 2, text: 'Very satisfied.', author: 'Bob Smith' },
        { id: 3, text: 'Amazing experience!', author: 'John Doe' },
      ];
      setReviews(dummyReviews);
    };

    fetchReviews();
  }, []);

  // Update profile handler
  const updateProfile = (e) => {
    e.preventDefault();
    // Here you would normally update profile data from form inputs
    // For simplicity, let's assume all inputs have 'name' attributes corresponding to profile fields
    const updatedProfile = {};
    Array.from(e.target.elements).forEach((element) => {
      if (element.name) {
        updatedProfile[element.name] = element.value;
      }
    });
    setProfile(updatedProfile);
    setEditMode(false); // Exit edit mode after saving
    alert('Profile updated successfully!');
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
              <img src={profile.backgroundImage} alt="Profile background" className="w-full h-48 object-cover" />
              <div className="absolute top-4 right-4 text-white text-lg font-bold">{profile.hourlyRate}</div>
              <div className="absolute top-4 left-4 flex items-center">
                <img src={profile.profileImage} alt="Profile picture" className="w-24 h-24 rounded-full border-4 border-white" />
                <div className="ml-4 text-white">
                  <h2 className="text-xl font-bold">{profile.name}</h2>
                  <p>{profile.location}</p>
                </div>
              </div>
            </div>

            {/* Profile description */}
            <form onSubmit={updateProfile}>
              <div className="p-4">
                <blockquote className="italic text-zinc-600 dark:text-zinc-300">
                  <textarea
                    name="quote"
                    value={profile.quote || ''}
                    onChange={(e) => setProfile({ ...profile, quote: e.target.value })}
                    readOnly={!editMode}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </blockquote>
                <p className="text-zinc-600 dark:text-zinc-300 mt-2">
                  Reply rate: <span className="font-bold">{profile.replyRate}</span>
                </p>
                <p className="text-zinc-600 dark:text-zinc-300">
                  Replies within: <span className="font-bold">{profile.repliesWithin}</span>
                </p>
              </div>

              {/* Explore and About me sections */}
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{profile.exploreTitle}</h3>
                <div className="mb-4">
                  <h4 className="font-semibold">I will show you</h4>
                  <textarea
                    name="exploreContent"
                    value={profile.exploreContent || ''}
                    onChange={(e) => setProfile({ ...profile, exploreContent: e.target.value })}
                    readOnly={!editMode}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold">{profile.aboutMeTitle}</h4>
                  <textarea
                    name="aboutMeContent"
                    value={profile.aboutMeContent || ''}
                    onChange={(e) => setProfile({ ...profile, aboutMeContent: e.target.value })}
                    readOnly={!editMode}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold">Languages</h4>
                  <input
                    type="text"
                    name="languages"
                    value={profile.languages || ''}
                    onChange={(e) => setProfile({ ...profile, languages: e.target.value })}
                    readOnly={!editMode}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold">Activities</h4>
                  <input
                    type="text"
                    name="activities"
                    value={profile.activities || ''}
                    onChange={(e) => setProfile({ ...profile, activities: e.target.value })}
                    readOnly={!editMode}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              {/* Edit/Save button */}
              <div className="p-4">
                {editMode ? (
                  <button type="submit" className="py-2 px-4 bg-green-400 hover:bg-green-700 text-white rounded-lg mr-4">
                    Save
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setEditMode(true)}
                    className="py-2 px-4 bg-blue-400 hover:bg-blue-700 text-white rounded-lg mr-4"
                  >
                    Edit
                  </button>
                )}
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

