import { createReducer, Action } from '@reduxjs/toolkit';
import { forceLogout, login, logout, removeMessage } from './actions';
import { ApiError } from '../../entities/api-error.entity';

interface DefaultState {
  data: {
    access_token: string;
    expires_in: string;
  } | null;
  isLoggingIn: boolean;
  isLoggingOut: boolean;
  isLoggedIn: boolean;
  isForcedLogout: boolean;
  message?: string | null;
}

export const defaultState: DefaultState = {
  data: {
    access_token: '',
    expires_in: '',
  },
  isLoggingIn: false,
  isLoggingOut: false,
  isLoggedIn: false,
  isForcedLogout: false,
  message: '',
};

const authReducer = createReducer(defaultState, (builder) => {
  builder.addCase(removeMessage.type, (state) => {
    state.message = null;
  });
  builder.addCase(forceLogout.type, (state) => {
    return { ...state, isLoggedIn: false, isForcedLogout: true, message: null };
  });
  builder.addCase(login.pending.type, (state) => {
    return {
      ...state,
      isLoggingIn: true,
    };
  });
  builder.addCase(login.fulfilled, (state, { payload }) => {
    return {
      ...state,
      data: payload,
      isLoggingIn: false,
      isLoggedIn: true,
      isForcedLogout: false,
    };
  });
  builder.addCase(login.rejected, (state, { payload }) => {
    console.log('action', payload);
    return {
      ...state,
      isLoggingIn: false,
      message: payload?.message,
    };
  });
  builder.addCase(logout.pending, (state, { payload }) => {
    return {
      ...state,
      isLoggingOut: true,
    };
  });
  builder.addCase(logout.fulfilled, (state, { payload }) => {
    return {
      ...state,
      data: null,
      isLoggingOut: false,
      isLoggedIn: false,
      isForcedLogout: false,
    };
  });
  builder.addCase(logout.rejected, (state, { payload }) => {
    return {
      ...state,
      isLoggingOut: false,
      isLoggedIn: false,
      isForcedLogout: false,
    };
  });
});

export default authReducer;
