import React, { useState, useEffect } from "react";


const Form = ({ type, onSubmit, idata }) => {
  const [data, setData] = useState({
    title: "",
    subtitle: "",
    description: "",
    category: "",
    image: null,
  });

  useEffect(() => {
    if (idata && Object.keys(idata).length !== 0) {
      setData(idata);
    }
  }, [idata]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: name === "image" ? e.target.files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(data);
  };

  return (
    
      <div className="bg-gray-100 flex items-center justify-center h-screen">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-xl w-full">
          <h2 className="text-2xl font-semibold text-center mb-4">
            {type} Blog here
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Share your information correctly
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="fullName"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Blog Title*
              </label>
              <input
                type="text"
                value={data.title}
                onChange={handleInput}
                id="fullName"
                className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                name="title"
                required
                placeholder="Blog title here.."
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="subtitle"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Sub Title*
              </label>
              <input
                type="text"
                onChange={handleInput}
                value={data.subtitle}
                name="subtitle"
                id="subtitle"
                className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Image*
              </label>
              <input
                type="file"
                onChange={handleInput}
                accept="image/*"
                id="image"
                name="image"
                className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="category"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Category*
              </label>
              <input
                name="category"
                onChange={handleInput}
                value={data.category}
                type="text"
                id="category"
                className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Description*
              </label>
              <textarea
                type="text"
                id="description"
                onChange={handleInput}
                value={data.description}
                name="description"
                className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                required
              />
            </div>
            {type === "Add" ? (
              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Post
              </button>
            ) : (
              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Edit
              </button>
            )}
          </form>
        </div>
      </div>
   
  );
};

export default Form;