import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import AdminOrderCard from "./AdminOrderCard";

const CommandsListAd = () => {
  const [searchx, setSearchx] = useState("");
  const { isAuth, loggedUser } = useSelector((state) => state.userReducer);
  const { Orders } = useSelector((state) => state.orderReducer);
  return (
    <div>
      {isAuth && loggedUser.userRole === "Admin" ? (
        <div>
          <input
            value={searchx}
            onChange={(e) => setSearchx(e.target.value)}
            type="text"
          />
          <div>
            <h1>NEW ORDERS</h1>
            {/* status pending */}
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Order Date</th>
                  <th>Order Description</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Adress</th>
                  <th>TOTAL</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {Orders.filter(
                  (el) =>
                    el.status === "pending" &&
                    el.Username.toUpperCase().includes(
                      searchx.toUpperCase().trim()
                    )
                ).map((valeur, index) => (
                  <AdminOrderCard
                    el={valeur}
                    index={index}
                    key={valeur.OrderID}
                  />
                ))}
              </tbody>
            </Table>
            <hr />
          </div>
          <div>
            <h1>
              DELIVERY PHASE
              {/* status delivery */}
            </h1>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Order Date</th>
                  <th>Order Description</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Adress</th>
                  <th>TOTAL</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {Orders.filter(
                  (el) =>
                    el.status === "delivery" &&
                    el.Username.toUpperCase().includes(
                      searchx.toUpperCase().trim()
                    )
                ).map((valeur, index) => (
                  <AdminOrderCard
                    el={valeur}
                    index={index}
                    key={valeur.OrderID}
                  />
                ))}
              </tbody>
            </Table>
            <hr />
          </div>
          <div>
            <h1>COMPLETED ORDERS</h1>
            {/* status received */}
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Order Date</th>
                  <th>Order Description</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Adress</th>
                  <th>TOTAL</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {Orders.filter(
                  (el) =>
                    el.status === "received" &&
                    el.Username.toUpperCase().includes(
                      searchx.toUpperCase().trim()
                    )
                ).map((valeur, index) => (
                  <AdminOrderCard
                    el={valeur}
                    index={index}
                    key={valeur.OrderID}
                  />
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </div>
  );
};

export default CommandsListAd;
