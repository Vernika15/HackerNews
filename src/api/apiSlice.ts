// Import the RTK Query methods from the React-specific entry point
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {endpoints} from '@api';
// Use this import if you want to use "env.js" file
import Config from 'react-native-config';

// Define our single API slice object
export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: 'api',
  // All of our requests will have URLs starting with '/fakeApi'
  baseQuery: fetchBaseQuery({baseUrl: Config.API_URL ?? ''}),
  tagTypes: ['PostIds'],
  // The "endpoints" represent operations and requests for this server
  endpoints: builder => ({
    // The `getPosts` endpoint is a "query" operation that returns data
    getPostIDs: builder.query({
      // The URL for the request is '/fakeApi/posts'
      query: () => endpoints.newStories,
      providesTags: _ => ['PostIds'],
    }),
    getPost: builder.query({
      // The URL for the request is '/fakeApi/posts'
      query: postID => `${endpoints.postDetails}/${postID}.json?print=pretty`,
    }),
  }),
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const {useGetPostIDsQuery, useGetPostQuery} = apiSlice;
