import React from "react";

import Form from "./components/form/Form";
// import axios from "axios";

// import { useNavigate } from "react-router-dom";
const Addblog = () => {
  const navigate = useNavigate();
//   const handleCreateBlog = async (data) => {
//     try {
//       const response = await axios.post(`${baseUrl}/blog`, data, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: localStorage.getItem("token"),
//         },
//       });
//       if (response.status === 201) {
//         navigate("/");
//       } else {
//         alert("Something went wrong");
//       }
//     } catch (error) {
//       alert(error?.response?.data?.message);
//     }
//   };
  return <Form type={"Add"} onSubmit={handleCreateBlog} />;
};

export default Addblog;