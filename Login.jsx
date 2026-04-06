import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { Button, Form,  } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from"./App";

export default function Login() {
  const usernameRef = useRef();
  const passwordRef = useRef();

  const { setUser } = useContext(UserContext);

  const [error, setError] = useState("");
  
  const go = useNavigate();

  async function handelLogin(ev) {
    ev.preventDefault();
    const data = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      const response = await axios.post(
        "https://dummyjson.com/user/login",
        data,
      );
      const userData = response.data;

      localStorage.setItem("userData ", JSON.stringify(userData));

      setUser(userData);

      go("/");
    } catch (error) {
      setError(error.response?.data?.message || "Invalid Data");
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <Form onSubmit={handelLogin}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Please Enter Username"
            id="usename"
            ref={usernameRef}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            id="password"
            placeholder="password"
            ref={passwordRef}
          />
        </Form.Group>

        <Button type="submit" variant="danger">
          Login
        </Button>
      </Form>
    </div>
  );
}
