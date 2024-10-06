import React from "react";
import ProductListAd from "../admin/ProductListAd";
import ProductListUser from "../user/ProductListUser";
import OfflineProducts from "./OfflineProducts";
import { useSelector } from "react-redux";

const ProductContainer = ({ search }) => {
  const { isAuth, loggedUser } = useSelector((state) => state.userReducer);
  return (
    <div>
      {!isAuth ? (
        <OfflineProducts search={search} />
      ) : isAuth && loggedUser.userRole === "Admin" ? (
        <ProductListAd search={search} />
      ) : (
        <ProductListUser search={search} />
      )}
    </div>
  );
};

export default ProductContainer;
