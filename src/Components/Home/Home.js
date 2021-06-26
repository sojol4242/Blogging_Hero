import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../App";
import Blog from "../Blogs/Blog";
// import Sidebar from '../Sidebar/Sidebar'

import "./Home.css";
const Home = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    fetch("https://desolate-dawn-26885.herokuapp.com/getBlogs")
      .then((res) => res.json())
      .then((blogs) => {
        console.log(blogs);
        setBlogs(blogs);
      });
  }, []);
  const contextData = useContext(DataContext);
  console.log(contextData);
  return (
    <div className="home">
      <div className="blogs">
       {
         blogs.length!==0?( 
           <>
           {blogs.map((blog) => (
          <Blog blog={blog} key={blog._id} />
        ))}
           </>
         ):( <div className="spinner">
           <img src="https://i.ibb.co/hfnBb2k/62981-loader.gif" alt="spinner" /> 
         </div> )
         
       }
      </div>
    </div>
  );
};

export default Home;
