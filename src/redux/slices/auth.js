import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import apiClient from '../../commons/ApiCall';

export const login = createAsyncThunk(
  'auth/login',
  async ({username, password}) => {
    try {
      const resp = await apiClient.post(`signin`, {
        username,
        password,
      });
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      return error.response.data;
    }
  },
);

export const logout = createAsyncThunk('auth/logout', async () => {
  try {
    return true;
  } catch (error) {
    return error.response.data;
  }
});

const initialState = {
  loading: false,
  isLoggedIn: false,
  isSuccess: true,
  message: [],
  userdata: [],
  token: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [login.pending]: state => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload.diagnostic.error) {
        state.isSuccess = false;
        state.message = action.payload.diagnostic.message;
      } else {
        state.isSuccess = true;
        state.token = action.payload.data;
        state.userdata = action.payload.user;
        state.isLoggedIn = true;
        state.message = [];
      }
    },
    [logout.fulfilled]: (state, aciton) => {
      state.loading = false;
      state.isLoggedIn = false;
      state.isSuccess = true;
      state.message = [];
      state.userdata = [];
      state.token = null;
    },
  },
});

const {reducer} = authSlice;

export default reducer;
