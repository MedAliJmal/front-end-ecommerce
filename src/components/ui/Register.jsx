import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { registerAccount } from "../../redux/actions/userActions";
import { Link, Navigate } from "react-router-dom";
import { createCart } from "../../redux/actions/shopCartActions";

const Register = () => {
  const [done, setDone] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuth, loggedUser, AllUsers } = useSelector(
    (state) => state.userReducer
  );
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    let verif = AllUsers.find(
      (el) => el.Email.toUpperCase() === email.toUpperCase()
    );
    const newAccount = {
      id: Math.random(),
      Username: name,
      Email: email,
      PW: password,
      blocked: false,
      userRole: "User",
    };
    !verif && name && password && email
      ? dispatch(registerAccount(newAccount)) &&
        dispatch(createCart(newAccount)) &&
        setDone(true) &&
        alert("Account created successfully")
      : alert("Not acceptable");
  };
  return (
    <div>
      {isAuth ? (
        <Navigate to="/" />
      ) : (
        <div>
          {" "}
          {done ? (
            <Navigate to="/SignIn" />
          ) : (
            <div>
              <div>
                <h1>Create your account</h1>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter username"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>
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
                      pattern=".{6,}"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </div>
              <div>
                <h1>Already have an account ?</h1>
                <Link to={"/SignIn"}>
                  <Button>Sign In</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Register;
