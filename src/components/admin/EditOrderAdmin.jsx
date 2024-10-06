import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { editOrder } from "../../redux/actions/orderActions";

const EditOrderAdmin = ({ el }) => {
  const { Products } = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [adress, setAdress] = useState(el.Adress);
  const [phone, setPhone] = useState(el.Phone);
  const [products, setProducts] = useState(el.products);

  const totalCal = () => {
    let tab = products.map((el) => el.quantity * el.money);
    let sum = 0;
    for (let i = 0; i < tab.length; i++) {
      sum += tab[i];
    }

    return sum.toFixed(3);
  };

  const handleDeleteProd = (productID) => {
    setProducts(products.filter((el) => el.id !== productID));
  };
  const handleIncrement = (productID) => {
    setProducts(
      products.map((el) =>
        el.id === productID ? { ...el, quantity: el.quantity + 1 } : el
      )
    );
  };

  const handleDecrement = (productID) => {
    setProducts(
      products.map((el) =>
        el.id === productID && el.quantity > 1
          ? { ...el, quantity: el.quantity - 1 }
          : el
      )
    );
  };
  const handleSelectProd = (xid) => {
    let x = Products.find((el) => el.id === Number(xid));
    const orderItem = {
      id: x.id,
      name: x.name,
      quantity: 1,
      money: x.finPrice,
    };
    setProducts([...products, orderItem]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const editedOrder = {
      OrderID: el.OrderID,
      UserID: el.UserID,
      Username: el.Username,
      Date: el.Date,
      Adress: adress,
      Phone: phone,
      status: "delivery",
      total: totalCal(),
      products: products,
    };
    if (adress && phone && products.length != 0) {
      dispatch(editOrder(editedOrder));
      alert("Order Edited Successfully");
      handleClose();
    } else {
      alert("something went wrong");
    }
  };

  return (
    <div>
      <Button
        style={{ width: "100px", margin: "5px" }}
        variant="primary"
        onClick={handleShow}
      >
        Edit
      </Button>

      <Modal fullscreen show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modify Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Adress</Form.Label>
              <Form.Control
                value={adress}
                onChange={(e) => setAdress(e.target.value)}
                type="text"
                placeholder="adress"
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Phone</Form.Label>
              <Form.Control
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="text"
                placeholder="Phone number"
              />
            </Form.Group>
            {products.map((el) => (
              <>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    width: "100%",
                  }}
                >
                  <h6>{el.name}</h6>
                  <div style={{ display: "flex" }}>
                    <Button onClick={() => handleIncrement(el.id)}>+</Button>
                    <p style={{ margin: "15px" }}>{el.quantity}</p>
                    <Button onClick={() => handleDecrement(el.id)}>-</Button>
                  </div>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteProd(el.id)}
                  >
                    Delete Product
                  </Button>
                </div>
                <hr />
              </>
            ))}
            <select onChange={(e) => handleSelectProd(e.target.value)}>
              {Products.map((el) => (
                <option value={el.id.toString()}>{el.name}</option>
              ))}
            </select>
            <h1>TOTAL : {totalCal()}</h1>
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditOrderAdmin;
