import { combineReducers, createStore } from "redux";
import { productReducer } from "./reducers/productReducer";
import { orderReducer } from "./reducers/orderReducer";
import { cartReducer } from "./reducers/cartReducer";
import { userReducer } from "./reducers/userReducer";

const devtools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(
  combineReducers({ productReducer, orderReducer, cartReducer, userReducer }),
  devtools
);

export default store;
