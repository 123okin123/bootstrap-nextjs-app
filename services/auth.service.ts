import axios, { AxiosResponse } from 'axios';

export const authService = {
  ENDPOINT: 'api/' + 'auth/',
  LOGIN_URL: 'login',
  SIGN_UP_URL: 'sign-up',

  async login(email: string, password: string): Promise<AxiosResponse<void>> {
    return axios.post(this.ENDPOINT + this.LOGIN_URL, { email, password });
  },

  async signUp(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<AxiosResponse<void>> {
    return axios.post(this.ENDPOINT + this.SIGN_UP_URL, data);
  },
};
