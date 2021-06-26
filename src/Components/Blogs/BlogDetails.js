import React, { useEffect, useState } from "react";
import "./blogDetails.css";
import { useParams } from "react-router-dom";

const BlogDetails = () => {
  const [blog, setBlog] = useState({});

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    fetch("http://localhost:5000/getBlogs")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        // setServiceData(data)
        const blogDetails = data.find((e) => e._id === id);
        setBlog(blogDetails);
        // console.log(blogDetails);
      });
  }, []);

  return (
    <div className="blogDetails">
      <h3>{blog.blogTitle}</h3>
      <img src={blog.img} alt={blog.blogTitle} />
      <p>{blog.description}</p>
   
    </div>
  );
};

export default BlogDetails;
