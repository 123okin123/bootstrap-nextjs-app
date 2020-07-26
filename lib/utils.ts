import { RootState } from './reducers';

export const validateToken = (rootState: RootState): string => {
  const token = rootState?.authState?.data?.access_token;
  if (!token) throw new Error('NO_TOKEN');

  return token;
};
