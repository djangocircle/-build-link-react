import React, { useState } from "react";
import { Form, TextInput, Button } from "carbon-components-react";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";
import constants from '../../constants';
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [shouldRedirectToHomepage, setshouldRedirectToHomepage] =
    useState(false);
  const submitFormHandler = (e) => {
    if (!(username.trim() && password.trim())) {
      toast.error("All fields are required please enter all.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    } else {
      const url = `${constants.API_URL}/users/login`;
      let formData = {
        username: username,
        password: password,
      };
      formData = JSON.stringify(formData);

      fetch(url, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json, text/plain",
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.code === 200) {
            toast.success("Successfully Loggedin.", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            localStorage.setItem("token", response.data.token);
            setshouldRedirectToHomepage(true);
          } else {
            toast.error(
              "Invalid username or password.Please enter correct username and Password",
              {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              }
            );
          }
        });
    }
  };
  if (shouldRedirectToHomepage) {
    return <Redirect to="/" />;
  }
  return (
    <Form className="form">
      <h2>Login</h2>
      <div style={{ marginBottom: "1rem" }}>
        <TextInput
          labelText="Username"
          value={username}
          placeholder="john"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <TextInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          labelText="Password"
          placeholder="john@sOmething"
          required
        />
      </div>
      <Button onClick={submitFormHandler} style={{ marginBottom: "1rem" }}>
        Login
      </Button>
    </Form>
  );
}

export default Login;
