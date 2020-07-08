import { AxiosResponse } from 'axios';
import httpClient from './httpClient';

const ENDPOINT = 'auth/';

export const authService = {
  login: async (email: string, password: string): Promise<AxiosResponse<void>> => {
    return httpClient.post(ENDPOINT + 'login', { email, password });
  },

  signUp: async (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<AxiosResponse<void>> => {
    return httpClient.post(ENDPOINT + 'signup', data);
  },
};
