import React from "react";

const OrderDescriptionCard = ({ el, index }) => {
  return (
    <tr>
      <td>{index + 1}</td>
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
      <td>{el.OrderID}</td>
      <td>{el.total}</td>
      <td>{el.status}</td>
    </tr>
  );
};

export default OrderDescriptionCard;
