import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import alertContext from "../context/alert/alertContext";

const Signup = () => {
  const context = useContext(alertContext);
  const { showAlert } = context;

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    conpassword: "",
  });
  const [validCredentials, setValidCredentials] = useState({
    name: "false",
    password: "false",
    conpassword: "false",
  });
  let navigate = useNavigate();

  const onChange = (event) => {
    const { name, value } = event.target;
    let hasClass = event.target.classList.contains("is-invalid");
    setCredentials({ ...credentials, [name]: value });

    if (
      (name === "name" && value.length < 3) ||
      (name === "password" && value.length < 5)
    ) {
      event.target.classList.add("is-invalid");
    } else if (
      (name === "name" && value.length >= 3) ||
      (name === "password" && value.length >= 5)
    ) {
      if (hasClass) {
        event.target.classList.remove("is-invalid");
      }
      event.target.classList.add("is-valid");
      setValidCredentials({ ...validCredentials, [name]: true });
    } else if (name === "conpassword") {
      if (credentials.password === value) {
        if (hasClass) {
          event.target.classList.remove("is-invalid");
        }
        event.target.classList.add("is-valid");
        setValidCredentials({ ...validCredentials, [name]: true });
      } else {
        event.target.classList.add("is-invalid");
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let { name, email, password } = credentials;
    const host = "http://localhost:5000";
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-token": process.env.REACT_APP_API_TOKEN,
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    if (json.success) {
      // Save the Auth token and redirect
      localStorage.setItem("auth-token", json.authToken);
      navigate("/");
      showAlert("Success", "Account created successfully.");
    } else {
      showAlert("danger", "some error occured.");
    }
    // console.log(json);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            value={credentials.name}
            className="form-control"
            id="name"
            name="name"
            aria-describedby="emailHelp"
            onChange={onChange}
          />
          <small
            id="namevalid"
            className="form-text text-muted invalid-feedback"
            style={{ color: "red" }}
          >
            Name must be atleast 3 characters long
          </small>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            value={credentials.email}
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            value={credentials.password}
            name="password"
            className="form-control"
            id="password"
            onChange={onChange}
          />
          <small
            id="namevalid"
            className="form-text text-muted invalid-feedback"
            style={{ color: "red" }}
          >
            Password must be atleast 5 characters long
          </small>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            value={credentials.conpassword}
            name="conpassword"
            className="form-control"
            id="conpassword"
            onChange={onChange}
          />
          <small
            id="namevalid"
            className="form-text text-muted invalid-feedback"
            style={{ color: "red" }}
          >
            Password not matching!
          </small>
        </div>
        <button
          disabled={
            validCredentials.name === "false" ||
            validCredentials.password === "false" ||
            validCredentials.conpassword === "false"
          }
          type="submit"
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
