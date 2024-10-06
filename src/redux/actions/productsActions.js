import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  DISLIKE_PRODUCT,
  EDIT_PRODUCT,
  LIKE_PRODUCT,
} from "../actionTypes/productsActionTypes";

export const deleteProduct = (productId) => {
  return {
    type: DELETE_PRODUCT,
    payload: productId,
  };
};

export const AddProduct = (newProduct) => {
  return {
    type: ADD_PRODUCT,
    payload: newProduct,
  };
};

export const EditProduct = (editedProduct) => {
  return {
    type: EDIT_PRODUCT,
    payload: editedProduct,
  };
};

export const LikeProd = (productID, userInfo) => {
  return {
    type: LIKE_PRODUCT,
    payload: { prodID: productID, user: userInfo },
  };
};

export const dislikeProd = (productID, userID) => {
  return {
    type: DISLIKE_PRODUCT,
    payload: { prodID: productID, userID: userID },
  };
};
