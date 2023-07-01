import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import apiClient from '../../commons/ApiCall';

export const getNotif = createAsyncThunk('notification', async () => {
  try {
    const resp = await apiClient.get(`notification`);
    return resp.data;
  } catch (error) {
    return error.response.data;
  }
});

const initialState = {
  details: {
    loading: false,
    success: false,
    data: [],
  },
};

const notifSlice = createSlice({
  name: 'notif',
  initialState,
  extraReducers: {
    [getNotif.pending]: state => {
      state.loading = true;
      state.success = false;
      state.data = [];
    },
    [getNotif.fulfilled]: (state, action) => {
      if (action.payload.diagnostic.error) {
        // state.details = {sts: 'failed', data: []};
        // console.log('zzzz', JSON.stringify(action.payload, null, 2));
      } else {
        // console.log('xxxx', JSON.stringify(action.payload, null, 2));
        state.loading = false;
        state.success = true;
        state.data = action.payload.data;
      }
    },
  },
});

const {reducer} = notifSlice;

export default reducer;
