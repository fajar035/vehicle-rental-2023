/* eslint-disable no-redeclare */
import { ACTION_STRING } from "../actions/actionString";
import { ActionType } from "redux-promise-middleware";

const initialState = {
  userData: {
    token: "",
    photo: "",
    role: "",
    expired: false,
  },
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  isLogout: false,
  err: {},
};
const authReducer = (prevState = initialState, action) => {
  const { authLogin, updateImageUser, authLogout, expiredToken, refreshToken } =
    ACTION_STRING;
  const { Pending, Fulfilled, Rejected } = ActionType;

  // membuat logic berdasarkan action

  switch (action.type) {
    case expiredToken:
      var userData = {
        ...prevState.userData,
        expired: true,
      };
      return {
        ...prevState,
        userData,
      };
    case refreshToken:
      var userData = {
        ...prevState.userData,
        expired: false,
      };
      return {
        ...prevState,
        userData,
      };
    case authLogout.concat("_", Fulfilled):
      return {
        ...prevState,
        isLogout: true,
      };

    case updateImageUser.concat("_", Fulfilled): {
      const newPhoto = action.payload.data.result.photo;

      var userData = {
        ...prevState.userData,
        photo: newPhoto,
      };
      return {
        ...prevState,
        userData,
      };
    }
    // case authLogin + pending:
    case authLogin.concat("_", Pending):
      return {
        ...prevState,
        isPending: true,
        isFulfilled: false,
        isRejected: false,
      };

    case authLogin.concat("_", Fulfilled): {
      const data = action.payload.data;

      var userData = {
        token: data.result.token,
        photo: data.result.photo,
        role: data.result.role,
        expired: false,
      };
      return {
        ...prevState,
        isLogout: false,
        isRejected: false,
        isPending: false,
        isFulfilled: true,
        userData,
      };
    }
    case authLogin.concat("_", Rejected): {
      const err = action.payload;

      return {
        ...prevState,
        isPending: false,
        isRejected: true,
        err,
      };
    }
    default:
      return prevState;
  }
};

export default authReducer;
