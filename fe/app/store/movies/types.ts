import type { TFunction } from 'i18next';

export type MoviesStore = FetchMoviesSuccess;

export type FetchMoviesRequest = {
  params: App.Params;
  callback: App.Callback;
};

export type FetchMoviesSuccess = {
  data: Movies.Movies;
  pagination: App.Pagination;
};

export type FetchMoviesResponse = {
  data: Movies.Movies;
  meta: {
    pagination: App.Pagination;
  };
};

export type DeleteMovieRequest = {
  id: number;
  callback: App.Callback;
  t: TFunction;
};
