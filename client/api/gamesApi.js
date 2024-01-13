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
        url: `/users/register`,
        method: 'POST',
        body: { ...data },
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: '/users/login',
        method: 'POST',
        body: { ...data },
      }),
    }),
    getAccount: builder.query({
      query: (token) => ({
        url: '/users/me',
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useGetGamesMutation, useGetSingleGameQuery, useRegisterMutation, useLoginMutation, useGetAccountQuery } = gamesApi;
