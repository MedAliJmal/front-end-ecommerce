import React from "react";
import { Carousel } from "react-bootstrap";

const StaticOrderItem = ({ el }) => {
  return (
    <tr>
      <td>
        <Carousel
          style={{ width: "200px" }}
          controls={false}
          indicators={false}
          interval={2000}
        >
          {el.prodIMG.map((link, index) => (
            <Carousel.Item>
              <img width={"100%"} src={link} alt={index} key={index} />
            </Carousel.Item>
          ))}
        </Carousel>
      </td>
      <td>{el.name}</td>
      <td>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "150px",
          }}
        >
          <p style={{ verticalAlign: "center" }}>{el.quantity}</p>
        </div>
      </td>
      <td>{el.finPrice} TND</td>
      <td className="price">{el.calculatedPrice.toFixed(3)}</td>
    </tr>
  );
};

export default StaticOrderItem;
