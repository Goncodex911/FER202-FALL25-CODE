// src/contexts/MovieContext.jsx
import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import { movieReducer, initialMovieState } from '../reducers/movieReducers';
import movieApi from '../api/movieAPI';

export const MovieStateContext = createContext(initialMovieState);
export const MovieDispatchContext = createContext(null);

export const useMovieState = () => useContext(MovieStateContext);
export const useMovieDispatch = () => useContext(MovieDispatchContext);

export const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(movieReducer, initialMovieState);

  const fetchMovies = useCallback(async () => {
    dispatch({ type: 'START_LOADING' });
    try {
      const res = await movieApi.get('/movies');
      dispatch({ type: 'SET_MOVIES', payload: res.data });
    } catch (err) {
      console.error('Lỗi khi tải movies', err);
      dispatch({ type: 'SET_MOVIES', payload: [] });
    }
  }, []);

  const fetchGenres = useCallback(async () => {
    try {
      const res = await movieApi.get('/genres');
      dispatch({ type: 'SET_GENRES', payload: res.data });
    } catch (err) {
      console.error('Lỗi khi tải genres', err);
      dispatch({ type: 'SET_GENRES', payload: [] });
    }
  }, []);

  const confirmDelete = useCallback(
    async (id) => {
      dispatch({ type: 'CLOSE_DELETE_MODAL' });
      dispatch({ type: 'START_LOADING' });
      try {
        await movieApi.delete(`/movies/${id}`);
        fetchMovies();
      } catch (err) {
        console.error('Lỗi khi xóa', err);
        fetchMovies();
      }
    },
    [fetchMovies],
  );

  const handleCreateOrUpdate = useCallback(
    async (dataToSend, isEditing, editingId) => {
      dispatch({ type: 'START_LOADING' });
      try {
        if (isEditing) {
          await movieApi.put(`/movies/${editingId}`, dataToSend);
        } else {
          await movieApi.post('/movies', dataToSend);
        }
        dispatch({ type: 'RESET_FORM' });
        fetchMovies();
        return true;
      } catch (err) {
        console.error('Lỗi create/update', err);
        fetchMovies();
        return false;
      }
    },
    [fetchMovies],
  );

  useEffect(() => {
    fetchMovies();
    fetchGenres();
  }, [fetchMovies, fetchGenres]);

  const dispatchValue = {
    dispatch,
    fetchMovies,
    fetchGenres,
    confirmDelete,
    handleCreateOrUpdate,
  };

  return (
    <MovieStateContext.Provider value={state}>
      <MovieDispatchContext.Provider value={dispatchValue}>
        {children}
      </MovieDispatchContext.Provider>
    </MovieStateContext.Provider>
  );
};
