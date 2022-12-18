import { Axios } from 'axios';

const ApiRequest = new Axios({
  baseURL: process.env.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
});

export { ApiRequest };