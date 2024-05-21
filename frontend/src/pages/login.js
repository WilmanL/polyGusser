import React, { useState } from 'react';
import { loginUser } from "./authentication";

export function Login(props) {
  const [creds, setCreds] = useState({
    username: "",
    password: ""
  });
  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setCreds({ ...creds, [name]: value });
  }

  function submitForm() {
    props.handleSubmit(creds).then(() => {
      setMessage("Login successful!");
      setCreds({ username: "", password: "" });
    }).catch((error) => {
      setMessage(`Login failed: ${error.message}`);
    });
  }

  return (
    <form>
      <label htmlFor="username">UserName</label>
      <input
        type="text"
        name="username"
        id="username"
        value={creds.username}
        onChange={handleChange}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        value={creds.password}
        onChange={handleChange}
      />
      <input
        type="button"
        value={props.buttonLabel || "Log In"}
        onClick={submitForm}
      />
      {message && <p>{message}</p>}
    </form>
  );
}

export default Login;
