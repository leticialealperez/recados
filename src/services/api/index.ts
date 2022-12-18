import { Axios } from 'axios';

const ApiRequest = new Axios({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json'
});

export { ApiRequest };