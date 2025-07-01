'use client';
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, type FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { toast } from 'react-toastify';

import Table from '@/app/components/Table';
import SearchBar from '@/app/components/SearchBar';
import ActionTable from '@/app/components/ActionTable';
import { I18nNamespace, SortDirection } from '@/app/utils/enum';
import useTable from '@/app/hooks/use-table';
import { useTranslation } from '@/app/i18n/client';
import { formatDate, formatDurationToHHmm } from '@/app/utils/helpers';

import {
  cleanupMovies,
  deleteMovieRequest,
  fetchMoviesRequest,
} from '@/app/store/movies/slice';
import type { AppState } from '@/app/store';

const MoviesContainer: FC<App.Lang> = ({ lng }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation(lng, [I18nNamespace.MOVIES]);
  const data = useSelector<AppState, Movies.Movies>(
    (state) => state.movies.data,
  );
  const { total, pageCount } = useSelector<AppState, App.Pagination>(
    (state) => state.movies.pagination,
  );
  const isLoggedIn = useSelector<AppState, boolean>(
    (state) => state.auth.isLoggedIn,
  );

  const {
    page,
    pageSize,
    search,
    sortKey,
    sortDir,
    loading,
    searchParamsToString,
    setLoading,
    handleSort,
    handleSearch,
    handleChangePage,
    handleChangePageSize,
  } = useTable();

  useEffect(() => {
    if (isLoggedIn) {
      handleFetchMovies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParamsToString, isLoggedIn]);

  useEffect(() => {
    return () => {
      dispatch(cleanupMovies());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFetchMovies = (): void => {
    setLoading(true);
    dispatch(
      fetchMoviesRequest({
        params: {
          page,
          pageSize,
          search,
          ...(sortKey && { sort: [`${sortKey}:${sortDir}`] }),
        },
        callback: {
          onFinish: () => {
            setLoading(false);
          },
        },
      }),
    );
  };

  const handleDeleteMovie = (id: number): void => {
    const isLastItemRemoved = data.length === 1 && page === pageCount;
    dispatch(
      deleteMovieRequest({
        id,
        callback: {
          onSuccess: () => {
            toast.success(t('delete_success', { entity: t('movie') }));
            if (isLastItemRemoved) {
              const targetPage =
                isLastItemRemoved && page > 1 ? page - 1 : page;
              handleChangePage(targetPage);
            } else {
              handleFetchMovies();
            }
          },
        },
      }),
    );
  };

  const columns = useMemo(
    () => [
      {
        title: t('poster'),
        key: 'poster',
        width: '120px',
        render: ({ poster }: Movies.Movie) => (
          <Image
            className="w-20 h-20 object-cover"
            src={
              poster?.url
                ? `${process.env.NEXT_PUBLIC_API_URL}${poster.url}`
                : '/images/default-image.jpg'
            }
            width="80"
            height="80"
            alt="poster"
            unoptimized
          />
        ),
      },
      {
        title: t('name'),
        key: 'title',
        sortable: true,
        width: '200px',
      },
      { title: t('description'), key: 'description', width: '400px' },
      {
        title: t('duration'),
        key: 'duration',
        sortable: true,
        width: '100px',
        render: ({ duration }: Movies.Movie) => formatDurationToHHmm(duration),
      },
      {
        title: t('genres'),
        key: 'genres',
        width: '200px',
        render: ({ genres }: Movies.Movie) =>
          genres.map(({ id, name }, index) => (
            <span
              key={id}
            >{`${name}${index !== genres.length - 1 ? ', ' : ''}`}</span>
          )),
      },
      {
        title: t('release_year'),
        key: 'releaseYear',
        sortable: true,
        width: '100px',
      },
      {
        title: t('created_at'),
        key: 'createdAt',
        width: '140px',
        render: ({ createdAt }: Movies.Movie) => (
          <span className="whitespace-nowrap">{formatDate(createdAt)}</span>
        ),
      },
      {
        title: t('updated_at'),
        key: 'updatedAt',
        width: '140px',
        render: ({ updatedAt }: Movies.Movie) => (
          <span className="whitespace-nowrap">{formatDate(updatedAt)}</span>
        ),
      },
      {
        title: t('action'),
        key: 'action',
        width: '100px',
        render: ({ id }: Movies.Movie) => (
          <ActionTable
            lng={lng}
            onEdit={() => {}}
            onDelete={() => handleDeleteMovie(id)}
          />
        ),
      },
    ],
    [handleDeleteMovie, lng, t],
  );

  if (!isLoggedIn) return <p />;

  return (
    <>
      <SearchBar
        placeholder={t('search_title_or_description')}
        defaultValue={search}
        onSearch={handleSearch}
        addLabel={t('add')}
      />
      <Table<Movies.Movie>
        data={data}
        loading={loading}
        sortKey={sortKey}
        sortDir={sortDir as SortDirection}
        onSort={handleSort}
        columns={columns}
        pagination={{
          lng,
          page,
          pageSize,
          total,
          onChangePage: handleChangePage,
          onChangePageSize: handleChangePageSize,
        }}
      />
    </>
  );
};

export default MoviesContainer;
