import {
  CREATE_ORDER_LIST,
  DELETE_ORDER,
  EDIT_ORDER,
  UPDATE_ORDER_STATUS,
} from "../actionTypes/orderActionTypes";

const initialOrders = {
  Orders: [],
};

export const orderReducer = (state = initialOrders, { type, payload }) => {
  switch (type) {
    case CREATE_ORDER_LIST:
      return { ...state, Orders: [...state.Orders, payload] };
    case UPDATE_ORDER_STATUS:
      return {
        ...state,
        Orders: state.Orders.map((el) =>
          el.OrderID === payload.OrderID
            ? { ...el, status: payload.status }
            : el
        ),
      };
    case DELETE_ORDER:
      return {
        ...state,
        Orders: state.Orders.filter((el) => el.OrderID !== payload),
      };
    case EDIT_ORDER:
      return {
        ...state,
        Orders: state.Orders.map((el) =>
          el.OrderID === payload.OrderID ? payload : el
        ),
      };

    default:
      return state;
  }
};
