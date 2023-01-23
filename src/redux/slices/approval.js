import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import apiClient from '../../commons/ApiCall';

export const list = createAsyncThunk('show', async id => {
  try {
    const resp = await apiClient.get(`users`);
    console.log('log >>>>', resp);
    return resp.data;
  } catch (error) {
    return error.response.data;
  }
});

const initialState = {
  details: {
    sts: 'loading',
    data: [],
  },
};

const approvalSlice = createSlice({
  name: 'approval',
  initialState,
  extraReducers: {
    [list.pending]: state => {
      state.details = {sts: 'loading', data: []};
    },
    [list.fulfilled]: (state, action) => {
      if (action.payload.diagnostic.error) {
        state.details = {sts: 'failed', data: []};
        // console.log(action.payload);
      } else {
        // console.log(action.payload);
        state.details = {sts: 'success', data: action.payload.data};
      }
    },
  },
});

const {reducer} = approvalSlice;

export default reducer;
