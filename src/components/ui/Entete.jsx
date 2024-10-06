import React from "react";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import AddProductAd from "../admin/AddProductAd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Panier from "../cart/Panier";
import { logoutUser } from "../../redux/actions/userActions";

const Entete = ({ search, setSearch }) => {
  const { isAuth, loggedUser } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="#">Ecom-Full</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            {isAuth && loggedUser.userRole === "Admin" ? (
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Link to="/">Home</Link>
                <Link to="/admin/users">User List</Link>
                <Link to="/admin/orders">Orders</Link>
              </Nav>
            ) : isAuth && loggedUser.userRole === "User" ? (
              <>
                <Nav
                  className="me-auto my-2 my-lg-0"
                  style={{ maxHeight: "100px" }}
                  navbarScroll
                >
                  <Link to="/">Home</Link>
                  <Link to="/profile">Profile</Link>
                  <Link to="/user/orders">Orders</Link>
                </Nav>
              </>
            ) : null}
            {isAuth && loggedUser.userRole === "Admin" ? (
              <AddProductAd />
            ) : null}
            {isAuth ? (
              <Button onClick={() => dispatch(logoutUser())}>Logout</Button>
            ) : (
              <Link to={"/SignIn"}>
                <Button>Sign In</Button>
              </Link>
            )}
            <Panier />
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Entete;
