import { type } from "@testing-library/user-event/dist/type";
import {
  CREATE_ORDER_LIST,
  DELETE_ORDER,
  EDIT_ORDER,
  UPDATE_ORDER_STATUS,
} from "../actionTypes/orderActionTypes";

export const createOrder = (orderInfo) => {
  return {
    type: CREATE_ORDER_LIST,
    payload: orderInfo,
  };
};

export const updateStatus = (orderID, newStatus) => {
  return {
    type: UPDATE_ORDER_STATUS,
    payload: {
      OrderID: orderID,
      status: newStatus,
    },
  };
};

export const deleteOrder = (orderID) => {
  return {
    type: DELETE_ORDER,
    payload: orderID,
  };
};

export const editOrder = (editedOrder) => {
  return {
    type: EDIT_ORDER,
    payload: editedOrder,
  };
};


