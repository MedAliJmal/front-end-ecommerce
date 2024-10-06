import React, { useState } from "react";
import { Badge, Button, Offcanvas, Table } from "react-bootstrap";
import { BsCartCheck } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import ConfirmOrder from "../orders/ConfirmOrder";
import { Link } from "react-router-dom";
import { clearCart } from "../../redux/actions/shopCartActions";

const Panier = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { cartInformations } = useSelector((state) => state.cartReducer);
  const { loggedUser, isAuth } = useSelector((state) => state.userReducer);

  const loggedUserCart = loggedUser
    ? cartInformations.find((el) => el.UserID === loggedUser.id)
    : { panier: [{ calculatedPrice: 0 }] };

  const totalCalcul = () => {
    let prices = loggedUserCart.panier.map((el) => el.calculatedPrice);
    let sum = 0;
    for (let i = 0; i < prices.length; i++) {
      sum += prices[i];
    }
    return loggedUser ? sum.toFixed(3) : 0;
  };
  return (
    <div>
      <Button
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
        variant="outline-primary"
        onClick={handleShow}
      >
        <BsCartCheck style={{ fontSize: "25px" }} />
        <Badge bg="danger">
          {loggedUser ? loggedUserCart.panier.length : 0}
        </Badge>
      </Button>

      <Offcanvas style={{ width: "1200px" }} show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Your Cart.</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Image</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {loggedUser
                ? loggedUserCart.panier.map((el) => <CartItem el={el} />)
                : null}
            </tbody>
            <tr>
              <th>TOTAL</th>
              <td>{totalCalcul()}</td>
            </tr>
          </Table>

          {isAuth ? (
            <ConfirmOrder />
          ) : (
            <Link to={"/SignIn"}>
              <Button>Sign In</Button>
            </Link>
          )}
          <Button
            variant="danger"
            onClick={() => dispatch(clearCart(loggedUser.id))}
          >
            Clear Cart
          </Button>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default Panier;
