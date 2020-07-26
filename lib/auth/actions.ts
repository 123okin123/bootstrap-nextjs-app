import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../../services/auth.service';
import { SignUp } from '../../entities/sign-up.entity';
import { ApiError } from '../../entities/api-error.entity';
import { useAuth } from '../../context/auth';

// export const removeMessage = actionCreator('AUTH_REMOVE_MESSAGE');
// export const updateAuthData = actionCreator('AUTH_UPDATE_DATA');

export const removeMessage = createAction('auth/remove-message');

export const login = createAsyncThunk<
  { access_token: string; expires_in: string },
  { email: string; password: string },
  {
    rejectValue: ApiError;
  }
>('auth/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await authService.login(email, password);
    const { setToken } = useAuth();
    setToken({ token: response.data.access_token });
    return response.data;
  } catch (err) {
    if (!err.response) {
      throw err;
    }
    return rejectWithValue(err.response.data);
  }
});

export const logout = createAsyncThunk<void>('auth/logout', async (_, { rejectWithValue }) => {
  try {
    const response = await authService.logout();
    return response.data;
  } catch (err) {
    if (!err.response) {
      throw err;
    }
    return rejectWithValue(err.response.data);
  }
});

export const forceLogout = createAction('auth/force-logout');

export const signUp = createAsyncThunk<void, SignUp>(
  'auth/sign-up',
  async (values, { rejectWithValue }) => {
    try {
      const response = await authService.signUp(values);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  },
);
