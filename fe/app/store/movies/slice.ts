import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PAGINATION_INITIAL } from '@/app/utils/constants';
import type {
  DeleteMovieRequest,
  FetchMoviesRequest,
  FetchMoviesSuccess,
  MoviesStore,
} from './types';

const initialState: MoviesStore = {
  pagination: PAGINATION_INITIAL,
  data: [],
};

const moviesSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fetchMoviesRequest: (_, _action: PayloadAction<FetchMoviesRequest>) => {},
    fetchMoviesSuccess: (
      state: MoviesStore,
      action: PayloadAction<FetchMoviesSuccess>,
    ) => {
      state.data = action.payload.data;
      state.pagination = action.payload.pagination;
    },
    deleteMovieRequest: (_, _action: PayloadAction<DeleteMovieRequest>) => {},
    cleanupMovies: () => initialState,
  },
});

export const {
  fetchMoviesRequest,
  fetchMoviesSuccess,
  deleteMovieRequest,

  cleanupMovies,
} = moviesSlice.actions;
export default moviesSlice.reducer;
