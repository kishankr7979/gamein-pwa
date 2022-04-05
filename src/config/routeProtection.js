import React from "react";
import { useNavigate, Route, Routes } from "react-router-dom";

function ProtectedRoute({ component: Component, ...restOfProps }) {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const isAuthenticated = userDetails === null || userDetails?.name === null || userDetails?.name === '';
    console.log("this");
    let navigate = useNavigate();
    return (
        <Route
            {...restOfProps}
            render={(props) =>
                isAuthenticated ? <Component {...props} /> : navigate('/')
            }
        />
    );
}

export default ProtectedRoute;