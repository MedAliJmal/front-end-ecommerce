import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { loginUser } from "../../redux/actions/userActions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuth, AllUsers } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    let existantUser = AllUsers.find(
      (el) => el.Email.toUpperCase() === email.toUpperCase()
    );
    existantUser.PW === password
      ? dispatch(loginUser(existantUser))
      : alert("Wrong informations");
  };
  return (
    <div>
      {isAuth ? (
        <Navigate to="/" />
      ) : (
        <div>
          <div>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Login
              </Button>
            </Form>
          </div>
          <div className="divider"></div>
          <div>
            <h1>You don't have an account ? create one here</h1>
            <Link to="/register">Register</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
