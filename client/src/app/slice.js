import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user:
    sessionStorage.getItem("user") === null
      ? ""
      : JSON.parse(sessionStorage.getItem("user")),
  votes:
    sessionStorage.getItem("votes") === null
      ? ""
      : JSON.parse(sessionStorage.getItem("votes")),
  games:
    sessionStorage.getItem("games") === null
      ? ""
      : JSON.parse(sessionStorage.getItem("games")),
  gameVotes:
    sessionStorage.getItem("gameVotes") === null
      ? ""
      : JSON.parse(sessionStorage.getItem("gameVotes")),
  leaderboards:
    sessionStorage.getItem("leaderboards") === null
      ? ""
      : JSON.parse(sessionStorage.getItem("leaderboards")),
};

const slice = createSlice({
  name: "slice",
  initialState,
  reducers: {
    updateGames: (state, { payload }) => {
      state.games = payload;
      sessionStorage.setItem("games", JSON.stringify(state.games));
    },
    updateVotes: (state, { payload }) => {
      state.votes = payload;
      sessionStorage.setItem("votes", JSON.stringify(state.votes));
    },
    updateUser: (state, { payload }) => {
      state.user = payload;
      sessionStorage.setItem("user", JSON.stringify(state.user));
    },
    updateGameVotes: (state, { payload }) => {
      state.gameVotes = payload;
      sessionStorage.setItem("gameVotes", JSON.stringify(state.gameVotes));
    },
    updateLeaderboard: (state, { payload }) => {
      if (state.leaderboards) {
        state.leaderboards[payload.tag] = payload.data;
        sessionStorage.setItem(
          "leaderboards",
          JSON.stringify(state.leaderboards),
        );
      } else {
        state.leaderboards = {};
        state.leaderboards[payload.tag] = payload.data;
        sessionStorage.setItem(
          "leaderboards",
          JSON.stringify(state.leaderboards),
        );
      }
    },
  },
});

export const {
  updateUser,
  updateGames,
  updateVotes,
  updateGameVotes,
  updateLeaderboard,
} = slice.actions;

export default slice.reducer;
