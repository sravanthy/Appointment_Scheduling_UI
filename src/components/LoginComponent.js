import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";

import "./LoginComponent.css";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
export default function LoginComponent() {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userName: "sravantich", password: "test" }),
  };
  function validateUser() {
    fetch("http://localhost:9095/simplybook/user", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("Is Valid User" + data);
      });
  }
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  //let navigate = useNavigate();
  const handleSubmit = (event) => {
    var userNameValid = false;
    if (userName.length === 0) {
      setUserNameError("UserName is required");
    } else if (userName.length < 6) {
      setUserNameError("UserName should be minimum 6 characters");
    } else if (userName.indexOf(" ") >= 0) {
      setUserNameError("UserName cannot contain spaces");
    } else {
      setUserNameError("");
      userNameValid = true;
    }

    var passwordValid = false;
    if (password.length === 0) {
      setPasswordError("Password is required");
    } else if (password.length < 6) {
      setPasswordError("Password should be minimum 6 characters");
    } else if (password.indexOf(" ") >= 0) {
      setPasswordError("Password cannot contain spaces");
    } else {
      setPasswordError("");
      passwordValid = true;
    }
    if (userNameValid && passwordValid) {
      alert("UserName: " + userName + "\nPassword: " + password);
      setUserName("");
      setPassword("");
      //navigate("/dashboard");
    } else {
      event.preventDefault();
    }
  };
  const handleChange = (event) => {
    if (event.target.name === "userName") {
      setUserName(event.target.value);
    } else if (event.target.name === "password") {
      setPassword(event.target.value);
    }

    if (userName.length === 0) {
      setUserNameError("UserName is required");
    } else if (userName.length < 6) {
      setUserNameError("UserName should be minimum 6 characters");
    } else if (userName.indexOf(" ") >= 0) {
      setUserNameError("UserName cannot contain spaces");
    } else {
      setUserNameError("");
    }

    if (password.length === 0) {
      setPasswordError("Password is required");
    } else if (password.length < 6) {
      setPasswordError("Password should be minimum 6 characters");
    } else if (password.indexOf(" ") >= 0) {
      setPasswordError("Password cannot contain spaces");
    } else {
      setPasswordError("");
    }
  };
  return (
    <>
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Login to your account</h3>
            <div className="form-group mt-3">
              <label>User Name:</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Enter user name"
                name="userName"
                onChange={(event) => handleChange(event)}
                onBlur={(event) => handleChange(event)}
                value={userName}
              />
              <Form.Text style={{ color: "red" }}>{userNameError}</Form.Text>
            </div>
            <div className="form-group mt-3">
              <label>Password:</label>
              <input
                type="password"
                className="form-control mt-1"
                name="password"
                onChange={(event) => handleChange(event)}
                onBlur={(event) => handleChange(event)}
                value={password}
              />
              <Form.Text>{passwordError}</Form.Text>
            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                type="submit"
                onClick={handleSubmit}
                className="btn btn-primary"
              >
                Login
              </button>
            </div>

            <Form.Text>
              Don't have an account yet? &nbsp;
              <Link to="/signup">Create an account</Link>
            </Form.Text>
          </div>
        </form>
      </div>
    </>
  );
}
