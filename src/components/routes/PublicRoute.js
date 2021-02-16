/** @format */

import React, { useContext } from "react";
import { Route/* , Redirect */ } from "react-router-dom";

import AuthContext from "../contexts/AuthContext";

const PublicRoute = ({ component: Component, ...rest }) => {
    // const [authUser, setAuthUser] = useContext(AuthContext);
    const [state, dispatch] = useContext(AuthContext);
    // const { authUser, username, email, course } = state;

    return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default PublicRoute;
