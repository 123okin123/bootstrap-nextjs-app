import { createContainer } from 'unstated-next';
import { authService } from '../services/auth.service';

const useApi = () => {
  return {
    authService,
  };
};

export const ApiContainer = createContainer(useApi);
