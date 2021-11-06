import axios from "axios";

function onSuccess(res) {
  switch (res.data?.message) {
    case "GAME_OVER":
      document.location = "/results";
      res.data = undefined;
      break;
    case "GAME_NOT_STARTED":
      document.location = "/waiting";
      res.data = undefined;
      break;
  }
  return res;
}

function onFail(res, error) {
  switch (res.status) {
    case 401:
      document.location = "/";
      break;
    case 403:
      console.log("I am here :/")
      return axios.request(error.config);
  }
  return res;
}

axios.interceptors.response.use(onSuccess, onFail);

export default axios;
