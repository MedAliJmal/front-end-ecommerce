import {
  BLOCKUSER,
  LOGIN,
  LOGOUT,
  REGISTER,
} from "../actionTypes/userActionTypes";

const initialUsers = {
  AllUsers: [
    {
      id: 200065549849964,
      Username: "Dali",
      Email: "Dali123@gmail.com",
      PW: "Dali123",
      blocked: false,
      userRole: "Admin",
    },
    {
      id: 206554984997764,
      Username: "Saif",
      Email: "saif@gmail.com",
      PW: "saif123",
      blocked: false,
      userRole: "User",
    },
  ],
  loggedUser: null,
  isAuth: false,
};

export const userReducer = (state = initialUsers, { type, payload }) => {
  switch (type) {
    case REGISTER:
      return { ...state, AllUsers: [...state.AllUsers, payload] };
    case LOGIN:
      return { ...state, isAuth: true, loggedUser: payload };
    case LOGOUT:
      return { ...state, isAuth: false, loggedUser: null };
    case BLOCKUSER:
      return {
        ...state,
        AllUsers: state.AllUsers.map((el) =>
          el.id === payload ? { ...el, blocked: !el.blocked } : el
        ),
      };

    default:
      return state;
  }
};
