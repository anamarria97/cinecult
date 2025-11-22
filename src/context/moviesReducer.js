export const initialState = {
  favorites: [],
};

export function moviesReducer(state, action) {
  switch (action.type) {
    case "ADD_FAVORITE":
      if (state.favorites.some((m) => m.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };

    case "REMOVE_FAVORITE":
      return {
        ...state,
        favorites: state.favorites.filter((m) => m.id !== action.payload),
      };

    case "TOGGLE_FAVORITE": {
      const exists = state.favorites.some((m) => m.id === action.payload.id);
      return {
        ...state,
        favorites: exists
          ? state.favorites.filter((m) => m.id !== action.payload.id)
          : [...state.favorites, action.payload],
      };
    }

    case "CLEAR_FAVORITES":
      return {
        ...state,
        favorites: [],
      };

    default:
      return state;
  }
}
