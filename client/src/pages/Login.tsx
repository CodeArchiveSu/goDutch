import React, { useState } from "react";
import { NotOkType, User, loggedInUser } from "../@types/CustomTypes";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../store";

function Login() {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const location = useLocation();

  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const [error, setErorr] = useState("");

  const saveInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  console.log("API_URL", process.env.REACT_APP_API_URL);


  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputValue.email.trim()) {
      console.log("Enter your  email");
      setErorr("Enter your  email");
      return;
    }
    if (!inputValue.password.trim()) {
      console.log("Enter your password");
      setErorr("Enter your  password");
      return;
    }

    const headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");

    const body = new URLSearchParams();
    body.append("email", inputValue.email);
    body.append("password", inputValue.password);

    const requestOptions = {
      method: "POST",
      headers,
      body,
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/users/login`,
        requestOptions
      );

      if (response.ok) {
        const result = (await response.json()) as loggedInUser;
        console.log(result);
        localStorage.setItem("token", result.token);
        dispatch(setUser(result));

        const from = location?.state?.redirectedFrom?.pathname || "/";
        console.log(from);
        navigate(from);
      }

      if (!response.ok) {
        const result = (await response.json()) as NotOkType;
        console.log(result);
        setErorr(result.error);
      }
    } catch (error) {
      console.log("something went wrong", error);
    }
  };

  return (
    <div>
      {" "}
      <div className="FormConatiner">
        <div>LOGIN</div>
        <form
          className="LoginRegisterForm"
          onSubmit={(e) => {
            onSubmit(e);
          }}
        >
          <div>Email</div>
          <input type="email" name="email" onChange={saveInputValue} />
          <div>Password</div>
          <input type="password" name="password" onChange={saveInputValue} />
          <div className={error ? "error shake" : "error"}>{error}</div>

          {/* <button>CREATE NEW ACCOUNT</button> */}
          <button type="submit">CONTINUE</button>
        </form>
        <div
          style={{
            textAlign: "center",
            textDecoration: "underline",
            marginTop: "3vh",
          }}
          onClick={() => {
            navigate("/register");
          }}
        >
          Create new account
        </div>
      </div>
    </div>
  );
}

export default Login;
