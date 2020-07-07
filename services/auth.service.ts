import axios, { AxiosResponse } from 'axios';

const ENDPOINT = process.env.NEXT_PUBLIC_API_URL + 'auth/';

export const authService = {
  login: async (email: string, password: string): Promise<AxiosResponse<void>> => {
    return axios.post(ENDPOINT + 'login', { email, password });
  },

  signUp: async (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<AxiosResponse<void>> => {
    return axios.post(ENDPOINT + 'sign-up', data);
  },
};
