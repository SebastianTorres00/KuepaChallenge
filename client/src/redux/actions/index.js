import axios from "axios";

export const SET_USERNAME = "SET_USERNAME";
export const SET_ERRORHANDLING = "SET_ERRORHANDLING";
export const SET_USERNAME_LIST = "SET_USERNAME_LIST";
export const SET_LOADING = "SET_LOADING";

export const login = async (loginUser) => {
  const response = await axios.get(
    `http://localhost:27017/users?usuario=${loginUser.usuario}&password=${loginUser.contraseña}`
  );
  console.log("RESPONSE LOGIN", response.data);
  return response.data;
};
export function setUserStore(payload) {
  return (dispatch) => {
    dispatch({type: SET_USERNAME, payload});
  };
}

export function saveMessage(message) {
  axios.post("http://localhost:27017/messages", message);
}

export function getMessagesByUser(username) {
  return axios.get(`/messages?username=${username}`);
}

export const setErrorHandling = (payload) => {
  return (dispatch) => dispatch({type: SET_ERRORHANDLING, payload});
};
export function setUserListStore(payload) {
  return (dispatch) => dispatch({type: SET_USERNAME_LIST, payload});
}

export const register = async (newUser) => {
  const response = await axios.post("http://localhost:27017/users", newUser);
  return response.data;
};

export const setLoading = (payload) => {
  return (dispatch) => dispatch({type: SET_LOADING, payload});
};
