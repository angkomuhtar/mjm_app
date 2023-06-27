import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import apiClient from '../../commons/ApiCall';

export const getByCode = createAsyncThunk('item/show/code', async code => {
  try {
    const resp = await apiClient.get(`barang/${code}/show-kode`);
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

const itemSlice = createSlice({
  name: 'item',
  initialState,
  extraReducers: {
    [getByCode.pending]: state => {
      state.loading = true;
      state.success = false;
      state.data = [];
    },
    [getByCode.fulfilled]: (state, action) => {
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

const {reducer} = itemSlice;

export default reducer;
