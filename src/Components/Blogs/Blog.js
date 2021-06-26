import { faTrash } from "@fortawesome/free-solid-svg-icons";
import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Blog.css";
import { Link } from "react-router-dom";
import { DataContext } from "../../App";

const Blog = ({ blog }) => {
  const [signedInUser, setSignedInUser] = useContext(DataContext);
  const adminEmail = "test@test.com";
  const email = signedInUser.email;
  // const name = signedInUser.displayName;
  const userName = signedInUser.email.split(".com");

  const handleDelete = () => {
    // console.log(blog._id);
    fetch(`https://desolate-dawn-26885.herokuapp.com/deleteBlog/${blog._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Blog Deleted Successfully");
      });
  };

  return (
    <div className="blog">
      <div className="blog_header">
        <div className="header_left">
          <img
            src="https://img.icons8.com/ios-glyphs/30/000000/user-male-circle.png"
            alt="avatar"
          />
          <h2>{userName}</h2>
        </div>
        {adminEmail === email && (
          <div className="header_right">
            <FontAwesomeIcon icon={faTrash} onClick={handleDelete} />
          </div>
        )}
      </div>
      <Link to={`/blogDetails/${blog._id}`}>
        <div className="blog_content">
          <h3 className="title">{blog.blogTitle}</h3>
          <img src={blog.img} alt="blog_image" />
        </div>
      </Link>
      <p>
        Posted: <span>{blog.date}</span>
      </p>
    </div>
  );
};

export default Blog;
