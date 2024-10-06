import React from "react";
import { Button, Carousel } from "react-bootstrap";
import { IoTrashBin } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  decProdCart,
  deleteCartItem,
  incProdCart,
} from "../../redux/actions/shopCartActions";

const CartItem = ({ el }) => {
  const { loggedUser } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
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
          <Button onClick={() => dispatch(incProdCart(el.id, loggedUser.id))}>
            +
          </Button>
          <p style={{ verticalAlign: "center" }}>{el.quantity}</p>
          <Button onClick={() => dispatch(decProdCart(el.id, loggedUser.id))}>
            -
          </Button>
        </div>
      </td>
      <td>{el.finPrice} TND</td>
      <td className="price">{el.calculatedPrice.toFixed(3)}</td>
      <td>
        <Button
          onClick={() => dispatch(deleteCartItem(el.id, loggedUser.id))}
          variant="outline-danger"
        >
          <IoTrashBin style={{ fontSize: "20px" }} />
        </Button>
      </td>
    </tr>
  );
};

export default CartItem;
