import {
  GET_USERS_FAILURE,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  POST_USERS_FAILURE,
  POST_USERS_REQUEST,
  POST_USERS_SUCCESS,
  UPDATE_USERS_FAILURE,
  UPDATE_USERS_REQUEST,
  UPDATE_USERS_SUCCESS,
  PUBKEY,
} from "../constants/constant";

const initialState = {
  // initialState for get all users
  isLoading: false,
  users: [],
  user: null,
  error: null,
  pubkey: "",

  // initialState for create a user
  isLoadingPost: false,
  successPost: null,
  errorPost: null,

  // initialState for update a user
  isLoadingUpdate: false,
  successUpdate: null,
  errorUpdate: null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    // all user gets reducers
    case GET_USERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_USERS_SUCCESS:
      return {
        isLoading: false,
        user: action.payload,
        error: null,
      };
    case GET_USERS_FAILURE:
      return {
        isLoading: false,
        user: null,
        error: action.payload,
      };

    // single user create reducers
    case POST_USERS_REQUEST:
      return {
        ...state,
        isLoadingPost: true,
      };
    case POST_USERS_SUCCESS:
      return {
        ...state,
        isLoadingPost: false,
        successPost: action.payload,
        errorPost: null,
      };
    case POST_USERS_FAILURE:
      return {
        ...state,
        isLoadingPost: false,
        successPost: null,
        errorPost: action.payload,
      };

    // single user update reducers
    case UPDATE_USERS_REQUEST:
      return {
        ...state,
        isLoadingUpdate: true,
      };
    case UPDATE_USERS_SUCCESS:
      return {
        ...state,
        isLoadingUpdate: false,
        successUpdate: action.payload,
        errorUpdate: null,
      };
    case UPDATE_USERS_FAILURE:
      return {
        ...state,
        isLoadingUpdate: false,
        successUpdate: null,
        errorUpdate: action.payload,
      };
    case PUBKEY:
      return {
        ...state,
        pubkey: action.payload,
      };
      
      default:
        return state;
      }
};

export default usersReducer;
