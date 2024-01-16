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
    updateGameVotes: (state, { payload }) => {
      state.gameVotes = payload;
      sessionStorage.setItem('gameVotes', JSON.stringify(state.gameVotes))
    }
  },
});

export const { updateUser, updateGames, updateVotes, updateGameVotes } = slice.actions;

export default slice.reducer;
