import React, { useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import StaticOrderItem from "./StaticOrderItem";
import { createOrder } from "../../redux/actions/orderActions";
import { clearCart } from "../../redux/actions/shopCartActions";

const ConfirmOrder = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show1, setShow1] = useState(false);
  const [adress, setAdress] = useState("");
  const [phone, setPhone] = useState("");
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const { cartInformations } = useSelector((state) => state.cartReducer);
  const { loggedUser } = useSelector((state) => state.userReducer);

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

  const handleCreateOrder = (loggedUser, loggedUserCart) => {
    let order = {
      OrderID: Date.now(),
      UserID: loggedUser.id,
      Username: loggedUser.Username,
      Date: Date(),
      Adress: adress,
      Phone: phone,
      status: "pending",
      total: totalCalcul(),
      products: loggedUserCart.panier.map((el) => {
        const newProd = {};
        newProd.id = el.id;
        newProd.name = el.name;
        newProd.quantity = el.quantity;
        newProd.money = el.calculatedPrice;
        return newProd;
      }),
    };
    if (order.total !== 0 && phone && adress) {
      dispatch(createOrder(order));
      dispatch(clearCart(loggedUser.id));
      handleClose();
      handleClose1();
      alert("Your order has been created Successfully");
    } else {
      alert("Something went wrong");
    }
  };

  return (
    <div style={{ width: "1500px" }}>
      <Button variant="success" onClick={handleShow1}>
        Confirm your purshase
      </Button>

      <Modal fullscreen={true} show={show1} onHide={handleClose1}>
        <Modal.Header
          style={{
            width: "1500px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
          closeButton
        >
          <Modal.Title>Order Verification</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ width: "1500px" }}>
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
              {loggedUser ? (
                loggedUserCart.panier.map((el) => <StaticOrderItem el={el} />)
              ) : (
                <h1>"Your cart is empty, nothing to order yet"</h1>
              )}
            </tbody>
            <tr>
              <th>
                <h1>TOTAL</h1>
              </th>
              <td>
                <h1>{totalCalcul()}</h1>
              </td>
            </tr>
          </Table>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <h1>Additional informations</h1>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Phone number :</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="+21655555555"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Adress</Form.Label>
              <Form.Control
                as="textarea"
                required
                rows={3}
                value={adress}
                onChange={(e) => setAdress(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ width: "1500px" }}>
          <Button variant="secondary" onClick={handleClose1}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleShow}>
            Confirm purshase
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Body>
              <p style={{ fontSize: "20px" }}>
                Are you sure ? you want to buy{" "}
                <span
                  style={{
                    fontSize: "20px",
                    textDecoration: "underline",
                    color: "red",
                  }}
                >
                  {loggedUserCart.panier.length}
                </span>{" "}
                items with the price of{" "}
                {
                  <span
                    style={{
                      fontSize: "20px",
                      textDecoration: "underline",
                      color: "red",
                    }}
                  >
                    {totalCalcul()} TND
                  </span>
                }
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="success"
                onClick={() => handleCreateOrder(loggedUser, loggedUserCart)}
              >
                Yes
              </Button>
              <Button variant="danger" onClick={handleClose}>
                No
              </Button>
            </Modal.Footer>
          </Modal>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ConfirmOrder;
