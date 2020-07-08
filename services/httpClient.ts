import axios, { AxiosResponse } from 'axios';

const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 3000,
});

httpClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // console.log(error.response.data);
    // console.log(error.response.status);
    // console.log(error.response.headers);
    return Promise.reject(error);
  },
);

export default httpClient;
