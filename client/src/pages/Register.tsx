import React, { useState } from "react";
import { baseUrl } from "../utils/baseUrl";
import { NotOkType, User } from "../@types/CustomTypes";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  // type Register = {
  //   name: string,
  //   email: string,
  //   password: string,
  // }
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setErorr] = useState("");

  const saveInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErorr("");

    if (
      !inputValue.name.trim() ||
      !inputValue.email.trim() ||
      !inputValue.password.trim()
    ) {
      setErorr("Credentials missing!");
      return;
    }

    console.log("I woul like to register", inputValue);
    const headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");

    const body = new URLSearchParams();
    body.append("name", inputValue.name);
    body.append("email", inputValue.email);
    body.append("password", inputValue.password);

    const requestOptions = {
      method: "POST",
      headers,
      body,
    };

    try {
      const response = await fetch(`${baseUrl}/users/signup`, requestOptions);
      if (!response.ok) {
        const result = (await response.json()) as NotOkType;
        console.log("result not ok!", result);
        setErorr(result.error);
      }
      if (response.ok) {
        const result = (await response.json()) as User;
        console.log("new user!", result);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      const { message } = error as Error;
      setErorr(message);
    }
  };

  return (
    <>
      <div className="FormConatiner">
        <div>CREATE AN ACCOUNT</div>
        <form
          className="LoginRegisterForm"
          onSubmit={(e) => {
            onSubmit(e);
          }}
        >
          <div>Name</div>
          <input type="text" name="name" onChange={saveInputValue} />
          <div>Email</div>
          <input type="email" name="email" onChange={saveInputValue} />
          <div>Password</div>
          <input type="password" name="password" onChange={saveInputValue} />
          <div className={error ? "error shake" : "error"}>{error}</div>
          <button type="submit">sign up!</button>
        </form>
      </div>
    </>
  );
}

export default Register;
