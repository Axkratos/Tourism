import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Widget = () => {
  // Dummy data
  const profile = {
    name: 'Anupama',
    location: 'Kathmandu, Nepal',
    hourlyRate: '$9/h',
    profileImage: 'https://placehold.co/100x100',
    backgroundImage: 'https://placehold.co/600x300',
    quote: '"A girl who loves to travel and make new friends."',
    replyRate: '72%',
    repliesWithin: '9 hours',
    reviewsCount: 53,
    exploreTitle: 'Explore Kathmandu, Nepal, with Anupama',
    exploreContent:
      'My city is full of historical palaces and temples. Not only this but there are many places to go for short hike at the outskirts of the city, can help you exploring to Pokhara, chitwan and other places.',
    aboutMeTitle: 'About me',
    aboutMeContent:
      'Namastey! I am a travel loving person who travels a lot too. Been to many countries in Europe over the years learning new cultures and adjusting with their',
    languages: 'English, Hindi',
    activities: 'Translation & Interpretation, Pick up & Driving Tours',
  };

  const socialLinks = [
    { name: 'Facebook', icon: 'F', href: '#' },
    { name: 'Twitter', icon: 'T', href: '#' },
    { name: 'LinkedIn', icon: 'L', href: '#' },
  ];

  // Reviews state
  const [reviews, setReviews] = useState([
    { id: 1, text: 'Great service!', author: 'Jane Doe' },
    { id: 2, text: 'Very satisfied.', author: 'Bob Smith' },
  ]);

  // Handler to add a new review
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
  return (
    <div className=" h-5xl w-screen mx-auto p-4">
      <div className="bg-zinc-100 dark:bg-zinc-800 rounded-lg shadow-lg overflow-hidden">
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
            <div className="p-4">
              <blockquote className="italic text-zinc-600 dark:text-zinc-300">{profile.quote}</blockquote>
              <p className="text-zinc-600 dark:text-zinc-300 mt-2">Reply rate: <span className="font-bold">{profile.replyRate}</span></p>
              <p className="text-zinc-600 dark:text-zinc-300">Replies within: <span className="font-bold">{profile.repliesWithin}</span></p>
            </div>

            {/* Explore and About me sections */}
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{profile.exploreTitle}</h3>
              <div className="mb-4">
                <h4 className="font-semibold">Journey With Me</h4>
                <p className="text-zinc-600 dark:text-zinc-300">{profile.exploreContent}</p>
                <a href="#" className="text-blue-500">+ More</a>
              </div>
              <div className="mb-4">
                <h4 className="font-semibold">{profile.aboutMeTitle}</h4>
                <p className="text-zinc-600 dark:text-zinc-300">{profile.aboutMeContent}</p>
                <a href="#" className="text-blue-500">+ More</a>
              </div>
              <div className="mb-4">
                <h4 className="font-semibold">Languages</h4>
                <p className="text-zinc-600 dark:text-zinc-300">{profile.languages}</p>
              </div>
              <div className="mb-4">
                <h4 className="font-semibold">Services Offered</h4>
                <p className="text-zinc-600 dark:text-zinc-300">{profile.activities}</p>
              </div>
            </div>

            {/* Reviews section */}
            <div className="p-4 bg-white dark:bg-zinc-700 border-t border-zinc-200 dark:border-zinc-600">
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  <span className="text-orange-500 text-xl">★★★★★</span>
                </div>
                <div className="ml-2 text-zinc-600 dark:text-zinc-300">Reviews: <span className="font-bold">{reviews.length}</span></div>
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
                //   onClick={addReview}
                  className="py-2  px-4 mt-4 bg-red-400 text-white rounded-lg hover:bg-red-600 focus:outline-2 focus:outline-dashed focus:ring-red-900 focus:border-red-900 "
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
              className=" bg-red-400  hover:bg-red-600 text-white w-full py-2 rounded-lg mb-4"
             
            >
              CREATE A TRIP
            </button>
            </Link>
           
            <div className="flex justify-center mt-4">
              
            </div>
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
