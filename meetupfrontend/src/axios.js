import axios from 'axios';

const proxy = 'https://cors-anywhere.herokuapp.com/';
const instance = axios.create({
  baseURL: `http://localhost:3300/api/v1`,

  headers: { 'X-Custom-Header': '' },
});

export default instance;
