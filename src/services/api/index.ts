import { Axios } from 'axios';

const ApiRequest = new Axios({
  baseURL: 'https://recados-api-revisao.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
});

export { ApiRequest };