import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {api, endpoints} from '@api';

export interface PostDetailsType {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
}

// Define a type for the slice state
interface AppState {
  postIdList: number[];
  postDetails: PostDetailsType[];
  loading: boolean;
}

// Define the initial state using that type
const initialState: AppState = {
  postIdList: [],
  postDetails: [],
  loading: false,
};

export const fetchPostIds = createAsyncThunk(
  endpoints.newStories,
  async (data, {rejectWithValue}) => {
    try {
      const res = await api.get(endpoints.newStories);
      return res;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);
export const fetchPostDetails = createAsyncThunk(
  endpoints.postDetails,
  async (postID: number, {rejectWithValue}) => {
    try {
      const res: PostDetailsType = await api.get(
        `${endpoints.postDetails}/${postID}.json?print=pretty`,
      );
      return res;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

/**
 * Manage state for posts
 */
export const postsSlice = createSlice({
  name: 'posts',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    resetPostDetails: state => {
      state.postDetails = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPostIds.pending, state => {});
    builder.addCase(
      fetchPostIds.fulfilled,
      (state, {payload}: PayloadAction<any>) => {
        state.postIdList = payload;
      },
    );
    builder.addCase(fetchPostIds.rejected, state => {});
    builder.addCase(fetchPostDetails.pending, state => {});
    builder.addCase(
      fetchPostDetails.fulfilled,
      (state, {payload}: PayloadAction<PostDetailsType>) => {
        state.postDetails.push(payload);
      },
    );
    builder.addCase(fetchPostDetails.rejected, state => {});
  },
});

export const {resetPostDetails} = postsSlice.actions;

export default postsSlice.reducer;
