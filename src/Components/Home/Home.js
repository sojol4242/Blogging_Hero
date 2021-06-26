import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../App";
import Blog from "../Blogs/Blog";
// import Sidebar from '../Sidebar/Sidebar'

import "./Home.css";
const Home = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/getBlogs")
      .then((res) => res.json())
      .then((blogs) => {
        console.log(blogs);
      setBlogs(blogs)
      }
        );
  }, []);
 const contextData=useContext(DataContext);
 console.log(contextData);
  return (
    <div className="home">
      <div className="blogs">
       {
         blogs.map(blog => (<Blog blog={blog} key={blog._id}/>))
       }
      </div>
    </div>
  );
};

export default Home;
