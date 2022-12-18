import { Axios } from 'axios';

const ApiRequest = new Axios({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
});

export { ApiRequest };