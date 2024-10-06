import React from "react";
import { useDispatch } from "react-redux";
import { deleteOrder, updateStatus } from "../../redux/actions/orderActions";
import { Button } from "react-bootstrap";
import EditOrderAdmin from "./EditOrderAdmin";

const AdminOrderCard = ({ el }) => {
  const dispatch = useDispatch();
  return (
    <tr>
      <td>{el.OrderID}</td>
      <td>{el.Date}</td>
      <td>
        <p>
          {el.products.map((el) => (
            <span>
              {el.name} <br></br>quantity :{el.quantity} <br />
              {el.money.toFixed(2)}
              TND per item <br></br>
              <hr />
            </span>
          ))}
        </p>
      </td>
      <td>{el.Username}</td>
      <td>{el.Phone}</td>
      <td>{el.Adress}</td>
      <td>{el.total}</td>
      <td>
        <select
          name=""
          value={el.status}
          onChange={(e) => dispatch(updateStatus(el.OrderID, e.target.value))}
          id=""
        >
          <option value="pending">Pending</option>
          <option value="delivery">Delivery</option>
          <option value="received">Completed</option>
        </select>
      </td>
      <td>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            onClick={() => dispatch(deleteOrder(el.OrderID))}
            style={{ width: "100px", margin: "5px" }}
            variant="danger"
          >
            DELETE
          </Button>
          {el.status === "pending" ? <EditOrderAdmin el={el} /> : null}
        </div>
      </td>
    </tr>
  );
};

export default AdminOrderCard;
