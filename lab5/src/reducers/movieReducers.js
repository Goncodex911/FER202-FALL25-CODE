
export const initialMovieState = {
  movies: [],
  genres: [],
  loading: false,
  isEditing: null,
  currentMovie: {
    avatar: '',
    title: '',
    description: '',
    genreId: '',
    duration: '',
    year: '',
    country: '',
  },
  showEditModal: false,
  showDeleteModal: false,
  movieToDelete: null,
  // phần filter/sort
  keyword: '',
  filterGenreId: '',
  filterDuration: '',
  sortBy: '',
};

export const movieReducer = (state, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, loading: true };

    case 'SET_MOVIES':
      return { ...state, movies: action.payload, loading: false };

    case 'SET_GENRES':
      return { ...state, genres: action.payload };

    case 'UPDATE_FIELD':
      return {
        ...state,
        currentMovie: {
          ...state.currentMovie,
          [action.payload.name]: action.payload.value,
        },
      };

    case 'OPEN_EDIT_MODAL':
      return {
        ...state,
        currentMovie: action.payload,
        isEditing: action.payload.id,
        showEditModal: true,
      };

    case 'CLOSE_EDIT_MODAL':
      return {
        ...state,
        currentMovie: initialMovieState.currentMovie,
        isEditing: null,
        showEditModal: false,
      };

    case 'OPEN_DELETE_MODAL':
      return {
        ...state,
        movieToDelete: action.payload,
        showDeleteModal: true,
      };

    case 'CLOSE_DELETE_MODAL':
      return {
        ...state,
        movieToDelete: null,
        showDeleteModal: false,
      };

    case 'RESET_FORM':
      return {
        ...state,
        currentMovie: initialMovieState.currentMovie,
        isEditing: null,
        showEditModal: false,
      };

    // filter
    case 'SET_KEYWORD':
      return { ...state, keyword: action.payload };

    case 'SET_FILTER_GENRE':
      return { ...state, filterGenreId: action.payload };

    case 'SET_FILTER_DURATION':
      return { ...state, filterDuration: action.payload };

    case 'SET_SORT_BY':
      return { ...state, sortBy: action.payload };

    default:
      return state;
  }
};
