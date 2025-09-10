// axiosHandler.js
import axios from 'axios';

export const BASE_URL = 'https://gsm.garudalytics.com:3006'

// Create an Axios instance
const ApiServiceV1 = axios.create({
  baseURL: BASE_URL, // Change this to your API base URL
  timeout: 10000, // Optional: request timeout
});

// Request Interceptor


export default ApiServiceV1;
