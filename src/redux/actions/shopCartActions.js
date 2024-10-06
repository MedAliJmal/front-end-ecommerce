import {
  ADD_PROD_2CART,
  CLEAR_CART,
  CREATE_CART,
  DEC_PROD_INCART,
  DELETE_CART_ITEM,
  INC_PROD_INCART,
} from "../actionTypes/shopCartActionType";

export const createCart = (user) => {
  return {
    type: CREATE_CART,
    payload: user,
  };
};

export const addToCart = (UserID, produit) => {
  return {
    type: ADD_PROD_2CART,
    payload: { UserID: UserID, product: produit },
  };
};

export const incProdCart = (ProductID, UserID) => {
  return {
    type: INC_PROD_INCART,
    payload: { ProdID: ProductID, UserID: UserID },
  };
};

export const decProdCart = (ProductID, UserID) => {
  return {
    type: DEC_PROD_INCART,
    payload: { ProdID: ProductID, UserID: UserID },
  };
};

export const deleteCartItem = (ProductID, UserID) => {
  return {
    type: DELETE_CART_ITEM,
    payload: { ProdID: ProductID, UserID: UserID },
  };
};

export const clearCart = (UserID) => {
  return {
    type: CLEAR_CART,
    payload: UserID,
  };
};
