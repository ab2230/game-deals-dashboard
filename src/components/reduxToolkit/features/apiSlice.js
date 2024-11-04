import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const gamesApi = createApi({
  reducerPath: 'gamesApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  endpoints: (builder) => ({
    getDeals: builder.query({
      query: () => '/deals',
    }),
    getGameById: builder.query({
      query: (id) => `/games?id=${id}`,
    }), 
    searchGames: builder.query({
      query: (title) => `/games?title=${encodeURIComponent(title)}`,
    }),   
  }),
});

export const { useGetDealsQuery, useGetGameByIdQuery, useSearchGamesQuery  } = gamesApi;
