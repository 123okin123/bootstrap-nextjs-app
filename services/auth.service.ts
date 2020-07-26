import { AxiosResponse } from 'axios';
import { httpClient } from './httpClient';
import { SignUp } from '../entities/sign-up.entity';

const ENDPOINT = 'auth/';

export const authService = {
  login: async (
    email: string,
    password: string,
  ): Promise<AxiosResponse<{ access_token: string; expires_in: string }>> => {
    return httpClient.post(ENDPOINT + 'login', { email, password });
  },

  logout: async (): Promise<AxiosResponse<void>> => {
    return httpClient.post(ENDPOINT + 'logout');
  },

  signUp: async (data: SignUp): Promise<AxiosResponse<void>> => {
    return httpClient.post(ENDPOINT + 'signup', data);
  },
};
