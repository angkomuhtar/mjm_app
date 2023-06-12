import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import item from './slices/item';
import approval from './slices/approval';

export const Store = configureStore({
  reducer: {
    auth: authReducer,
    item: item,
    approval: approval,
  },
  devTools:
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__(),
});
