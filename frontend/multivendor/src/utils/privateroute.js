import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../utils/authContext";

const PrivateRoute = ({ children }) => {
    const { isLoggedIn } = useContext(AuthContext);

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default PrivateRoute;