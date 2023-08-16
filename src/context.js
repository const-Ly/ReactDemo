import React, { createContext, useContext, useReducer } from "react";

const initialGlobal = {
  token: "",
};

function globalReducer(state, action) {
  switch (action.type) {
    case "set_token": {
      return {
        ...state,
        token: action.token,
      };
    }
    case "reset": {
      return initialGlobal;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

const AppContext = createContext(null);
const AppDispatchContext = createContext(null);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(
    initialGlobal,
    globalReducer
  );

  return (
    <AppContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppContext.Provider>
  );
}

export function useAppState() {
  return useContext(AppContext);
}

export function useAppDispatch() {
  return useContext(AppDispatchContext);
}
