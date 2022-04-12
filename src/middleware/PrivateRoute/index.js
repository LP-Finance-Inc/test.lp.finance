import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { NetworkAuth } from "../NetworkProvider";

const PrivateRoute = ({ children }) => {
  const { Network } = NetworkAuth();
  const location = useLocation();

  return Network === "Ethereum" ? (
    children
  ) : (
    <Navigate to="/" state={{ from: location }} />
  );
};

export default PrivateRoute;
