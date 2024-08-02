import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Mainpage from "./pages/Mainpage";
import Schedule from "./pages/Schedule";
import Personal from "./pages/Personal";
import Nav from "./components/Nav";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Intro from "./pages/Intro";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        {/* <Route element={}> */}
        <Route path="/" element={<Intro />}></Route>
        <Route path="/main" element={<Mainpage />}></Route>
        <Route path="/deadline" element={<Schedule />}></Route>
        <Route path="/schedule" element={<Schedule />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Register" element={<Register />} />
        {/* </Route> */}

        {/* <Route path="/search" element={<Personal />}></Route> */}
      </Routes>
    </div>
  );
}

export default App;
