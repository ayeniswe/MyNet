import axios from 'axios';

const proxy = axios.create({
  baseURL: 'http://localhost:8000',
  // You can add other configuration options here if needed
});

export default proxy;