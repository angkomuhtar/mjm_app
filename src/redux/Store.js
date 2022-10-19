import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import purchaseReducer from './slices/purchase';

export const Store = configureStore({
  reducer: {
    auth: authReducer,
    purchase: purchaseReducer,
  },
  devTools:
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__(),
});
