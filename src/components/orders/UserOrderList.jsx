import React from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import OrderDescriptionCard from "./OrderDescriptionCard";
import { Navigate } from "react-router-dom";

const UserOrderList = () => {
  const { loggedUser, isAuth } = useSelector((state) => state.userReducer);
  const { Orders } = useSelector((state) => state.orderReducer);

  const loggedUserOrders = isAuth
    ? Orders.filter((el) => el.UserID === loggedUser.id)
    : [];

  return (
    <div>
      {" "}
      {isAuth ? (
        <div>
          <h1>NEW ORDERS</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Order Date</th>
                <th>Order Description</th>
                <th>Order ID</th>
                <th>TOTAL</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {loggedUserOrders
                .filter((el) => el.status !== "received")
                .map((valeur, index) => (
                  <OrderDescriptionCard
                    el={valeur}
                    index={index}
                    key={valeur.OrderID}
                  />
                ))}
            </tbody>
          </Table>
          <hr />
          <h1>COMPLETED ORDERS</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Order Date</th>
                <th>Order Description</th>
                <th>Order ID</th>
                <th>TOTAL</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {loggedUserOrders
                .filter((el) => el.status === "received")
                .map((valeur, index) => (
                  <OrderDescriptionCard
                    el={valeur}
                    index={index}
                    key={valeur.OrderID}
                  />
                ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </div>
  );
};

export default UserOrderList;
