import { createContext, useContext, useReducer } from "react";

const AppContext = createContext();


const initialState = {
  favorites: [],
  people: [],
  planets: [],
  starships: []
};


function reducer(state, action) {
  switch (action.type) {

    
    case "ADD_FAVORITE":
     
      if (state.favorites.some(item => item.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      };

    case "REMOVE_FAVORITE":
      return {
        ...state,
        favorites: state.favorites.filter(item => item.id !== action.payload)
      };

    // --- LISTAS DE API ---
    case "SET_PEOPLE":
      return { ...state, people: action.payload };

    case "SET_PLANETS":
      return { ...state, planets: action.payload };

    case "SET_STARSHIPS":
      return { ...state, starships: action.payload };

    default:
      return state;
  }
}


export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}


export function useAppContext() {
  return useContext(AppContext);
}
