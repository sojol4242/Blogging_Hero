import React, { useContext } from "react";
import "./Sidebar.css";
import { Link, useHistory, useLocation } from "react-router-dom";
import {
  faArrowLeft,
  faBlog,
  faHome,
  faPlus,
  faSignOutAlt,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCodiepie,
  faFacebookMessenger,
} from "@fortawesome/free-brands-svg-icons";
import { DataContext } from "../../App";
import { auth } from "../Auth/firebase";
const Sidebar = () => {
  const [signedInUser, setSignedInUser] = useContext(DataContext);
  const adminEmail = "test@test.com";
  const email = signedInUser.email;

  const userName = signedInUser.email.split(".com");
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        history.replace("/auth");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="sidebar">
      <div className="sidebar_top">
        <div className="brand_logo">
          <FontAwesomeIcon icon={faBlog} className="brand_icon" />
        </div>
        <nav className="sidebar_options">
          <ul>
            <li className="sidebar_option">
              <Link to="/home" className="sidebar_option">
                <FontAwesomeIcon icon={faHome} className="sidebar_icon" />
                <span className="sidebar_text">Home</span>
              </Link>
            </li>
            <li className="sidebar_option">
              <Link to="/message" className="sidebar_option">
                <FontAwesomeIcon
                  icon={faFacebookMessenger}
                  className="sidebar_icon"
                />
                <span className="sidebar_text">Messages</span>
              </Link>
            </li>
            <li className="sidebar_option">
              <Link to="/technology" className="sidebar_option">
                {/* Icon  */}
                <FontAwesomeIcon icon={faStore} className="sidebar_icon" />
                <span className="sidebar_text">Technology</span>
                {/* text */}
              </Link>
            </li>
            <li className="sidebar_option">
              <Link to="/programming" className="sidebar_option">
                {/* Icon  */}
                <FontAwesomeIcon icon={faCodiepie} className="sidebar_icon" />
                <span className="sidebar_text">Programming</span>
                {/* text */}
              </Link>
            </li>
          </ul>
        </nav>
        <div>
          {adminEmail === email && (
            <div className="sidebar_option">
              <Link to="/admin/addBlogs">
                <button className="addBlog">
                  {/* Icon  */}
                  <FontAwesomeIcon icon={faPlus} />
                  <span>Add Blog</span>
                  {/* text */}
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
      {/* user profile */}
      <div className="profile">
        <img
          src="https://img.icons8.com/ios-glyphs/30/000000/user-male-circle.png"
          alt="avatar"
        />
        <div className="profile-content">
          {/* {
            name ? ( <p className="name">{name}</p>):(
              <p className="name">Display Name</p>
            )
          } */}

          <p className="user-name">{userName}</p>
          <button className="logOut" onClick={handleSignOut}>
            {/* Icon  */}
            <FontAwesomeIcon
              style={{ marginLeft: "5px" }}
              icon={faSignOutAlt}
            />
            <span>Log Out</span>
            {/* text */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
