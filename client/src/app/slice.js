import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: sessionStorage.getItem('token') === null ? '' : JSON.parse(sessionStorage.getItem('token')),
};

const slice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    updateGames: (state, { payload }) => {
      state.games = payload;
      sessionStorage.setItem('games', JSON.stringify(state.games));
    },
    updateToken: (state, { payload }) => {
      state.token = payload;
      sessionStorage.setItem('token', JSON.stringify(state.token));
    },
    updateVotes: (state, { payload }) => {
      state.votes = payload;
      sessionStorage.setItem('votes', JSON.stringify(state.votes));
    },
  },
});

export const { updateToken, updateGames, updateVotes } = slice.actions;

export default slice.reducer;
