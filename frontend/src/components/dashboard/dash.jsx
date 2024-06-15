// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const Widget = () => {
//   const defaultProfileImage = 'https://placehold.co/100x100';
//   const defaultBackgroundImage = 'https://placehold.co/600x300';

//   const [profile, setProfile] = useState({
//     name: '',
//     location: '',
//     profileImage: '',
//     backgroundImage: '',
//     aboutMeContent: '',
//     exploreContent: '',
//     languages: '',
//     phoneNumber: '',
//   });

//   const [reviews, setReviews] = useState([]);
//   const [editMode, setEditMode] = useState(false);
//   const { userId } = useParams();

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3000/api/dash/dashid/${userId}`);
//         setProfile(response.data);
//       } catch (error) {
//         console.error('Error fetching profile:', error);
//       }
//     };

//     fetchProfile();
//   }, [userId]);

//   useEffect(() => {
//     const fetchReviews = async () => {
//       await new Promise((resolve) => setTimeout(resolve, 1000));
//       const dummyReviews = [
//         { id: 1, text: 'Great service!', author: 'Jane Doe' },
//         { id: 2, text: 'Very satisfied.', author: 'Bob Smith' },
//         { id: 3, text: 'Amazing experience!', author: 'John Doe' },
//       ];
//       setReviews(dummyReviews);
//     };

//     fetchReviews();
//   }, []);

//   const handleSubmitInitial = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:3000/api/dash/create', profile);
//       alert('Initial profile information submitted successfully!');
//     } catch (error) {
//       console.error('Error submitting initial profile information:', error);
//     }
//   };

//   const handleSubmitUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(`http://localhost:3000/api/dash/update/${userId}`, profile);
//       alert('Profile updated successfully!');
//     } catch (error) {
//       console.error('Error updating profile:', error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProfile((prevProfile) => ({
//       ...prevProfile,
//       [name]: value,
//     }));
//   };

//   return (
//     <div className="max-w-5xl mx-auto p-4">
//       <div className="bg-gray-50 dark:bg-zinc-800 rounded-lg shadow-lg overflow-hidden">
//         <div className="grid md:grid-cols-3 gap-4">
//           <div className="md:col-span-2">
//             <div className="relative">
//               <img
//                 src={profile.backgroundImage || defaultBackgroundImage}
//                 alt="Profile background"
//                 className="w-full h-48 object-cover"
//               />
//               <div className="absolute top-4 left-4 flex items-center">
//                 <img
//                   src={profile.profileImage || defaultProfileImage}
//                   alt="Profile picture"
//                   className="w-24 h-24 rounded-full border-4 border-white"
//                 />
//                 <div className="ml-4 text-white">
//                   <h2 className="text-xl font-bold">{profile.name}</h2>
//                   <p>{profile.location}</p>
//                 </div>
//               </div>
//             </div>

//             <form onSubmit={editMode ? handleSubmitUpdate : handleSubmitInitial}>
//               <div className="p-4">
//                 <div className="mb-4">
//                   <label className="block text-zinc-600 dark:text-zinc-300">Location</label>
//                   <input
//                     type="text"
//                     name="location"
//                     value={profile.location}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-zinc-600 dark:text-zinc-300">Phone Number</label>
//                   <input
//                     type="text"
//                     name="phoneNumber"
//                     value={profile.phoneNumber}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-zinc-600 dark:text-zinc-300">About Me</label>
//                   <textarea
//                     name="aboutMeContent"
//                     value={profile.aboutMeContent}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-zinc-600 dark:text-zinc-300">Places that I can visit you</label>
//                   <textarea
//                     name="exploreContent"
//                     value={profile.exploreContent}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-zinc-600 dark:text-zinc-300">Languages</label>
//                   <input
//                     type="text"
//                     name="languages"
//                     value={profile.languages}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
//                   />
//                 </div>
//               </div>
//               <div className="p-4 flex justify-between">
//                 <button
//                   type="submit"
//                   className="py-2 px-4 bg-blue-400 hover:bg-blue-700 text-white rounded-lg"
//                 >
//                   {editMode ? 'Update Profile' : 'Submit Initial Info'}
//                 </button>
//                 {!editMode && (
//                   <button
//                     type="button"
//                     onClick={() => setEditMode(true)}
//                     className="py-2 px-4 bg-green-400 hover:bg-green-700 text-white rounded-lg"
//                   >
//                     Edit Profile
//                   </button>
//                 )}
//               </div>
//             </form>
//           </div>

//           <div className="bg-deepPurple-50 md:col-span-1 bg-white dark:bg-zinc-700 p-4 border border-zinc-200 dark:border-zinc-600">
//             <div className="flex items-center mb-4">
//               <div className="text-lg text-gray-700 dark:text-gray-300">Reviews</div>
//             </div>
//             <div className="p-4">
//               {reviews.length > 0 ? (
//                 <ul>
//                   {reviews.map((review) => (
//                     <li key={review.id} className="mb-4">
//                       <p className="text-lg text-gray-700 dark:text-gray-300">"{review.text}"</p>
//                       <p className="text-sm text-gray-500 dark:text-gray-400">- {review.author}</p>
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p className="text-zinc-600 dark:text-zinc-300">No reviews yet.</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Widget;



import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Dash = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/user/${userId}`);
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [userId]);

  return (
    <div>
      <h1>Profile</h1>
      {profile ? (
        <div>
          <p>Name: {profile.name}</p>
          <p>Location: {profile.location}</p>
          <p>About Me: {profile.aboutMeContent}</p>
          {/* Add other profile fields as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dash;



