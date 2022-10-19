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
    const resp = await apiClient.post(`signin`, {
      username,
      password,
    });
    console.log(resp.data);
    return resp.data;
  } catch (error) {
    return error.response.data;
  }
});

const initialState = {
  loading: false,
  isLoggedIn: false,
  success: {
    sts: false,
    data: [],
  },
  failed: {
    sts: false,
    data: [],
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [login.pending]: state => {
      state.loading = true;
      state.success = {sts: false, data: []};
      state.failed = {sts: false, data: []};
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload.diagnostic.error) {
        state.failed = {sts: true, data: action.payload.diagnostic.message};
      } else {
        state.success = {sts: true, data: action.payload};
        state.isLoggedIn = true;
      }
    },
  },
});

const {reducer} = authSlice;

export default reducer;
