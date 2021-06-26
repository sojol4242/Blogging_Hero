import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";

import "./addBlogs.css";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
const AddBlogs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [imageUrl, setImageUrl] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [success, setSuccess] = useState(" ");

  const history = useHistory();
  // post services data to database
  const onSubmit = (data, e) => {
    const newBlog = {
      blogTitle: data.blogTitle,
      description: data.blogDetails,
      img: imageUrl,
      date: selectedDate.toLocaleDateString("en-BN"),
    };
    const url = "https://desolate-dawn-26885.herokuapp.com/addBlog";

    //   console.log(newService);

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBlog),
    })
      .then((res) => console.log("Server Response ", res))
      .then((data) => {
        setSuccess("Blog Posted Successfully");
        // setTimeout(() => {
        //   history.replace("/home");
        // }, 5000);
      });

    setSelectedDate("dd/mm/yy");
    e.preventDefault();
    e.target.reset();
  };

  // image upload on image bb
  const handleImageUpload = (e) => {
    console.log(e.target.files[0]);
    const imageData = new FormData();
    imageData.set("key", "77da4673bb823946547077102ba63bff");
    imageData.append("image", e.target.files[0]);
    axios
      .post("https://api.imgbb.com/1/upload", imageData)
      .then((res) => {
        setImageUrl(res.data.data.display_url);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="addBlogs">
      <div className="form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group">
            <label htmlFor="">Title</label>
            <br />
            <input
              placeholder="Blog Title"
              type="Title"
              {...register("blogTitle")}
            />
          </div>
          <div className="input-group">
            <label htmlFor="">Description</label>
            <br />
            <textarea
              placeholder="Blog Details"
              type="Details"
              {...register("blogDetails")}
            />
          </div>

          <small style={{ color: "red" }}>
            {errors.blogDetails && <span>Details is required</span>}
          </small>

          <div className="input-group">
            <label htmlFor="">Choose a Image</label>
            <br />
            <input
              id="file-input"
              placeholder="Choose a file"
              type="file"
              {...register("file", { required: true })}
              onChange={handleImageUpload}
            />
          </div>
          <small style={{ color: "red" }}>
            {errors.file && <span>Image is required</span>}
          </small>
          <br />

          <button className="addBtn" type="submit">
            {" "}
            <FontAwesomeIcon icon={faPlus} /> ADD
          </button>

          <p className="success">{success}</p>
        </form>
      </div>
    </div>
  );
};

export default AddBlogs;
