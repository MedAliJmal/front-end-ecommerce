import React, { useState } from "react";
import { EditProduct } from "../../redux/actions/productsActions";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";

const EditProductAd = ({ el }) => {
  const dispatch = useDispatch();
  // form states
  const [name, setName] = useState(el.name);
  const [desc, setDesc] = useState(el.prodDescriptions);
  const [price, setPrice] = useState(el.price);
  const [remise, setRemise] = useState(el.remise);
  const [img1, setImg1] = useState(el.prodIMG[0] ? el.prodIMG[0] : "");
  const [img2, setImg2] = useState(el.prodIMG[1] ? el.prodIMG[1] : "");
  const [img3, setImg3] = useState(el.prodIMG[2] ? el.prodIMG[2] : "");
  const [img4, setImg4] = useState(el.prodIMG[3] ? el.prodIMG[3] : "");
  const [img5, setImg5] = useState(el.prodIMG[4] ? el.prodIMG[4] : "");
  const [img6, setImg6] = useState(el.prodIMG[5] ? el.prodIMG[5] : "");

  const handlePrice = (price) => {
    if (price >= 0) {
      setPrice(price);
    }
  };

  const handleRemise = (remise) => {
    if (remise >= 0) {
      setRemise(remise);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const editedProduct = {
      id: el.id,
      name: name,
      price: price,
      remise: remise,
      likes: el.likes,
      finPrice: price - (price * remise) / 100,
      prodIMG: [img1, img2, img3, img4, img5, img6].filter((el) => el !== ""),
      prodDescriptions: desc,
    };
    if (name && price && img1 && desc) {
      dispatch(EditProduct(editedProduct));
      handleClose();
    } else {
      alert("something is missing.");
    }
  };
  // ---------------------------
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product Informations</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="" onSubmit={handleSubmit}>
            <hr />
            <h2>Product Descriptions</h2>
            <input
              type="text"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="initial price"
              value={price}
              onChange={(e) => handlePrice(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="remise"
              value={remise}
              onChange={(e) => handleRemise(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="prix final"
              value={price - (price * remise) / 100}
            />

            <hr />
            <h2>Images Section</h2>
            <input
              type="url"
              value={img1}
              onChange={(e) => setImg1(e.target.value)}
              placeholder="image number 1"
              required
            />
            <input
              type="url"
              placeholder="image number 2"
              value={img2}
              onChange={(e) => setImg2(e.target.value)}
            />
            <input
              type="url"
              placeholder="image number 3"
              value={img3}
              onChange={(e) => setImg3(e.target.value)}
            />
            <input
              type="url"
              placeholder="image number 4"
              value={img4}
              onChange={(e) => setImg4(e.target.value)}
            />
            <input
              type="url"
              placeholder="image number 5"
              value={img5}
              onChange={(e) => setImg5(e.target.value)}
            />
            <input
              type="url"
              placeholder="image number 6"
              value={img6}
              onChange={(e) => setImg6(e.target.value)}
            />
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </form>
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

export default EditProductAd;
