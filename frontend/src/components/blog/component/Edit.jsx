import React, { useEffect, useState } from "react";
import Form from "./components/form/Form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../config";

const Editblog = () => {
//   const [blogm, setblogm] = useState({});
//   const { id } = useParams();
//   const navigate = useNavigate();

//   // fetch blog
//   const fetchblog = async () => {
//     const response = await axios.get(`${baseUrl}/blog/${id}`);
//     setblogm(response.data.data);
//   };

//   useEffect(() => {
//     fetchblog();
//   }, []);

//   const editblog = async (data) => {
//     const response = await axios.patch(`${baseUrl}/blog/${id}`, data, {
//       headers: {
//         Authorization: localStorage.getItem("token"),
//       },
//     });
//     if (response.status === 200) {
//       alert("edited sucessfuully");
//       navigate("/");
//     }
//   };

  return (
    <div>
      <Form type={"Edit"} idata={blogm} onSubmit={editblog} />
    </div>
  );
};

export default Editblog;