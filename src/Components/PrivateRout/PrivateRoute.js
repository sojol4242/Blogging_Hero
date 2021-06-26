import React from "react";
import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { DataContext } from "../../App";
const PrivateRoute = ({ children, ...rest }) => {
  const [signedInUser, setSignedInUser] = useContext(DataContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        signedInUser.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/auth",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
