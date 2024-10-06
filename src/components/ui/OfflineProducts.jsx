import React from "react";
import { useSelector } from "react-redux";
import OfflineProductCards from "./OfflineProductCards";

const OfflineProducts = () => {
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
      {Products.map((el) => (
        <OfflineProductCards key={el.id} el={el} />
      ))}
    </div>
  );
};

export default OfflineProducts;
