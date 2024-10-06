import {
  ADD_PROD_2CART,
  CLEAR_CART,
  CREATE_CART,
  DEC_PROD_INCART,
  DELETE_CART_ITEM,
  INC_PROD_INCART,
} from "../actionTypes/shopCartActionType";

const initialCart = {
  cartInformations: [
    {
      Username: "Saif",
      UserID: 206554984997764,
      panier: [],
    },
    {
      Username: "Dali",
      UserID: 200065549849964,
      panier: [],
    },
  ],
};

export const cartReducer = (state = initialCart, { type, payload }) => {
  switch (type) {
    case CREATE_CART:
      return {
        ...state,
        cartInformations: [
          ...state.cartInformations,
          { Username: payload.Username, UserID: payload.id, panier: [] },
        ],
      };

    case ADD_PROD_2CART:
      return {
        ...state,
        cartInformations: state.cartInformations.map((el) =>
          el.UserID === payload.UserID
            ? { ...el, panier: [...el.panier, payload.product] }
            : el
        ),
      };
    case INC_PROD_INCART:
      return {
        ...state,
        cartInformations: state.cartInformations.map((el) =>
          el.UserID === payload.UserID
            ? {
                ...el,
                panier: el.panier.map((el) =>
                  el.id === payload.ProdID
                    ? {
                        ...el,
                        quantity: el.quantity + 1,
                        calculatedPrice: el.calculatedPrice + el.finPrice,
                      }
                    : el
                ),
              }
            : el
        ),
      };
    case DEC_PROD_INCART:
      return {
        ...state,
        cartInformations: state.cartInformations.map((el) =>
          el.UserID === payload.UserID
            ? {
                ...el,
                panier: el.panier.map((el) =>
                  el.id === payload.ProdID && el.quantity > 1
                    ? {
                        ...el,
                        quantity: el.quantity - 1,
                        calculatedPrice: el.calculatedPrice - el.finPrice,
                      }
                    : el
                ),
              }
            : el
        ),
      };
    case DELETE_CART_ITEM:
      return {
        ...state,
        cartInformations: state.cartInformations.map((el) =>
          el.UserID === payload.UserID
            ? {
                ...el,
                panier: el.panier.filter((el) => el.id !== payload.ProdID),
              }
            : el
        ),
      };
    case CLEAR_CART:
      return {
        ...state,
        cartInformations: state.cartInformations.map((el) =>
          el.UserID === payload ? { ...el, panier: [] } : el
        ),
      };
    default:
      return state;
  }
};
