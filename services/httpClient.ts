import axios, { AxiosRequestConfig } from 'axios';
import { forceLogout } from '../lib/auth/actions';
import { validateToken } from '../lib/utils';
import { Dispatch } from 'react';
import Router from 'next/router';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const isLogEnabled = process.env.NODE_ENV !== 'production' && process.env.NEXT_PUBLIC_LOGGING;

export const httpClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    // 'x-api-key': process.env.API_KEY,
    'Content-Type': 'application/json',
  },
  maxContentLength: 5 * 1000 * 1000, // bytes => 5 MB
});

// Add a request interceptor
httpClient.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    if (isLogEnabled)
      console.log('Network Request:', `${config.baseURL}${config.url}`, config.method);
    return config;
  },
  async (error) => {
    if (isLogEnabled) console.error('Network Request:', error);
    throw error;
  },
);

// Add a response interceptor
httpClient.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async (error) => {
    // Any status codes that falls outside the rangex of 2xx cause this function to trigger
    // Do something with response error
    if (isLogEnabled) console.error('Network Response:', error);
    throw error; // && error.response && error.response.data;
  },
);

export async function publicRequest(request: AxiosRequestConfig): Promise<any> {
  const { data } = await httpClient.request(request);
  return data;
}

export async function protectedRequest(
  request: AxiosRequestConfig,
  dispatch: Dispatch<any>,
  getState: () => any,
): Promise<any> {
  try {
    const token = validateToken(getState());

    request.headers = { Authorization: `Bearer ${token}` };
    const { data } = await httpClient.request(request);
    return data;
  } catch (e) {
    if (e.message === 'NO_TOKEN') dispatch(forceLogout());
    if (e.response && e.response.status === 401) {
      Router.push('/login');
      dispatch(forceLogout());
    }

    throw e;
  }
}

export const addBearerToken = (token: string) => {
  httpClient.defaults.headers.Authorization = `Bearer ${token}`;
};
export const removeBearerToken = () => {
  delete httpClient.defaults.headers.Authorization;
};
