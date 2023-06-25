import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import apiClient from '../../commons/ApiCall';

export const list = createAsyncThunk('show', async type => {
  try {
    const url = type
      ? `purchasing-request?keyword=true&status=${type}`
      : `purchasing-request`;
    const resp = await apiClient.get(url);
    console.log(resp);
    return resp.data;
  } catch (error) {
    return error.response.data;
  }
});

export const show = createAsyncThunk('purchase/show', async id => {
  try {
    const resp = await apiClient.get(`purchasing-request/${id}/show`);
    return resp.data;
  } catch (error) {
    return error.response.data;
  }
});

export const action = createAsyncThunk(
  `purchase/action`,
  async ({id, type}) => {
    try {
      // console.log('cuma ini', id, type);
      // return id;
      const resp = await apiClient.post(`purchasing-request/${id}/${type}`);
      return resp.data;
    } catch (error) {
      return error.response.data;
    }
  },
);

const initialState = {
  isLoading: false,
  data: [],
  details: [],
  isSuccess: null,
  message: [],
};

const approvalSlice = createSlice({
  name: 'approval',
  initialState,
  extraReducers: {
    [list.pending]: state => {
      // state.details = {sts: 'loading', data: []};
      state.isLoading = true;
    },
    [list.fulfilled]: (state, action) => {
      if (action.payload.diagnostic.error) {
        state.data = {sts: 'failed', data: []};
        console.log('dari slice approval', action.payload);
      } else {
        // console.log(action.payload);
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload.data;
      }
    },
    [show.pending]: state => {
      // state.details = {sts: 'loading', data: []};
      state.isLoading = true;
    },
    [show.fulfilled]: (state, action) => {
      if (action.payload.diagnostic.error) {
        state.data = {sts: 'failed', data: []};
        console.log('dari slice approval', action.payload);
      } else {
        // console.log(action.payload);
        state.isLoading = false;
        state.isSuccess = true;
        state.details = action.payload.data;
      }
    },
    [action.pending]: state => {
      // state.details = {sts: 'loading', data: []};
      state.isLoading = true;
    },
    [action.fulfilled]: (state, action) => {
      if (action?.payload?.diagnostic?.error) {
        state.isLoading = false;
        state.isSuccess = false;
      } else {
        console.log(action.payload);
        state.isLoading = false;
        state.isSuccess = true;
        state.details = action.payload.data;
      }
    },
  },
});

const {reducer} = approvalSlice;

export default reducer;
