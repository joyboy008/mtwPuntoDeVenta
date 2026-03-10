import authProvider from "../utils/AuthProvider";
import { Route, Navigate } from "react-router-dom";

function PrivateRoute({ Component, ...other }) {
  if (!authProvider.checkAuth()) {
    return <Navigate to="/login/" />;
  }

  return <Route {...other} render={(props) => <Component {...props} />} />;
}

export default PrivateRoute;
