// Import the RTK Query methods from the React-specific entry point
import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { endpoints } from '@api';
// Use this import if you want to use "env.js" file
import Config from 'react-native-config';
import { Alert } from 'react-native';
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { strings } from '@constants';

// Custom type for handling the possible return types
type CustomError = {
  status: number;
  data?: {
    message?: string;
  };
};

// Custom baseQuery with error handling
const baseQueryWithErrorHandling: BaseQueryFn<
  string | { url: string; method?: string; body?: any },
  unknown,
  FetchBaseQueryError | CustomError
> = async (args, api, extraOptions) => {
  const result = await fetchBaseQuery({
    baseUrl: Config.API_URL ?? '',
  })(args, api, extraOptions);

  if (result.error) {
    const error = result.error as FetchBaseQueryError;

    // Handle different error types
    if ('status' in error && typeof error.status === 'number') {
      // Handle 500 and other server errors
      if (error.status === 500) {
        Alert.alert(strings.serverError, strings.serverErrorMessage);
      }

      // Handle other status codes if needed
      if (error.status >= 400 && error.status < 500) {
        Alert.alert(
          strings.error,
          `${strings.errorOccurred} ${
            (error.data as { message?: string })?.message ||
            strings.unknownError
          }`
        );
      }
    } else if ('error' in error) {
      // Handle network or fetch errors
      Alert.alert(strings.networkError, strings.noConnection);
    }
  }

  return result;
};

// Define our single API slice object
export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: 'api',
  // All of our requests will have URLs starting with '/fakeApi'
  baseQuery: baseQueryWithErrorHandling,
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
export const { useGetPostIDsQuery, useGetPostQuery } = apiSlice;
