import {
  BLOCKUSER,
  LOGIN,
  LOGOUT,
  REGISTER,
} from "../actionTypes/userActionTypes";

export const registerAccount = (newAccount) => {
  return {
    type: REGISTER,
    payload: newAccount,
  };
};

export const loginUser = (connectedUser) => {
  return {
    type: LOGIN,
    payload: connectedUser,
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT,
  };
};

export const blockUser = (userid) => {
  return {
    type: BLOCKUSER,
    payload: userid,
  };
};
