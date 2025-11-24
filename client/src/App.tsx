import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Mainpage from "./pages/Mainpage";
import Personal from "./pages/Personal";
import Nav from "./components/Nav";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Intro from "./pages/Intro";
import { getToken, isToken } from "./utils/tokenServices";
import UserProfile from "./pages/UserProfile";
import ProtectedRoutes from "./ProtectedRoutes";
import { Router } from "express";
import { copyFileSync } from "fs";
import { useDispatch, useSelector } from "react-redux";
import { loggedInUser } from "./@types/CustomTypes";
import { setUser } from "./store";
import Detail from "./pages/Detail";

type state = {
  user: loggedInUser;
};

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let user = useSelector((state: state) => {
    return state.user;
  });

  // console.log(user);

  const getUserProfile = async () => {
    const headers = new Headers();
    const token = getToken();

    if (!token) {
      console.log(" you have to login first");
      return;
    }

    if (token) {
      headers.append("Authorization", `Bearer ${token}`);
      const requestOptions = {
        method: "GET",
        headers,
      };

      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/users/profile`,
          requestOptions
        );

        if (!response.ok && response.status === 401) {
          console.log("tocken invaild");
          return;
        }
        if (response.ok) {
          const result = (await response.json()) as loggedInUser;
          console.log("logged in user", result);
          const userInfo = {
            token: token,
            user: {
              _id: result.user._id,
              name: result.user.name,
              email: result.user.email,
              avatar: result.user.avatar,
            },
          };
          dispatch(setUser(userInfo));
        }
      } catch (error) {
        console.log(error);
        localStorage.removeItem("token");
      }
    }
  };

  useEffect(() => {
    getUserProfile();
    const userState = isToken();
    if (userState) {
      console.log("user Logged in");
    } else {
      console.log("user Logged out");
    }
  }, []);

  return (
    <div className="App">
      <Nav />

      <Routes>
        {/* <PrivateRoute /> */}

        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Mainpage />}></Route>
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
