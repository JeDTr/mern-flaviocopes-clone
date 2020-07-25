import React, { Fragment, useState } from "react";
// import { connect } from "react-redux";
import { useMutation } from "react-query";
import axios from "axios";

import AuthService from "../../services/AuthService";

import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mutate, { isLoading, error, data }] = useMutation(
    (formData) => axios.post("/api/user/login", formData)
    // { onSuccess: ({ data }) => console.log(data) }
  );

  // useEffect(() => {
  //   if (auth.isAuthenticated) {
  //     history.push("/dashboard");
  //   }
  // }, []);

  if (data) {
    AuthService.setCredentials({ token: data.data.token });
    console.log(AuthService.credentials);
  }

  const onSubmit = (e) => {
    e.preventDefault();

    mutate({ email, password });
  };

  return (
    <Fragment>
      <h1 className="text-center">Login</h1>
      <form onSubmit={onSubmit} noValidate>
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          onChange={(e) => setEmail(e.target.value)}
          className={error && error.response.data.email ? "is-invalid" : ""}
        />
        {error && error.response.data.email && (
          <span className="invalid-feedback">{error.response.data.email}</span>
        )}
        <input
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="on"
          onChange={(e) => setPassword(e.target.value)}
          className={error && error.response.data.password ? "is-invalid" : ""}
        />
        {error && error.response.data.password && (
          <span className="invalid-feedback">
            {error.response.data.password}
          </span>
        )}
        <input type="submit" value="Login" disabled={isLoading} />
      </form>
    </Fragment>
  );
}

export default Login;
