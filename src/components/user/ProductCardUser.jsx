import React, { useState } from "react";
import { Button, Card, Carousel, Modal } from "react-bootstrap";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { dislikeProd, LikeProd } from "../../redux/actions/productsActions";
import { addToCart, incProdCart } from "../../redux/actions/shopCartActions";

const ProductCardUser = ({ el }) => {
  const { loggedUser, isAuth } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const [more, setMore] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let userInfo = {
    id: loggedUser.id,
    userName: loggedUser.Username,
  };
  const { cartInformations } = useSelector((state) => state.cartReducer);

  const loggedUserCart = loggedUser
    ? cartInformations.find((el) => el.UserID === loggedUser.id)
    : null;

  const handleLikeDislike = (product, userInfo) => {
    let verification = product.likes.find((el) => el.id === userInfo.id);
    verification
      ? dispatch(dislikeProd(product.id, userInfo.id))
      : dispatch(LikeProd(product.id, userInfo));
  };

  const handleAddToCart = (isAuth, loggedUser, product) => {
    let verification = loggedUserCart.panier.find((el) => el.id === product.id);
    const cartItem = {
      ...product,
      quantity: 1,
      calculatedPrice: product.finPrice,
    };
    isAuth && !verification
      ? dispatch(addToCart(loggedUser.id, cartItem))
      : isAuth && verification
      ? dispatch(incProdCart(product.id, loggedUser.id))
      : alert("Login first");
  };

  return (
    <div>
      <div style={{ margin: "15px" }}>
        <Card style={{ width: "18rem" }}>
          <Carousel controls={false} indicators={false} interval={2000}>
            {el.prodIMG.map((link, index) => (
              <Carousel.Item>
                <img width={"100%"} src={link} alt={index} key={index} />
              </Carousel.Item>
            ))}
          </Carousel>
          <Card.Body>
            <Card.Title style={{ height: "120px" }}>{el.name}</Card.Title>
            <div>
              <Card.Text style={{ minHeight: "80px" }}>
                {more
                  ? el.prodDescriptions
                  : el.prodDescriptions.slice(0, 100) + "..."}
              </Card.Text>
              <h6
                onClick={() => setMore(!more)}
                style={{ textDecoration: "underline", cursor: "pointer" }}
              >
                {more ? "Show less" : "Show more"}
              </h6>
            </div>
            <Card.Text style={{ height: "35px" }}>
              Previous price : {el.price} TND
            </Card.Text>
            <Card.Text style={{ color: "red", height: "35px" }}>
              Discount : {el.remise} %
            </Card.Text>
            <Card.Text style={{ color: "green", height: "35px" }}>
              {el.finPrice} TND
            </Card.Text>
            <Card.Text
              onClick={() => handleShow()}
              style={{ color: "blue", height: "35px", cursor: "pointer" }}
            >
              {el.likes.length === 0
                ? "0 likes"
                : el.likes.length === 1
                ? `${el.likes[0].userName} likes this`
                : el.likes.length === 2
                ? `${el.likes[0].userName} & ${el.likes[1].userName} likes this`
                : `${el.likes[0].userName},${el.likes[1].userName} and ${
                    el.likes.length - 2
                  } more persons likes this`}{" "}
            </Card.Text>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>People who liked this product</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {el.likes.map((v, i) => (
                  <h6 key={i}>{v.userName}</h6>
                ))}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
            <Button
              onClick={() => handleAddToCart(isAuth, loggedUser, el)}
              variant="outline-primary"
              style={{ margin: "5px" }}
            >
              <FaCartPlus style={{ fontSize: "25px" }} />
            </Button>
            <Button
              onClick={() => handleLikeDislike(el, userInfo)}
              variant="outline-danger"
              style={{ margin: "5px" }}
            >
              {el.likes.find((el) => el.id === loggedUser.id) ? (
                <AiFillDislike style={{ fontSize: "25px" }} />
              ) : (
                <AiFillLike style={{ fontSize: "25px" }} />
              )}
            </Button>
            {/*   hedhi dislike lmba3ed */}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default ProductCardUser;
