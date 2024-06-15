import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Topuser = () => {
  const [users, setUsers] = useState([]);

  const fetchTopRatedUser = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/user/alluser');
      console.log(response.data)
      if (response.status === 200) {
        setUsers(response.data); // Set response.data, assuming it's an array of users
      } else {
        console.error('Failed to fetch users:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching top rated users:', error.message);
    }
  };

  useEffect(() => {
    fetchTopRatedUser();
  }, []);

  return (
    <>
      <div className="max-w-6xl mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900">
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Find your local tour guide with MeroSathi
          </h1>
          <p className="text-lg text-gray-500 mt-2">Choose your best</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-4">
          {users && users.length > 0 ? (
            users.map((user, i) => (
              <div key={i} className="bg-white shadow-md rounded-lg p-4">
                <div className="text-center mt-2">
                  <h2 className="font-semibold text-xl">{user.fullName}</h2>
                  {/* <p className="text-gray-500 text-sm">{user.location}</p>
                  <p className="text-gray-500 text-sm">{user.aboutMeTitle}</p> */}
                </div>
                <Link to={`/profile/${user._id}`} className="p-2 border-t mx-4 mt-2">
                  <button className="w-full block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-4 py-2 text-sm">
                    View
                  </button>
                </Link>
              </div>
            ))
          ) : (
            <div className="text-center w-full">No users found.</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Topuser;
