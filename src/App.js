import Home from "./Components/Home/Home";
import Message from "./Components/Message/Message";
import Tech from "./Components/Tech/Tech";
import Programming from "./Components/Programming/Programming";
import Error from "./Components/Error/Error";

import "./app.css";
import Sidebar from "./Components/Sidebar/Sidebar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddBlogs from "./Components/Admin/AddBlogs";
import { createContext, useState } from "react";
import PrivateRoute from "./Components/PrivateRout/PrivateRoute";
import BlogDetails from "./Components/Blogs/BlogDetails";
import Auth from "./Components/Auth/Auth";
export const DataContext = createContext();
function App() {
  // const [blogs, setBlogs] = useState([]);
  const [signedInUser, setSignedInUser] = useState({});

  

  const contextData = [signedInUser, setSignedInUser];
  // console.log(contextData);

  return (
    <>
      <DataContext.Provider value={contextData}>
        <div className="app">
          <Router>
            <Switch>
              <PrivateRoute exact path="/">
                <Sidebar />
                <Home />
              </PrivateRoute>
              <Route path="/auth">
                <Auth />
              </Route>
              <PrivateRoute path="/home">
                <Sidebar />
                <Home />
              </PrivateRoute>
              <PrivateRoute path="/message">
                <Sidebar />
                <Message />
              </PrivateRoute>
              <PrivateRoute path="/programming">
                <Sidebar />
                <Programming />
              </PrivateRoute>
              <PrivateRoute path="/technology">
                <Sidebar />
                <Tech />
              </PrivateRoute>
              <PrivateRoute path="/admin/addBlogs">
                <Sidebar />
                <AddBlogs />
              </PrivateRoute>
              <PrivateRoute path="/blogDetails/:id">
                <Sidebar />
                <BlogDetails />
              </PrivateRoute>
              <PrivateRoute path="*">
                <Sidebar />
                <Error />
              </PrivateRoute>
            </Switch>
          </Router>
        </div>
      </DataContext.Provider>
    </>
  );
}

export default App;
