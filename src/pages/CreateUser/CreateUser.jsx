import React, { useState } from "react";
import { Form, TextInput, Button } from "carbon-components-react";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";
import AuthGuard from "../../components/AuthGuard/AuthGuard";
import constants from '../../constants'
function CreateUser() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [shouldRedirectToHomepage, setshouldRedirectToHomepage] =
    useState(false);
  const submitFormHandler = (e) => {
    if (
      !(
        username.trim() &&
        email.trim() &&
        firstname.trim() &&
        lastname.trim() &&
        password.trim()
      )
    ) {
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
      const url = `${constants.API_URL}/users/`;
      let formData = {
        username: username,
        password: password,
        first_name: firstname,
        last_name: lastname,
        email: email,
      };
      formData = JSON.stringify(formData);
      const token = localStorage.getItem("token")
      fetch(url, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json, text/plain",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization:`Token ${token}`
        },
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.code === 201) {
            toast.success("Successfully Created New User.", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setshouldRedirectToHomepage(true);
          } else if (response.code === 401) {
            window.location.href = "/login";
          }
          else{
            let errorMsg = ''
            try{
              errorMsg = response.errors[0].detail
            }
            catch(e){
              errorMsg = "Something went wrong Please try again"
            }
            toast.error(errorMsg, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        });
    }
  };
  if (shouldRedirectToHomepage) {
    return <Redirect to="/" />;
  }
  return (
    <>
      <AuthGuard />
      <Form className="form">
        <h2>Create new user</h2>
        <div style={{ marginBottom: "1rem" }}>
          <TextInput
            labelText="Username"
            value={username}
            placeholder="Username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <TextInput
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            labelText="Email"
            placeholder="example@gmail.com"
            required
            value={email}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <TextInput
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            labelText="First name"
            placeholder="John"
            required
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <TextInput
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            labelText="Last name"
            placeholder="Doe"
            required
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <TextInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            labelText="Password"
            required
            placeholder="john@sOmething"
          />
        </div>
        <Button onClick={submitFormHandler} style={{ marginBottom: "1rem" }}>
          Submit
        </Button>
      </Form>
    </>
  );
}

export default CreateUser;
