import React, { useEffect } from "react";
import { isToken } from "./utils/tokenServices";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { BiCurrentLocation } from "react-icons/bi";

const ProtectedRoutes: React.FC = () => {
  const isUserLogged = isToken();

  const currentLocation = useLocation();

  if (isUserLogged) {
    return <Outlet />;
  } else {
    return (
      <Navigate
        to="/Login"
        replace
        state={{ redirectedFrom: currentLocation }}
      ></Navigate>
    );
  }
};

export default ProtectedRoutes;
