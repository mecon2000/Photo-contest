import Axios from "axios";

const BASE_URL = process.env.REACT_APP_AVIV?'/api/':"http://localhost:4000/api/";
console.log(BASE_URL)
var axios = Axios.create({
  witCredentials: true,
});

export const httpService = {
  get(endpoint, payload) {
    return ajax(endpoint, "GET", payload);
  },
  post(endpoint, payload) {
    return ajax(endpoint, "POST", payload);
  },
  put(endpoint, payload) {
    return ajax(endpoint, "PUT", payload);
  },
  delete(endpoint, payload) {
    return ajax(endpoint, "DELETE", payload);
  },
};
async function ajax(endpoint, method, data) {
  try {
    const res = await axios({
      url: `${BASE_URL}${endpoint}`,
      method,
      data,
    });
    return res.data;
  } catch (err) {
    console.error(
      `Having hard times at trying to ${method.toLowerCase()} some data... mabye ${endpoint} found your payload offensive, have a look:${data}`
    );
    throw err;
  }
}
