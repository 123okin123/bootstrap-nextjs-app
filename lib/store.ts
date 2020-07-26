import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import logger from 'redux-logger';
import rootReducer from './reducers';

const reducer = rootReducer;

const preloadedState = {};

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend
      // correctly typed middlewares can just be used
      // additionalMiddleware,
      // you can also type middlewares manually
      // untypedMiddleware as Middleware<(action: Action<'specialAction'>) => number, RootState>,
      ()
      // prepend and concat calls can be chained
      .concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState,
});
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
