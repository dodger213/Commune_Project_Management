import axios from "axios";
import {PUBKEY, UPDATE_USERS_FAILURE, UPDATE_USERS_REQUEST, UPDATE_USERS_SUCCESS, GET_USERS_FAILURE, GET_USERS_REQUEST, GET_USERS_SUCCESS, POST_USERS_FAILURE, POST_USERS_REQUEST, POST_USERS_SUCCESS } from "../constants/constant";

// make a action to gets all users
export const getUser = (payload) => async (dispatch) => {
  dispatch({ type: GET_USERS_REQUEST });
  try {
    const res = await axios.get(process.env.REACT_APP_API_BASE_URL + "/user/" + payload);
    dispatch({ type: GET_USERS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_USERS_FAILURE, payload: error });
  }
};

// make a action to create a user
export const createUser = (payload) => async (dispatch) => {
  dispatch({ type: POST_USERS_REQUEST });
  try {
    const res = await axios.post(process.env.REACT_APP_API_BASE_URL + "/user/new", {
      payload,
    });
    dispatch({ type: POST_USERS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: POST_USERS_FAILURE, payload: error });
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
