import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const gamesApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api',
  }),
  endpoints: (builder) => ({
    getGames: builder.mutation({
      query: () => '/games',
    }),
    getSingleGame: builder.query({
      query: (id) => `/games/${id}`,
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `/auth/register`,
        method: 'POST',
        body: { ...data },
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        body: { ...data },
      }),
    }),
    getAccount: builder.query({
      query: (token) => ({
        url: '/auth/me',
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      }),
    }),
    upVote: builder.mutation({
      query: (userid, gameid) => ({
        url: `/votes/${gameid}/up`,
        method: 'POST',
        body: { userid },
      }),
    }),
    downVote: builder.mutation({
      query: (userid, gameid) => ({
        url: `/votes/${gameid}/down`,
        method: 'DELETE',
        body: { userid },
      }),
    }),
    getMyVotes: builder.mutation({
      query: (id) => `/votes/mine/${id}`,
    }),
  }),
});

export const {
  useGetGamesMutation,
  useGetSingleGameQuery,
  useRegisterMutation,
  useLoginMutation,
  useGetAccountQuery,
  useUpVoteMutation,
  useDownVoteMutation,
  useGetMyVotesMutation,
} = gamesApi;
