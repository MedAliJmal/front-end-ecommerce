import React from "react";
import { useSelector } from "react-redux";
import ProductCardAd from "./ProductCardAd";

const ProductListAd = ({ search }) => {
  const { Products } = useSelector((state) => state.productReducer);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {Products.filter((el) =>
        el.name.toUpperCase().trim().includes(search.toUpperCase().trim())
      ).map((el) => (
        <ProductCardAd el={el} key={el.id} />
      ))}
    </div>
  );
};

export default ProductListAd;
