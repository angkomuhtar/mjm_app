import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import apiClient from '../../commons/ApiCall';

export const show = createAsyncThunk('purchase/show', async id => {
  try {
    const resp = await apiClient.get(`purchasing-request/${id}/show`);
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

const purchaseSlice = createSlice({
  name: 'purchase',
  initialState,
  extraReducers: {
    [show.pending]: state => {
      state.details = {sts: 'loading', data: []};
    },
    [show.fulfilled]: (state, action) => {
      if (action.payload.diagnostic.error) {
        state.details = {sts: 'failed', data: []};
        console.log(action.payload);
      } else {
        state.details = {sts: 'success', data: action.payload.data};
      }
    },
  },
});

const {reducer} = purchaseSlice;

export default reducer;
