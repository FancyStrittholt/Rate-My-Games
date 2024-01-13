import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: sessionStorage.getItem('token') === null ? '' : JSON.parse(sessionStorage.getItem('token')),
};

const slice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    updateToken: (state, { payload }) => {
      state.token = payload;
      sessionStorage.setItem('token', JSON.stringify(state.token));
    },
  },
});

export const { updateToken } = slice.actions;

export default slice.reducer;
