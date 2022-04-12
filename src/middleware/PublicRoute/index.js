import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { NetworkAuth } from "../NetworkProvider";

const PublicRoute = ({ children }) => {
  const { Network } = NetworkAuth();
  const location = useLocation();

  return Network === "Solana" ? (
    children
  ) : (
    <Navigate to="/ethereum" state={{ from: location }} />
  );
};

export default PublicRoute;
