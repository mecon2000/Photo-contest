import Axios from "axios";

const BASE_URL = "http://localhost:4000/";

var axios = Axios.create({
  witCredentials: true,
});

export const httpService = {
  get(endpoint, body, urlParams) {
    return ajax(endpoint, "GET", body, urlParams);
  },
  post(endpoint, body, urlParams) {
    return ajax(endpoint, "POST", body, urlParams);
  },
  put(endpoint, body, urlParams) {
    return ajax(endpoint, "PUT", body, urlParams);
  },
  delete(endpoint, body, urlParams) {
    return ajax(endpoint, "DELETE", body, urlParams);
  },
};
async function ajax(endpoint, method, body, urlParams) {
  try {
    //console.log (`bodyyyyyyyyyy = ${JSON.stringify(body)}`)
    const res = await axios({
      url: `${BASE_URL}${endpoint}`,
      method,
      data: body,
      urlParams,
    });
    return res.data;
  } catch (err) {
    const urlParamsAsString = new URLSearchParams(urlParams).toString();
    console.error(      
      `http call failed: ${method} ${endpoint}${urlParams? "?"+urlParamsAsString:""}, body=${JSON.stringify(body)} with this error: ${err}`
    );
    throw err;
  }
}
