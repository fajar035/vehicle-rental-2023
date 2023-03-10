import axios from "axios";

export const getUserIdApi = (token) => {
  const URL = process.env.REACT_APP_HOSTDEPLOY + "/users/detail";
  return axios.get(URL, { headers: { "x-access-token": token } });
};

export const updateUserApi = (body, token) => {
  const URL = process.env.REACT_APP_HOSTDEPLOY + "/users/edit";
  return axios.patch(URL, body, { headers: { "x-access-token": token } });
};

export const updatePasswordApi = (body, token) => {
  const URL = process.env.REACT_APP_HOSTDEPLOY + "/users/update-password";
  return axios.patch(URL, body, { headers: { "x-access-token": token } });
};
