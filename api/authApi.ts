import axios from 'axios';

const api = axios.create({
  baseURL: 'https://sp-slidtodo-api.vercel.app'
  // withCredentials: true
});

export default api;
