import axios from "axios";
import { NotificationManager } from "react-notifications";


import { PUBKEY, LOGOUT, LOGIN_USERS_REQUEST, LOGIN_USERS_SUCCESS, LOGIN_USERS_FAILURE, UPDATE_USERS_FAILURE, UPDATE_USERS_REQUEST, UPDATE_USERS_SUCCESS, GET_USERS_FAILURE, GET_USERS_REQUEST, GET_USERS_SUCCESS, POST_USERS_FAILURE, POST_USERS_REQUEST, POST_USERS_SUCCESS } from "../constants/constant";

// make a action to gets all users
export const getUser = (payload) => async (dispatch) => {
  dispatch({ type: GET_USERS_REQUEST });
  try {
    const res = await axios.get(process.env.REACT_APP_API_BASE_URL + "/user/" + payload);
    dispatch({ type: GET_USERS_SUCCESS, payload: res.data.user });
  } catch (error) {
    dispatch({ type: GET_USERS_FAILURE, payload: error });
  }
};

// make a action to create a user
export const createUser = (payload) => async (dispatch) => {
  dispatch({ type: POST_USERS_REQUEST });
  try {
    const res = await axios.post(process.env.REACT_APP_API_BASE_URL + "/user/new", {
      ...payload,
    });
    NotificationManager.success('User created successfully', 'Success')

    dispatch({ type: POST_USERS_SUCCESS, payload: res.data });
  } catch (error) {
    NotificationManager.error(error.response.data.msg, 'Error')

    dispatch({ type: POST_USERS_FAILURE, payload: error });
  }
};
export const login = (payload) => async (dispatch) => {
  dispatch({ type: LOGIN_USERS_REQUEST });
  try {
    const res = await axios.post(process.env.REACT_APP_API_BASE_URL + "/user/signin", {
      ...payload,
    });
    axios.defaults.headers.common["Authorization"] = res.data.token;
    localStorage.setItem("token", res.data.token);
    NotificationManager.success('User logged in', 'Success')
    dispatch({ type: LOGIN_USERS_SUCCESS, payload: res.data });
  } catch (error) {
    NotificationManager.error(error.response.data.msg, 'Error')
    dispatch({ type: LOGIN_USERS_FAILURE, payload: error });
  }
};
export const logOut = () => async (dispatch) => {
  dispatch({ type: LOGOUT });
};
export const tokenLogin = () => async (dispatch) => {
  dispatch({ type: LOGIN_USERS_REQUEST });
  try {
    const res = await axios.get(process.env.REACT_APP_API_BASE_URL + "/user/auth/tokenLogin", {
    });
    axios.defaults.headers.common["Authorization"] = res.data.token;
    localStorage.setItem("token", res.data.token);
    dispatch({ type: LOGIN_USERS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: LOGIN_USERS_FAILURE, payload: error });
  }
};

export const Pubkey = (payload) => async (dispatch) => {
  dispatch({ type: PUBKEY, payload: payload });
};

// make a action to delete a user
export const UpdateUser = (payload) => async (dispatch) => {
  dispatch({ type: UPDATE_USERS_REQUEST });

  try {
    const res = await axios.put(process.env.REACT_APP_API_BASE_URL + "/user/" + payload.userId);
    dispatch({ type: UPDATE_USERS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: UPDATE_USERS_FAILURE, payload: error });
  }
};
