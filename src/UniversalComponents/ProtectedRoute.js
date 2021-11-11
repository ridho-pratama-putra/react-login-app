import React from "react";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ component: Component, ...restOfProps }) {
    const loggedIn = localStorage.getItem("refreshToken");
    console.log("this protectedComponent :: ", loggedIn);

    return (
        <Route
            {...restOfProps}
            render={(props) =>
                loggedIn ? <Component {...props} /> : <Redirect to="/login" />
            }
        />
    );
}

export default ProtectedRoute;
