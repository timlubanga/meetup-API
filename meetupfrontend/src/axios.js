import axios from 'axios';

const proxy = 'https://cors-anywhere.herokuapp.com/';
const instance = axios.create({
  baseURL: `https://meetup-tim.herokuapp.com/api/v1`,

  headers: { 'X-Custom-Header': '' },
});

export default instance;
