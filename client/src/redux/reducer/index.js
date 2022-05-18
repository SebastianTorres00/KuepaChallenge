import {
  SET_USERNAME,
  SET_ERRORHANDLING,
  SET_USERNAME_LIST,
  SET_LOADING,
} from "../actions/index.js";

const initialState = {
  username: {},
  loading: false,
  errorDetected: true,
  usernameList: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USERNAME:
      return {...state, username: action.payload};
    case SET_ERRORHANDLING:
      return {...state, errorDetected: action.payload};
    case SET_USERNAME_LIST:
      return {...state, usernameList: action.payload};
    case SET_LOADING:
      return {...state, loading: action.payload};
    default:
      return {...state};
  }
}
