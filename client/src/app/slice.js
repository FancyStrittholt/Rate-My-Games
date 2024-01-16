import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  user: sessionStorage.getItem('user') === null ? '' : JSON.parse(sessionStorage.getItem('user')),
};

const slice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    updateGames: (state, { payload }) => {
      state.games = payload;
      sessionStorage.setItem('games', JSON.stringify(state.games));
    },
    updateVotes: (state, { payload }) => {
      state.votes = payload;
      sessionStorage.setItem('votes', JSON.stringify(state.votes));
    },
    updateUser: (state, { payload }) => {
      state.user = payload;
      sessionStorage.setItem('user', JSON.stringify(state.user));
    },
  },
});

export const { updateUser, updateGames, updateVotes } = slice.actions;

export default slice.reducer;
